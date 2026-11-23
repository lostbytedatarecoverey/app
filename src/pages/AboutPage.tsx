import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Lock, ShieldCheck, Wrench } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TrustPoliciesGrid } from '../components/TrustPoliciesGrid';
import { BengaluruSupportSection } from '../components/BengaluruSupportSection';
import { useEnquiry } from '../components/EnquiryContext';
import { SERVICE_IMAGES } from '../data/services';

const OPERATING_PILLARS = [
  {
    icon: Wrench,
    title: 'Focused Exclusively on Data Recovery',
    description:
      'LOSTBYTE does not dilute focus with general computer repair, laptop repair, or unrelated IT services. Every tool and workflow is dedicated strictly to retrieving inaccessible storage data safely.',
  },
  {
    icon: ShieldCheck,
    title: 'Honest Technical Assessment',
    description:
      'We never promise guaranteed recovery before inspecting the device. Customers receive a clear free initial diagnosis explaining realistic technical feasibility and estimated charges before making any decision.',
  },
  {
    icon: Lock,
    title: 'Confidentiality & NDA Protection',
    description:
      'Personal photo archives, business accounting records, legal files, and enterprise server arrays receive restricted confidential handling, with a formal Non-Disclosure Agreement available on request.',
  },
];

export const AboutPage: React.FC = () => {
  const { openEnquiryModal, setPageDeviceContext } = useEnquiry();

  useEffect(() => {
    setPageDeviceContext('');
  }, [setPageDeviceContext]);

  return (
    <>
      <SeoHead
        title="About LOSTBYTE — 5 Years of Practical Data Recovery Experience"
        description="Learn about LOSTBYTE: 5 years of practical data recovery experience across HDDs, SSDs, RAID, NAS, servers, USB, memory cards, and CCTV storage with confidential handling."
        canonicalPath="/about"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ]}
      />

      <section className="border-b border-[#A7B2C4]/12 bg-[#07090E] py-12 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About Us' }]} />

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">
                ABOUT LOSTBYTE · 5 YEARS OF PRACTICAL EXPERIENCE
              </p>
              <h1 className="text-3xl font-bold text-[#F5F7FA] sm:text-4xl lg:text-5xl">
                Specialized in Recovering What Matters Most.
              </h1>
              <p className="text-base leading-relaxed text-[#A7B2C4]">
                LOSTBYTE is a dedicated data recovery service focused on helping individuals and
                businesses regain access to important information stored on damaged, corrupted,
                inaccessible or accidentally formatted storage devices.
              </p>
              <p className="text-sm leading-relaxed text-[#A7B2C4] sm:text-base">
                With five years of practical data recovery experience, LOSTBYTE works on
                software-level recovery and selected hardware-level cases. The business uses
                professional data recovery tools and equipment and coordinates specialist support
                for eligible advanced hardware recovery requirements.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => openEnquiryModal()}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#00D4FF] px-6 py-3 text-sm font-semibold text-[#07090E] transition-colors hover:bg-[#38E0FF]"
                >
                  <span>Request Free Initial Diagnosis</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#A7B2C4]/25 bg-[#101827] px-5 py-3 text-sm font-semibold text-[#F5F7FA] hover:border-[#00D4FF]/50 hover:text-[#00D4FF]"
                >
                  <span>Explore Supported Services</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-[#A7B2C4]/18 bg-[#101827]">
                <img
                  src={SERVICE_IMAGES.raid}
                  alt="Enterprise multi-bay RAID and storage media hardware inspected in dark technical environment"
                  referrerPolicy="no-referrer"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Pillars */}
      <section className="py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {OPERATING_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article key={pillar.title} className="surface-card rounded-2xl p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#00D4FF]/25 bg-[#0C1220] text-[#00D4FF]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#F5F7FA]">{pillar.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#A7B2C4]">
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border border-[#A7B2C4]/16 bg-[#0C1220] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-[#F5F7FA]">Our Responsible Handling Principles</h2>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                'Read-only imaging approach wherever technically possible so original media is protected',
                'Clear, direct customer communication before every diagnostic or recovery stage',
                'Explicit customer approval required before any paid recovery or outstation dispatch',
                'Delhi NCR pickup & delivery coordination plus all-India courier device acceptance',
                'Transparent disclosure of case-dependent pickup or courier logistics expenses',
                'Strict separation from unrelated computer repair or mobile phone recovery claims',
              ].map((point) => (
                <div key={point} className="flex items-start gap-2.5 text-sm text-[#A7B2C4]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BengaluruSupportSection />
      <TrustPoliciesGrid />
    </>
  );
};
