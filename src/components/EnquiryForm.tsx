import React, { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Phone,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import {
  DEVICE_TYPE_OPTIONS,
  SITE_CONFIG,
  STORAGE_CAPACITY_OPTIONS,
  type DeviceTypeOption,
} from '../config/siteConfig';
import {
  buildWhatsAppUrl,
  createEmptyEnquiryValues,
  createSubmissionSignature,
  hasValidationErrors,
  mapEnquiryToGoogleFormFields,
  validateEnquiryForm,
  type EnquiryFormErrors,
  type EnquiryFormValues,
} from '../utils/enquiry';

interface EnquiryFormProps {
  initialDeviceType?: DeviceTypeOption | '';
  heading?: string;
  subheading?: string;
  compact?: boolean;
  onSuccessComplete?: () => void;
}

type SubmissionState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; submittedDevice: string }
  | { status: 'error'; message: string };

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialDeviceType = '',
  heading = 'Request Free Initial Diagnosis',
  subheading = 'Share your storage device details below. Our team will contact you to review feasibility, pickup options, and next steps.',
  compact = false,
  onSuccessComplete,
}) => {
  const formUid = useId();

  // Never prefill personal details; only preselect device type contextually when provided
  const [values, setValues] = useState<EnquiryFormValues>(() =>
    createEmptyEnquiryValues(initialDeviceType),
  );
  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [submission, setSubmission] = useState<SubmissionState>({ status: 'idle' });

  const isSubmittingRef = useRef(false);
  const lastSubmittedSignatureRef = useRef<string | null>(null);

  // Update only driveType when contextual route/CTA changes (never overwrite personal details)
  useEffect(() => {
    if (initialDeviceType) {
      setValues((prev) => ({
        ...prev,
        driveType: initialDeviceType,
      }));
      setErrors((prev) => {
        if (!prev.driveType) return prev;
        const next = { ...prev };
        delete next.driveType;
        return next;
      });
    }
  }, [initialDeviceType]);

  const handleFieldChange = (field: keyof EnquiryFormValues, val: string) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    if (submission.status === 'error') {
      setSubmission({ status: 'idle' });
    }
  };

  const submitToGoogleForms = async () => {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      setSubmission({
        status: 'error',
        message:
          'You appear to be offline. Please check your internet connection and retry, or call +91 63885 07400.',
      });
      return;
    }

    const signature = createSubmissionSignature(values);
    if (lastSubmittedSignatureRef.current === signature) {
      // Duplicate submission protection for an already confirmed submission
      setSubmission({
        status: 'success',
        submittedDevice: values.driveType,
      });
      return;
    }

    isSubmittingRef.current = true;
    setSubmission({ status: 'submitting' });

    const payload: EnquiryFormValues = {
      customerName: values.customerName.trim(),
      contactNumber: values.contactNumber.trim(),
      emailAddress: values.emailAddress.trim(),
      driveType: values.driveType.trim(),
      storageCapacity: values.storageCapacity.trim(),
      address: values.address.trim(),
    };

    try {
      // Primary: verified same-origin submission through /api/enquiry so Google Forms HTTP 200
      // and "Your response has been recorded" confirmation are genuinely verified server-side.
      const apiResponse = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const contentType = apiResponse.headers.get('content-type') || '';

      if (apiResponse.ok && contentType.includes('application/json')) {
        const result = (await apiResponse.json()) as { ok?: boolean; error?: string };
        if (result.ok) {
          lastSubmittedSignatureRef.current = signature;
          isSubmittingRef.current = false;
          setSubmission({
            status: 'success',
            submittedDevice: payload.driveType,
          });
          onSuccessComplete?.();
          return;
        }
        throw new Error(
          result.error ||
            'Could not verify your submission with Google Forms. Please retry or contact +91 63885 07400.',
        );
      }

      // If /api/enquiry is not present (e.g. pure static hosting without Express server),
      // submit directly to Google Forms /formResponse using fetch(no-cors) with all 6 verified entry IDs.
      if (apiResponse.status === 404 || apiResponse.status === 405 || !contentType.includes('application/json')) {
        const mappedFields = mapEnquiryToGoogleFormFields(payload);
        const directBody = new URLSearchParams({
          ...mappedFields,
          fvv: '1',
          pageHistory: '0',
          submit: 'Submit',
        });

        await fetch(SITE_CONFIG.form.googleFormResponseUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          body: directBody.toString(),
        });

        lastSubmittedSignatureRef.current = signature;
        isSubmittingRef.current = false;
        setSubmission({
          status: 'success',
          submittedDevice: payload.driveType,
        });
        onSuccessComplete?.();
        return;
      }

      // Server returned a genuine failure (400 / 429 / 502 / 500) — never show false success
      let errorMessage =
        'Unable to submit your enquiry right now. Please retry or contact us on +91 63885 07400.';
      try {
        const errJson = (await apiResponse.json()) as { error?: string };
        if (errJson.error) errorMessage = errJson.error;
      } catch {
        // Keep default error message
      }
      throw new Error(errorMessage);
    } catch (err) {
      isSubmittingRef.current = false;
      const message =
        err instanceof Error && err.message && err.message !== 'Failed to fetch'
          ? err.message
          : 'Unable to submit your enquiry to Google Forms right now. Please retry or contact +91 63885 07400.';
      setSubmission({
        status: 'error',
        message,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submission.status === 'submitting' || isSubmittingRef.current) return;

    const validationErrors = validateEnquiryForm(values);
    setErrors(validationErrors);
    if (hasValidationErrors(validationErrors)) {
      return;
    }

    void submitToGoogleForms();
  };

  const handleReset = () => {
    lastSubmittedSignatureRef.current = null;
    isSubmittingRef.current = false;
    setValues(createEmptyEnquiryValues(initialDeviceType));
    setErrors({});
    setSubmission({ status: 'idle' });
  };

  const prefilledWhatsAppUrl = buildWhatsAppUrl({
    deviceType: values.driveType || undefined,
    capacity: values.storageCapacity || undefined,
    location: values.address || undefined,
    customerName: values.customerName || undefined,
  });

  if (submission.status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        data-testid="enquiry-thank-you"
        className="rounded-2xl border border-[#00D4FF]/35 bg-[#101827] p-6 sm:p-8 text-center"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#00D4FF]/40 bg-[#00D4FF]/12 text-[#00D4FF]">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h3 className="text-2xl font-bold text-[#F5F7FA]">Thank You for Contacting LOSTBYTE!</h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#A7B2C4]">
          Your data recovery enquiry has been submitted successfully. Our team will contact you to
          discuss the next steps.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href={SITE_CONFIG.contact.phoneHref}
            className="inline-flex items-center gap-2 rounded-lg bg-[#00D4FF] px-5 py-2.5 text-sm font-semibold text-[#07090E] transition-colors hover:bg-[#38E0FF]"
          >
            <Phone className="h-4 w-4" />
            <span>Call Now</span>
          </a>
          <a
            href={buildWhatsAppUrl({ deviceType: submission.submittedDevice })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[#A7B2C4]/25 bg-[#0C1220] px-5 py-2.5 text-sm font-semibold text-[#F5F7FA] transition-colors hover:border-[#00D4FF]/50 hover:text-[#00D4FF]"
          >
            <MessageCircle className="h-4 w-4 text-[#00D4FF]" />
            <span>WhatsApp</span>
          </a>
          <Link
            to="/"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-lg border border-[#A7B2C4]/20 px-5 py-2.5 text-sm font-medium text-[#A7B2C4] transition-colors hover:text-[#F5F7FA]"
          >
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    );
  }

  const inputBaseClass =
    'w-full rounded-xl border bg-[#07090E] px-4 py-3 text-sm text-[#F5F7FA] placeholder-[#A7B2C4]/60 transition-colors focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/30';

  return (
    <div
      className={`rounded-2xl border border-[#A7B2C4]/16 bg-[#101827] ${
        compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'
      }`}
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#F5F7FA] sm:text-2xl">{heading}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#A7B2C4]">{subheading}</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* 1. Full Name -> entry.174290505 */}
          <div>
            <label
              htmlFor={`${formUid}-name`}
              className="mb-1.5 block text-xs font-semibold text-[#F5F7FA]"
            >
              Full Name <span className="text-[#00D4FF]">*</span>
            </label>
            <input
              id={`${formUid}-name`}
              name="customerName"
              type="text"
              autoComplete="name"
              required
              value={values.customerName}
              onChange={(e) => handleFieldChange('customerName', e.target.value)}
              placeholder="Enter your full name"
              aria-invalid={Boolean(errors.customerName)}
              aria-describedby={errors.customerName ? `${formUid}-name-err` : undefined}
              className={`${inputBaseClass} ${
                errors.customerName ? 'border-rose-400/70' : 'border-[#A7B2C4]/22'
              }`}
            />
            {errors.customerName && (
              <p id={`${formUid}-name-err`} className="mt-1.5 text-xs text-rose-300">
                {errors.customerName}
              </p>
            )}
          </div>

          {/* 2. Mobile Number -> entry.358460709 */}
          <div>
            <label
              htmlFor={`${formUid}-phone`}
              className="mb-1.5 block text-xs font-semibold text-[#F5F7FA]"
            >
              Mobile Number <span className="text-[#00D4FF]">*</span>
            </label>
            <input
              id={`${formUid}-phone`}
              name="contactNumber"
              type="tel"
              autoComplete="tel"
              required
              value={values.contactNumber}
              onChange={(e) => handleFieldChange('contactNumber', e.target.value)}
              placeholder="Enter 10-digit mobile number"
              aria-invalid={Boolean(errors.contactNumber)}
              aria-describedby={errors.contactNumber ? `${formUid}-phone-err` : undefined}
              className={`${inputBaseClass} tabular-nums ${
                errors.contactNumber ? 'border-rose-400/70' : 'border-[#A7B2C4]/22'
              }`}
            />
            {errors.contactNumber && (
              <p id={`${formUid}-phone-err`} className="mt-1.5 text-xs text-rose-300">
                {errors.contactNumber}
              </p>
            )}
          </div>
        </div>

        {/* 3. Email Address -> entry.450074997 */}
        <div>
          <label
            htmlFor={`${formUid}-email`}
            className="mb-1.5 block text-xs font-semibold text-[#F5F7FA]"
          >
            Email Address <span className="text-[#00D4FF]">*</span>
          </label>
          <input
            id={`${formUid}-email`}
            name="emailAddress"
            type="email"
            autoComplete="email"
            required
            value={values.emailAddress}
            onChange={(e) => handleFieldChange('emailAddress', e.target.value)}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.emailAddress)}
            aria-describedby={errors.emailAddress ? `${formUid}-email-err` : undefined}
            className={`${inputBaseClass} ${
              errors.emailAddress ? 'border-rose-400/70' : 'border-[#A7B2C4]/22'
            }`}
          />
          {errors.emailAddress && (
            <p id={`${formUid}-email-err`} className="mt-1.5 text-xs text-rose-300">
              {errors.emailAddress}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* 4. Storage Device Type -> entry.1721769737 */}
          <div>
            <label
              htmlFor={`${formUid}-device`}
              className="mb-1.5 block text-xs font-semibold text-[#F5F7FA]"
            >
              Storage Device Type <span className="text-[#00D4FF]">*</span>
            </label>
            <select
              id={`${formUid}-device`}
              name="driveType"
              required
              value={values.driveType}
              onChange={(e) => handleFieldChange('driveType', e.target.value)}
              aria-invalid={Boolean(errors.driveType)}
              aria-describedby={errors.driveType ? `${formUid}-device-err` : undefined}
              className={`${inputBaseClass} ${
                errors.driveType ? 'border-rose-400/70' : 'border-[#A7B2C4]/22'
              }`}
            >
              <option value="">Select storage device</option>
              {DEVICE_TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.driveType && (
              <p id={`${formUid}-device-err`} className="mt-1.5 text-xs text-rose-300">
                {errors.driveType}
              </p>
            )}
          </div>

          {/* 5. Storage Capacity -> entry.870729571 */}
          <div>
            <label
              htmlFor={`${formUid}-capacity`}
              className="mb-1.5 block text-xs font-semibold text-[#F5F7FA]"
            >
              Storage Capacity <span className="text-[#00D4FF]">*</span>
            </label>
            <select
              id={`${formUid}-capacity`}
              name="storageCapacity"
              required
              value={values.storageCapacity}
              onChange={(e) => handleFieldChange('storageCapacity', e.target.value)}
              aria-invalid={Boolean(errors.storageCapacity)}
              aria-describedby={errors.storageCapacity ? `${formUid}-capacity-err` : undefined}
              className={`${inputBaseClass} tabular-nums ${
                errors.storageCapacity ? 'border-rose-400/70' : 'border-[#A7B2C4]/22'
              }`}
            >
              <option value="">Select capacity</option>
              {STORAGE_CAPACITY_OPTIONS.map((cap) => (
                <option key={cap} value={cap}>
                  {cap}
                </option>
              ))}
            </select>
            {errors.storageCapacity && (
              <p id={`${formUid}-capacity-err`} className="mt-1.5 text-xs text-rose-300">
                {errors.storageCapacity}
              </p>
            )}
          </div>
        </div>

        {/* 6. Pickup / Contact Address -> entry.1685007087 */}
        <div>
          <label
            htmlFor={`${formUid}-address`}
            className="mb-1.5 block text-xs font-semibold text-[#F5F7FA]"
          >
            Pickup / Contact Address <span className="text-[#00D4FF]">*</span>
          </label>
          <textarea
            id={`${formUid}-address`}
            name="address"
            rows={3}
            required
            value={values.address}
            onChange={(e) => handleFieldChange('address', e.target.value)}
            placeholder="Area, city, PIN code (for Delhi NCR pickup or all-India courier guidance)"
            aria-invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? `${formUid}-address-err` : undefined}
            className={`${inputBaseClass} resize-y ${
              errors.address ? 'border-rose-400/70' : 'border-[#A7B2C4]/22'
            }`}
          />
          {errors.address && (
            <p id={`${formUid}-address-err`} className="mt-1.5 text-xs text-rose-300">
              {errors.address}
            </p>
          )}
        </div>

        {submission.status === 'error' && (
          <div
            role="alert"
            data-testid="enquiry-error-banner"
            className="rounded-xl border border-amber-400/35 bg-[#0C1220] p-4 text-xs leading-relaxed text-[#F5F7FA]"
          >
            <div className="flex items-start gap-2.5">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <div className="space-y-2.5">
                <p className="font-medium text-amber-200">{submission.message}</p>
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <button
                    type="button"
                    onClick={() => void submitToGoogleForms()}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#A7B2C4]/25 bg-[#101827] px-3 py-1.5 font-semibold text-[#F5F7FA] hover:border-[#00D4FF]/50"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Retry Submission</span>
                  </button>
                  <a
                    href={prefilledWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#00D4FF] px-3 py-1.5 font-semibold text-[#07090E] hover:bg-[#38E0FF]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Send via WhatsApp</span>
                  </a>
                  <a
                    href={SITE_CONFIG.contact.phoneHref}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#A7B2C4]/25 px-3 py-1.5 font-semibold text-[#F5F7FA] hover:text-[#00D4FF]"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#00D4FF]" />
                    <span>Call {SITE_CONFIG.contact.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-1">
          <button
            type="submit"
            disabled={submission.status === 'submitting'}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00D4FF] px-6 py-3.5 text-sm font-semibold text-[#07090E] transition-colors hover:bg-[#38E0FF] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submission.status === 'submitting' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Submitting Enquiry...</span>
              </>
            ) : (
              <span>Submit Data Recovery Request</span>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-[#A7B2C4]">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#00D4FF]" />
            <span>Free initial diagnosis · Confidential handling · NDA available</span>
          </span>
          <span>No advance recovery payment</span>
        </div>
      </form>
    </div>
  );
};
