import React from 'react';

export const RECOVERY_STEPS = [
  {
    number: '01',
    title: 'Contact LOSTBYTE',
    description:
      'Explain the storage issue through phone, WhatsApp, or our website enquiry form. We provide safe immediate handling guidance so no further data is lost.',
  },
  {
    number: '02',
    title: 'Free Initial Diagnosis',
    description:
      'We inspect the storage device to identify probable logical, firmware, electronic, or mechanical failure conditions without a diagnosis fee.',
  },
  {
    number: '03',
    title: 'Recovery Assessment',
    description:
      'Receive a transparent explanation of technical feasibility, recommended recovery approach (software-level or advanced hardware-level), and estimated charges.',
  },
  {
    number: '04',
    title: 'Customer Approval',
    description:
      'We obtain your explicit approval before starting any chargeable recovery procedure or coordinating outstation specialist support.',
  },
  {
    number: '05',
    title: 'Recovery Process',
    description:
      'Our team conducts the appropriate write-safe imaging, logical reconstruction, firmware stabilization, or approved hardware-level procedure.',
  },
  {
    number: '06',
    title: 'Recovery Result',
    description:
      'We inform you clearly of the recovery outcome and file accessibility results. If the agreed objective is not achieved, no recovery service fee applies.',
  },
  {
    number: '07',
    title: 'Secure Delivery',
    description:
      'We coordinate secure data return onto an agreed target drive via Delhi NCR delivery coordination or tracked all-India courier.',
  },
] as const;

interface ProcessTimelineProps {
  compact?: boolean;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ compact = false }) => (
  <ol className={`grid grid-cols-1 gap-4 ${compact ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
    {RECOVERY_STEPS.map((step) => (
      <li
        key={step.number}
        className="surface-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between"
      >
        <div>
          <div className="mb-4 flex items-center justify-between border-b border-[#A7B2C4]/12 pb-3">
            <span className="font-[var(--font-mono)] text-xs font-semibold tracking-wider text-[#00D4FF] tabular-nums">
              STEP {step.number}
            </span>
            <span className="text-[11px] font-medium text-[#A7B2C4]">
              {step.number === '02'
                ? 'Zero Diagnosis Fee'
                : step.number === '04'
                  ? 'Mandatory Consent'
                  : step.number === '06'
                    ? 'No Data, No Fee'
                    : 'Guided Stage'}
            </span>
          </div>
          <h3 className="text-base font-semibold text-[#F5F7FA]">{step.title}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-[#A7B2C4]">{step.description}</p>
        </div>
      </li>
    ))}
  </ol>
);
