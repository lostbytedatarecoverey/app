import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MessageCircle,
  Package,
  Phone,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { HddHero3D } from '../components/HddHero3D';
import { ServiceDiagram } from '../components/ServiceDiagram';
import { TrustPoliciesGrid } from '../components/TrustPoliciesGrid';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { BengaluruSupportSection } from '../components/BengaluruSupportSection';
import { EnquiryForm } from '../components/EnquiryForm';
import { FaqAccordion } from '../components/FaqAccordion';
import { LocationMapSection } from '../components/LocationMapSection';
import { useEnquiry } from '../components/EnquiryContext';
import { SITE_CONFIG } from '../config/siteConfig';
import { HOMEPAGE_SERVICES, SERVICE_IMAGES } from '../data/services';
import { ALL_FAQS } from '../data/faqs';
import { buildWhatsAppUrl } from '../utils/enquiry';

const HERO_TRUST_STRIP = [
  { label: '5 Years of Experience', detail: 'Practical data recovery expertise' },
  { label: 'Free Initial Diagnosis', detail: 'Zero-fee technical assessment' },
  { label: 'No Data, No Recovery Fee', detail: 'Transparent recovery billing' },
  { label: 'Customer Approval First', detail: 'Clear estimate before work begins' },
];

export const HomePage: React.FC = () => {
  const { setPageDeviceContext } = useEnquiry();

  useEffect(() => {
    setPageDeviceContext('');
  }, [setPageDeviceContext]);

  const homeFaqs = ALL_FAQS.slice(0, 6);
  const scrollToEnquiry = () => {
    const el = document.getElementById('home-enquiry-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <SeoHead
        title="LOSTBYTE — Professional Data Recovery Services in Delhi NCR & India"
        description="Lost your data? LOSTBYTE recovers files from HDDs, SSDs, NVMe drives, RAID arrays, NAS systems, servers, USB drives, memory cards & CCTV storage. Free initial diagnosis."
        canonicalPath="/"
        faqSchema={homeFaqs.map((f) => ({ question: f.question, answer: f.answer }))}
      />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-[#A7B2C4]/12 bg-[#07090E] pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px]"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 72% 28%, rgba(37, 99, 235, 0.14), transparent 70%)',
          }}
        />

        <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Hero Copy */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold tracking-[0.16em] text-[#00D4FF]">
                PROFESSIONAL DATA RECOVERY SERVICES
              </p>

              <h1 className="text-[clamp(2.25rem,4.2vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-[#F5F7FA]">
                Lost Your Data?{' '}
                <span className="text-[#00D4FF]">Let&apos;s Recover What Matters.</span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-[#A7B2C4] sm:text-lg">
                Professional data recovery solutions for hard drives, SSDs, RAID systems, NAS
                devices, USB drives, memory cards, servers and surveillance storage.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={scrollToEnquiry}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#00D4FF] px-6 py-3.5 text-sm font-semibold text-[#07090E] transition-colors hover:bg-[#38E0FF]"
                >
                  <span>Request Data Recovery</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={SITE_CONFIG.contact.phoneHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#A7B2C4]/25 bg-[#101827] px-5 py-3.5 text-sm font-semibold text-[#F5F7FA] transition-colors hover:border-[#00D4FF]/50 hover:text-[#00D4FF]"
                >
                  <Phone className="h-4 w-4 text-[#00D4FF]" />
                  <span>Talk to a Recovery Specialist</span>
                </a>
              </div>

              <ul className="flex flex-col gap-1.5 pt-2 text-xs text-[#A7B2C4] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-1.5">
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#00D4FF] sm:hidden" />
                  <span>Delhi NCR Pickup &amp; Drop</span>
                </li>
                <li aria-hidden="true" className="hidden text-[#A7B2C4]/50 sm:inline">
                  ·
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#00D4FF] sm:hidden" />
                  <span>All-India Courier Acceptance</span>
                </li>
                <li aria-hidden="true" className="hidden text-[#A7B2C4]/50 sm:inline">
                  ·
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#00D4FF] sm:hidden" />
                  <span>Confidential Handling &amp; NDA</span>
                </li>
              </ul>
            </div>

            {/* Interactive 3D HDD Hero Viewport */}
            <div className="lg:col-span-6">
              <HddHero3D />
            </div>
          </div>

          {/* Professional 4-Column Trust Strip Below Hero Split */}
          <div className="mt-10 grid grid-cols-1 gap-3 border-t border-[#A7B2C4]/14 pt-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {HERO_TRUST_STRIP.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 rounded-xl border border-[#A7B2C4]/14 bg-[#0C1220] px-4 py-3.5"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                <div>
                  <p className="text-sm font-semibold text-[#F5F7FA]">{item.label}</p>
                  <p className="mt-0.5 text-xs text-[#A7B2C4]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14 SPECIALIZED SERVICES SECTION */}
      <section aria-labelledby="services-grid-heading" className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">
                DEDICATED RECOVERY CAPABILITIES
              </p>
              <h2
                id="services-grid-heading"
                className="mt-3 text-2xl font-bold text-[#F5F7FA] sm:text-3xl lg:text-4xl"
              >
                Specialized Recovery for Every Storage Challenge.
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00D4FF] hover:underline whitespace-nowrap shrink-0"
            >
              <span>Explore All 17 Service Pages</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Featured Hardware Photography Strip (Asymmetric 3-Card Visual Showcase) */}
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {[
              {
                title: 'Mechanical HDD & Platter Lab',
                subtitle: 'Internal, External, Clicking & Head-Related Recovery',
                image: SERVICE_IMAGES.hdd,
                alt: 'Precision hard disk drive platters and actuator arm on dark laboratory surface',
                to: '/services/hdd-data-recovery',
              },
              {
                title: 'SATA & M.2 NVMe Solid State',
                subtitle: 'Controller, Firmware & NAND Flash Diagnostics',
                image: SERVICE_IMAGES.ssd,
                alt: 'M.2 NVMe and SATA SSD circuit boards showing flash memory packages and controllers',
                to: '/services/ssd-data-recovery',
              },
              {
                title: 'Enterprise RAID, NAS & Servers',
                subtitle: 'Multi-Disk Virtual Array Reconstruction & NDA',
                image: SERVICE_IMAGES.raid,
                alt: 'Multi-bay enterprise RAID and NAS storage server enclosure',
                to: '/services/raid-data-recovery',
              },
            ].map((feature) => (
              <Link
                key={feature.to}
                to={feature.to}
                className="group relative overflow-hidden rounded-2xl border border-[#A7B2C4]/16 bg-[#101827] transition-colors hover:border-[#00D4FF]/45"
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-[#F5F7FA] group-hover:text-[#00D4FF]">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#A7B2C4]">{feature.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* All 14 Dedicated Service Cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {HOMEPAGE_SERVICES.map((service) => (
              <Link
                key={service.slug}
                to={service.path}
                className="surface-card surface-card-hover group flex flex-col justify-between rounded-2xl p-5"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <ServiceDiagram type={service.diagramType} className="h-10 w-10" />
                    <ArrowRight className="h-4 w-4 text-[#A7B2C4]/50 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[#00D4FF]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#F5F7FA] group-hover:text-[#00D4FF]">
                    {service.shortTitle}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#A7B2C4]">
                    {service.summary}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#A7B2C4]/10 text-xs font-medium text-[#00D4FF]">
                  View recovery details
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE LOSTBYTE & TRUST POLICIES */}
      <div className="border-t border-[#A7B2C4]/12 bg-[#0C1220]">
        <TrustPoliciesGrid />
      </div>

      {/* HOW IT WORKS PROCESS TIMELINE */}
      <section aria-labelledby="home-process-heading" className="border-t border-[#A7B2C4]/12 py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">
                TRANSPARENT RECOVERY WORKFLOW
              </p>
              <h2
                id="home-process-heading"
                className="mt-3 text-2xl font-bold text-[#F5F7FA] sm:text-3xl lg:text-4xl"
              >
                How LOSTBYTE Recovers Your Data
              </h2>
            </div>
            <Link
              to="/how-it-works"
              className="text-sm font-semibold text-[#00D4FF] hover:underline whitespace-nowrap shrink-0"
            >
              See Detailed 7-Step Process
            </Link>
          </div>
          <div className="mt-10">
            <ProcessTimeline compact />
          </div>
        </div>
      </section>

      {/* ADVANCED HARDWARE SUPPORT — BENGALURU */}
      <BengaluruSupportSection />

      {/* DELHI NCR PICKUP & ALL-INDIA COURIER */}
      <section aria-labelledby="logistics-overview-heading" className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">
                PICKUP &amp; NATIONWIDE COURIER
              </p>
              <h2
                id="logistics-overview-heading"
                className="mt-3 text-2xl font-bold text-[#F5F7FA] sm:text-3xl"
              >
                Delhi NCR Pickup &amp; All-India Courier Coordination
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#A7B2C4]">
                Whether you are located across Delhi NCR or anywhere else in India, we guide safe
                device packaging and coordinate collection or courier intake clearly before you
                dispatch your media.
              </p>
              <div className="mt-6">
                <Link
                  to="/pickup-and-drop"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#00D4FF]/40 bg-[#101827] px-5 py-2.5 text-sm font-semibold text-[#F5F7FA] transition-colors hover:border-[#00D4FF] hover:text-[#00D4FF]"
                >
                  <span>Explore Pickup &amp; Courier Process</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <article className="surface-card rounded-2xl p-5">
                <Truck className="h-6 w-6 text-[#00D4FF]" />
                <h3 className="mt-4 text-sm font-semibold text-[#F5F7FA]">
                  Delhi NCR Pickup &amp; Drop
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#A7B2C4]">
                  Coordinated across Delhi, Noida, Gurugram, Ghaziabad, and Faridabad. Pickup
                  charges are case-dependent and disclosed for approval beforehand.
                </p>
              </article>

              <article className="surface-card rounded-2xl p-5">
                <Package className="h-6 w-6 text-[#00D4FF]" />
                <h3 className="mt-4 text-sm font-semibold text-[#F5F7FA]">
                  All-India Courier Intake
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#A7B2C4]">
                  Accept eligible storage devices from every city across India via tracked courier
                  with step-by-step anti-static packaging guidance.
                </p>
              </article>

              <article className="surface-card rounded-2xl p-5">
                <ShieldCheck className="h-6 w-6 text-[#00D4FF]" />
                <h3 className="mt-4 text-sm font-semibold text-[#F5F7FA]">
                  Confidential Data Handling
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#A7B2C4]">
                  Restricted technical access to recovered data, secure return coordination, and
                  Non-Disclosure Agreement (NDA) available on request.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* PRIMARY HOMEPAGE ENQUIRY & DIRECT CONTACT CTA SECTION */}
      <section
        id="home-enquiry-section"
        aria-labelledby="home-enquiry-heading"
        className="border-t border-[#A7B2C4]/12 bg-[#0C1220] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">
                  START YOUR RECOVERY ASSESSMENT
                </p>
                <h2
                  id="home-enquiry-heading"
                  className="mt-3 text-2xl font-bold text-[#F5F7FA] sm:text-3xl lg:text-4xl"
                >
                  Speak With LOSTBYTE or Submit Your Case
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#A7B2C4]">
                  Submit your storage details using the secure enquiry form. You remain on
                  lostbyte.in at all times, and our team follows up directly during business hours
                  to advise safe next steps.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={SITE_CONFIG.contact.phoneHref}
                  className="surface-card surface-card-hover flex items-center gap-3.5 rounded-xl p-4"
                >
                  <Phone className="h-5 w-5 text-[#00D4FF]" />
                  <div>
                    <p className="text-xs text-[#A7B2C4]">Direct Recovery Helpline</p>
                    <p className="text-sm font-semibold text-[#F5F7FA] tabular-nums">
                      {SITE_CONFIG.contact.phoneDisplay}
                    </p>
                  </div>
                </a>

                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-card surface-card-hover flex items-center gap-3.5 rounded-xl p-4"
                >
                  <MessageCircle className="h-5 w-5 text-[#00D4FF]" />
                  <div>
                    <p className="text-xs text-[#A7B2C4]">WhatsApp Specialist Desk</p>
                    <p className="text-sm font-semibold text-[#F5F7FA] tabular-nums">
                      {SITE_CONFIG.contact.phoneDisplay}
                    </p>
                  </div>
                </a>

                <a
                  href={SITE_CONFIG.contact.emailHref}
                  className="surface-card surface-card-hover flex items-center gap-3.5 rounded-xl p-4"
                >
                  <Mail className="h-5 w-5 text-[#00D4FF]" />
                  <div>
                    <p className="text-xs text-[#A7B2C4]">Email Support</p>
                    <p className="text-sm font-semibold text-[#F5F7FA]">
                      {SITE_CONFIG.contact.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-2.5 px-1 pt-1 text-xs text-[#A7B2C4]">
                  <Clock className="h-4 w-4 text-[#00D4FF]" />
                  <span>Business Hours: {SITE_CONFIG.contact.hours} · Burari, Delhi</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS PREVIEW */}
      <section aria-labelledby="home-faq-heading" className="border-t border-[#A7B2C4]/12 py-16 sm:py-20">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">
                COMMON QUESTIONS
              </p>
              <h2
                id="home-faq-heading"
                className="mt-3 text-2xl font-bold text-[#F5F7FA] sm:text-3xl"
              >
                Frequently Asked Questions
              </h2>
            </div>
            <Link
              to="/faq"
              className="text-sm font-semibold text-[#00D4FF] hover:underline whitespace-nowrap shrink-0"
            >
              View All 22 FAQs
            </Link>
          </div>

          <FaqAccordion items={homeFaqs} defaultOpenIndex={0} />
        </div>
      </section>

      {/* GOOGLE MAPS BURARI CHOWK LOCATION SECTION */}
      <LocationMapSection />
    </>
  );
};
