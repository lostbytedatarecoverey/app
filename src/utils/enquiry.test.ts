import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGoogleFormPrefilledReferenceUrl,
  buildWhatsAppUrl,
  createEmptyEnquiryValues,
  createSubmissionSignature,
  hasValidationErrors,
  mapEnquiryToGoogleFormFields,
  resolveContextualDeviceType,
  validateEnquiryForm,
} from './enquiry';
import {
  GOOGLE_FORM_ID,
  PRODUCTION_CANONICAL_URL,
  SITE_CONFIG,
  resolveCanonicalDomain,
  resolveSiteBaseUrl,
} from '../config/siteConfig';
import { SERVICES, HOMEPAGE_SERVICES } from '../data/services';
import { LOCATION_PAGES } from '../data/locations';
import { LEGAL_DOCUMENTS } from '../data/legal';
import { ALL_FAQS } from '../data/faqs';

test('Google Form ID, /formResponse endpoint, and all 6 entry IDs match the supplied prefilled URL', () => {
  const referencePrefilledUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSerYlDcnBEO5i7QliyoGXvj4UyxiTualsSAzhxmM7aret4sQA/viewform?usp=pp_url&entry.174290505=Prince&entry.358460709=6388507400&entry.450074997=abc@gmail.com&entry.1721769737=HDD&entry.870729571=1TB&entry.1685007087=Burari';

  const parsed = new URL(referencePrefilledUrl);
  assert.ok(parsed.pathname.includes(GOOGLE_FORM_ID));
  assert.equal(
    SITE_CONFIG.form.googleFormResponseUrl,
    `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`,
  );

  // Verify every entry ID exists in the supplied prefilled URL and matches siteConfig
  assert.equal(parsed.searchParams.get(SITE_CONFIG.form.entryIds.customerName), 'Prince');
  assert.equal(parsed.searchParams.get(SITE_CONFIG.form.entryIds.contactNumber), '6388507400');
  assert.equal(parsed.searchParams.get(SITE_CONFIG.form.entryIds.emailAddress), 'abc@gmail.com');
  assert.equal(parsed.searchParams.get(SITE_CONFIG.form.entryIds.driveType), 'HDD');
  assert.equal(parsed.searchParams.get(SITE_CONFIG.form.entryIds.storageCapacity), '1TB');
  assert.equal(parsed.searchParams.get(SITE_CONFIG.form.entryIds.address), 'Burari');

  // Verify dynamic parameter builder preserves exact structure for customer-entered values
  const dynamicUrl = buildGoogleFormPrefilledReferenceUrl({
    customerName: 'Aarav Mehta',
    contactNumber: '9811223344',
    emailAddress: 'aarav@example.com',
    driveType: 'RAID',
    storageCapacity: '4 TB',
    address: 'Sector 18, Noida',
  });
  const dynParsed = new URL(dynamicUrl);
  assert.equal(dynParsed.searchParams.get('usp'), 'pp_url');
  assert.equal(dynParsed.searchParams.get('entry.174290505'), 'Aarav Mehta');
  assert.equal(dynParsed.searchParams.get('entry.358460709'), '9811223344');
  assert.equal(dynParsed.searchParams.get('entry.450074997'), 'aarav@example.com');
  assert.equal(dynParsed.searchParams.get('entry.1721769737'), 'RAID');
  assert.equal(dynParsed.searchParams.get('entry.870729571'), '4 TB');
  assert.equal(dynParsed.searchParams.get('entry.1685007087'), 'Sector 18, Noida');
});

test('Environment config works with zero env vars and uses https://lostbyte.in as canonical domain', () => {
  assert.equal(resolveCanonicalDomain(), PRODUCTION_CANONICAL_URL);
  assert.equal(resolveSiteBaseUrl(), PRODUCTION_CANONICAL_URL);
});

test('validateEnquiryForm rejects empty form with errors on all 6 fields', () => {
  const empty = createEmptyEnquiryValues();
  const errors = validateEnquiryForm(empty);
  assert.equal(hasValidationErrors(errors), true);
  assert.ok(errors.customerName);
  assert.ok(errors.contactNumber);
  assert.ok(errors.emailAddress);
  assert.ok(errors.driveType);
  assert.ok(errors.storageCapacity);
  assert.ok(errors.address);
});

test('validateEnquiryForm validates email and phone digits accurately', () => {
  const invalid = {
    customerName: 'A',
    contactNumber: '12345',
    emailAddress: 'not-an-email',
    driveType: 'RAID',
    storageCapacity: '4 TB',
    address: 'ab',
  };
  const errors = validateEnquiryForm(invalid);
  assert.ok(errors.customerName);
  assert.ok(errors.contactNumber);
  assert.ok(errors.emailAddress);
  assert.equal(errors.driveType, undefined);
  assert.equal(errors.storageCapacity, undefined);
  assert.ok(errors.address);

  const valid = {
    customerName: 'Rohan Sharma',
    contactNumber: '+91 98765 43210',
    emailAddress: 'rohan@example.com',
    driveType: 'NVMe SSD',
    storageCapacity: '1 TB',
    address: 'Sector 62, Noida, UP',
  };
  assert.equal(hasValidationErrors(validateEnquiryForm(valid)), false);
});

test('mapEnquiryToGoogleFormFields maps dynamically and never uses sample values', () => {
  const empty = createEmptyEnquiryValues('RAID');
  assert.equal(empty.driveType, 'RAID');
  assert.equal(empty.customerName, '');
  assert.equal(empty.contactNumber, '');
  assert.equal(empty.emailAddress, '');
  assert.equal(empty.address, '');

  const values = {
    customerName: 'Neha Verma',
    contactNumber: '9876543210',
    emailAddress: 'neha@example.com',
    driveType: 'External HDD',
    storageCapacity: '2 TB',
    address: 'Rohini, Delhi',
  };
  const mapped = mapEnquiryToGoogleFormFields(values);
  assert.equal(mapped['entry.174290505'], 'Neha Verma');
  assert.equal(mapped['entry.358460709'], '9876543210');
  assert.equal(mapped['entry.450074997'], 'neha@example.com');
  assert.equal(mapped['entry.1721769737'], 'External HDD');
  assert.equal(mapped['entry.870729571'], '2 TB');
  assert.equal(mapped['entry.1685007087'], 'Rohini, Delhi');

  // Duplicate submission signature is deterministic
  assert.equal(
    createSubmissionSignature(values),
    createSubmissionSignature({ ...values, customerName: '  neha verma ' }),
  );
});

test('resolveContextualDeviceType maps service slugs accurately', () => {
  assert.equal(resolveContextualDeviceType('raid-data-recovery'), 'RAID');
  assert.equal(resolveContextualDeviceType('nvme-ssd-recovery'), 'NVMe SSD');
  assert.equal(resolveContextualDeviceType('ssd-data-recovery'), 'SATA SSD');
  assert.equal(resolveContextualDeviceType('external-hdd-recovery'), 'External HDD');
  assert.equal(resolveContextualDeviceType('hdd-data-recovery'), 'Internal HDD');
  assert.equal(resolveContextualDeviceType('nas-data-recovery'), 'NAS');
  assert.equal(resolveContextualDeviceType('cctv-dvr-nvr-recovery'), 'CCTV / DVR / NVR');
});

test('buildWhatsAppUrl constructs prefilled WhatsApp link with correct phone number', () => {
  const url = buildWhatsAppUrl({ deviceType: 'RAID', capacity: '4 TB' });
  assert.ok(url.startsWith(`${SITE_CONFIG.contact.whatsappBaseUrl}?text=`));
  assert.ok(decodeURIComponent(url).includes('My device type is RAID.'));
  assert.ok(decodeURIComponent(url).includes('Storage capacity: 4 TB.'));
});

test('All 17 service pages, 14 homepage cards, 3 locations, 4 legal docs, and 22 FAQs have unique SEO metadata', () => {
  assert.equal(SERVICES.length, 17);
  assert.equal(HOMEPAGE_SERVICES.length, 14);
  assert.equal(Object.keys(LOCATION_PAGES).length, 3);
  assert.equal(Object.keys(LEGAL_DOCUMENTS).length, 4);
  assert.equal(ALL_FAQS.length, 22);

  const allTitles = [
    ...SERVICES.map((s) => s.seoTitle),
    ...Object.values(LOCATION_PAGES).map((l) => l.seoTitle),
    ...Object.values(LEGAL_DOCUMENTS).map((d) => d.seoTitle),
  ];
  assert.equal(new Set(allTitles).size, allTitles.length, 'Every page must have a unique SEO title');

  const allDescriptions = [
    ...SERVICES.map((s) => s.seoDescription),
    ...Object.values(LOCATION_PAGES).map((l) => l.seoDescription),
    ...Object.values(LEGAL_DOCUMENTS).map((d) => d.seoDescription),
  ];
  assert.equal(
    new Set(allDescriptions).size,
    allDescriptions.length,
    'Every page must have a unique SEO meta description',
  );

  const mobileFaq = ALL_FAQS.find((f) => f.id === 'mobile-phone-recovery');
  assert.ok(mobileFaq);
  assert.equal(
    mobileFaq?.answer,
    'LOSTBYTE currently specializes in storage media, HDD, SSD, RAID, NAS, server and surveillance storage recovery. Mobile phone data recovery is not offered.',
  );
});
