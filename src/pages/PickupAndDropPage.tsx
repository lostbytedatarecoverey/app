import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Info, PackageCheck, ShieldCheck, Truck } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { LocationMapSection } from '../components/LocationMapSection';
import { EnquiryForm } from '../components/EnquiryForm';
import { useEnquiry } from '../components/EnquiryContext';

const PICKUP_STEPS = [
  'Customer submits enquiry via website form, phone, or WhatsApp.',
  'LOSTBYTE contacts the customer to review storage device details.',
  'Pickup feasibility and applicable charges are discussed transparently.',
  'Customer approves pickup or courier arrangements before dispatch.',
  'Device collection (Delhi NCR) or tracked courier intake (All India) is coordinated.',
  'Free initial diagnosis and approved recovery procedures are carried out.',
  'Recovery result and secure return delivery are coordinated.',
];

export const PickupAndDropPage: React.FC = () => {
  const { setPageDeviceContext } = useEnquiry();

  useEffect(() => {
    setPageDeviceContext('');
  }, [setPageDeviceContext]);

  return (
    <>
      <SeoHead
        title="Pickup & Drop Data Recovery — Delhi NCR & All-India Courier | LOSTBYTE"
        description="Coordinated Delhi NCR pickup and delivery plus all-India courier acceptance for eligible hard drives, SSDs, RAID arrays, and NAS devices. Case-dependent pickup charges approved upfront."
        canonicalPath="/pickup-and-drop"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Pickup & Drop', path: '/pickup-and-drop' },
        ]}
      />

      <section className="border-b border-[#A7B2C4]/12 bg-[#07090E] py-12 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Pickup & Drop' }]} />
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">
              DELHI NCR PICKUP &amp; ALL-INDIA COURIER COORDINATION
            </p>
            <h1 className="mt-3 text-3xl font-bold text-[#F5F7FA] sm:text-4xl lg:text-5xl">
              Professional Data Recovery, Delivered to Your Convenience.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#A7B2C4]">
              Coordinate safe pickup and return across eligible Delhi NCR locations or dispatch your
              storage media from anywhere in India via tracked courier with guided anti-static
              packaging instructions.
            </p>
          </div>

          {/* 3 Primary Logistics Service Cards */}
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            <article className="surface-card rounded-2xl p-6">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#00D4FF]/25 bg-[#0C1220] text-[#00D4FF]">
                <Truck className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold text-[#F5F7FA]">
                Delhi NCR Pickup &amp; Delivery
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[#A7B2C4]">
                Available across eligible locations in Delhi, Noida, Greater Noida, Gurugram,
                Ghaziabad, and Faridabad. Applicable pickup charges depend on location and case
                requirements and are disclosed for your approval before scheduling.
              </p>
            </article>

            <article className="surface-card rounded-2xl p-6">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#00D4FF]/25 bg-[#0C1220] text-[#00D4FF]">
                <PackageCheck className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold text-[#F5F7FA]">
                All-India Courier Acceptance
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[#A7B2C4]">
                Customers across India can send eligible internal/external HDDs, SSDs, NVMe drives,
                USB drives, memory cards, and labeled RAID/NAS disks through reliable tracked
                courier after coordinating intake with our team.
              </p>
            </article>

            <article className="surface-card rounded-2xl p-6">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#00D4FF]/25 bg-[#0C1220] text-[#00D4FF]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold text-[#F5F7FA]">Secure Device Handling</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[#A7B2C4]">
                Every received device is logged under a dedicated reference, protected against
                electrostatic and mechanical shock, and handled confidentially with NDA available on
                request.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Pickup Process & Transparent Charge Policy */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-bold text-[#F5F7FA]">
                How Pickup &amp; Delivery Coordination Works
              </h2>
              <ol className="mt-6 space-y-3">
                {PICKUP_STEPS.map((step, index) => (
                  <li
                    key={step}
                    className="surface-card flex items-start gap-3.5 rounded-xl p-4 text-sm text-[#A7B2C4]"
                  >
                    <span className="font-[var(--font-mono)] text-xs font-semibold text-[#00D4FF] tabular-nums pt-0.5">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span className="text-[#F5F7FA]">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="rounded-2xl border border-[#00D4FF]/30 bg-[#101827] p-6">
                <div className="flex items-center gap-2.5 text-[#00D4FF]">
                  <Info className="h-5 w-5 shrink-0" />
                  <h2 className="text-base font-semibold text-[#F5F7FA]">
                    Transparent Pickup Charge Policy
                  </h2>
                </div>
                <ul className="mt-4 space-y-3 text-sm text-[#A7B2C4]">
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                    <span>Pickup charges depend on location and case requirements.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                    <span>
                      All applicable pickup or courier charges are disclosed upfront and require
                      your approval before arrangement.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                    <span>
                      Initial device diagnosis remains free, and our No Data, No Recovery Fee policy
                      applies to recovery service fees (separately approved logistics expenses may
                      still apply).
                    </span>
                  </li>
                </ul>
              </div>

              <div className="surface-card rounded-2xl p-6">
                <h3 className="text-base font-semibold text-[#F5F7FA]">
                  Outstation Courier Packaging Checklist
                </h3>
                <ul className="mt-3.5 space-y-2.5 text-xs leading-relaxed text-[#A7B2C4]">
                  <li>1. Place the storage drive inside an anti-static ESD bag (or clean dry paper wrap if unavailable).</li>
                  <li>2. Wrap generously with at least 4–5 cm of bubble wrap or foam padding on every side.</li>
                  <li>3. Use a rigid corrugated box so the drive cannot shift when shaken gently.</li>
                  <li>4. Include a printed note inside with your full name, phone number, and bay numbers (for RAID/NAS).</li>
                </ul>
                <div className="mt-4 pt-3 border-t border-[#A7B2C4]/12 text-xs">
                  <Link to="/data-recovery-delhi-ncr" className="text-[#00D4FF] hover:underline">
                    See Delhi NCR Regional Coverage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LocationMapSection heading="Burari, Delhi Base & Regional Coverage" />

      <section className="py-16">
        <div className="mx-auto max-w-[840px] px-4 sm:px-6 lg:px-8">
          <EnquiryForm
            heading="Request Pickup or Courier Instructions"
            subheading="Include your city, area, and PIN code in the address field so our team can confirm Delhi NCR pickup feasibility or all-India courier details."
          />
        </div>
      </section>
    </>
  );
};
