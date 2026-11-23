export interface FaqItem {
  id: string;
  category: 'General & Devices' | 'Process & Policies' | 'Logistics & Hardware' | 'Privacy & Feasibility';
  question: string;
  answer: string;
}

export const ALL_FAQS: FaqItem[] = [
  {
    id: 'what-is-data-recovery',
    category: 'General & Devices',
    question: 'What is data recovery?',
    answer:
      'Data recovery is the specialized technical process of retrieving inaccessible, lost, corrupted, accidentally formatted, or damaged digital files from storage media such as hard drives, SSDs, RAID arrays, NAS units, servers, USB drives, memory cards, and surveillance drives when normal access fails.',
  },
  {
    id: 'which-devices-supported',
    category: 'General & Devices',
    question: 'Which devices do you support?',
    answer:
      'LOSTBYTE supports internal and external HDDs (desktop and laptop), SATA and NVMe SSDs, USB pen drives, SD and microSD memory cards, RAID arrays (RAID 0, 1, 5, 6, 10 and other supported configurations), NAS enclosures, server storage systems, and CCTV / DVR / NVR surveillance drives, subject to technical assessment.',
  },
  {
    id: 'clicking-hdd-recovery',
    category: 'General & Devices',
    question: 'Can you recover data from clicking HDDs?',
    answer:
      'Clicking or repetitive ticking sounds typically indicate mechanical or read/write head assembly issues. Power off the drive immediately and do not run software utilities on it. Eligible clicking drives undergo an initial diagnosis and, when physical head-level work is needed, can be coordinated for specialist hardware recovery support in Bengaluru after your approval.',
  },
  {
    id: 'formatted-data-recovery',
    category: 'General & Devices',
    question: 'Can formatted data be recovered?',
    answer:
      'In many accidental quick-format cases, underlying file structures or raw file signatures remain recoverable provided new data has not overwritten the storage sectors. Stop writing to the drive immediately. On SSDs with TRIM enabled, recovery feasibility is more limited and is determined during diagnosis.',
  },
  {
    id: 'ssd-data-recovery',
    category: 'General & Devices',
    question: 'Can data be recovered from SSDs?',
    answer:
      'Yes, LOSTBYTE evaluates SATA and NVMe SSDs experiencing controller faults, firmware lockups, undetected states, RAW partitions, electrical issues, or accidental deletion. Feasibility depends on the specific controller architecture, NAND wear condition, encryption state, and whether TRIM commands have executed.',
  },
  {
    id: 'nvme-recovery',
    category: 'General & Devices',
    question: 'Do you provide NVMe recovery?',
    answer:
      'Yes. We assess M.2 PCIe NVMe SSDs from laptops, workstations, and servers for undetected drives, file system corruption, RAW partitions, firmware faults, and logical data loss, using specialized imaging and recovery procedures appropriate for NVMe storage.',
  },
  {
    id: 'raid-recovery',
    category: 'General & Devices',
    question: 'Do you provide RAID recovery?',
    answer:
      'Yes. LOSTBYTE evaluates RAID 0, RAID 1, RAID 5, RAID 6, RAID 10, and other technically supported array configurations experiencing array degradation, multiple drive failures, failed rebuilds, controller faults, missing logical volumes, or accidental initialization.',
  },
  {
    id: 'nas-recovery',
    category: 'General & Devices',
    question: 'Do you provide NAS recovery?',
    answer:
      'Yes. We handle RAID-based NAS systems and multi-bay network storage devices suffering from volume failures, multiple drive faults, inaccessible shares, file system corruption, or deleted data. Avoid forcing rebuilds or initializing disks before technical assessment.',
  },
  {
    id: 'cctv-footage-recovery',
    category: 'General & Devices',
    question: 'Can you recover CCTV footage?',
    answer:
      'Yes. LOSTBYTE assesses DVR and NVR surveillance hard drives for accidentally deleted recordings, formatted storage, corrupted video streams, failed surveillance drives, and inaccessible playback indexes, provided the required time window has not been overwritten by continuous loop recording.',
  },
  {
    id: 'free-diagnosis',
    category: 'Process & Policies',
    question: 'Do you provide free diagnosis?',
    answer:
      'Yes. LOSTBYTE provides a free initial diagnosis to evaluate your storage device, identify the probable failure condition, and determine technical feasibility before you decide whether to proceed.',
  },
  {
    id: 'no-data-no-recovery-fee',
    category: 'Process & Policies',
    question: 'What does No Data, No Recovery Fee mean?',
    answer:
      'If the agreed recovery objective is not achieved, LOSTBYTE does not charge a recovery service fee. Please note that separately disclosed and customer-approved pickup, courier, or third-party logistics expenses may still apply.',
  },
  {
    id: 'advance-payment',
    category: 'Process & Policies',
    question: 'Do you require advance payment?',
    answer:
      'Under our standard business policy, no advance recovery payment is required to start the assessment or standard recovery work. Any applicable pickup or outstation courier logistics charges are always communicated transparently in advance.',
  },
  {
    id: 'customer-approval',
    category: 'Process & Policies',
    question: 'Is customer approval required?',
    answer:
      'Yes, always. After the free initial diagnosis, we explain the technical feasibility, recommended recovery approach, and estimated charges. No recovery procedure—and no outstation specialist dispatch—begins without your explicit approval.',
  },
  {
    id: 'delhi-ncr-pickup',
    category: 'Logistics & Hardware',
    question: 'Do you offer Delhi NCR pickup?',
    answer:
      'Yes. LOSTBYTE coordinates pickup and delivery across eligible locations in Delhi NCR, including Delhi, Noida, Gurugram, Ghaziabad, and Faridabad. Pickup charges are case- and location-dependent and are disclosed for your approval before arrangement.',
  },
  {
    id: 'other-cities-courier',
    category: 'Logistics & Hardware',
    question: 'Can customers send devices from other cities?',
    answer:
      'Yes. Customers anywhere in India can send eligible storage devices through secure courier after contacting our team. We guide you on anti-static, shock-protected packaging before you dispatch the media.',
  },
  {
    id: 'complex-hardware-cases',
    category: 'Logistics & Hardware',
    question: 'What happens to complex hardware cases?',
    answer:
      'When initial diagnosis reveals complex mechanical damage, read/write head failure, or specialized electronic faults beyond standard bench-level recovery, we explain the exact findings and feasibility options so you can decide whether to authorize advanced hardware recovery.',
  },
  {
    id: 'bengaluru-specialist-support',
    category: 'Logistics & Hardware',
    question: 'How does Bengaluru specialist support work?',
    answer:
      'For eligible complex hardware failures such as HDD head-related faults or selected head replacement procedures, LOSTBYTE can coordinate specialist hardware recovery support in Bengaluru, India. Dispatch occurs only after initial assessment, estimate discussion, and your explicit approval, with LOSTBYTE managing coordination and customer updates throughout.',
  },
  {
    id: 'data-confidentiality',
    category: 'Privacy & Feasibility',
    question: 'Is customer information confidential?',
    answer:
      'Yes. Customer storage devices, directory structures, and recovered files are handled strictly confidentially with limited technical access solely for performing the authorized recovery and verifying file accessibility.',
  },
  {
    id: 'nda-available',
    category: 'Privacy & Feasibility',
    question: 'Is NDA available?',
    answer:
      'Yes. A Non-Disclosure Agreement (NDA) is available on request for individuals, legal teams, agencies, and enterprise customers requiring formal confidentiality documentation before device handover.',
  },
  {
    id: 'recovery-time',
    category: 'Privacy & Feasibility',
    question: 'How long does recovery take?',
    answer:
      'Recovery time depends on storage capacity, media condition, bad sector density, array complexity, and whether software-level or advanced hardware-level procedures are required. We provide a realistic timeline estimate after initial diagnosis rather than making unverified turnaround promises.',
  },
  {
    id: 'can-every-device-be-recovered',
    category: 'Privacy & Feasibility',
    question: 'Can every damaged device be recovered?',
    answer:
      'No data recovery provider can guarantee recovery for every device. Technical feasibility depends on physical platter or NAND integrity, prior handling or DIY attempts, overwritten sectors, encryption, and the severity of mechanical or electrical damage.',
  },
  {
    id: 'mobile-phone-recovery',
    category: 'Privacy & Feasibility',
    question: 'Do you provide mobile phone data recovery?',
    answer:
      'LOSTBYTE currently specializes in storage media, HDD, SSD, RAID, NAS, server and surveillance storage recovery. Mobile phone data recovery is not offered.',
  },
];
