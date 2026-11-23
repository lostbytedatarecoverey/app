import React, { useEffect, useState } from 'react';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FaqAccordion } from '../components/FaqAccordion';
import { useEnquiry } from '../components/EnquiryContext';
import { ALL_FAQS, type FaqItem } from '../data/faqs';
import { SITE_CONFIG } from '../config/siteConfig';
import { buildWhatsAppUrl } from '../utils/enquiry';

const FAQ_CATEGORIES: Array<'All Questions' | FaqItem['category']> = [
  'All Questions',
  'General & Devices',
  'Process & Policies',
  'Logistics & Hardware',
  'Privacy & Feasibility',
];

export const FaqPage: React.FC = () => {
  const { openEnquiryModal, setPageDeviceContext } = useEnquiry();
  const [selectedCategory, setSelectedCategory] = useState<'All Questions' | FaqItem['category']>(
    'All Questions',
  );

  useEffect(() => {
    setPageDeviceContext('');
  }, [setPageDeviceContext]);

  const filteredFaqs =
    selectedCategory === 'All Questions'
      ? ALL_FAQS
      : ALL_FAQS.filter((item) => item.category === selectedCategory);

  return (
    <>
      <SeoHead
        title="Data Recovery FAQs — Policies, Devices, Pricing & Privacy | LOSTBYTE"
        description="Honest answers to 22 common data recovery questions: supported devices, clicking HDDs, SSD/NVMe, RAID, NAS, CCTV, free diagnosis, No Data No Fee, NDA, and pickup."
        canonicalPath="/faq"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq' },
        ]}
        faqSchema={ALL_FAQS.map((f) => ({ question: f.question, answer: f.answer }))}
      />

      <section className="border-b border-[#A7B2C4]/12 bg-[#07090E] py-12 sm:py-16">
        <div className="mx-auto max-w-[1040px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]} />

          <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">
            FREQUENTLY ASKED QUESTIONS · 22 HONEST ANSWERS
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[#F5F7FA] sm:text-4xl lg:text-5xl">
            Data Recovery Frequently Asked Questions
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#A7B2C4]">
            Straightforward answers about supported devices, free initial diagnosis, our No Data,
            No Recovery Fee policy, Delhi NCR pickup, Bengaluru specialist hardware support, and
            confidential data handling.
          </p>

          <div
            role="tablist"
            aria-label="Filter FAQs by topic"
            className="mt-8 flex flex-wrap gap-2"
          >
            {FAQ_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-[#00D4FF] text-[#07090E]'
                      : 'border border-[#A7B2C4]/18 bg-[#101827] text-[#A7B2C4] hover:border-[#00D4FF]/45 hover:text-[#F5F7FA]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-[1040px] px-4 sm:px-6 lg:px-8">
          <FaqAccordion items={filteredFaqs} defaultOpenIndex={0} />

          <div className="mt-12 rounded-2xl border border-[#A7B2C4]/16 bg-[#0C1220] p-6 sm:p-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="text-xl font-bold text-[#F5F7FA]">
                Have a Specific Storage Symptom Not Listed Above?
              </h2>
              <p className="mt-2 text-sm text-[#A7B2C4]">
                Speak directly with LOSTBYTE during business hours ({SITE_CONFIG.contact.hours}) or
                submit your case details for free initial diagnosis.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => openEnquiryModal()}
                className="inline-flex items-center gap-2 rounded-xl bg-[#00D4FF] px-5 py-3 text-xs font-semibold text-[#07090E] hover:bg-[#38E0FF]"
              >
                <span>Request Recovery</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={SITE_CONFIG.contact.phoneHref}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#A7B2C4]/25 bg-[#101827] px-4 py-3 text-xs font-semibold text-[#F5F7FA] hover:border-[#00D4FF]/50"
              >
                <Phone className="h-3.5 w-3.5 text-[#00D4FF]" />
                <span>Call Now</span>
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#A7B2C4]/25 bg-[#101827] px-4 py-3 text-xs font-semibold text-[#F5F7FA] hover:border-[#00D4FF]/50"
              >
                <MessageCircle className="h-3.5 w-3.5 text-[#00D4FF]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
