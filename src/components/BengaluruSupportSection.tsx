import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useEnquiry } from './EnquiryContext';
import { SERVICE_IMAGES } from '../data/services';

const HARDWARE_EXAMPLES = [
  'HDD read/write head-related failures',
  'Selected head replacement procedures',
  'Complex mechanical & spindle problems',
  'Selected PCB & electronic failures',
  'Other eligible advanced hardware cases',
];

const COORDINATION_STEPS = [
  'Initial device assessment',
  'Feasibility discussion',
  'Estimate and customer approval',
  'Secure device coordination',
  'Specialist recovery procedure',
  'Customer communication',
  'Recovery result and delivery coordination',
];

export const BengaluruSupportSection: React.FC = () => {
  const { openEnquiryModal } = useEnquiry();

  return (
    <section
      aria-labelledby="bengaluru-hardware-heading"
      className="border-y border-[#A7B2C4]/12 bg-[#0C1220] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Left Narrative & Process */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">
                SPECIALIST COORDINATION · BENGALURU, INDIA
              </p>
              <h2
                id="bengaluru-hardware-heading"
                className="mt-3 text-2xl font-bold text-[#F5F7FA] sm:text-3xl lg:text-4xl"
              >
                Advanced Hardware Recovery Support
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#A7B2C4] sm:text-base">
                For eligible complex hardware failures, LOSTBYTE can coordinate specialist hardware
                recovery support in Bengaluru, India. Outstation coordination is case-dependent and
                only initiated after initial assessment, clear feasibility discussion, and your
                explicit written or confirmed approval.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="surface-card rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-[#F5F7FA]">
                  Eligible Complex Hardware Cases
                </h3>
                <ul className="mt-3.5 space-y-2.5 text-sm text-[#A7B2C4]">
                  {HARDWARE_EXAMPLES.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="surface-card rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-[#F5F7FA]">
                  Structured Coordination Workflow
                </h3>
                <ol className="mt-3.5 space-y-2 text-sm text-[#A7B2C4]">
                  {COORDINATION_STEPS.map((step, index) => (
                    <li key={step} className="flex items-start gap-2.5">
                      <span className="font-[var(--font-mono)] text-xs font-semibold text-[#00D4FF] tabular-nums">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="button"
                onClick={() => openEnquiryModal('Internal HDD')}
                className="inline-flex items-center gap-2 rounded-lg bg-[#00D4FF] px-5 py-2.5 text-sm font-semibold text-[#07090E] transition-colors hover:bg-[#38E0FF]"
              >
                <span>Request Hardware Assessment</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-xs text-[#A7B2C4]">
                Bengaluru is a specialist support location only; outstation dispatch requires prior
                customer approval.
              </p>
            </div>
          </div>

          {/* Right Studio Hardware Visual */}
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-[#A7B2C4]/18 bg-[#101827]">
              <img
                src={SERVICE_IMAGES.hdd}
                alt="Precision enterprise hard drive platters and read-write head assembly during hardware inspection"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/82 to-transparent p-6">
                <p className="text-xs font-semibold tracking-wider text-[#00D4FF]">
                  CASE-DEPENDENT FEASIBILITY
                </p>
                <p className="mt-1.5 text-sm text-[#F5F7FA]">
                  Every mechanical failure is assessed first for platter integrity and realistic
                  recovery viability before any advanced procedure is authorized.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
