import {
  DEVICE_TYPE_OPTIONS,
  SITE_CONFIG,
  STORAGE_CAPACITY_OPTIONS,
  type DeviceTypeOption,
} from '../config/siteConfig';

export interface EnquiryFormValues {
  customerName: string;
  contactNumber: string;
  emailAddress: string;
  driveType: string;
  storageCapacity: string;
  address: string;
}

export type EnquiryFormErrors = Partial<Record<keyof EnquiryFormValues, string>>;

/**
 * Returns clean empty customer fields (never prefilled with sample personal data).
 * Only sets driveType when contextually navigated from a service CTA.
 */
export function createEmptyEnquiryValues(contextualDeviceType?: DeviceTypeOption | ''): EnquiryFormValues {
  return {
    customerName: '',
    contactNumber: '',
    emailAddress: '',
    driveType: contextualDeviceType || '',
    storageCapacity: '',
    address: '',
  };
}

/**
 * Validates all 6 enquiry form fields corresponding directly to the 6 Google Form entry IDs.
 */
export function validateEnquiryForm(values: EnquiryFormValues): EnquiryFormErrors {
  const errors: EnquiryFormErrors = {};

  const name = values.customerName.trim();
  if (!name) {
    errors.customerName = 'Please enter your full name.';
  } else if (name.length < 2) {
    errors.customerName = 'Full name must be at least 2 characters.';
  }

  const rawPhone = values.contactNumber.trim();
  const digits = rawPhone.replace(/\D/g, '');
  if (!rawPhone) {
    errors.contactNumber = 'Please enter your mobile number.';
  } else if (digits.length < 10 || digits.length > 15) {
    errors.contactNumber = 'Enter a valid 10 to 15 digit contact number.';
  }

  const email = values.emailAddress.trim();
  if (!email) {
    errors.emailAddress = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.emailAddress = 'Enter a valid email address.';
  }

  if (!values.driveType.trim()) {
    errors.driveType = 'Please select your storage device type.';
  }

  if (!values.storageCapacity.trim()) {
    errors.storageCapacity = 'Please select your storage capacity.';
  }

  const address = values.address.trim();
  if (!address) {
    errors.address = 'Please enter your pickup or contact address (city / area).';
  } else if (address.length < 3) {
    errors.address = 'Please provide your area or city for coordination.';
  }

  return errors;
}

export function hasValidationErrors(errors: EnquiryFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * Generates a unique submission key for client-side duplicate-submission protection.
 */
export function createSubmissionSignature(values: EnquiryFormValues): string {
  return [
    values.customerName.trim().toLowerCase(),
    values.contactNumber.replace(/\D/g, ''),
    values.emailAddress.trim().toLowerCase(),
    values.driveType.trim().toLowerCase(),
    values.storageCapacity.trim().toLowerCase(),
    values.address.trim().toLowerCase(),
  ].join('|');
}

/**
 * Maps actual customer-entered values strictly to the 6 verified Google Form entry IDs:
 *   entry.174290505  -> Customer Name
 *   entry.358460709  -> Contact Number
 *   entry.450074997  -> Email Address
 *   entry.1721769737 -> Drive Type
 *   entry.870729571  -> Storage Capacity
 *   entry.1685007087 -> Address
 */
export function mapEnquiryToGoogleFormFields(values: EnquiryFormValues): Record<string, string> {
  const { entryIds } = SITE_CONFIG.form;
  return {
    [entryIds.customerName]: values.customerName.trim(),
    [entryIds.contactNumber]: values.contactNumber.trim(),
    [entryIds.emailAddress]: values.emailAddress.trim(),
    [entryIds.driveType]: values.driveType.trim(),
    [entryIds.storageCapacity]: values.storageCapacity.trim(),
    [entryIds.address]: values.address.trim(),
  };
}

/**
 * Reference/testing utility matching the supplied Google Forms prefilled URL structure.
 * Never used to redirect customers away from lostbyte.in.
 */
export function buildGoogleFormPrefilledReferenceUrl(values: EnquiryFormValues): string {
  const params = new URLSearchParams({ usp: 'pp_url' });
  const mapped = mapEnquiryToGoogleFormFields(values);
  Object.entries(mapped).forEach(([key, val]) => {
    params.set(key, val);
  });
  return `${SITE_CONFIG.form.googleFormViewUrl}?${params.toString()}`;
}

/**
 * Resolves a service slug or hint into one of the exact Storage Device Type dropdown options.
 * Never prefills any customer personal details.
 */
export function resolveContextualDeviceType(hint?: string | null): DeviceTypeOption | '' {
  if (!hint) return '';
  const normalized = hint.trim().toLowerCase();

  const exact = DEVICE_TYPE_OPTIONS.find((opt) => opt.toLowerCase() === normalized);
  if (exact) return exact;

  if (normalized.includes('external-hdd') || normalized.includes('external hdd')) return 'External HDD';
  if (normalized.includes('internal-hdd') || normalized.includes('internal hdd')) return 'Internal HDD';
  if (
    normalized.includes('hdd') ||
    normalized.includes('hard-drive') ||
    normalized.includes('physical-hard-drive') ||
    normalized.includes('firmware')
  ) {
    return 'Internal HDD';
  }
  if (normalized.includes('nvme')) return 'NVMe SSD';
  if (normalized.includes('sata-ssd') || normalized.includes('sata ssd') || normalized.includes('ssd')) {
    return 'SATA SSD';
  }
  if (normalized.includes('usb') || normalized.includes('pen-drive') || normalized.includes('pen drive')) {
    return 'USB / Pen Drive';
  }
  if (normalized.includes('memory-card') || normalized.includes('memory card') || normalized.includes('sd')) {
    return 'Memory Card';
  }
  if (normalized.includes('raid')) return 'RAID';
  if (normalized.includes('nas')) return 'NAS';
  if (normalized.includes('server')) return 'Server Storage';
  if (normalized.includes('cctv') || normalized.includes('dvr') || normalized.includes('nvr')) {
    return 'CCTV / DVR / NVR';
  }
  return '';
}

/**
 * Builds a prefilled WhatsApp enquiry URL without simulating message sending.
 */
export function buildWhatsAppUrl(params?: {
  deviceType?: string;
  capacity?: string;
  location?: string;
  customerName?: string;
}): string {
  const deviceLabel = params?.deviceType?.trim() || 'Storage Device';
  const parts = [
    `Hello LOSTBYTE, I need professional data recovery assistance. My device type is ${deviceLabel}.`,
  ];
  if (params?.capacity?.trim()) {
    parts.push(`Storage capacity: ${params.capacity.trim()}.`);
  }
  if (params?.location?.trim()) {
    parts.push(`Location: ${params.location.trim()}.`);
  }
  if (params?.customerName?.trim()) {
    parts.push(`Name: ${params.customerName.trim()}.`);
  }
  parts.push('Please contact me regarding the recovery process.');
  const message = parts.join(' ');
  return `${SITE_CONFIG.contact.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export function isSupportedCapacity(capacity: string): boolean {
  return (STORAGE_CAPACITY_OPTIONS as readonly string[]).includes(capacity);
}
