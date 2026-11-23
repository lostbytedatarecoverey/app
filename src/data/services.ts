import type { DeviceTypeOption } from '../config/siteConfig';

export type ServiceDiagramType =
  | 'hdd'
  | 'internal-hdd'
  | 'external-hdd'
  | 'ssd'
  | 'sata-ssd'
  | 'nvme-ssd'
  | 'usb'
  | 'memory-card'
  | 'raid'
  | 'nas'
  | 'server'
  | 'cctv'
  | 'deleted'
  | 'formatted'
  | 'corrupted'
  | 'physical'
  | 'firmware';

export type ServiceCategory =
  | 'Hard Disk Drives'
  | 'Solid State & Flash'
  | 'Enterprise, RAID & NAS'
  | 'Surveillance & Logical'
  | 'Advanced Hardware & Firmware';

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServicePageData {
  slug: string;
  path: string;
  shortTitle: string;
  navLabel: string;
  category: ServiceCategory;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  eyebrow: string;
  summary: string;
  ctaLabel: string;
  contextualDeviceType: DeviceTypeOption;
  diagramType: ServiceDiagramType;
  heroImage: string;
  heroImageAlt: string;
  showBengaluruSupport?: boolean;
  overviewParagraphs: string[];
  failureScenarios: Array<{ title: string; detail: string }>;
  supportedItems: string[];
  recoveryApproach: Array<{ step: string; detail: string }>;
  immediatePrecautions: string[];
  feasibilityNote: string;
  faqs: ServiceFaq[];
  relatedSlugs: string[];
}

export const SERVICE_IMAGES = {
  hdd: '/src/assets/images/hdd_precision_platter_1795354686690.jpg',
  ssd: '/src/assets/images/ssd_nvme_circuit_1795354686967.jpg',
  raid: '/src/assets/images/raid_nas_server_array_1795354691244.jpg',
  flash: '/src/assets/images/flash_usb_sd_media_1795354692260.jpg',
  cctv: '/src/assets/images/cctv_surveillance_storage_1795354691534.jpg',
} as const;

export const SERVICES: ServicePageData[] = [
  {
    slug: 'hdd-data-recovery',
    path: '/services/hdd-data-recovery',
    shortTitle: 'HDD Recovery',
    navLabel: 'HDD Data Recovery',
    category: 'Hard Disk Drives',
    seoTitle: 'HDD Data Recovery Services in Delhi & India | LOSTBYTE',
    seoDescription:
      'Professional hard drive data recovery for desktop, laptop, internal, and external HDDs. Clicking drives, bad sectors, firmware faults, and logical corruption assessed free.',
    h1: 'Hard Disk Drive (HDD) Data Recovery',
    eyebrow: 'Magnetic Storage Recovery · Internal & External HDD',
    summary:
      'Comprehensive diagnostics and recovery for desktop 3.5-inch and laptop 2.5-inch mechanical hard drives suffering from bad sectors, firmware lockups, clicking noises, undetected states, or file system damage.',
    ctaLabel: 'Request HDD Recovery',
    contextualDeviceType: 'Internal HDD',
    diagramType: 'hdd',
    heroImage: SERVICE_IMAGES.hdd,
    heroImageAlt: 'Opened enterprise hard disk drive displaying polished magnetic platters and precision read-write actuator head',
    showBengaluruSupport: true,
    overviewParagraphs: [
      'Mechanical hard disk drives store data magnetically on rapidly spinning platters read by microscopic read/write heads floating nanometers above the surface. Even minor physical shocks, power surges, surface degradation, or service-area firmware corruption can render years of critical files completely inaccessible.',
      'LOSTBYTE handles both logical and selected hardware-level hard drive failures using hardware-assisted sector imaging and specialized diagnostic tools. For eligible severe mechanical or head-assembly cases, we can coordinate specialist hardware recovery support in Bengaluru after initial assessment and explicit customer approval.',
    ],
    failureScenarios: [
      {
        title: 'Clicking, Ticking, or Beeping Noises',
        detail: 'Often points to read/write head degradation, stuck spindle motors, or preamplifier issues. Power the drive off immediately to avoid platter scoring.',
      },
      {
        title: 'Drive Not Detected in BIOS or OS',
        detail: 'Caused by PCB electronic failure, corrupted translator/firmware modules, or head initialization failure during spin-up.',
      },
      {
        title: 'Severe Bad Sectors & Freezing Systems',
        detail: 'Weak magnetic regions cause standard operating systems to hang; specialized hardware imaging reads healthy sectors first before targeting degraded zones.',
      },
      {
        title: 'Deleted Partitions, Formatting & RAW Drives',
        detail: 'Logical corruption in NTFS, exFAT, APFS, HFS+, or ext4 structures where data sectors may remain intact beneath damaged metadata.',
      },
    ],
    supportedItems: [
      '3.5-inch desktop internal SATA & SAS hard drives',
      '2.5-inch laptop internal SATA hard drives',
      'Portable & desktop USB external hard drives',
      'NTFS, FAT32, exFAT, HFS+, APFS, and Linux ext file systems',
      'All major drive capacities from 160 GB up to 20 TB+',
    ],
    recoveryApproach: [
      {
        step: 'Non-Destructive Initial Diagnosis',
        detail: 'Evaluate electrical response, spin behavior, SMART/service-area status, and logical readability without running destructive repair utilities.',
      },
      {
        step: 'Hardware-Controlled Sector Imaging',
        detail: 'Clone readable sectors onto healthy laboratory target media using head-map and timeout controls to minimize mechanical stress.',
      },
      {
        step: 'File System Reconstruction & Verification',
        detail: 'Rebuild directory trees from the sector image rather than modifying the original customer drive, then verify file integrity.',
      },
    ],
    immediatePrecautions: [
      'Do not repeatedly power on a clicking, grinding, or beeping hard drive.',
      'Never open the sealed drive lid outside a controlled specialist environment.',
      'Avoid running CHKDSK, Disk First Aid, or formatting prompts on an unstable HDD.',
    ],
    feasibilityNote:
      'Recovery feasibility depends on platter surface condition, head stability, prior DIY handling, and whether sectors were overwritten. LOSTBYTE evaluates every drive honestly during free initial diagnosis before quoting.',
    faqs: [
      {
        question: 'Should I run CHKDSK if my hard drive is clicking or freezing?',
        answer:
          'No. Running CHKDSK on a drive with bad sectors or weak heads forces heavy read/write stress that can worsen platter damage and scramble file system metadata. Disconnect the drive and request a free diagnosis.',
      },
      {
        question: 'Can you recover data from both desktop and laptop hard drives?',
        answer:
          'Yes. We diagnose and recover both 3.5-inch desktop HDDs and 2.5-inch laptop HDDs, as well as external USB hard drives.',
      },
      {
        question: 'What happens if my HDD needs physical head replacement?',
        answer:
          'If diagnosis confirms head failure or mechanical damage requiring cleanroom-level hardware procedures, we explain the findings and estimated cost and can coordinate specialist support in Bengaluru only after your approval.',
      },
    ],
    relatedSlugs: [
      'internal-hdd-recovery',
      'external-hdd-recovery',
      'physical-hard-drive-recovery',
      'firmware-data-recovery',
    ],
  },

  {
    slug: 'internal-hdd-recovery',
    path: '/services/internal-hdd-recovery',
    shortTitle: 'Internal HDD Recovery',
    navLabel: 'Internal HDD Recovery',
    category: 'Hard Disk Drives',
    seoTitle: 'Internal HDD Data Recovery — Desktop & Laptop Hard Drives | LOSTBYTE',
    seoDescription:
      'Specialized internal hard drive data recovery for desktop PCs and laptops. Recover inaccessible OS drives, bad sectors, firmware faults, and mechanical failures.',
    h1: 'Internal Hard Drive Data Recovery',
    eyebrow: 'Desktop 3.5" & Laptop 2.5" SATA / SAS Drives',
    summary:
      'Dedicated data recovery for internal desktop and laptop hard drives affected by boot failures, OS crashes, slow read response, partition loss, firmware faults, or mechanical shock.',
    ctaLabel: 'Request Internal HDD Recovery',
    contextualDeviceType: 'Internal HDD',
    diagramType: 'internal-hdd',
    heroImage: SERVICE_IMAGES.hdd,
    heroImageAlt: 'Internal hard disk drive platters and read-write head assembly during forensic assessment',
    showBengaluruSupport: true,
    overviewParagraphs: [
      'Internal hard drives inside desktops and laptops are frequently exposed to sudden power outages, thermal wear, accidental drops during travel, and interrupted operating system updates. When an internal boot drive fails, both personal archives and active work databases can disappear simultaneously.',
      'LOSTBYTE focuses strictly on data recovery—we extract your inaccessible data safely without attempting general laptop repair or destructive OS reinstallations that risk overwriting original partitions.',
    ],
    failureScenarios: [
      {
        title: 'Operating System Fails to Boot / "No Bootable Device"',
        detail: 'Triggered by damaged boot sectors, corrupted partition tables, or failing primary read/write heads.',
      },
      {
        title: 'Laptop Drop or Impact Damage',
        detail: '2.5-inch laptop drives are particularly sensitive to impact while spinning, often resulting in head misalignment or stiction.',
      },
      {
        title: 'Gradual Slowdown & I/O Device Errors',
        detail: 'Progressive media degradation and reallocated sectors causing Windows Explorer or macOS Finder to stall.',
      },
      {
        title: 'Accidental OS Reinstall or Partition Deletion',
        detail: 'Unintended formatting during system recovery where non-overwritten regions may still hold recoverable user directories.',
      },
    ],
    supportedItems: [
      '2.5-inch laptop internal SATA hard drives',
      '3.5-inch desktop internal SATA hard drives',
      'Workstation high-capacity enterprise SATA/SAS drives',
      'BitLocker / FileVault encrypted volumes (when customer supplies valid recovery key)',
    ],
    recoveryApproach: [
      {
        step: 'Safe Media Isolation',
        detail: 'Remove reliance on the host OS and connect the bare drive directly to dedicated write-blocked diagnostic hardware.',
      },
      {
        step: 'Firmware & Head Stability Check',
        detail: 'Inspect drive identification, capacity reporting, and individual head read stability before initiating multi-pass imaging.',
      },
      {
        step: 'Targeted User Data Extraction',
        detail: 'Prioritize critical user folders, project files, accounting databases, and archives from the verified sector clone.',
      },
    ],
    immediatePrecautions: [
      'Do not attempt Windows Reset or fresh OS installation on the affected drive.',
      'If the laptop was dropped and the drive clicks, power down completely and remove power.',
      'Do not freeze, tap, or shake the hard drive.',
    ],
    feasibilityNote:
      'Feasibility depends on physical platter condition and whether an OS reinstall or write activity overwrote previous data blocks. Initial diagnosis is completely free.',
    faqs: [
      {
        question: 'Do I need to send my entire desktop or laptop?',
        answer:
          'We specialize exclusively in storage media recovery, so sending only the safely removed internal hard drive is preferred whenever possible. Contact us before disassembling if you need guidance.',
      },
      {
        question: 'Can you recover Tally, accounting files, and Outlook PST archives from a failed internal HDD?',
        answer:
          'Yes. During logical reconstruction from the sector image, we preserve folder hierarchies and target critical business files such as Tally data, PST/OST mailboxes, documents, and media libraries, subject to sector integrity.',
      },
      {
        question: 'Does LOSTBYTE repair my laptop after recovering the data?',
        answer:
          'No. LOSTBYTE is exclusively a data recovery specialist and does not provide laptop repair, motherboard repair, or OS installation services.',
      },
    ],
    relatedSlugs: [
      'hdd-data-recovery',
      'physical-hard-drive-recovery',
      'firmware-data-recovery',
      'deleted-data-recovery',
    ],
  },

  {
    slug: 'external-hdd-recovery',
    path: '/services/external-hdd-recovery',
    shortTitle: 'External HDD Recovery',
    navLabel: 'External HDD Recovery',
    category: 'Hard Disk Drives',
    seoTitle: 'External Hard Drive Data Recovery — Portable & Desktop USB HDD | LOSTBYTE',
    seoDescription:
      'Recover data from dropped, undetected, clicking, or RAW external hard drives. Free initial diagnosis, Delhi NCR pickup, and all-India courier support.',
    h1: 'External Hard Drive Data Recovery',
    eyebrow: 'Portable 2.5" & Desktop 3.5" USB Hard Drives',
    summary:
      'Specialized recovery for portable and desktop external HDDs suffering from accidental drops, broken USB ports, "Format Disk" prompts, undetected enclosures, hardware encryption bridges, or clicking heads.',
    ctaLabel: 'Request External HDD Recovery',
    contextualDeviceType: 'External HDD',
    diagramType: 'external-hdd',
    heroImage: SERVICE_IMAGES.hdd,
    heroImageAlt: 'Precision magnetic platter hard disk assembly assessed for external drive recovery',
    showBengaluruSupport: true,
    overviewParagraphs: [
      'External USB hard drives are the most common backup medium for family photos, wedding shoots, video production archives, and business backups—and also the most vulnerable to accidental desk drops, sudden cable disconnection, and USB-to-SATA bridge board faults.',
      'Many modern portable external drives integrate native USB connectors directly onto the drive PCB or employ hardware bridge encryption. LOSTBYTE assesses both the internal mechanical drive and bridge electronics carefully without compromising encrypted data structures.',
    ],
    failureScenarios: [
      {
        title: 'Dropped External Hard Drive (Clicking or Silent)',
        detail: 'Impact while connected or carried often causes head crash, stuck heads on the platter (stiction), or bent actuator assemblies.',
      },
      {
        title: 'Drive Light Blinks But Not Showing in File Explorer',
        detail: 'Frequently caused by degraded sectors, firmware busy-state hang (BSY), or faulty USB bridge circuitry.',
      },
      {
        title: '"You Need to Format the Disk Before You Can Use It"',
        detail: 'Indicates RAW partition status or damaged file allocation tables following unsafe ejection during write operations.',
      },
      {
        title: 'Loose or Broken USB Micro-B / USB-C Port',
        detail: 'Damaged external connectors interrupt power and signal lines; direct SATA conversion or controlled board adaptation is assessed.',
      },
    ],
    supportedItems: [
      '2.5-inch bus-powered portable USB 3.0 / USB-C hard drives',
      '3.5-inch externally powered desktop backup drives',
      'Native-USB PCB portable drives & hardware-encrypted USB enclosures',
      'Windows, macOS Time Machine, and cross-platform exFAT backup drives',
    ],
    recoveryApproach: [
      {
        step: 'Enclosure & Bridge Evaluation',
        detail: 'Determine whether the fault lies in the USB enclosure bridge, power supply, PCB electronics, firmware, or internal mechanics.',
      },
      {
        step: 'Direct Interface Imaging',
        detail: 'Bypass unstable USB controllers where technically appropriate so hardware recovery imagers can communicate directly with the drive.',
      },
      {
        step: 'Bridge-Aware Decryption & File Extraction',
        detail: 'Account for enclosure-level hardware encryption where present, reconstruct folder structures, and verify recovered files.',
      },
    ],
    immediatePrecautions: [
      'Never click "Format Disk" when Windows or macOS prompts you to initialize an external drive.',
      'Do not pry open an encrypted external enclosure and initialize the bare disk inside another PC.',
      'If dropped, unplug immediately—do not test with multiple cables or computers.',
    ],
    feasibilityNote:
      'Recovery outcomes depend on platter integrity after impact and whether formatting or overwriting occurred. Eligible mechanical head failures can be coordinated for specialist hardware support in Bengaluru with your approval.',
    faqs: [
      {
        question: 'My external hard drive fell from my desk and now clicks. Can it be recovered?',
        answer:
          'Possibly, provided the magnetic platter surface is not severely scratched. Unplug it immediately and do not power it on again. We perform a free initial diagnosis and explain whether Bengaluru specialist hardware support is required.',
      },
      {
        question: 'Windows says my external drive is RAW and asks to format it. Should I format it?',
        answer:
          'No. Formatting writes new file system structures over existing metadata and reduces recovery quality. Safely disconnect the drive and contact LOSTBYTE for assessment.',
      },
      {
        question: 'Should I send the original USB cable and power adapter with my desktop external drive?',
        answer:
          'For 3.5-inch desktop external drives, sending the original enclosure is helpful—especially when bridge encryption may be active. Avoid swapping random third-party power adapters, as wrong voltage can burn the PCB.',
      },
    ],
    relatedSlugs: [
      'hdd-data-recovery',
      'corrupted-drive-recovery',
      'formatted-data-recovery',
      'physical-hard-drive-recovery',
    ],
  },

  {
    slug: 'ssd-data-recovery',
    path: '/services/ssd-data-recovery',
    shortTitle: 'SSD Recovery',
    navLabel: 'SSD Data Recovery',
    category: 'Solid State & Flash',
    seoTitle: 'SSD Data Recovery Services in Delhi & India | LOSTBYTE',
    seoDescription:
      'Professional SSD data recovery for SATA, M.2, and NVMe solid-state drives. Controller faults, firmware lockups, undetected SSDs, and RAW partitions assessed free.',
    h1: 'Solid State Drive (SSD) Data Recovery',
    eyebrow: 'NAND Flash & Controller Recovery · SATA & NVMe',
    summary:
      'Technical diagnosis and recovery for SATA and NVMe solid-state drives experiencing undetected states, controller failures, firmware translator issues, electrical faults, RAW partitions, or logical corruption.',
    ctaLabel: 'Request SSD Recovery',
    contextualDeviceType: 'SATA SSD',
    diagramType: 'ssd',
    heroImage: SERVICE_IMAGES.ssd,
    heroImageAlt: 'Exposed M.2 NVMe and SATA SSD circuit boards showing NAND flash packages and controller silicon',
    overviewParagraphs: [
      'Unlike mechanical hard drives, solid-state drives store information across distributed NAND flash memory dies managed by complex controller processors, wear-leveling tables, error-correction algorithms (LDPC/ECC), and dynamic flash translation layers (FTL).',
      'Because SSDs perform background garbage collection and TRIM commands, sudden failure or accidental deletion demands immediate disconnection and careful diagnostic handling rather than repeated reboots or consumer scan software.',
    ],
    failureScenarios: [
      {
        title: 'SSD Not Detected or Showing Zero Capacity',
        detail: 'Common when controller firmware drops into safe/panic mode or when the flash translation table becomes corrupted.',
      },
      {
        title: 'Controller & Firmware Lockups',
        detail: 'Drive identifies under a generic controller name (e.g., SATAFIRM S11 or generic ROM mode) and blocks normal OS reads.',
      },
      {
        title: 'Electrical Short or Power Surge Damage',
        detail: 'Damaged power-management capacitors, fuses, or voltage regulators preventing the SSD PCB from powering the controller.',
      },
      {
        title: 'RAW File System & Corrupted Partitions',
        detail: 'Sudden power loss during heavy writes corrupts NTFS/APFS metadata or leaves the SSD stuck in read-only protection mode.',
      },
    ],
    supportedItems: [
      '2.5-inch SATA III solid-state drives',
      'M.2 SATA and M.2 PCIe NVMe SSDs',
      'External portable USB-C SSDs',
      'mSATA and enterprise solid-state modules (subject to controller support)',
    ],
    recoveryApproach: [
      {
        step: 'Electrical & Interface Triage',
        detail: 'Inspect PCB power rails, thermal behavior, and controller response without triggering background garbage collection.',
      },
      {
        step: 'Controller / Firmware Diagnostic Mode',
        detail: 'Where supported by the controller family, access diagnostic utilities to rebuild virtual translator mapping and extract logical sectors.',
      },
      {
        step: 'Controlled Image & File Reconstruction',
        detail: 'Create a complete sector-by-sector image of readable blocks and verify recovered files before quoting final approval.',
      },
    ],
    immediatePrecautions: [
      'Power off and disconnect a failing or accidentally deleted SSD immediately to minimize TRIM / garbage collection.',
      'Do not leave a freshly deleted SSD powered on idle inside a running computer.',
      'Never run consumer defragmentation or firmware updater utilities on a drive containing unbacked data.',
    ],
    feasibilityNote:
      'SSD recovery feasibility depends heavily on the controller model, encryption architecture, NAND wear state, and whether TRIM cleared deleted blocks. LOSTBYTE communicates realistic technical feasibility after free initial diagnosis.',
    faqs: [
      {
        question: 'Why is deleted data harder to recover from an SSD than an HDD?',
        answer:
          'Modern operating systems issue TRIM commands to SSDs when files are deleted or formatted, allowing the controller to erase unused flash blocks in the background. Disconnecting the SSD immediately gives the best chance during diagnosis.',
      },
      {
        question: 'My SSD shows up as a strange controller name or 0 MB in Disk Management. Is recovery possible?',
        answer:
          'This usually indicates a firmware panic or translator fault. Depending on the exact controller chip and firmware family, specialized diagnostic recovery may be feasible after assessment.',
      },
      {
        question: 'Do you recover both SATA SSDs and M.2 NVMe SSDs?',
        answer:
          'Yes. LOSTBYTE assesses both 2.5-inch/M.2 SATA SSDs and M.2 PCIe NVMe SSDs.',
      },
    ],
    relatedSlugs: [
      'sata-ssd-recovery',
      'nvme-ssd-recovery',
      'corrupted-drive-recovery',
      'firmware-data-recovery',
    ],
  },

  {
    slug: 'sata-ssd-recovery',
    path: '/services/sata-ssd-recovery',
    shortTitle: 'SATA SSD Recovery',
    navLabel: 'SATA SSD Recovery',
    category: 'Solid State & Flash',
    seoTitle: 'SATA SSD Data Recovery — 2.5" & M.2 SATA Drives | LOSTBYTE',
    seoDescription:
      'Data recovery for 2.5-inch and M.2 SATA SSDs with controller faults, firmware errors, read-only lock, or undetected drives. Free initial diagnosis by LOSTBYTE.',
    h1: 'SATA SSD Data Recovery',
    eyebrow: '2.5-Inch & M.2 SATA Solid State Drives',
    summary:
      'Focused diagnostics and data extraction for 2.5-inch desktop/laptop SATA SSDs and M.2 SATA modules suffering from firmware crashes, sudden power-loss corruption, read-only lock, or undetected states.',
    ctaLabel: 'Request SATA SSD Recovery',
    contextualDeviceType: 'SATA SSD',
    diagramType: 'sata-ssd',
    heroImage: SERVICE_IMAGES.ssd,
    heroImageAlt: 'SATA solid-state drive PCB showing controller processor and NAND memory chips',
    overviewParagraphs: [
      'SATA SSDs are widely deployed in business desktops, legacy laptops, and portable enclosures. Although immune to mechanical head crashes, SATA SSDs frequently fail suddenly without warning when controller firmware corrupts its mapping tables or NAND blocks exceed wear endurance.',
      'LOSTBYTE evaluates SATA SSDs across common consumer and workstation controller platforms, identifying electrical faults, firmware safe-mode states, and logical partition errors before recommending a recovery path.',
    ],
    failureScenarios: [
      {
        title: 'Sudden Disappearance After Power Cut',
        detail: 'Volatile cache loss during power failure can corrupt the FTL mapping table, causing BIOS freeze or non-detection.',
      },
      {
        title: 'Controller Safe-Mode / Generic ID Reporting',
        detail: 'Common firmware failure where the drive reports factory default strings or reduced capacity instead of user data.',
      },
      {
        title: 'Read-Only Endurance Lockout',
        detail: 'When spare NAND blocks exhaust, some SATA SSDs lock into read-only or degraded response states requiring careful block imaging.',
      },
      {
        title: 'Electrical Component Failure on SATA PCB',
        detail: 'Shorted power protection diodes or DC-DC regulators triggered by unstable desktop power supplies.',
      },
    ],
    supportedItems: [
      '2.5-inch 7mm SATA III internal SSDs',
      'M.2 2280 SATA (B+M key) solid-state drives',
      'mSATA laptop solid-state drives',
      'External USB-enclosure SATA SSDs',
    ],
    recoveryApproach: [
      {
        step: 'PCB & Controller Identification',
        detail: 'Check power draw, inspect SMD components, and identify the exact SATA controller chipset and NAND topology.',
      },
      {
        step: 'Firmware & Translator Assessment',
        detail: 'Evaluate whether controller-level diagnostic access or virtual translator reconstruction is supported for the specific chipset.',
      },
      {
        step: 'Controlled Sector Extraction',
        detail: 'Image readable logical block addresses with strict error management to preserve fragile NAND cells.',
      },
    ],
    immediatePrecautions: [
      'Disconnect the SATA SSD if the PC freezes on the BIOS splash screen.',
      'Do not attempt a firmware flash update—firmware updates typically wipe mapping tables permanently.',
      'Avoid powering the SSD on repeatedly if it heats up rapidly.',
    ],
    feasibilityNote:
      'SATA SSD recovery depends on controller support, NAND health, and hardware encryption state. Every case receives an honest feasibility assessment during our free initial diagnosis.',
    faqs: [
      {
        question: 'My computer hangs on the motherboard logo when my SATA SSD is plugged in. Why?',
        answer:
          'The SSD controller is likely stuck in a firmware busy state trying to read damaged NAND metadata, causing the motherboard SATA port to wait indefinitely. Unplug the drive and submit it for diagnosis.',
      },
      {
        question: 'Will updating my SSD firmware fix an undetected SATA SSD?',
        answer:
          'No—never run a manufacturer firmware update on a drive with needed data. Many firmware updaters reset the translator and permanently destroy access to user files.',
      },
      {
        question: 'Is initial diagnosis free for SATA SSDs?',
        answer:
          'Yes. Initial technical assessment is free, and no recovery service fee applies if the agreed data objective cannot be recovered.',
      },
    ],
    relatedSlugs: [
      'ssd-data-recovery',
      'nvme-ssd-recovery',
      'firmware-data-recovery',
      'corrupted-drive-recovery',
    ],
  },

  {
    slug: 'nvme-ssd-recovery',
    path: '/services/nvme-ssd-recovery',
    shortTitle: 'NVMe SSD Recovery',
    navLabel: 'NVMe SSD Recovery',
    category: 'Solid State & Flash',
    seoTitle: 'NVMe SSD Data Recovery — M.2 PCIe Solid State Drives | LOSTBYTE',
    seoDescription:
      'Specialized M.2 PCIe NVMe SSD data recovery in Delhi NCR and India. Undetected NVMe drives, RAW volumes, controller faults, and logical data loss assessed free.',
    h1: 'NVMe SSD Data Recovery',
    eyebrow: 'M.2 PCIe Gen3 / Gen4 / Gen5 Solid State Drives',
    summary:
      'Specialized evaluation and recovery for high-speed M.2 PCIe NVMe SSDs from modern laptops, creator workstations, and servers facing sudden non-detection, BSOD crashes, RAW partitions, or controller faults.',
    ctaLabel: 'Request NVMe SSD Recovery',
    contextualDeviceType: 'NVMe SSD',
    diagramType: 'nvme-ssd',
    heroImage: SERVICE_IMAGES.ssd,
    heroImageAlt: 'M.2 NVMe PCIe SSD showing high-density flash chips and precision controller architecture',
    overviewParagraphs: [
      'M.2 PCIe NVMe drives operate at vastly higher thermal density and bus speeds than legacy SATA drives. Because they connect directly over PCIe lanes and rely on tightly integrated multi-channel controllers, NVMe failures often happen abruptly—leaving laptops stuck in BIOS or external Thunderbolt/USB-C enclosures reporting uninitialized media.',
      'LOSTBYTE uses dedicated PCIe/NVMe imaging hardware and diagnostic workflows to assess electrical health, thermal stability, unstable NAND blocks, and logical file system structures without stressing the drive through an active operating system.',
    ],
    failureScenarios: [
      {
        title: 'NVMe Drive Missing in BIOS / Windows Setup',
        detail: 'Triggered by power-management IC faults, controller firmware lockup, or excessive NAND read-retry failures.',
      },
      {
        title: 'Frequent BSOD Crashes & Unstable Read Drops',
        detail: 'Degraded flash pages cause the NVMe controller to disconnect mid-read under standard Windows or macOS drivers.',
      },
      {
        title: 'Corrupted BitLocker / APFS / NTFS Partitions',
        detail: 'Interrupted updates or sudden shutdowns damage volume headers on encrypted or unencrypted NVMe boot drives.',
      },
      {
        title: 'Thermal Overheating & Electrical Damage',
        detail: 'High operating temperatures in compact ultrabooks can degrade solder joints or power-delivery components on the M.2 stick.',
      },
    ],
    supportedItems: [
      'M.2 2280, 2242, and 2230 PCIe NVMe SSDs',
      'Gen3, Gen4, and Gen5 NVMe modules',
      'External USB-C / Thunderbolt NVMe enclosures',
      'BitLocker-protected NVMe drives (with customer-provided 48-digit recovery key)',
    ],
    recoveryApproach: [
      {
        step: 'Thermal & Electrical Inspection',
        detail: 'Verify safe current draw and thermal signature before connecting the M.2 stick to controlled PCIe imaging hardware.',
      },
      {
        step: 'Hardware-Assisted PCIe Imaging',
        detail: 'Manage timeouts, power-reset cycles, and sector-skip maps when imaging unstable NVMe namespaces.',
      },
      {
        step: 'Logical & Encrypted Volume Reconstruction',
        detail: 'Rebuild damaged NTFS, exFAT, APFS, or Linux partitions from the acquired image and validate key customer files.',
      },
    ],
    immediatePrecautions: [
      'Power down immediately after an unexpected NVMe crash or accidental deletion to reduce TRIM activity.',
      'Do not test a hot or shorted M.2 stick inside multiple laptops.',
      'Keep your 48-digit BitLocker recovery key ready if Windows device encryption was enabled.',
    ],
    feasibilityNote:
      'NVMe recovery feasibility depends on controller architecture, NAND degradation, TRIM state, and encryption keys. Not every dead NVMe controller is technically recoverable—we provide a clear, honest evaluation after free diagnosis.',
    faqs: [
      {
        question: 'My laptop NVMe SSD had BitLocker turned on automatically. Can you still recover data?',
        answer:
          'Yes, if the underlying NAND/controller is readable and you can provide your 48-digit BitLocker recovery key (often stored in your Microsoft account). Without the key, BitLocker encryption cannot be bypassed.',
      },
      {
        question: 'Why did my NVMe SSD disappear overnight without any drop or spill?',
        answer:
          'NVMe SSDs can fail electronically or via firmware mapping corruption after power fluctuations, thermal stress, or worn flash blocks. Stop rebooting and submit the drive for free assessment.',
      },
      {
        question: 'Can you recover data from soldered-on laptop storage chips?',
        answer:
          'LOSTBYTE specializes in removable storage media (M.2 NVMe, SATA SSDs, HDDs, RAID, NAS, USB, memory cards, and CCTV drives) and does not perform general laptop motherboard repair.',
      },
    ],
    relatedSlugs: [
      'ssd-data-recovery',
      'sata-ssd-recovery',
      'corrupted-drive-recovery',
      'deleted-data-recovery',
    ],
  },

  {
    slug: 'usb-pen-drive-recovery',
    path: '/services/usb-pen-drive-recovery',
    shortTitle: 'USB / Pen Drive Recovery',
    navLabel: 'USB / Pen Drive Recovery',
    category: 'Solid State & Flash',
    seoTitle: 'USB & Pen Drive Data Recovery Services | LOSTBYTE',
    seoDescription:
      'Recover lost, formatted, RAW, corrupted, or undetected USB flash drives and pen drives. Free initial diagnosis and No Data, No Recovery Fee.',
    h1: 'USB & Pen Drive Data Recovery',
    eyebrow: 'Flash Storage Recovery · USB-A & USB-C Drives',
    summary:
      'Specialized data recovery for USB flash drives and pen drives affected by accidental deletion, formatting, RAW file systems, "Please insert a disk" errors, bent connectors, or undetected controllers.',
    ctaLabel: 'Request USB Recovery',
    contextualDeviceType: 'USB / Pen Drive',
    diagramType: 'usb',
    heroImage: SERVICE_IMAGES.flash,
    heroImageAlt: 'Precision matte metallic USB flash drives and flash memory media arranged on a dark laboratory surface',
    overviewParagraphs: [
      'USB pen drives carry everyday documents, design assets, accounting backups, and academic projects—yet they are frequently unplugged without safe ejection, bent while plugged into laptops, or degraded by low-end flash memory wear.',
      'LOSTBYTE assesses both logical flash corruption and selected physical/electronic USB connection issues, determining whether standard imaging or advanced flash-level work is technically viable.',
    ],
    failureScenarios: [
      {
        title: 'Accidental Deletion & Quick Formatting',
        detail: 'Files removed from USB drives bypass the Windows Recycle Bin; immediate cessation of writes preserves recoverable sectors.',
      },
      {
        title: 'RAW File System or "Format Disk" Prompt',
        detail: 'Corrupted FAT32, exFAT, or NTFS directory entries caused by abrupt removal during file transfer.',
      },
      {
        title: '"Please Insert a Disk Into Removable Drive" / 0 Bytes',
        detail: 'Usually indicates controller-to-NAND communication failure or degraded flash memory pages.',
      },
      {
        title: 'Bent or Broken USB Connector',
        detail: 'Physical impact while attached to a PC can lift PCB solder pads or break data/power traces.',
      },
    ],
    supportedItems: [
      'Standard USB 2.0, USB 3.0, and USB-C flash drives',
      'High-capacity 32 GB to 1 TB+ pen drives',
      'Conventional PCB-based USB drives & selected monolithic drives (subject to assessment)',
      'FAT32, exFAT, NTFS, and macOS formatted USB media',
    ],
    recoveryApproach: [
      {
        step: 'Physical & Electrical Evaluation',
        detail: 'Inspect USB connector pins, PCB traces, power stability, and controller recognition.',
      },
      {
        step: 'Full Sector Image Acquisition',
        detail: 'Create a bit-level image of readable flash space to avoid further degradation of unstable NAND cells.',
      },
      {
        step: 'File System & Signature Recovery',
        detail: 'Reconstruct directory tables and carve fragmented or unindexed documents, photos, and archives.',
      },
    ],
    immediatePrecautions: [
      'Unplug the USB drive immediately if it asks to format or disconnects repeatedly.',
      'Do not bend a snapped connector back into place or plug it into a live USB port.',
      'Never save new files onto a USB drive after accidental deletion.',
    ],
    feasibilityNote:
      'Recovery feasibility depends on whether the NAND die is physically cracked, heavily worn, or overwritten. Monolithic USB drives with internal die fractures may not be recoverable; we confirm honestly during free diagnosis.',
    faqs: [
      {
        question: 'My pen drive asks to format every time I plug it in. Are my files gone?',
        answer:
          'Often the underlying files are still intact while the file system header is corrupted. Do not click Format—unplug the drive and submit it for free initial diagnosis.',
      },
      {
        question: 'Can you recover data from a snapped or bent USB flash drive?',
        answer:
          'If only the connector or outer PCB traces are damaged and the NAND memory chip itself is intact, recovery is often feasible. Do not power on a broken drive to avoid short-circuiting the memory chip.',
      },
      {
        question: 'Do deleted files on a USB drive go to the Recycle Bin?',
        answer:
          'No, deletions on removable USB drives bypass the Recycle Bin immediately. Stop using the drive right away so new data does not overwrite the deleted blocks.',
      },
    ],
    relatedSlugs: [
      'memory-card-recovery',
      'deleted-data-recovery',
      'formatted-data-recovery',
      'corrupted-drive-recovery',
    ],
  },

  {
    slug: 'memory-card-recovery',
    path: '/services/memory-card-recovery',
    shortTitle: 'Memory Card Recovery',
    navLabel: 'Memory Card Recovery',
    category: 'Solid State & Flash',
    seoTitle: 'Memory Card Data Recovery — SD, SDXC & MicroSD Cards | LOSTBYTE',
    seoDescription:
      'Professional SD and microSD memory card data recovery for deleted photos, formatted camera cards, RAW errors, and corrupted footage. Free diagnosis by LOSTBYTE.',
    h1: 'SD & MicroSD Memory Card Data Recovery',
    eyebrow: 'Camera, Drone & Professional Media Cards',
    summary:
      'Specialized data recovery for SD, SDHC, SDXC, and microSD memory cards experiencing accidental formatting, deleted photos and videos, camera card errors, RAW file systems, or undetected media.',
    ctaLabel: 'Request Memory Card Recovery',
    contextualDeviceType: 'Memory Card',
    diagramType: 'memory-card',
    heroImage: SERVICE_IMAGES.flash,
    heroImageAlt: 'Professional SDXC and microSD memory cards prepared on an anti-static forensic workbench',
    overviewParagraphs: [
      'Photographers, wedding filmmakers, drone operators, and families rely on SD and microSD cards to capture irreplaceable one-time moments. Abrupt battery loss mid-recording, accidental in-camera formatting, or card reader errors can instantly make RAW photos and high-bitrate 4K video clips vanish.',
      'LOSTBYTE performs careful block-level imaging and camera-aware video/photo stream reconstruction rather than relying on basic undelete apps that frequently produce unplayable fragmented MP4 or MOV files.',
    ],
    failureScenarios: [
      {
        title: 'Accidental In-Camera Formatting or Deletion',
        detail: 'Common during event shoots when a card is formatted before verifying backup completion. Note: certain modern cameras execute low-level erase commands—stop using the card immediately.',
      },
      {
        title: '"Card Error" or "Cannot Access Card" in Camera',
        detail: 'File allocation table corruption or bad NAND blocks triggered by battery depletion while writing video buffers.',
      },
      {
        title: 'Corrupted or Unplayable Video Clips',
        detail: 'Fragmented MP4/MOV/MXF camera streams where standard recovery tools extract broken headers without proper stream reconstruction.',
      },
      {
        title: 'Card Not Detected in Card Reader',
        detail: 'Controller failure, oxidized contacts, or degraded monolithic flash memory requiring controlled technical evaluation.',
      },
    ],
    supportedItems: [
      'SD, SDHC, and SDXC memory cards (UHS-I and UHS-II)',
      'MicroSD, microSDHC, and microSDXC cards (drones, action cams, dashcams)',
      'RAW image formats (CR2, CR3, NEF, ARW, DNG, RAF) and JPEG archives',
      'Video formats (MP4, MOV, AVCHD, MXF) subject to non-overwritten block integrity',
    ],
    recoveryApproach: [
      {
        step: 'Write-Protected Raw Imaging',
        detail: 'Engage read-only access and capture a full raw sector dump of the memory card before performing any analysis.',
      },
      {
        step: 'File System & Fragment Reconstruction',
        detail: 'Analyze exFAT/FAT32 structures and perform video/photo stream reassembly for fragmented camera recordings.',
      },
      {
        step: 'Sample Playback Verification',
        detail: 'Verify that recovered photos open cleanly and video clips play properly before finalizing recovery.',
      },
    ],
    immediatePrecautions: [
      'Remove the card from the camera or drone immediately—taking even a few extra photos can overwrite deleted footage.',
      'Slide the physical lock switch on full-size SD cards to "Lock" (read-only) before transport.',
      'Never run formatting or repair prompts in Windows, macOS, or the camera menu.',
    ],
    feasibilityNote:
      'Physically snapped or cracked monolithic microSD cards cannot usually be recovered if the internal silicon die is broken. Certain cameras perform destructive low-level formats; feasibility is confirmed honestly during free diagnosis.',
    faqs: [
      {
        question: 'I accidentally formatted my SD card in my DSLR/mirrorless camera. Can photos be recovered?',
        answer:
          'In many cases yes, provided no new photos or videos were recorded afterward and the specific camera model did not perform a destructive low-level flash erase. Stop using the card immediately for free diagnosis.',
      },
      {
        question: 'Why do recovered camera videos sometimes fail to play?',
        answer:
          'Cameras often write high-bitrate video in interleaved or fragmented chunks alongside audio/metadata streams. Proper stream-aware reconstruction from a raw card image is needed to rebuild playable video files.',
      },
      {
        question: 'Can you recover data from a microSD card that was inside a mobile phone?',
        answer:
          'We assess removable microSD cards directly as standalone storage media (provided the card was not adopted as phone-encrypted internal storage tied to the phone hardware). We do not offer mobile phone internal memory recovery.',
      },
    ],
    relatedSlugs: [
      'usb-pen-drive-recovery',
      'deleted-data-recovery',
      'formatted-data-recovery',
      'corrupted-drive-recovery',
    ],
  },

  {
    slug: 'raid-data-recovery',
    path: '/services/raid-data-recovery',
    shortTitle: 'RAID Recovery',
    navLabel: 'RAID Data Recovery',
    category: 'Enterprise, RAID & NAS',
    seoTitle: 'RAID Data Recovery Services India — RAID 0, 1, 5, 6 & 10 | LOSTBYTE',
    seoDescription:
      'Professional RAID data recovery in Delhi NCR and across India. RAID 0, 1, 5, 6, and 10 arrays, failed rebuilds, controller failure, and multi-disk failures assessed free.',
    h1: 'RAID Data Recovery Services',
    eyebrow: 'Multi-Disk Array Reconstruction · RAID 0 / 1 / 5 / 6 / 10',
    summary:
      'Structured diagnostics and virtual array reconstruction for degraded RAID arrays, multiple member disk failures, failed rebuilds, hardware controller faults, missing logical volumes, and accidental array initialization.',
    ctaLabel: 'Request RAID Recovery',
    contextualDeviceType: 'RAID',
    diagramType: 'raid',
    heroImage: SERVICE_IMAGES.raid,
    heroImageAlt: 'Enterprise multi-bay RAID storage enclosure with anodized drive caddies in a dark data laboratory',
    showBengaluruSupport: true,
    overviewParagraphs: [
      'RAID systems are designed for uptime or throughput—not as a replacement for backups. When a second drive fails in a RAID 5, a parity rebuild stalls halfway through, or a hardware RAID controller corrupts configuration metadata, entire business operations and databases can go offline instantly.',
      'LOSTBYTE never performs destructive rebuilds on customer member drives. Instead, we diagnose each member disk individually, clone every readable sector onto clean target storage, determine stripe size, disk order, parity rotation, and offset parameters virtually, and reconstruct the logical volume safely.',
    ],
    failureScenarios: [
      {
        title: 'RAID Degradation & Multiple Disk Failures',
        detail: 'One drive fails unnoticed weeks earlier; when a second disk drops offline, the entire RAID 5 or RAID 10 volume becomes inaccessible.',
      },
      {
        title: 'Failed or Interrupted RAID Rebuild',
        detail: 'Initiating a rebuild with an unstable member disk or wrong disk order can write inconsistent parity across the array.',
      },
      {
        title: 'RAID Controller Hardware Failure',
        detail: 'Dead server RAID cards or corrupted NVRAM configuration causing missing virtual disks or foreign-configuration warnings.',
      },
      {
        title: 'Accidental Re-Initialization or Metadata Corruption',
        detail: 'Unintended array re-creation, RAID superblock damage, or corrupted file systems (NTFS, VMFS, XFS, ext4, ZFS).',
      },
    ],
    supportedItems: [
      'RAID 0 (Striped arrays)',
      'RAID 1 (Mirrored arrays)',
      'RAID 5 & RAID 5E / 5EE (Single-parity arrays)',
      'RAID 6 (Dual-parity arrays)',
      'RAID 10 / 0+1 / 50 and other technically supported hardware & software RAID layouts',
    ],
    recoveryApproach: [
      {
        step: 'Individual Member Drive Diagnostics & Labeling',
        detail: 'Record exact bay positions and assess every member disk independently—including mechanical/firmware triage on dropped drives.',
      },
      {
        step: 'Read-Only Sector Cloning of All Member Disks',
        detail: 'Image healthy and degraded member disks onto staging storage so original customer drives are never altered.',
      },
      {
        step: 'Virtual RAID Parameter Analysis & Reconstruction',
        detail: 'Identify stripe block size, drive order, parity rotation, and staleness (detecting which disk dropped first), then mount virtually to extract data.',
      },
    ],
    immediatePrecautions: [
      'Label every drive with its exact bay/slot number before removing it from the server or enclosure.',
      'Do NOT force drives online, run CHKDSK/fsck, or initialize/recreate the RAID array.',
      'Power down the array if a rebuild has failed or multiple disks show error lights.',
    ],
    feasibilityNote:
      'RAID recovery feasibility depends on how many disks remain readable, whether parity was overwritten by a faulty rebuild, and individual disk health. NDA is available on request for business and enterprise arrays.',
    faqs: [
      {
        question: 'Two drives failed in my RAID 5 array. Is recovery still possible?',
        answer:
          'Often yes—frequently one drive failed earlier (stale) while the second failed due to bad sectors or a recoverable fault. By imaging the recently failed disk individually and excluding the stale drive during virtual reconstruction, data can often be recovered depending on disk condition.',
      },
      {
        question: 'Should I run a RAID rebuild or swap in a new blank drive?',
        answer:
          'No. Forcing a rebuild when other member disks have bad sectors or uncertain history is the single most common cause of irreversible RAID data loss. Shut down the system and consult LOSTBYTE first.',
      },
      {
        question: 'Do I need to send all drives from my RAID array?',
        answer:
          'Yes, send all member drives clearly numbered by bay slot (Bay 1, Bay 2, etc.) so we can evaluate freshness, parity synchronization, and stripe order accurately.',
      },
    ],
    relatedSlugs: [
      'nas-data-recovery',
      'server-data-recovery',
      'hdd-data-recovery',
      'physical-hard-drive-recovery',
    ],
  },

  {
    slug: 'nas-data-recovery',
    path: '/services/nas-data-recovery',
    shortTitle: 'NAS Recovery',
    navLabel: 'NAS Data Recovery',
    category: 'Enterprise, RAID & NAS',
    seoTitle: 'NAS Data Recovery Services India — Multi-Bay & RAID NAS | LOSTBYTE',
    seoDescription:
      'Specialized NAS data recovery for crashed volumes, RAID-based NAS enclosures, multiple drive failures, and inaccessible network shares. Free diagnosis by LOSTBYTE.',
    h1: 'NAS Data Recovery Services',
    eyebrow: 'Network Attached Storage · 2-Bay to 12-Bay+ Systems',
    summary:
      'Dedicated data recovery for RAID-based and multi-bay NAS devices experiencing volume crashes, multiple disk failures, failed firmware updates, inaccessible network shares, or accidental deletion.',
    ctaLabel: 'Request NAS Recovery',
    contextualDeviceType: 'NAS',
    diagramType: 'nas',
    heroImage: SERVICE_IMAGES.raid,
    heroImageAlt: 'Multi-bay network attached storage enclosure housing enterprise hard drives',
    showBengaluruSupport: true,
    overviewParagraphs: [
      'Network Attached Storage (NAS) units power shared team folders, creative video libraries, accounting servers, and automated office backups. Beneath their web dashboards, NAS devices layer Linux software RAID (mdadm), LVM volume groups, proprietary hybrid RAID schemes, and file systems like Btrfs, ext4, or XFS.',
      'When a NAS reports a "Crashed Volume," fails after a firmware update, or loses multiple drives simultaneously, resetting the box or re-inserting disks in the wrong order can wipe metadata. LOSTBYTE reconstructs NAS storage pools offline from safe drive clones.',
    ],
    failureScenarios: [
      {
        title: 'Crashed or Degraded NAS Volume',
        detail: 'System boots to warning alerts with shared folders missing or mounted read-only after drive dropouts.',
      },
      {
        title: 'Multiple Drive Failures in Multi-Bay NAS',
        detail: 'Drives purchased in the same batch often develop bad sectors around the same time, pushing RAID-based NAS volumes offline.',
      },
      {
        title: 'NAS Enclosure Hardware or Power Supply Failure',
        detail: 'Dead NAS motherboard or power unit leaving healthy or partially degraded member disks unreadable on standard Windows/Mac PCs.',
      },
      {
        title: 'Logical Volume Damage & Deleted Shared Folders',
        detail: 'Corrupted Btrfs/ext4/XFS file systems, damaged LVM/thin-provisioning metadata, or accidental share deletion.',
      },
    ],
    supportedItems: [
      '2-bay, 4-bay, 6-bay, 8-bay, and rackmount NAS units',
      'RAID 0, 1, 5, 6, 10, JBOD, and hybrid RAID NAS configurations',
      'ext4, Btrfs, XFS, NTFS, and ZFS NAS file systems',
      'LVM and Linux mdadm multi-layer volume structures',
    ],
    recoveryApproach: [
      {
        step: 'Safe Bay Mapping & Drive Triage',
        detail: 'Document slot order and check every NAS disk individually for bad sectors, firmware issues, or mechanical faults.',
      },
      {
        step: 'Full Sector Cloning & Pool Assembly',
        detail: 'Image all member drives and virtually assemble mdadm/RAID layers, LVM mappings, and file systems without altering original disks.',
      },
      {
        step: 'Shared Folder Extraction & Confidentiality',
        detail: 'Recover intact folder permissions/trees onto agreed delivery media under confidential handling (NDA available on request).',
      },
    ],
    immediatePrecautions: [
      'Do not press the NAS hardware reset button or reinstall NAS operating system firmware.',
      'Do not pull drives out and plug them individually into a Windows PC—Windows may prompt to initialize them.',
      'Power off the NAS cleanly and number every drive tray before transport.',
    ],
    feasibilityNote:
      'NAS recovery feasibility depends on member drive condition, file system metadata state, and whether volume re-initialization occurred. Initial assessment is free and NDA is available on request.',
    faqs: [
      {
        question: 'My NAS box stopped powering on, but the drives may still be fine. Can you extract the data?',
        answer:
          'Yes. Because NAS disks use Linux RAID/LVM/Btrfs/ext4 layouts that Windows cannot read natively, we image the member disks and reconstruct the volume virtually to extract your shared folders.',
      },
      {
        question: 'Can you recover data from a Btrfs or ext4 crashed NAS volume?',
        answer:
          'Yes. We evaluate Btrfs, ext4, XFS, and RAID-based NAS volumes offline from sector clones so no further damage occurs to your original drives.',
      },
      {
        question: 'Do you coordinate pickup for multi-bay NAS units in Delhi NCR?',
        answer:
          'Yes. We coordinate Delhi NCR pickup (with upfront disclosure of case-dependent pickup charges) and accept securely packed NAS drives by courier from anywhere in India.',
      },
    ],
    relatedSlugs: [
      'raid-data-recovery',
      'server-data-recovery',
      'hdd-data-recovery',
      'corrupted-drive-recovery',
    ],
  },

  {
    slug: 'server-data-recovery',
    path: '/services/server-data-recovery',
    shortTitle: 'Server Data Recovery',
    navLabel: 'Server Data Recovery',
    category: 'Enterprise, RAID & NAS',
    seoTitle: 'Server Data Recovery Services India — Enterprise Storage & RAID | LOSTBYTE',
    seoDescription:
      'Confidential server data recovery for failed server drives, RAID crashes, corrupted file systems, and business data loss. Free initial diagnosis & NDA available.',
    h1: 'Server Data Recovery Services',
    eyebrow: 'Business & Enterprise Storage · Confidential Handling & NDA',
    summary:
      'Specialized data recovery for tower and rackmount business servers suffering from RAID controller crashes, failed SAS/SATA/NVMe server drives, logical volume corruption, and critical database loss.',
    ctaLabel: 'Request Server Recovery',
    contextualDeviceType: 'Server Storage',
    diagramType: 'server',
    heroImage: SERVICE_IMAGES.raid,
    heroImageAlt: 'Enterprise rackmount server storage array in a clean dark data facility',
    showBengaluruSupport: true,
    overviewParagraphs: [
      'When an office file server, ERP host, virtualization server, or database array goes down, every hour of uncertainty affects payroll, billing, client projects, and operations. Server environments combine complex hardware RAID controllers, enterprise SAS/SATA/NVMe drives, virtual disk containers, and multi-terabyte volumes.',
      'LOSTBYTE approaches server data loss with disciplined forensic isolation—cloning member drives first, reconstructing array geometry and logical volumes virtually, and protecting sensitive corporate records under strict confidentiality with formal NDA availability.',
    ],
    failureScenarios: [
      {
        title: 'Server RAID Array & Controller Crashes',
        detail: 'Missing virtual drives, degraded parity arrays, or dead hardware RAID cards after power events or maintenance.',
      },
      {
        title: 'Failed Enterprise SAS, SATA, or NVMe Server Drives',
        detail: 'Single or multiple drive dropouts caused by heavy 24/7 read/write wear, bad sectors, or mechanical head degradation.',
      },
      {
        title: 'Corrupted Server File Systems & Logical Volumes',
        detail: 'Inaccessible Windows Server NTFS/ReFS volumes, Linux LVM/ext4/XFS partitions, or damaged virtual machine storage datastores.',
      },
      {
        title: 'Accidental Volume Deletion or Configuration Reset',
        detail: 'Unintended array re-configuration, deleted virtual disks (VMDK/VHDX), or corrupted SQL/accounting database files.',
      },
    ],
    supportedItems: [
      'Tower and rackmount business server storage arrays',
      'Enterprise SAS, SATA, and NVMe server drives',
      'Hardware RAID 0, 1, 5, 6, 10, and 50 server volumes',
      'Windows Server (NTFS/ReFS), Linux (ext4/XFS/LVM), and virtual disk containers (subject to assessment)',
    ],
    recoveryApproach: [
      {
        step: 'Confidential Intake & NDA Execution',
        detail: 'Execute NDA on request, log bay order, and assess individual server drives without altering original media.',
      },
      {
        step: 'Sector-Level Cloning & Virtual Volume Assembly',
        detail: 'Acquire stable sector images of all drives, reverse-engineer array stripe/parity layout, and rebuild logical partitions.',
      },
      {
        step: 'Priority Business File Verification',
        detail: 'Focus on verifying critical accounting records, databases, virtual disks, and shared repositories before delivery coordination.',
      },
    ],
    immediatePrecautions: [
      'Avoid running automated fsck, CHKDSK, or RAID controller repair wizards on a failing production server.',
      'Label every server drive caddy clearly with its physical slot index before removal.',
      'Do not overwrite degraded drives by deploying a fresh OS or initializing a new virtual disk.',
    ],
    feasibilityNote:
      'Server data recovery feasibility depends on physical disk condition, parity integrity, and whether overwriting or destructive rebuilds occurred. We provide transparent findings and estimates after free initial diagnosis.',
    faqs: [
      {
        question: 'Can LOSTBYTE sign a corporate Non-Disclosure Agreement (NDA) before receiving server drives?',
        answer:
          'Yes. Confidentiality is standard across all cases, and a formal NDA is available on request for businesses, accounting firms, agencies, and enterprises.',
      },
      {
        question: 'Do we need to ship the entire heavy rackmount server chassis?',
        answer:
          'Usually only the clearly labeled member drives (and occasionally the RAID controller if needed) are required. Contact +91 63885 07400 first so we can advise on safe removal and transport.',
      },
      {
        question: 'Can you recover databases and virtual machine files from a failed server?',
        answer:
          'Yes, subject to underlying sector and array integrity. We verify key database files, accounting directories, and virtual disk images during assessment.',
      },
    ],
    relatedSlugs: [
      'raid-data-recovery',
      'nas-data-recovery',
      'hdd-data-recovery',
      'physical-hard-drive-recovery',
    ],
  },

  {
    slug: 'cctv-dvr-nvr-recovery',
    path: '/services/cctv-dvr-nvr-recovery',
    shortTitle: 'CCTV / DVR / NVR Recovery',
    navLabel: 'CCTV / DVR / NVR Recovery',
    category: 'Surveillance & Logical',
    seoTitle: 'CCTV, DVR & NVR Hard Drive Data Recovery Services | LOSTBYTE',
    seoDescription:
      'Recover deleted, formatted, corrupted, or inaccessible CCTV footage from DVR and NVR surveillance hard drives. Free initial diagnosis by LOSTBYTE.',
    h1: 'CCTV, DVR & NVR Footage Recovery',
    eyebrow: 'Surveillance Storage Recovery · Proprietary Video File Systems',
    summary:
      'Specialized recovery for DVR and NVR surveillance hard drives suffering from deleted recordings, formatted storage, corrupted video indexes, inaccessible playback, or failed 24/7 surveillance drives.',
    ctaLabel: 'Request CCTV Recovery',
    contextualDeviceType: 'CCTV / DVR / NVR',
    diagramType: 'cctv',
    heroImage: SERVICE_IMAGES.cctv,
    heroImageAlt: 'Surveillance hard disk drive alongside a matte-black multi-channel NVR digital video recorder unit',
    showBengaluruSupport: true,
    overviewParagraphs: [
      'Surveillance DVRs and NVRs do not store footage like ordinary Windows folders. Most security recorders use proprietary, undocumented raw video file systems and continuous ring-buffer recording across 24/7 surveillance-grade hard drives.',
      'Connecting a DVR/NVR hard drive to a normal PC often prompts you to initialize or format the drive—which destroys the video index. LOSTBYTE specializes in analyzing surveillance storage raw structures, extracting timestamped camera channels, and evaluating failed surveillance HDDs.',
    ],
    failureScenarios: [
      {
        title: 'Accidentally Formatted DVR / NVR Hard Drive',
        detail: 'Formatting inside the recorder menu wipes the recording index, yet raw video frames frequently remain recoverable if recording was stopped immediately.',
      },
      {
        title: 'Deleted or Missing Incident Footage',
        detail: 'Specific date/time windows vanish due to accidental deletion, recorder glitch, or index corruption.',
      },
      {
        title: 'Failed 24/7 Surveillance Hard Drive',
        detail: 'Continuous write workloads lead to heavy bad sectors, firmware hangs, or mechanical head failures in 3.5-inch surveillance drives.',
      },
      {
        title: 'Corrupted Video Streams & Playback Failures',
        detail: 'Power surges during recording leave incomplete H.264/H.265 streams or unreadable channel timelines.',
      },
    ],
    supportedItems: [
      'Multi-channel DVR and NVR 3.5-inch surveillance hard drives',
      'Proprietary Linux/raw surveillance file systems & video containers',
      'Multi-camera H.264 / H.265 / MPEG-4 surveillance streams (subject to format & overwrite state)',
      'Single-drive and multi-bay NVR surveillance arrays',
    ],
    recoveryApproach: [
      {
        step: 'Immediate Write-Blocked Imaging',
        detail: 'Clone the surveillance drive sector-by-sector so loop recording or OS auto-mounting cannot alter raw video blocks.',
      },
      {
        step: 'Proprietary File System & Frame Analysis',
        detail: 'Inspect DVR/NVR metadata signatures, camera channel markers, and timestamp headers to locate the target date range.',
      },
      {
        step: 'Playable Video Export & Verification',
        detail: 'Extract recoverable camera channels into standard viewable formats and verify target date/time coverage.',
      },
    ],
    immediatePrecautions: [
      'Power off the DVR/NVR immediately once you realize footage is missing—every minute of loop recording overwrites older footage permanently.',
      'Do NOT initialize or format the surveillance drive if plugged into a Windows computer.',
      'Note the exact target date, time window, and camera channel numbers needed.',
    ],
    feasibilityNote:
      'Once CCTV loop recording physically overwrites old video sectors with newer footage, overwritten blocks cannot be recovered by any technology. Powering off the recorder promptly is critical; feasibility is confirmed honestly during free diagnosis.',
    faqs: [
      {
        question: 'Can overwritten CCTV footage from months ago be recovered?',
        answer:
          'No. Once a DVR/NVR loop-records new video directly over old magnetic sectors, the overwritten video cannot be restored. However, footage deleted or formatted without subsequent overwriting is often recoverable depending on drive condition.',
      },
      {
        question: 'Why does Windows ask to initialize my DVR hard drive when I connect it?',
        answer:
          'Most DVR/NVR units use proprietary surveillance file systems unrecognized by Windows. Never click Initialize or Format—disconnect the drive and send it for free assessment.',
      },
      {
        question: 'Should I send the DVR/NVR box or just the hard drive?',
        answer:
          'In most cases only the hard drive is required, along with the DVR/NVR brand and model number so we know its recording format. Contact us before removing the drive if unsure.',
      },
    ],
    relatedSlugs: [
      'hdd-data-recovery',
      'formatted-data-recovery',
      'deleted-data-recovery',
      'physical-hard-drive-recovery',
    ],
  },

  {
    slug: 'deleted-data-recovery',
    path: '/services/deleted-data-recovery',
    shortTitle: 'Deleted Data Recovery',
    navLabel: 'Deleted Data Recovery',
    category: 'Surveillance & Logical',
    seoTitle: 'Deleted Data Recovery Services — Files, Folders & Partitions | LOSTBYTE',
    seoDescription:
      'Recover permanently deleted files, Shift+Delete folders, emptied Recycle Bin data, and deleted partitions from HDDs, SSDs, USB drives, memory cards, and NAS.',
    h1: 'Deleted Data & Partition Recovery',
    eyebrow: 'Logical Recovery · Shift+Delete & Lost Partitions',
    summary:
      'Careful, write-safe recovery for permanently deleted files, emptied Recycle Bin/Trash folders, Shift+Delete accidents, and accidentally removed disk partitions across supported storage media.',
    ctaLabel: 'Request Deleted Data Recovery',
    contextualDeviceType: 'Internal HDD',
    diagramType: 'deleted',
    heroImage: SERVICE_IMAGES.hdd,
    heroImageAlt: 'Magnetic platter storage surface undergoing write-safe logical sector assessment',
    overviewParagraphs: [
      'When files are permanently deleted or a partition is removed on a hard drive, USB flash drive, or memory card, operating systems typically remove directory index pointers first while leaving the underlying file data on disk until new writes claim those clusters.',
      'Installing freeware recovery tools directly onto the affected drive—or continuing to browse and save files—quickly overwrites deleted clusters. LOSTBYTE works from read-only sector clones to maximize recovery quality without risking remaining data.',
    ],
    failureScenarios: [
      {
        title: 'Shift+Delete & Emptied Recycle Bin / Trash',
        detail: 'Critical documents, photo libraries, project folders, or accounting backups permanently removed by mistake.',
      },
      {
        title: 'Deleted or Unallocated Disk Partitions',
        detail: 'Accidental partition deletion in Disk Management, Diskpart clean commands, or dual-boot setup errors.',
      },
      {
        title: 'Removable Media Deletions (External HDD, USB, SD)',
        detail: 'Files erased from external drives, pen drives, and camera cards that bypass desktop trash folders.',
      },
      {
        title: 'Deleted NAS Shares or Server Directories',
        detail: 'Accidental deletion of shared business folders on network storage volumes.',
      },
    ],
    supportedItems: [
      'Internal and external HDDs (NTFS, exFAT, FAT32, APFS, HFS+, ext4)',
      'USB pen drives and SD / microSD memory cards',
      'SATA and NVMe SSDs (subject to TRIM state)',
      'RAID, NAS, and server logical volumes',
    ],
    recoveryApproach: [
      {
        step: 'Immediate Write-Blocked Imaging',
        detail: 'Capture an exact sector-level copy of the storage device so no temporary files or OS writes touch original clusters.',
      },
      {
        step: 'File System Journal & Metadata Parsing',
        detail: 'Analyze MFT records, file system journals, and orphaned directory trees to preserve original file names and folder paths.',
      },
      {
        step: 'Deep Signature Carving & Integrity Check',
        detail: 'Where metadata entries were cleared, scan unallocated space for intact file signatures and verify recovered files open cleanly.',
      },
    ],
    immediatePrecautions: [
      'Stop using the affected drive or computer immediately after accidental deletion.',
      'Never download or install recovery software onto the same drive where files were deleted.',
      'For SSDs, power down promptly to limit background TRIM erasure.',
    ],
    feasibilityNote:
      'Deleted data recovery depends strictly on whether new data has overwritten the released clusters and—on SSDs—whether TRIM commands executed. Initial diagnosis is free.',
    faqs: [
      {
        question: 'I used Shift+Delete on my external hard drive. Can original folder names be restored?',
        answer:
          'When file system metadata entries (such as NTFS MFT records) have not been reused by subsequent writes, original folder structures and file names can often be restored. Stop writing to the drive immediately.',
      },
      {
        question: 'Why shouldn’t I install free recovery apps on the same drive?',
        answer:
          'Downloading, installing, and running software on the affected drive writes hundreds of megabytes of temporary files directly onto the free space where your deleted files reside, causing permanent overwriting.',
      },
      {
        question: 'Is deleted file recovery possible on an SSD?',
        answer:
          'It depends on whether the operating system issued TRIM commands and whether the SSD controller ran garbage collection. Disconnecting the SSD right away gives the highest chance during diagnosis.',
      },
    ],
    relatedSlugs: [
      'formatted-data-recovery',
      'corrupted-drive-recovery',
      'external-hdd-recovery',
      'memory-card-recovery',
    ],
  },

  {
    slug: 'formatted-data-recovery',
    path: '/services/formatted-data-recovery',
    shortTitle: 'Formatted Data Recovery',
    navLabel: 'Formatted Data Recovery',
    category: 'Surveillance & Logical',
    seoTitle: 'Formatted Drive Data Recovery — HDD, External Drive, USB & SD | LOSTBYTE',
    seoDescription:
      'Professional formatted drive data recovery for accidentally formatted hard drives, external HDDs, USB drives, memory cards, and DVR disks. Free initial diagnosis.',
    h1: 'Formatted Drive Data Recovery',
    eyebrow: 'Accidental Format Recovery · Quick Format & Re-Partition',
    summary:
      'Safe, image-first recovery for accidentally formatted internal hard drives, external backup drives, USB flash drives, SD cards, and DVR/NVR surveillance disks.',
    ctaLabel: 'Request Formatted Drive Recovery',
    contextualDeviceType: 'External HDD',
    diagramType: 'formatted',
    heroImage: SERVICE_IMAGES.flash,
    heroImageAlt: 'Flash and storage media prepared for safe formatted partition reconstruction',
    overviewParagraphs: [
      'A single misclick on a "Format Disk" prompt, formatting the wrong USB drive during OS installer creation, or reformatting a camera card before verifying backups can wipe out an entire volume table in seconds.',
      'During a standard quick format on magnetic hard drives and many flash devices, the operating system writes fresh empty file system headers while leaving the bulk of user data blocks behind. LOSTBYTE analyzes raw sector clones to reconstruct prior file systems and recover intact user files.',
    ],
    failureScenarios: [
      {
        title: 'Accidental Quick Format on External or Internal HDD',
        detail: 'Formatting an existing NTFS/exFAT/HFS+ volume before copying important folders elsewhere.',
      },
      {
        title: 'Windows / Linux Bootable USB Creation Over Backup Drive',
        detail: 'Media creation tools reformat and write a few gigabytes over the start of a large external drive—data beyond the written region is often still assessable.',
      },
      {
        title: 'Formatted SD / MicroSD Camera Card',
        detail: 'Card formatted in-camera or on a computer prior to backing up event photos or footage.',
      },
      {
        title: 'Formatted CCTV DVR / NVR Surveillance Drive',
        detail: 'Recorder menu format clearing the playback index while raw video frames may remain un-overwritten.',
      },
    ],
    supportedItems: [
      'Internal and external hard disk drives',
      'USB flash drives and SD / microSD cards',
      'CCTV / DVR / NVR surveillance drives',
      'SATA and NVMe SSDs (subject to TRIM execution assessment)',
    ],
    recoveryApproach: [
      {
        step: 'Read-Only Clone Creation',
        detail: 'Image the formatted device completely before attempting any file system scanning or partition table reconstruction.',
      },
      {
        step: 'Prior File System Remnant Discovery',
        detail: 'Locate backup volume headers, residual MFT/inode tables, and directory fragments from before the format event.',
      },
      {
        step: 'Structured Extraction & Validation',
        detail: 'Reassemble folders and files onto separate target storage and check sample integrity across key file types.',
      },
    ],
    immediatePrecautions: [
      'Do not copy any new files onto the formatted drive.',
      'Do not format the drive a second time back to its previous file system—that causes additional metadata overwriting.',
      'Disconnect the device immediately and contact LOSTBYTE for free diagnosis.',
    ],
    feasibilityNote:
      'Quick-formatted magnetic drives are frequently assessable if no overwriting occurred, whereas full zero-fill formats or TRIM-cleared SSDs severely limit recovery. Feasibility is determined honestly during free initial diagnosis.',
    faqs: [
      {
        question: 'I accidentally turned my 1 TB external backup drive into a Windows installation USB. Can my data be recovered?',
        answer:
          'Often much of the data beyond the few gigabytes written by the Windows installer remains intact on the drive. Stop using the drive immediately—do not reformat it—and submit it for free diagnosis.',
      },
      {
        question: 'What is the difference between a Quick Format and a Full Format for data recovery?',
        answer:
          'A Quick Format clears file system index tables while leaving most underlying file sectors untouched. A Full Format (zero-fill) overwrites every sector with zeros, making magnetic recovery generally impossible.',
      },
      {
        question: 'If I formatted an NTFS drive to exFAT, should I format it back to NTFS?',
        answer:
          'No. Formatting it again writes additional metadata over remaining file records. Leave the drive untouched and let us inspect a sector image.',
      },
    ],
    relatedSlugs: [
      'deleted-data-recovery',
      'corrupted-drive-recovery',
      'external-hdd-recovery',
      'usb-pen-drive-recovery',
    ],
  },

  {
    slug: 'corrupted-drive-recovery',
    path: '/services/corrupted-drive-recovery',
    shortTitle: 'Corrupted Drive Recovery',
    navLabel: 'Corrupted Drive Recovery',
    category: 'Surveillance & Logical',
    seoTitle: 'Corrupted Drive & RAW Partition Data Recovery | LOSTBYTE',
    seoDescription:
      'Recover data from RAW drives, CRC errors, inaccessible partitions, corrupted file systems, and unreadable HDDs, SSDs, USBs, and NAS volumes. Free diagnosis.',
    h1: 'Corrupted Drive & RAW Partition Recovery',
    eyebrow: 'File System Corruption · RAW Drives & CRC Errors',
    summary:
      'Safe diagnostics and data extraction for storage devices showing RAW file systems, cyclic redundancy check (CRC) errors, "Drive is not accessible," or corrupted directory structures.',
    ctaLabel: 'Request Corrupted Drive Recovery',
    contextualDeviceType: 'External HDD',
    diagramType: 'corrupted',
    heroImage: SERVICE_IMAGES.hdd,
    heroImageAlt: 'Precision hard drive hardware inspected for underlying bad sectors causing file system corruption',
    overviewParagraphs: [
      'When a hard drive, SSD, USB drive, or memory card suddenly displays as "RAW," reports "The file or directory is corrupted and unreadable," or throws Data Error (Cyclic Redundancy Check), the root cause is often deeper than a simple software glitch—many "corrupted" drives actually suffer from underlying bad sectors or failing hardware.',
      'Running automated disk-repair tools against a drive with physical bad sectors frequently destroys directory structures and worsens hardware wear. LOSTBYTE diagnoses physical stability first, images readable sectors safely, and then reconstructs the corrupted file system offline.',
    ],
    failureScenarios: [
      {
        title: 'Partition Shows as RAW in Disk Management',
        detail: 'Damaged boot sector, corrupted NTFS MFT, or unsafe removal leaving the OS unable to mount the volume.',
      },
      {
        title: 'Data Error (Cyclic Redundancy Check / I/O Error)',
        detail: 'Strong indicator of physical bad sectors or degraded flash pages preventing reliable reads.',
      },
      {
        title: '"Parameter Is Incorrect" or "Access Is Denied"',
        detail: 'File system metadata corruption or unstable read responses interrupting volume mounting.',
      },
      {
        title: 'Garbled File Names & Missing Subfolders',
        detail: 'Damaged FAT/exFAT/NTFS directory trees caused by sudden power loss during active file writes.',
      },
    ],
    supportedItems: [
      'NTFS, exFAT, and FAT32 Windows volumes',
      'APFS and HFS+ macOS volumes',
      'ext4, XFS, and Btrfs Linux & NAS volumes',
      'Internal HDDs, External HDDs, SSDs, USB drives, and Memory Cards',
    ],
    recoveryApproach: [
      {
        step: 'Hardware Stability Check Before Software Analysis',
        detail: 'Verify whether bad sectors or firmware delays are causing the corruption symptoms before reading file structures.',
      },
      {
        step: 'Multi-Pass Hardware Sector Imaging',
        detail: 'Read healthy regions cleanly first, then carefully target degraded sectors onto a healthy laboratory clone.',
      },
      {
        step: 'Offline File System Reconstruction',
        detail: 'Repair volume structures virtually on the clone—never writing back to the customer’s original storage device.',
      },
    ],
    immediatePrecautions: [
      'Do NOT run CHKDSK /f /r on a corrupted drive that contains unbacked data.',
      'Decline any "Scan and Fix" or "Format Disk" prompts from your operating system.',
      'Disconnect the drive if file explorer freezes whenever it is plugged in.',
    ],
    feasibilityNote:
      'Recovery feasibility depends on the severity of underlying media degradation and whether automated disk-repair tools altered directory tables. Initial assessment is free.',
    faqs: [
      {
        question: 'Why is running CHKDSK dangerous on a corrupted drive?',
        answer:
          'CHKDSK prioritizes making a volume mountable again, not preserving your files. On a drive with bad sectors or damaged MFT records, CHKDSK can truncate files, move fragments into unusable FOUND.000 chunks, and stress failing heads.',
      },
      {
        question: 'What does a Cyclic Redundancy Check (CRC) error mean?',
        answer:
          'A CRC error means the data read from the drive failed its integrity check—commonly caused by physical bad sectors on an HDD or failing flash cells on an SSD/USB drive. Stop copying files and request a free diagnosis.',
      },
      {
        question: 'Can you recover files from a RAW external hard drive without formatting it?',
        answer:
          'Yes. We never format your drive; we image the sectors onto separate storage and reconstruct the original file system virtually.',
      },
    ],
    relatedSlugs: [
      'external-hdd-recovery',
      'formatted-data-recovery',
      'hdd-data-recovery',
      'ssd-data-recovery',
    ],
  },

  {
    slug: 'physical-hard-drive-recovery',
    path: '/services/physical-hard-drive-recovery',
    shortTitle: 'Advanced Hardware Recovery',
    navLabel: 'Physical Hard Drive Recovery',
    category: 'Advanced Hardware & Firmware',
    seoTitle: 'Physical Hard Drive Data Recovery — Clicking & Head Failures | LOSTBYTE',
    seoDescription:
      'Assessment and specialist hardware recovery coordination for clicking hard drives, head failures, mechanical damage, and electronic faults. Bengaluru specialist support available.',
    h1: 'Physical Hard Drive Data Recovery',
    eyebrow: 'Mechanical, Head & Electronic Failures · Specialist Coordination',
    summary:
      'Careful evaluation and structured recovery coordination for clicking hard drives, read/write head failures, stuck spindles, dropped drives, and complex mechanical or electronic faults.',
    ctaLabel: 'Request Physical HDD Recovery',
    contextualDeviceType: 'Internal HDD',
    diagramType: 'physical',
    heroImage: SERVICE_IMAGES.hdd,
    heroImageAlt: 'Close-up of precision hard drive platter stack and actuator read-write head assembly',
    showBengaluruSupport: true,
    overviewParagraphs: [
      'Physical hard drive failures occur when internal mechanical or electronic components malfunction—such as read/write heads damaged by a drop, seized spindle motors, degraded head preamplifiers, or burnt PCB electronics. Standard recovery software cannot resolve physical faults and often accelerates platter wear.',
      'LOSTBYTE performs a disciplined, non-invasive initial assessment to identify physical symptoms accurately. For eligible complex mechanical failures—such as HDD head-related faults and selected head replacement procedures—LOSTBYTE coordinates specialist hardware recovery support in Bengaluru, India, strictly after discussing feasibility, estimates, and obtaining explicit customer approval.',
    ],
    failureScenarios: [
      {
        title: 'Repetitive Clicking or Knocking Sounds',
        detail: 'Indicates the read/write head assembly cannot locate servo tracks on the platter due to head damage or preamplifier failure.',
      },
      {
        title: 'Soft Beeping or Buzzing Without Spin-Up',
        detail: 'Classic symptom of read/write heads stuck to the platter surface (stiction) or a seized spindle motor bearing.',
      },
      {
        title: 'Burnt Smell or Dead Drive After Power Surge',
        detail: 'Damaged TVS protection diodes, burnt motor driver ICs, or corrupted adaptive ROM on the drive circuit board.',
      },
      {
        title: 'Severe Mechanical Drop or Impact',
        detail: 'Physical shock while operating can bend head suspensions or create localized platter media damage.',
      },
    ],
    supportedItems: [
      '3.5-inch desktop and enterprise mechanical hard drives',
      '2.5-inch laptop and portable external hard drives',
      'Selected PCB / ROM-adaptive electronic faults',
      'Eligible head-related and mechanical failures (with Bengaluru specialist coordination on approval)',
    ],
    recoveryApproach: [
      {
        step: 'Non-Invasive Initial Assessment',
        detail: 'Evaluate electrical signature, acoustic behavior, and diagnostic response without breaking drive seals unnecessarily.',
      },
      {
        step: 'Feasibility & Estimate Approval',
        detail: 'Explain whether bench-level electronic work or Bengaluru specialist hardware recovery support is recommended, along with transparent estimates.',
      },
      {
        step: 'Coordinated Specialist Procedure & Imaging',
        detail: 'Upon your explicit approval, coordinate secure transport, specialist hardware recovery, sector imaging, and verified data return.',
      },
    ],
    immediatePrecautions: [
      'Unplug the drive immediately if you hear clicking, scraping, buzzing, or beeping.',
      'Never open the hard drive cover yourself—airborne dust particles immediately scratch spinning platters.',
      'Never swap a random donor PCB without transferring the unique drive-specific ROM/adaptive calibration data.',
    ],
    feasibilityNote:
      'Physical recovery feasibility depends strictly on magnetic platter integrity—severely scored or scratched platters cannot be recovered. Advanced specialist hardware support in Bengaluru is case-dependent and always requires customer approval prior to dispatch.',
    faqs: [
      {
        question: 'Can I fix a burnt hard drive PCB by swapping a board from an identical drive?',
        answer:
          'No. Modern hard drives store unique head and platter calibration data inside a ROM chip on the original PCB. Swapping a board without properly transferring adaptive ROM data can cause the drive to click or damage firmware.',
      },
      {
        question: 'How does LOSTBYTE handle drives that need head replacement?',
        answer:
          'After free initial diagnosis confirms a head-related mechanical fault, LOSTBYTE discusses feasibility and estimated costs with you. Upon your explicit approval, we coordinate specialist hardware recovery support in Bengaluru, India, and manage communication through to delivery.',
      },
      {
        question: 'Will LOSTBYTE send my drive to Bengaluru without asking me first?',
        answer:
          'Never. Outstation device dispatch for specialist hardware recovery occurs strictly after assessment, transparent cost discussion, and explicit customer approval.',
      },
    ],
    relatedSlugs: [
      'hdd-data-recovery',
      'firmware-data-recovery',
      'external-hdd-recovery',
      'internal-hdd-recovery',
    ],
  },

  {
    slug: 'firmware-data-recovery',
    path: '/services/firmware-data-recovery',
    shortTitle: 'Firmware Data Recovery',
    navLabel: 'Firmware Data Recovery',
    category: 'Advanced Hardware & Firmware',
    seoTitle: 'Hard Drive & SSD Firmware Data Recovery Services | LOSTBYTE',
    seoDescription:
      'Specialized firmware data recovery for hard drives and SSDs experiencing BSY lockups, translator corruption, 0 MB capacity reporting, and identification faults.',
    h1: 'Firmware Data Recovery Services',
    eyebrow: 'Service Area & Translator Faults · HDD & SSD',
    summary:
      'Technical diagnostics and firmware-level recovery for hard drives and selected SSDs suffering from corrupted service-area modules, busy-state (BSY) hangs, translator faults, or incorrect capacity reporting.',
    ctaLabel: 'Request Firmware Recovery',
    contextualDeviceType: 'Internal HDD',
    diagramType: 'firmware',
    heroImage: SERVICE_IMAGES.ssd,
    heroImageAlt: 'Precision storage controller and firmware circuit architecture inspected under dark studio lighting',
    showBengaluruSupport: true,
    overviewParagraphs: [
      'Every modern HDD and SSD operates like a miniature computer running embedded microcode—firmware stored inside a hidden Service Area (SA) on magnetic platters or reserved flash blocks. This firmware manages defect lists, head calibration, logical-to-physical translators, and drive identification.',
      'When power loss, bad sectors in the service area, or controller bugs corrupt critical firmware modules, the drive may spin cleanly without clicking yet fail to identify in BIOS, freeze the host computer, or report 0 MB capacity. LOSTBYTE evaluates firmware faults using dedicated diagnostic hardware.',
    ],
    failureScenarios: [
      {
        title: 'Drive Spins Normally But Not Detected (BSY Hang)',
        detail: 'The drive controller enters a perpetual busy state unable to load damaged service-area firmware modules.',
      },
      {
        title: 'Wrong Model Name or 0 GB / 3.86 GB Capacity Reporting',
        detail: 'Indicates fallback into factory ROM safe mode or corrupted LBA translator tables.',
      },
      {
        title: 'Extreme Slow-Responding Hard Drive Syndrome',
        detail: 'Corrupted background defect-reallocation modules cause normal reads to crawl at kilobytes per second even when platters are healthy.',
      },
      {
        title: 'Selected SSD Controller Firmware Lockups',
        detail: 'Flash translation layer (FTL) corruption preventing the controller from exposing logical user partitions.',
      },
    ],
    supportedItems: [
      'Desktop & laptop SATA hard drives with service-area firmware faults',
      'External hard drives stuck in busy or slow-responding firmware states',
      'Selected SATA / NVMe SSD controller firmware issues (subject to controller support)',
      'Enterprise drives with translator or defect-list corruption',
    ],
    recoveryApproach: [
      {
        step: 'Service-Area & Diagnostic Terminal Inspection',
        detail: 'Assess drive readiness registers, ROM version, and critical firmware module readability.',
      },
      {
        step: 'Safe Firmware Module Backup & Virtual Patching',
        detail: 'Back up original ROM and readable firmware resources before applying targeted temporary stabilization or translator reconstruction.',
      },
      {
        step: 'Full Controlled Sector Imaging',
        detail: 'Once stable logical access is achieved, image user sectors onto clean target media and verify directory accessibility.',
      },
    ],
    immediatePrecautions: [
      'Never run consumer firmware update tools from drive manufacturers on a failing drive.',
      'Avoid leaving a slow-responding drive connected for days—prolonged hangs can degrade weak heads.',
      'Power off the device and request a free initial firmware assessment.',
    ],
    feasibilityNote:
      'Firmware recovery feasibility depends on drive family, controller support, whether service-area copies remain readable, and underlying media health. LOSTBYTE evaluates every case transparently before quoting.',
    faqs: [
      {
        question: 'My hard drive spins quietly with no clicking, yet the computer does not detect it. Could it be firmware?',
        answer:
          'Yes—quiet spin-up combined with non-detection, BIOS freezing, or 0 MB capacity reporting is a classic indicator of a firmware or service-area fault rather than a severe head crash. Initial diagnosis will confirm the exact condition.',
      },
      {
        question: 'Will repairing the firmware erase my files?',
        answer:
          'Professional firmware stabilization targets only the drive’s hidden service-area modules or virtual RAM loader so user data sectors can be imaged safely—we never format or wipe user partitions.',
      },
      {
        question: 'Can every SSD with a firmware lockup be recovered?',
        answer:
          'No. SSD firmware recovery depends heavily on whether the specific controller family is supported by professional diagnostic protocols and whether NAND blocks remain readable. We confirm feasibility honestly after free diagnosis.',
      },
    ],
    relatedSlugs: [
      'hdd-data-recovery',
      'ssd-data-recovery',
      'physical-hard-drive-recovery',
      'sata-ssd-recovery',
    ],
  },
];

export const SERVICES_BY_SLUG: Record<string, ServicePageData> = Object.fromEntries(
  SERVICES.map((service) => [service.slug, service]),
);

/**
 * The exact 14 Homepage Services Showcase Cards linking to dedicated service pages.
 */
export const HOMEPAGE_SERVICE_SLUGS: string[] = [
  'hdd-data-recovery',
  'external-hdd-recovery',
  'ssd-data-recovery',
  'nvme-ssd-recovery',
  'usb-pen-drive-recovery',
  'memory-card-recovery',
  'raid-data-recovery',
  'nas-data-recovery',
  'server-data-recovery',
  'cctv-dvr-nvr-recovery',
  'deleted-data-recovery',
  'formatted-data-recovery',
  'corrupted-drive-recovery',
  'physical-hard-drive-recovery',
];

export const HOMEPAGE_SERVICES: ServicePageData[] = HOMEPAGE_SERVICE_SLUGS.map(
  (slug) => SERVICES_BY_SLUG[slug],
).filter(Boolean);

export const MEGA_MENU_GROUPS: Array<{
  title: string;
  items: Array<{ label: string; path: string; note: string }>;
}> = [
  {
    title: 'Hard Disk Drives',
    items: [
      { label: 'HDD Data Recovery', path: '/services/hdd-data-recovery', note: 'Desktop, laptop & bad sectors' },
      { label: 'Internal HDD Recovery', path: '/services/internal-hdd-recovery', note: '3.5" & 2.5" SATA / SAS' },
      { label: 'External HDD Recovery', path: '/services/external-hdd-recovery', note: 'Portable USB & dropped drives' },
      { label: 'Physical Hard Drive Recovery', path: '/services/physical-hard-drive-recovery', note: 'Clicking & head-related faults' },
      { label: 'Firmware Data Recovery', path: '/services/firmware-data-recovery', note: 'BSY lockups & translator faults' },
    ],
  },
  {
    title: 'SSD & Flash Media',
    items: [
      { label: 'SSD Data Recovery', path: '/services/ssd-data-recovery', note: 'Controller & NAND diagnostics' },
      { label: 'SATA SSD Recovery', path: '/services/sata-ssd-recovery', note: '2.5" & M.2 SATA modules' },
      { label: 'NVMe SSD Recovery', path: '/services/nvme-ssd-recovery', note: 'M.2 PCIe high-speed drives' },
      { label: 'USB / Pen Drive Recovery', path: '/services/usb-pen-drive-recovery', note: 'RAW, formatted & broken ports' },
      { label: 'Memory Card Recovery', path: '/services/memory-card-recovery', note: 'SD, SDXC & microSD media' },
    ],
  },
  {
    title: 'Enterprise, CCTV & Logical',
    items: [
      { label: 'RAID Data Recovery', path: '/services/raid-data-recovery', note: 'RAID 0, 1, 5, 6 & 10 arrays' },
      { label: 'NAS Data Recovery', path: '/services/nas-data-recovery', note: 'Multi-bay & crashed volumes' },
      { label: 'Server Data Recovery', path: '/services/server-data-recovery', note: 'Business storage & NDA support' },
      { label: 'CCTV / DVR / NVR Recovery', path: '/services/cctv-dvr-nvr-recovery', note: 'Surveillance drive footage' },
      { label: 'Deleted / Formatted / Corrupted', path: '/services/deleted-data-recovery', note: 'Logical & RAW volume repair' },
    ],
  },
];
