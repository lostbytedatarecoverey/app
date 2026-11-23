export interface LegalSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalDocument {
  slug: string;
  path: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  effectiveLabel: string;
  intro: string;
  sections: LegalSection[];
}

export const LEGAL_DOCUMENTS: Record<string, LegalDocument> = {
  'privacy-policy': {
    slug: 'privacy-policy',
    path: '/privacy-policy',
    title: 'Privacy Policy',
    seoTitle: 'Privacy Policy | LOSTBYTE Data Recovery',
    seoDescription:
      'Learn how LOSTBYTE collects, uses, protects, and retains customer enquiry details for data recovery assessment and pickup coordination.',
    effectiveLabel: 'Policy Document · LOSTBYTE',
    intro:
      'LOSTBYTE respects customer privacy and handles personal enquiry details with strict care. This Privacy Policy explains what information is collected when you contact us or submit a data recovery enquiry on lostbyte.in, how that information is used, and how it is protected.',
    sections: [
      {
        heading: '1. Enquiry Data Collection',
        paragraphs: [
          'When you submit a data recovery enquiry through our website form, phone line, WhatsApp, or email, we collect only the details required to evaluate your storage issue and coordinate service:',
        ],
        bullets: [
          'Full Name',
          'Mobile / Contact Number',
          'Email Address',
          'Storage Device Type and Storage Capacity',
          'Pickup or Contact Address (for Delhi NCR coordination or all-India courier instructions)',
        ],
      },
      {
        heading: '2. Purpose of Collecting Contact Details',
        paragraphs: [
          'Your contact and device details are used exclusively to respond to your enquiry, discuss probable failure symptoms, explain free initial diagnosis options, communicate case-dependent pickup or courier logistics, provide recovery estimates, and update you on case progress.',
          'We do not sell, rent, or distribute customer contact information to marketing brokers or unrelated third parties.',
        ],
      },
      {
        heading: '3. Enquiry Follow-Up & Pickup Coordination',
        paragraphs: [
          'Enquiry submissions from lostbyte.in are recorded in our designated lead collection system so our recovery team can follow up promptly during business hours (10:00 AM to 9:00 PM IST).',
          'If you approve pickup or courier delivery, your contact number and address are used solely to coordinate secure device collection and return delivery.',
        ],
      },
      {
        heading: '4. Confidentiality of Customer Records',
        paragraphs: [
          'Access to customer enquiry information and device records is restricted to authorized personnel involved in case coordination and technical assessment. For customers requiring formal confidentiality terms, a Non-Disclosure Agreement (NDA) is available on request.',
        ],
      },
      {
        heading: '5. Data Retention and Deletion Requests',
        paragraphs: [
          'We retain enquiry records only as long as reasonably required for service communication, active case coordination, and basic business record-keeping. You may request correction or deletion of your enquiry details at any time by emailing supportlostbyte@gmail.com or calling +91 63885 07400.',
        ],
      },
    ],
  },

  'terms-and-conditions': {
    slug: 'terms-and-conditions',
    path: '/terms-and-conditions',
    title: 'Terms & Conditions',
    seoTitle: 'Terms and Conditions | LOSTBYTE Data Recovery',
    seoDescription:
      'Read the LOSTBYTE Terms and Conditions covering free device assessment, technical feasibility, customer approval, charges, logistics, and recovery limitations.',
    effectiveLabel: 'Service Agreement · LOSTBYTE',
    intro:
      'These Terms and Conditions govern data recovery enquiries, initial assessments, pickup and courier coordination, and recovery services provided by LOSTBYTE. By submitting a device for evaluation or authorizing recovery work, you acknowledge and agree to the terms below.',
    sections: [
      {
        heading: '1. Scope of Services',
        paragraphs: [
          'LOSTBYTE operates exclusively as a professional data recovery service for supported storage media, including internal and external HDDs, SATA and NVMe SSDs, USB drives, memory cards, RAID arrays, NAS enclosures, servers, and CCTV/DVR/NVR drives. LOSTBYTE does not offer general computer repair, laptop repair, software installation, networking, AMC, or mobile phone data recovery.',
        ],
      },
      {
        heading: '2. Device Assessment & Technical Feasibility',
        paragraphs: [
          'All service availability and recovery outcomes are subject to technical assessment and feasibility. Initial diagnosis is provided free of charge to evaluate the failure condition and determine whether recovery is technically viable.',
          'Because failed storage media may already suffer from degraded platters, unstable read/write heads, worn NAND memory, or corrupted firmware, diagnostic evaluation is performed with care, though severely damaged hardware carries inherent technical risk.',
        ],
      },
      {
        heading: '3. Mandatory Customer Approval',
        paragraphs: [
          'No chargeable recovery procedure begins without explicit customer approval. Following diagnosis, LOSTBYTE communicates the assessment findings, recovery approach (including whether specialist hardware support in Bengaluru is recommended for complex mechanical faults), and estimated charges.',
          'Outstation specialist coordination is never initiated without prior customer consent.',
        ],
      },
      {
        heading: '4. Recovery Charges & Logistics Expenses',
        paragraphs: [
          'Recovery service fees apply only when the agreed recovery objective is achieved under our No Data, No Recovery Fee policy. Under normal business policy, no advance recovery fee is collected.',
          'Pickup charges within Delhi NCR and courier or shipping costs for all-India dispatch or approved outstation specialist coordination are case-dependent, communicated beforehand, and billed separately from recovery fees once approved by the customer.',
        ],
      },
      {
        heading: '5. Limitations of Data Recovery',
        paragraphs: [
          'LOSTBYTE does not guarantee recovery for any storage device, failure scenario, or specific file set. Recovery feasibility depends on device condition, physical platter or chip damage, overwritten data, TRIM execution, encryption keys, and prior handling attempts.',
          'No fixed turnaround timeframe is guaranteed prior to diagnostic inspection. Customers must also confirm that they are the rightful owner or authorized representative for all submitted storage media.',
        ],
      },
    ],
  },

  'service-policy': {
    slug: 'service-policy',
    path: '/service-policy',
    title: 'Service Policy',
    seoTitle: 'Service Policy — Free Diagnosis & No Data, No Fee | LOSTBYTE',
    seoDescription:
      'Transparent overview of LOSTBYTE service policies: Free Initial Diagnosis, No Data No Recovery Fee, No Advance Recovery Payment, and Customer Approval First.',
    effectiveLabel: 'Transparent Policies · LOSTBYTE',
    intro:
      'LOSTBYTE is built around clear, transparent customer commitments. Every storage case is evaluated individually so you understand technical feasibility and costs before authorizing work.',
    sections: [
      {
        heading: '1. Free Initial Diagnosis',
        paragraphs: [
          'Every eligible storage device submitted to LOSTBYTE receives a free initial diagnosis. During assessment, we evaluate logical, firmware, electronic, or mechanical symptoms to determine whether recovery is technically feasible.',
        ],
      },
      {
        heading: '2. No Data, No Recovery Fee',
        paragraphs: [
          'If LOSTBYTE cannot achieve the agreed recovery objective for your device, no recovery service fee is charged.',
          'Important disclosure: Separately disclosed and customer-approved pickup charges, courier shipping costs, return media costs (such as a target transfer drive supplied by or purchased for the customer), or approved third-party logistics expenses may still apply.',
        ],
      },
      {
        heading: '3. No Advance Recovery Payment',
        paragraphs: [
          'Under our normal stated business policy, customers are not asked to pay an advance recovery service fee before recovery results are achieved. Any applicable logistics or pickup expense is communicated and approved separately prior to dispatch.',
        ],
      },
      {
        heading: '4. Customer Approval Before Every Step',
        paragraphs: [
          'We never begin a paid recovery procedure, open hardware for specialist work, or dispatch an eligible complex hardware drive for specialist support in Bengaluru without explaining the scope, estimated fee, and obtaining your clear approval first.',
        ],
      },
      {
        heading: '5. Pickup & Courier Transparency',
        paragraphs: [
          'Delhi NCR pickup and delivery coordination and all-India courier acceptance are available for eligible devices. Pickup charges depend on location and case requirements and are always disclosed and approved before scheduling collection. We do not advertise blanket free pickup across all locations.',
        ],
      },
    ],
  },

  'data-handling-policy': {
    slug: 'data-handling-policy',
    path: '/data-handling-policy',
    title: 'Data Handling Policy',
    seoTitle: 'Data Handling & Confidentiality Policy | LOSTBYTE',
    seoDescription:
      'How LOSTBYTE ensures confidential device handling, restricted technical access, NDA availability, and secure recovered data delivery.',
    effectiveLabel: 'Confidentiality Standards · LOSTBYTE',
    intro:
      'Storage devices frequently contain sensitive personal archives, financial documents, business databases, creative projects, and surveillance records. LOSTBYTE follows disciplined operational practices to safeguard customer devices and recovered files.',
    sections: [
      {
        heading: '1. Confidential Device Handling',
        paragraphs: [
          'Each storage device received through Delhi NCR pickup coordination or all-India courier is logged under a dedicated case reference, stored safely in anti-static protection, and handled exclusively for diagnostic assessment and authorized recovery procedures.',
        ],
      },
      {
        heading: '2. Restricted Access to Customer Data',
        paragraphs: [
          'Customer file structures and recovered data are accessed strictly on a need-to-know basis by technical personnel performing imaging, file system reconstruction, and verification of recovery completeness. Customer data is never shared, copied for unauthorized use, or exposed publicly.',
        ],
      },
      {
        heading: '3. Non-Disclosure Agreement (NDA) Availability',
        paragraphs: [
          'Customers who require formal written confidentiality commitments—including corporate IT departments, accounting firms, legal practitioners, studios, and individuals—may request an NDA prior to submitting their storage media.',
        ],
      },
      {
        heading: '4. Specialist Hardware Coordination Protocol',
        paragraphs: [
          'For eligible advanced hardware failures requiring specialist mechanical or head-level procedures in Bengaluru, customer approval is obtained prior to any outstation dispatch. Devices are securely packed and tracked throughout coordination.',
        ],
      },
      {
        heading: '5. Secure Delivery & Temporary Working Copies',
        paragraphs: [
          'Recovered data is delivered via an agreed secure method, typically onto a customer-provided or approved replacement storage drive. Once the customer confirms successful receipt and verification of recovered files, temporary working copies created during recovery are responsibly removed according to case closure procedures.',
        ],
      },
    ],
  },
};
