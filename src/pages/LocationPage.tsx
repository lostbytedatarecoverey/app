import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, MapPin, MessageCircle, Phone } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ServiceDiagram } from '../components/ServiceDiagram';
import { FaqAccordion } from '../components/FaqAccordion';
import { LocationMapSection } from '../components/LocationMapSection';
import { EnquiryForm } from '../components/EnquiryForm';
import { useEnquiry } from '../components/EnquiryContext';
import { LOCATION_PAGES } from '../data/locations';
import { HOMEPAGE_SERVICES } from '../data/services';
import { SITE_CONFIG } from '../config/siteConfig';
import { buildWhatsAppUrl } from '../utils/enquiry';
import { NotFoundPage } from './NotFoundPage';

interface LocationPageProps {
  locationKey: 'data-recovery-delhi' | 'data-recovery-delhi-ncr' | 'data-recovery-burari';
}

export const LocationPage: React.FC<LocationPageProps> = ({ locationKey }) => {
  const data = LOCATION_PAGES[locationKey];
  const { setPageDeviceContext } = useEnquiry();

  useEffect(() => {
    setPageDeviceContext('');
  }, [setPageDeviceContext]);

  if (!data) {
    return <NotFoundPage />;
  }

  const featuredServices = HOMEPAGE_SERVICES.slice(0, 8);
  const whatsappUrl = buildWhatsAppUrl({ location: data.regionName });

  return (
    <>
      <SeoHead
        title={data.seoTitle}
        description={data.seoDescription}
        canonicalPath={data.path}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: `Data Recovery ${data.regionName}`, path: data.path },
        ]}
        faqSchema={data.faqs}
      />

      {/* HERO */}
      <section className="border-b border-[#A7B2C4]/12 bg-[#07090E] py-12 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: 'Home', to: '/' }, { label: `Data Recovery ${data.regionName}` }]}
          />

          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">{data.eyebrow}</p>
            <h1 className="text-3xl font-bold text-[#F5F7FA] sm:text-4xl lg:text-5xl">{data.h1}</h1>
            <p className="text-base leading-relaxed text-[#A7B2C4]">{data.heroSummary}</p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#location-enquiry"
                className="inline-flex items-center gap-2 rounded-xl bg-[#00D4FF] px-6 py-3 text-sm font-semibold text-[#07090E] hover:bg-[#38E0FF]"
              >
                <span>Request Free Diagnosis</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={SITE_CONFIG.contact.phoneHref}
                className="inline-flex items-center gap-2 rounded-xl border border-[#A7B2C4]/25 bg-[#101827] px-5 py-3 text-sm font-semibold text-[#F5F7FA] hover:border-[#00D4FF]/50"
              >
                <Phone className="h-4 w-4 text-[#00D4FF]" />
                <span>{SITE_CONFIG.contact.phoneDisplay}</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#A7B2C4]/25 bg-[#101827] px-5 py-3 text-sm font-semibold text-[#F5F7FA] hover:border-[#00D4FF]/50"
              >
                <MessageCircle className="h-4 w-4 text-[#00D4FF]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* REGIONAL LOGISTICS & AREAS */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl font-bold text-[#F5F7FA]">{data.logisticsHeading}</h2>
              {data.logisticsParagraphs.map((p, idx) => (
                <p key={idx} className="text-sm leading-relaxed text-[#A7B2C4] sm:text-base">
                  {p}
                </p>
              ))}

              <div className="pt-3">
                <h3 className="text-base font-semibold text-[#F5F7FA]">
                  Why Customers in {data.regionName} Choose LOSTBYTE
                </h3>
                <ul className="mt-3.5 space-y-2.5 text-sm text-[#A7B2C4]">
                  {data.whyLocalBullets.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="surface-card rounded-2xl p-6">
                <div className="flex items-center gap-2 text-[#00D4FF]">
                  <MapPin className="h-4 w-4" />
                  <h2 className="text-base font-semibold text-[#F5F7FA]">
                    Eligible Coordination Zones
                  </h2>
                </div>
                <ul className="mt-4 space-y-2.5 text-sm text-[#A7B2C4]">
                  {data.areasCovered.map((area) => (
                    <li key={area} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#A7B2C4]/16 bg-[#0C1220] p-5 text-xs leading-relaxed text-[#A7B2C4]">
                <p className="font-semibold text-[#F5F7FA]">Important Coordination Notice</p>
                <p className="mt-1.5">{data.pickupProcessNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORTED SERVICES IN THIS REGION */}
      <section className="border-t border-[#A7B2C4]/12 bg-[#0C1220] py-14">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#F5F7FA]">
                Supported Storage Recovery in {data.regionName}
              </h2>
              <p className="mt-1.5 text-sm text-[#A7B2C4]">
                Dedicated service pages covering every storage type we assess.
              </p>
            </div>
            <Link to="/services" className="text-xs font-semibold text-[#00D4FF] hover:underline">
              View All 17 Services
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((srv) => (
              <Link
                key={srv.slug}
                to={srv.path}
                className="surface-card surface-card-hover group rounded-xl p-5"
              >
                <ServiceDiagram type={srv.diagramType} className="mb-3 h-9 w-9" />
                <h3 className="text-sm font-semibold text-[#F5F7FA] group-hover:text-[#00D4FF]">
                  {srv.shortTitle}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs text-[#A7B2C4]">{srv.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section id="location-enquiry" className="border-t border-[#A7B2C4]/12 py-14 sm:py-16">
        <div className="mx-auto max-w-[840px] px-4 sm:px-6 lg:px-8">
          <EnquiryForm
            heading={`Request Data Recovery in ${data.regionName}`}
            subheading="Share your storage device details and locality so we can discuss diagnosis and pickup coordination."
          />
        </div>
      </section>

      {/* REGIONAL FAQS */}
      <section className="border-t border-[#A7B2C4]/12 bg-[#0C1220] py-14">
        <div className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-[#F5F7FA]">
            {data.regionName} Data Recovery FAQs
          </h2>
          <FaqAccordion items={data.faqs} defaultOpenIndex={0} />
        </div>
      </section>

      <LocationMapSection />
    </>
  );
};
