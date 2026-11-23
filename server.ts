import express from 'express';
import type { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const IS_PROD = process.env.NODE_ENV === 'production';

// Verified Google Form endpoint and exact 6 entry IDs from the supplied prefilled URL
const GOOGLE_FORM_ID = '1FAIpQLSerYlDcnBEO5i7QliyoGXvj4UyxiTualsSAzhxmM7aret4sQA';
const GOOGLE_FORM_RESPONSE_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

const GOOGLE_FORM_ENTRY_IDS = {
  customerName: 'entry.174290505',
  contactNumber: 'entry.358460709',
  emailAddress: 'entry.450074997',
  driveType: 'entry.1721769737',
  storageCapacity: 'entry.870729571',
  address: 'entry.1685007087',
} as const;

interface EnquiryPayload {
  customerName: string;
  contactNumber: string;
  emailAddress: string;
  driveType: string;
  storageCapacity: string;
  address: string;
}

// Lightweight per-IP rate limiter (20 enquiries per 10 minutes)
const rateBucket = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 20;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateBucket.get(ip);
  if (!entry || now > entry.resetAt) {
    rateBucket.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX_REQUESTS;
}

function readCleanString(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

function validateEnquiryPayload(body: unknown): {
  valid: boolean;
  data?: EnquiryPayload;
  error?: string;
} {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid enquiry payload.' };
  }

  const raw = body as Record<string, unknown>;
  const data: EnquiryPayload = {
    customerName: readCleanString(raw.customerName, 120),
    contactNumber: readCleanString(raw.contactNumber, 30),
    emailAddress: readCleanString(raw.emailAddress, 160),
    driveType: readCleanString(raw.driveType, 80),
    storageCapacity: readCleanString(raw.storageCapacity, 40),
    address: readCleanString(raw.address, 500),
  };

  if (data.customerName.length < 2) {
    return { valid: false, error: 'Please enter your full name.' };
  }

  const phoneDigits = data.contactNumber.replace(/\D/g, '');
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    return { valid: false, error: 'Please enter a valid 10 to 15 digit contact number.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.emailAddress)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }

  if (!data.driveType) {
    return { valid: false, error: 'Please select your storage device type.' };
  }

  if (!data.storageCapacity) {
    return { valid: false, error: 'Please select your storage capacity.' };
  }

  if (data.address.length < 3) {
    return { valid: false, error: 'Please enter your pickup or contact address.' };
  }

  return { valid: true, data };
}

function isGoogleFormSubmissionConfirmed(html: string): boolean {
  return (
    /Your response has been recorded/i.test(html) ||
    /freebirdFormviewerViewResponseConfirmationMessage/i.test(html) ||
    /formResponse/i.test(html) && /Submit another response/i.test(html)
  );
}

async function createServer() {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '16kb' }));

  app.post('/api/enquiry', async (req: Request, res: Response) => {
    const clientIp = String(req.ip || req.socket.remoteAddress || 'unknown');
    if (isRateLimited(clientIp)) {
      res.status(429).json({
        ok: false,
        error: 'Too many requests. Please wait a few minutes or contact +91 63885 07400.',
      });
      return;
    }

    const validation = validateEnquiryPayload(req.body);
    if (!validation.valid || !validation.data) {
      res.status(400).json({
        ok: false,
        error: validation.error || 'Please check all required fields and try again.',
      });
      return;
    }

    const { data } = validation;
    const formBody = new URLSearchParams({
      [GOOGLE_FORM_ENTRY_IDS.customerName]: data.customerName,
      [GOOGLE_FORM_ENTRY_IDS.contactNumber]: data.contactNumber,
      [GOOGLE_FORM_ENTRY_IDS.emailAddress]: data.emailAddress,
      [GOOGLE_FORM_ENTRY_IDS.driveType]: data.driveType,
      [GOOGLE_FORM_ENTRY_IDS.storageCapacity]: data.storageCapacity,
      [GOOGLE_FORM_ENTRY_IDS.address]: data.address,
      fvv: '1',
      pageHistory: '0',
      submit: 'Submit',
    });

    try {
      const googleResponse = await fetch(GOOGLE_FORM_RESPONSE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        body: formBody.toString(),
        redirect: 'follow',
        signal: AbortSignal.timeout(12000),
      });

      const responseHtml = await googleResponse.text();
      const confirmed = googleResponse.ok && isGoogleFormSubmissionConfirmed(responseHtml);

      if (!confirmed) {
        console.error(
          `[LOSTBYTE] Google Forms rejected submission (status=${googleResponse.status}).`,
        );
        res.status(502).json({
          ok: false,
          error:
            'Google Forms could not confirm your submission right now. Please retry or reach us on WhatsApp / +91 63885 07400.',
        });
        return;
      }

      res.status(200).json({ ok: true });
    } catch (error) {
      console.error('[LOSTBYTE] Error forwarding enquiry to Google Forms:', error);
      res.status(502).json({
        ok: false,
        error:
          'Unable to reach Google Forms right now. Please retry or contact us directly on +91 63885 07400.',
      });
    }
  });

  const distDir = path.resolve(__dirname, 'dist');
  const distIndex = path.join(distDir, 'index.html');

  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else if (fs.existsSync(distIndex)) {
    app.use(express.static(distDir, { index: false }));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(distIndex);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LOSTBYTE server listening on http://0.0.0.0:${PORT}`);
  });
}

createServer().catch((err) => {
  console.error('Failed to start LOSTBYTE server:', err);
  process.exit(1);
});
