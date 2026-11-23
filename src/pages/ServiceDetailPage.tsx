import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  MessageCircle,
  Phone,
  ShieldAlert,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ServiceDiagram } from '../components/ServiceDiagram';
import { HddHero3D } from '../components/HddHero3D';
import { BengaluruSupportSection } from '../components/BengaluruSupportSection';
import { FaqAccordion } from '../components/FaqAccordion';
import { EnquiryForm } from '../components/EnquiryForm';
import { useEnquiry } from '../components/EnquiryContext';
import { SITE_CONFIG } from '../config/siteConfig';
import { SERVICES_BY_SLUG } from '../data/services';
import { buildWhatsAppUrl } from '../utils/enquiry';
import { NotFoundPage } from './NotFoundPage';

const SHOW_3D_SLUGS = new Set([
  'hdd-data-recovery',
  'physical-hard-drive-recovery',
  'internal-hdd-recovery',
]);

export const ServiceDetailPage: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const service = SERVICES_BY_SLUG[slug];
  const { openEnquiryModal, setPageDeviceContext } = useEnquiry();

  useEffect(() => {
    if (service) {
      setPageDeviceContext(service.contextualDeviceType);
    }
    return () => setPageDeviceContext('');
  }, [service, setPageDeviceContext]);

  if (!service) {
    return <NotFoundPage />;
  }

  const whatsappUrl = buildWhatsAppUrl({ deviceType: service.contextualDeviceType });
  const relatedServices = service.relatedSlugs
    .map((s) => SERVICES_BY_SLUG[s])
    .filter(Boolean);
  const use3DVisual = SHOW_3D_SLUGS.has(service.slug);

  const scrollToForm = () => {
    const el = document.getElementById('service-enquiry-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      openEnquiryModal(service.contextualDeviceType);
    }
  };

  return (
    <>
      <SeoHead
        title={service.seoTitle}
        description={service.seoDescription}
        canonicalPath={service.path}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.navLabel, path: service.path },
        ]}
        serviceSchema={{
          name: service.h1,
          description: service.seoDescription,
          serviceType: service.category,
        }}
        faqSchema={service.faqs}
      />

      {/* SERVICE HERO */}
      <section className="border-b border-[#A7B2C4]/12 bg-[#07090E] py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Services', to: '/services' },
              { label: service.navLabel },
            ]}
          />

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <ServiceDiagram type={service.diagramType} className="h-10 w-10 shrink-0" />
                <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">
                  {service.eyebrow}
                </p>
              </div>

              <h1 className="text-3xl font-bold leading-tight text-[#F5F7FA] sm:text-4xl lg:text-5xl">
                {service.h1}
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-[#A7B2C4]">
                {service.summary}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#00D4FF] px-6 py-3 text-sm font-semibold text-[#07090E] transition-colors hover:bg-[#38E0FF]"
                >
                  <span>{service.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={SITE_CONFIG.contact.phoneHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#A7B2C4]/25 bg-[#101827] px-5 py-3 text-sm font-semibold text-[#F5F7FA] transition-colors hover:border-[#00D4FF]/50 hover:text-[#00D4FF]"
                >
                  <Phone className="h-4 w-4 text-[#00D4FF]" />
                  <span>Call Specialist</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#A7B2C4]/25 bg-[#101827] px-5 py-3 text-sm font-semibold text-[#F5F7FA] transition-colors hover:border-[#00D4FF]/50 hover:text-[#00D4FF]"
                >
                  <MessageCircle className="h-4 w-4 text-[#00D4FF]" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-xs text-[#A7B2C4]">
                <span>Free Initial Diagnosis</span>
                <span aria-hidden="true">·</span>
                <span>No Data, No Recovery Fee</span>
                <span aria-hidden="true">·</span>
                <span>Customer Approval First</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              {use3DVisual ? (
                <HddHero3D compact />
              ) : (
                <div className="overflow-hidden rounded-2xl border border-[#A7B2C4]/18 bg-[#101827]">
                  <img
                    src={service.heroImage}
                    alt={service.heroImageAlt}
                    referrerPolicy="no-referrer"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL OVERVIEW & SUPPORTED MEDIA */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl font-bold text-[#F5F7FA]">
                Understanding {service.shortTitle}
              </h2>
              {service.overviewParagraphs.map((para, idx) => (
                <p key={idx} className="text-sm leading-relaxed text-[#A7B2C4] sm:text-base">
                  {para}
                </p>
              ))}
            </div>

            <div className="lg:col-span-5">
              <div className="surface-card rounded-2xl p-6">
                <h2 className="text-base font-semibold text-[#F5F7FA]">
                  Supported Media &amp; Configurations
                </h2>
                <ul className="mt-4 space-y-3 text-sm text-[#A7B2C4]">
                  {service.supportedItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMON FAILURE SCENARIOS */}
      <section className="border-t border-[#A7B2C4]/12 bg-[#0C1220] py-14 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">
              FAILURE SCENARIOS WE ASSESS
            </p>
            <h2 className="mt-2.5 text-2xl font-bold text-[#F5F7FA] sm:text-3xl">
              Common Symptoms &amp; Causes
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {service.failureScenarios.map((scenario) => (
              <article key={scenario.title} className="surface-card rounded-2xl p-6">
                <h3 className="text-base font-semibold text-[#F5F7FA]">{scenario.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#A7B2C4]">{scenario.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL APPROACH & IMMEDIATE PRECAUTIONS */}
      <section className="border-t border-[#A7B2C4]/12 py-14 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">
                RECOVERY METHODOLOGY
              </p>
              <h2 className="mt-2.5 text-2xl font-bold text-[#F5F7FA]">
                How LOSTBYTE Approaches This Failure
              </h2>
              <ol className="mt-6 space-y-4">
                {service.recoveryApproach.map((item, idx) => (
                  <li key={item.step} className="surface-card rounded-2xl p-5">
                    <div className="flex items-start gap-3.5">
                      <span className="font-[var(--font-mono)] text-xs font-semibold text-[#00D4FF] tabular-nums pt-0.5">
                        0{idx + 1}.
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-[#F5F7FA]">{item.step}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#A7B2C4]">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="rounded-2xl border border-amber-400/25 bg-[#101827] p-6">
                <div className="flex items-center gap-2.5 text-amber-300">
                  <AlertTriangle className="h-5 w-5 shrink-0" />
                  <h2 className="text-base font-semibold text-[#F5F7FA]">
                    Immediate Precautions to Protect Your Data
                  </h2>
                </div>
                <ul className="mt-4 space-y-3 text-sm text-[#A7B2C4]">
                  {service.immediatePrecautions.map((precaution) => (
                    <li key={precaution} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                      <span>{precaution}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="surface-card rounded-2xl p-6">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="h-5 w-5 shrink-0 text-[#00D4FF]" />
                  <h3 className="text-sm font-semibold text-[#F5F7FA]">
                    Honest Technical Feasibility Policy
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#A7B2C4]">
                  {service.feasibilityNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENGALURU SPECIALIST SUPPORT (ON RELEVANT HARDWARE / ARRAY SERVICES) */}
      {service.showBengaluruSupport && <BengaluruSupportSection />}

      {/* CONTEXTUAL ENQUIRY FORM */}
      <section
        id="service-enquiry-form"
        className="border-t border-[#A7B2C4]/12 bg-[#0C1220] py-14 sm:py-16"
      >
        <div className="mx-auto max-w-[840px] px-4 sm:px-6 lg:px-8">
          <EnquiryForm
            initialDeviceType={service.contextualDeviceType}
            heading={service.ctaLabel}
            subheading={`Storage Device Type is pre-selected to ${service.contextualDeviceType}. Enter your contact details and capacity to arrange free initial diagnosis.`}
          />
        </div>
      </section>

      {/* SERVICE-SPECIFIC FAQS */}
      <section className="border-t border-[#A7B2C4]/12 py-14 sm:py-16">
        <div className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-[#F5F7FA]">
            {service.shortTitle} — Frequently Asked Questions
          </h2>
          <FaqAccordion items={service.faqs} defaultOpenIndex={0} />
        </div>
      </section>

      {/* RELATED INTERNAL LINKS */}
      <section className="border-t border-[#A7B2C4]/12 bg-[#0C1220] py-14">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-[#F5F7FA]">Related Data Recovery Services</h2>
            <Link to="/services" className="text-xs font-semibold text-[#00D4FF] hover:underline">
              View All Services
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                to={rel.path}
                className="surface-card surface-card-hover group rounded-xl p-5"
              >
                <ServiceDiagram type={rel.diagramType} className="mb-3 h-9 w-9" />
                <h3 className="text-sm font-semibold text-[#F5F7FA] group-hover:text-[#00D4FF]">
                  {rel.navLabel}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs text-[#A7B2C4]">{rel.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
