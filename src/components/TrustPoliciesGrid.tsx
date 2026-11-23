import React from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle2, FileCheck2, Lock, SearchCheck, Wallet } from 'lucide-react';

const POLICIES = [
  {
    icon: SearchCheck,
    title: 'Free Initial Diagnosis',
    description:
      'Receive an initial technical evaluation of your storage device and probable failure condition without any diagnosis fee.',
  },
  {
    icon: CheckCircle2,
    title: 'No Data, No Recovery Fee',
    description:
      'If the agreed recovery objective is not achieved, no recovery service fee is charged. Separately approved pickup, courier, or third-party logistics expenses may still apply.',
  },
  {
    icon: Wallet,
    title: 'No Advance Recovery Payment',
    description:
      'No advance recovery fee is collected under our normal stated business policy before recovery outcomes are established.',
  },
  {
    icon: FileCheck2,
    title: 'Customer Approval First',
    description:
      'Feasibility, recovery approach, and estimated charges are always shared clearly—no recovery procedure starts without your explicit approval.',
  },
  {
    icon: Lock,
    title: 'Data Confidentiality & NDA',
    description:
      'Customer storage devices and recovered files receive confidential handling with restricted technical access. A Non-Disclosure Agreement (NDA) is available on request.',
  },
  {
    icon: Award,
    title: '5 Years Practical Experience',
    description:
      'Five years of practical, focused data recovery experience across HDDs, SSDs, NVMe drives, RAID arrays, NAS systems, servers, and surveillance storage.',
  },
];

export const TrustPoliciesGrid: React.FC = () => (
  <section aria-labelledby="trust-policies-heading" className="py-16 sm:py-20">
    <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">
            TRANSPARENT CUSTOMER COMMITMENTS
          </p>
          <h2
            id="trust-policies-heading"
            className="mt-3 text-2xl font-bold text-[#F5F7FA] sm:text-3xl lg:text-4xl"
          >
            Why Individuals &amp; Businesses Trust LOSTBYTE
          </h2>
        </div>
        <Link
          to="/service-policy"
          className="text-sm font-medium text-[#00D4FF] hover:underline whitespace-nowrap shrink-0"
        >
          Read Full Service Policy
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {POLICIES.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="surface-card rounded-2xl p-6">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#00D4FF]/25 bg-[#0C1220] text-[#00D4FF]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-[#F5F7FA]">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#A7B2C4]">{item.description}</p>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);
