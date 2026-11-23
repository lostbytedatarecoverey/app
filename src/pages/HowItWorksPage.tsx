import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { BengaluruSupportSection } from '../components/BengaluruSupportSection';
import { EnquiryForm } from '../components/EnquiryForm';
import { useEnquiry } from '../components/EnquiryContext';

export const HowItWorksPage: React.FC = () => {
  const { setPageDeviceContext } = useEnquiry();

  useEffect(() => {
    setPageDeviceContext('');
  }, [setPageDeviceContext]);

  return (
    <>
      <SeoHead
        title="How Data Recovery Works — 7-Step Transparent Process | LOSTBYTE"
        description="See LOSTBYTE's 7-step data recovery workflow: enquiry, free initial diagnosis, feasibility assessment, mandatory customer approval, recovery, verification, and secure delivery."
        canonicalPath="/how-it-works"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'How It Works', path: '/how-it-works' },
        ]}
      />

      <section className="border-b border-[#A7B2C4]/12 bg-[#07090E] py-12 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'How It Works' }]} />
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">
              STRUCTURED 7-STEP WORKFLOW
            </p>
            <h1 className="mt-3 text-3xl font-bold text-[#F5F7FA] sm:text-4xl lg:text-5xl">
              How LOSTBYTE Data Recovery Works
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#A7B2C4]">
              Every storage case follows a disciplined, approval-first sequence designed to protect
              your original media and give you full cost clarity before any chargeable recovery
              procedure begins.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <ProcessTimeline />

          {/* Before Sending Your Device Checklist */}
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="surface-card rounded-2xl p-6 sm:p-7">
              <div className="flex items-center gap-2.5 text-[#00D4FF]">
                <CheckCircle2 className="h-5 w-5" />
                <h2 className="text-lg font-semibold text-[#F5F7FA]">
                  Recommended Steps Before Handover
                </h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-[#A7B2C4]">
                <li>Power off and disconnect any clicking, slow, or accidentally formatted drive immediately.</li>
                <li>For RAID or NAS arrays, label every drive with its exact bay slot number before removing it.</li>
                <li>Write down critical folder names or file types you need prioritized during verification.</li>
                <li>Pack drives in anti-static sleeves surrounded by generous bubble wrap inside a rigid box for courier dispatch.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-400/25 bg-[#101827] p-6 sm:p-7">
              <div className="flex items-center gap-2.5 text-amber-300">
                <AlertTriangle className="h-5 w-5" />
                <h2 className="text-lg font-semibold text-[#F5F7FA]">
                  What to Avoid to Prevent Permanent Loss
                </h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-[#A7B2C4]">
                <li>Do not click &ldquo;Format Disk&rdquo; or &ldquo;Initialize&rdquo; when your operating system prompts you.</li>
                <li>Do not run CHKDSK, fsck, or install recovery apps directly onto the failing drive.</li>
                <li>Do not force a RAID rebuild or press the hardware reset button on a crashed NAS.</li>
                <li>Never open a mechanical hard drive lid—airborne dust rapidly destroys magnetic platters.</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#A7B2C4]/16 bg-[#0C1220] p-6 text-sm text-[#A7B2C4]">
            <p>
              <strong className="text-[#F5F7FA]">Honest Turnaround Expectations:</strong> Recovery
              duration depends on capacity, bad-sector severity, array complexity, and hardware
              condition. Realistic timing is communicated after free initial diagnosis rather than
              unverified turnaround promises.
            </p>
            <Link
              to="/pickup-and-drop"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00D4FF] hover:underline whitespace-nowrap shrink-0"
            >
              <span>View Pickup &amp; Courier Process</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <BengaluruSupportSection />

      <section className="py-16">
        <div className="mx-auto max-w-[840px] px-4 sm:px-6 lg:px-8">
          <EnquiryForm
            heading="Begin Step 01 — Describe Your Storage Device"
            subheading="Submit the form below or call +91 63885 07400 to begin your free initial diagnosis."
          />
        </div>
      </section>
    </>
  );
};
