/**
 * LOSTBYTE — Central Business, Google Forms Integration & SEO Configuration
 * Runs cleanly with zero manually entered environment variables on localhost,
 * Google AI Studio preview, and production (https://lostbyte.in).
 */

const env =
  typeof import.meta !== 'undefined' &&
  (import.meta as unknown as { env?: Record<string, string | undefined> }).env
    ? (import.meta as unknown as { env: Record<string, string | undefined> }).env
    : {};

export const PRODUCTION_CANONICAL_URL = 'https://lostbyte.in';

/**
 * Resolves the active website base URL:
 * 1. Explicit VITE_SITE_URL if configured
 * 2. window.location.origin when running in a browser
 * 3. https://lostbyte.in fallback for SSR / build / Node tests
 */
export function resolveSiteBaseUrl(): string {
  const configured = (env.VITE_SITE_URL || '').trim().replace(/\/$/, '');
  if (configured) return configured;
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return window.location.origin.replace(/\/$/, '');
  }
  return PRODUCTION_CANONICAL_URL;
}

/**
 * Canonical domain for production SEO tags & sitemaps.
 * Uses https://lostbyte.in unless an explicit non-localhost VITE_SITE_URL is set.
 */
export function resolveCanonicalDomain(): string {
  const configured = (env.VITE_SITE_URL || '').trim().replace(/\/$/, '');
  if (configured && !/localhost|127\.0\.0\.1/i.test(configured)) {
    return configured;
  }
  return PRODUCTION_CANONICAL_URL;
}

export const DEVICE_TYPE_OPTIONS = [
  'Internal HDD',
  'External HDD',
  'SATA SSD',
  'NVMe SSD',
  'USB / Pen Drive',
  'Memory Card',
  'RAID',
  'NAS',
  'Server Storage',
  'CCTV / DVR / NVR',
  'Other Supported Storage',
] as const;

export type DeviceTypeOption = (typeof DEVICE_TYPE_OPTIONS)[number];

export const STORAGE_CAPACITY_OPTIONS = [
  '32 GB',
  '64 GB',
  '128 GB',
  '256 GB',
  '500 GB',
  '1 TB',
  '2 TB',
  '4 TB',
  '6 TB',
  '8 TB',
  '10 TB',
  '12 TB',
  '16 TB',
  '18 TB',
  '20 TB',
  'Other / Not Sure',
] as const;

export type StorageCapacityOption = (typeof STORAGE_CAPACITY_OPTIONS)[number];

export const GOOGLE_FORM_ID = '1FAIpQLSerYlDcnBEO5i7QliyoGXvj4UyxiTualsSAzhxmM7aret4sQA';

export const SITE_CONFIG = {
  brand: {
    name: 'LOSTBYTE',
    tagline: 'RECOVER WHAT MATTERS.',
    secondaryTagline: 'Advanced Data Recovery. Trusted Support.',
    category: 'Professional Data Recovery Services',
    experience: '5 Years of Practical Data Recovery Experience',
    experienceShort: '5 Years Experience',
  },
  domain: {
    canonicalUrl: resolveCanonicalDomain(),
    get baseUrl() {
      return resolveSiteBaseUrl();
    },
    hostname: 'lostbyte.in',
  },
  contact: {
    phoneDisplay: '+91 63885 07400',
    phoneHref: 'tel:+916388507400',
    whatsappNumber: '916388507400',
    whatsappBaseUrl: 'https://wa.me/916388507400',
    email: 'supportlostbyte@gmail.com',
    emailHref: 'mailto:supportlostbyte@gmail.com',
    hours: '10:00 AM – 9:00 PM IST',
    hoursShort: '10 AM – 9 PM IST',
    locationLabel: 'Burari, Delhi',
    locationFull: 'Burari, Delhi, India',
  },
  maps: {
    landmarkLabel: 'Burari Chowk, Burari, Delhi, India',
    embedUrl: 'https://www.google.com/maps?q=Burari+Chowk,+Delhi,+India&output=embed',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Burari+Chowk,+Delhi,+India',
    landmarkStatement:
      'Our operations are based around Burari, Delhi, with pickup and courier coordination available for eligible locations.',
  },
  coverage: {
    local: 'Delhi NCR (Pickup & Delivery Coordination)',
    outstation: 'All India (Eligible Device Courier Acceptance)',
    advancedHardware: 'Bengaluru, India (Specialist Hardware Recovery Support)',
  },
  policies: {
    initialDiagnosis: 'Free Initial Diagnosis',
    paymentPolicy: 'No Data, No Recovery Fee',
    advancePayment: 'No Advance Recovery Payment',
    approvalPolicy: 'Customer Approval Required Before Recovery',
    pickupPolicy:
      'Pickup and courier charges are case-dependent, disclosed upfront, and require customer approval before arrangement.',
    confidentiality: 'Confidential device handling with Non-Disclosure Agreement (NDA) available on request.',
  },
  form: {
    googleFormId: GOOGLE_FORM_ID,
    /**
     * Primary direct Google Forms submission endpoint used via hidden iframe POST.
     * Verified against the supplied prefilled Google Forms URL.
     */
    googleFormResponseUrl: `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`,
    googleFormViewUrl: `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/viewform`,
    /**
     * Exact verified entry IDs matching the Google Form prefilled URL structure:
     * entry.174290505  -> Customer Name
     * entry.358460709  -> Contact Number
     * entry.450074997  -> Email Address
     * entry.1721769737 -> Drive Type
     * entry.870729571  -> Storage Capacity
     * entry.1685007087 -> Address
     */
    entryIds: {
      customerName: 'entry.174290505',
      contactNumber: 'entry.358460709',
      emailAddress: 'entry.450074997',
      driveType: 'entry.1721769737',
      storageCapacity: 'entry.870729571',
      address: 'entry.1685007087',
    } as const,
    submissionTimeoutMs: 6500,
  },
  seoDefaults: {
    siteName: 'LOSTBYTE',
    defaultTitle: 'LOSTBYTE — Professional Data Recovery Services in Delhi NCR & India',
    defaultDescription:
      'Specialized data recovery for HDDs, SSDs, NVMe drives, RAID arrays, NAS systems, servers, USB drives, memory cards, and CCTV storage. Free initial diagnosis and No Data, No Recovery Fee.',
    ogImage: `${PRODUCTION_CANONICAL_URL}/og-lostbyte.svg`,
  },
} as const;
