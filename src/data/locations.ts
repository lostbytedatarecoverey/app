export interface LocationPageData {
  slug: string;
  path: string;
  regionName: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  eyebrow: string;
  heroSummary: string;
  logisticsHeading: string;
  logisticsParagraphs: string[];
  areasCovered: string[];
  whyLocalBullets: string[];
  pickupProcessNote: string;
  faqs: Array<{ question: string; answer: string }>;
}

export const LOCATION_PAGES: Record<string, LocationPageData> = {
  'data-recovery-delhi': {
    slug: 'data-recovery-delhi',
    path: '/data-recovery-delhi',
    regionName: 'Delhi',
    seoTitle: 'Data Recovery Services in Delhi — HDD, SSD, RAID & NAS | LOSTBYTE',
    seoDescription:
      'Professional data recovery in Delhi by LOSTBYTE. Specialized HDD, SSD, NVMe, RAID, NAS, server, USB, and CCTV recovery with free initial diagnosis and Delhi pickup coordination.',
    h1: 'Professional Data Recovery Services in Delhi',
    eyebrow: 'Delhi Data Recovery · Pickup & Delivery Coordination',
    heroSummary:
      'LOSTBYTE provides dedicated data recovery services across Delhi for individuals, studios, offices, and enterprises facing failed hard drives, undetected SSDs, RAID array failures, NAS volume errors, and corrupted storage media.',
    logisticsHeading: 'Coordinated Pickup & Delivery Across Delhi',
    logisticsParagraphs: [
      'Operating from around Burari, Delhi, LOSTBYTE coordinates safe device pickup and return delivery across North Delhi, Central Delhi, West Delhi, South Delhi, and East Delhi without requiring you to travel with fragile damaged drives.',
      'Before scheduling any collection, our team speaks with you to review the storage issue, discuss pickup feasibility, and confirm any applicable case-dependent pickup charges for your approval.',
    ],
    areasCovered: [
      'North Delhi (Burari, Model Town, Civil Lines, Rohini, Pitampura, GTB Nagar)',
      'Central & New Delhi (Connaught Place, Karol Bagh, Patel Nagar, ITO)',
      'South Delhi (Nehru Place, Saket, Hauz Khas, Okhla, Lajpat Nagar, Greater Kailash)',
      'West Delhi (Janakpuri, Rajouri Garden, Dwarka, Punjabi Bagh, Paschim Vihar)',
      'East Delhi (Preet Vihar, Laxmi Nagar, Mayur Vihar, Shahdara)',
    ],
    whyLocalBullets: [
      'Free initial diagnosis to assess technical feasibility before you commit to recovery.',
      'No Data, No Recovery Fee policy with no advance recovery payment required.',
      'Five years of practical experience handling HDD, SSD, NVMe, RAID, NAS, Server, USB, Memory Card, and CCTV storage.',
      'Specialist Bengaluru hardware recovery coordination available for eligible complex mechanical failures after explicit customer approval.',
    ],
    pickupProcessNote:
      'Our operations are based around Burari, Delhi, with pickup and courier coordination available for eligible locations. Burari Chowk is referenced as a geographical landmark only and is not a walk-in shop or drop-off counter.',
    faqs: [
      {
        question: 'How do I submit my damaged hard drive or SSD in Delhi?',
        answer:
          'Submit an enquiry on lostbyte.in, call +91 63885 07400, or message us on WhatsApp. We discuss your device condition, confirm pickup feasibility and any applicable pickup charges upfront, and coordinate collection upon your approval.',
      },
      {
        question: 'Are pickup charges in Delhi free?',
        answer:
          'Pickup charges are case- and location-dependent. We always communicate applicable pickup charges clearly and obtain your approval before arranging device collection.',
      },
      {
        question: 'Do you repair laptops or recover mobile phones in Delhi?',
        answer:
          'No. LOSTBYTE is exclusively a data recovery service for storage media (HDD, SSD, RAID, NAS, servers, USB drives, memory cards, and CCTV drives). We do not offer general computer/laptop repair or mobile phone data recovery.',
      },
    ],
  },

  'data-recovery-delhi-ncr': {
    slug: 'data-recovery-delhi-ncr',
    path: '/data-recovery-delhi-ncr',
    regionName: 'Delhi NCR',
    seoTitle: 'Data Recovery in Delhi NCR — Noida, Gurugram, Ghaziabad & Faridabad | LOSTBYTE',
    seoDescription:
      'Trusted data recovery services across Delhi NCR including Delhi, Noida, Gurugram, Ghaziabad, and Faridabad. Free initial diagnosis, No Data No Fee, and coordinated pickup.',
    h1: 'Data Recovery Services Across Delhi NCR',
    eyebrow: 'Delhi NCR Coverage · Noida · Gurugram · Ghaziabad · Faridabad',
    heroSummary:
      'From corporate RAID and NAS storage in Gurugram and Noida to external drives, NVMe SSDs, and surveillance storage across Ghaziabad, Faridabad, and Delhi, LOSTBYTE delivers structured data recovery with transparent upfront assessment.',
    logisticsHeading: 'Regional Delhi NCR Pickup & Secure Return',
    logisticsParagraphs: [
      'Businesses and home users throughout the National Capital Region rely on LOSTBYTE for disciplined handling of failed storage media. Instead of risking further drive degradation during improper transport, we coordinate planned pickup and return logistics.',
      'Every case starts with a conversation and a free initial diagnosis. Applicable pickup charges for Noida, Greater Noida, Gurugram, Ghaziabad, or Faridabad are disclosed and approved before dispatch.',
    ],
    areasCovered: [
      'Delhi (All zones coordinated from our Burari, Delhi base)',
      'Noida & Greater Noida (Sector 16, Sector 62, Sector 63, Film City, Expressway corridors)',
      'Gurugram (Cyber City, Udyog Vihar, Golf Course Road, Sohna Road, Manesar)',
      'Ghaziabad (Indirapuram, Vaishali, Kaushambi, Raj Nagar)',
      'Faridabad (NIT, Sector 15–21, Mathura Road industrial & commercial zones)',
    ],
    whyLocalBullets: [
      'Dedicated handling for enterprise RAID arrays, multi-bay NAS enclosures, and server storage volumes.',
      'Confidential device handling with Non-Disclosure Agreement (NDA) available on request for NCR organizations.',
      'Transparent assessment report and cost estimate before any recovery work begins.',
      'Seamless all-India courier support for branch offices outside Delhi NCR.',
    ],
    pickupProcessNote:
      'Pickup availability and charges across Delhi NCR depend on location and device volume (for example, single drive vs. multi-drive RAID/NAS enclosure) and are confirmed prior to scheduling.',
    faqs: [
      {
        question: 'Can you coordinate pickup for multi-bay NAS or RAID drives from Gurugram or Noida?',
        answer:
          'Yes. Contact us with your drive count and location. We advise on safe drive labeling and shock-protected packaging, disclose applicable pickup charges upfront, and coordinate collection once approved.',
      },
      {
        question: 'Can my company sign an NDA before handing over server or business drives?',
        answer:
          'Yes. LOSTBYTE provides confidential handling as standard and offers a formal Non-Disclosure Agreement (NDA) on request before device handover.',
      },
      {
        question: 'What if my NCR hard drive requires advanced cleanroom-level mechanical head work?',
        answer:
          'After initial diagnosis, if your drive requires complex mechanical or head-related hardware intervention, LOSTBYTE explains the findings and estimate and can coordinate specialist hardware recovery support in Bengaluru upon your explicit approval.',
      },
    ],
  },

  'data-recovery-burari': {
    slug: 'data-recovery-burari',
    path: '/data-recovery-burari',
    regionName: 'Burari, Delhi',
    seoTitle: 'Data Recovery in Burari, Delhi — HDD, SSD & Storage Recovery | LOSTBYTE',
    seoDescription:
      'Professional data recovery based around Burari, Delhi. Recover lost data from internal/external HDDs, SSDs, USB drives, memory cards, RAID, NAS, and CCTV drives with free initial diagnosis.',
    h1: 'Professional Data Recovery Around Burari, Delhi',
    eyebrow: 'Primary Operating Area · Burari, Delhi',
    heroSummary:
      'LOSTBYTE operates around Burari, Delhi (near the Burari Chowk geographical landmark), providing specialized storage media recovery for residents, professionals, and businesses across Burari, North Delhi, and the wider Delhi NCR region.',
    logisticsHeading: 'Serving Burari & Surrounding North Delhi Neighbourhoods',
    logisticsParagraphs: [
      'Our operations are based around Burari, Delhi, with pickup and courier coordination available for eligible locations. Please note that Burari Chowk is provided solely as a geographical landmark reference—we coordinate device collection and return by appointment rather than operating a public walk-in shop.',
      'Whether your external hard drive stopped being detected, your laptop NVMe SSD turned RAW, or your CCTV DVR hard drive lost critical recordings, every case begins with a free initial diagnosis and clear communication.',
    ],
    areasCovered: [
      'Burari & Sant Nagar',
      'Nathupura, Kamalpur & Jharoda Majra',
      'Mukherjee Nagar & Nirankari Colony',
      'Model Town, Azadpur & Adarsh Nagar',
      'Civil Lines, Timarpur & Jahangirpuri',
    ],
    whyLocalBullets: [
      'Direct phone and WhatsApp coordination (+91 63885 07400) from 10:00 AM to 9:00 PM IST.',
      'Free initial diagnosis with zero obligation before you approve recovery.',
      'No Data, No Recovery Fee and no advance recovery payment under standard policy.',
      'Clear guidance on safe device handling to prevent further data loss before collection.',
    ],
    pickupProcessNote:
      'Burari Chowk is shown on our map as a regional landmark reference only. All device handovers and collections are scheduled directly after enquiry confirmation.',
    faqs: [
      {
        question: 'Can I walk into Burari Chowk without contacting LOSTBYTE first?',
        answer:
          'No. Burari Chowk is a geographical landmark reference only and not a walk-in shop or public drop-off counter. Please submit an enquiry or call +91 63885 07400 so we can coordinate assessment and pickup properly.',
      },
      {
        question: 'What storage devices do you recover around Burari and North Delhi?',
        answer:
          'We specialize in internal and external HDDs, SATA and NVMe SSDs, USB pen drives, SD/microSD cards, RAID arrays, NAS units, servers, and CCTV/DVR/NVR drives. Mobile phone data recovery and general PC repair are not offered.',
      },
      {
        question: 'How quickly can pickup be discussed for Burari and nearby North Delhi areas?',
        answer:
          'Contact us during business hours (10:00 AM – 9:00 PM IST). Our team will review your storage issue, discuss pickup feasibility and any applicable charges, and coordinate next steps once you approve.',
      },
    ],
  },
};
