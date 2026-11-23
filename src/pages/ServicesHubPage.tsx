import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ServiceDiagram } from '../components/ServiceDiagram';
import { EnquiryForm } from '../components/EnquiryForm';
import { useEnquiry } from '../components/EnquiryContext';
import { SERVICES, type ServiceCategory } from '../data/services';

const CATEGORIES: Array<'All Services' | ServiceCategory> = [
  'All Services',
  'Hard Disk Drives',
  'Solid State & Flash',
  'Enterprise, RAID & NAS',
  'Surveillance & Logical',
  'Advanced Hardware & Firmware',
];

export const ServicesHubPage: React.FC = () => {
  const { setPageDeviceContext } = useEnquiry();
  const [activeCategory, setActiveCategory] = useState<'All Services' | ServiceCategory>(
    'All Services',
  );

  useEffect(() => {
    setPageDeviceContext('');
  }, [setPageDeviceContext]);

  const filteredServices =
    activeCategory === 'All Services'
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <>
      <SeoHead
        title="Data Recovery Services — HDD, SSD, NVMe, RAID, NAS, Server & CCTV | LOSTBYTE"
        description="Explore all 17 specialized data recovery services by LOSTBYTE. Internal & external HDDs, SATA & NVMe SSDs, RAID arrays, NAS, servers, USB, memory cards, and CCTV storage."
        canonicalPath="/services"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      />

      <section className="border-b border-[#A7B2C4]/12 bg-[#07090E] py-12 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services' }]} />

          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">
              COMPLETE SERVICE DIRECTORY · 17 DEDICATED RECOVERY SPECIALTIES
            </p>
            <h1 className="mt-3 text-3xl font-bold text-[#F5F7FA] sm:text-4xl lg:text-5xl">
              Specialized Data Recovery Services
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#A7B2C4]">
              LOSTBYTE operates exclusively as a dedicated data recovery service. Every storage
              category below has its own assessment methodology, handling precautions, and
              technical feasibility evaluation.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter recovery services by storage category"
            className="mt-8 flex flex-wrap gap-2"
          >
            {CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(category)}
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

      {/* Services Grid */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <Link
                key={service.slug}
                to={service.path}
                className="surface-card surface-card-hover group flex flex-col justify-between rounded-2xl p-6"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <ServiceDiagram type={service.diagramType} className="h-11 w-11" />
                    <span className="text-xs text-[#A7B2C4]">{service.category}</span>
                  </div>
                  <h2 className="text-lg font-semibold text-[#F5F7FA] group-hover:text-[#00D4FF]">
                    {service.h1}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#A7B2C4]">{service.summary}</p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#A7B2C4]/12 pt-4 text-xs font-semibold text-[#00D4FF]">
                  <span>Explore {service.navLabel}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>

          {/* Scope Transparency Notice */}
          <div className="mt-12 rounded-2xl border border-[#A7B2C4]/16 bg-[#0C1220] p-6 text-sm leading-relaxed text-[#A7B2C4]">
            <p className="font-semibold text-[#F5F7FA]">Focused Scope Policy</p>
            <p className="mt-2">
              LOSTBYTE specializes strictly in storage media data recovery (HDD, SSD, NVMe, USB,
              Memory Cards, RAID, NAS, Server Storage, and CCTV/DVR/NVR drives). We do not provide
              general computer or laptop repair, software installation, networking/AMC, or mobile
              phone data recovery. All recovery services are subject to technical assessment and
              feasibility.
            </p>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="border-t border-[#A7B2C4]/12 bg-[#0C1220] py-16">
        <div className="mx-auto max-w-[820px] px-4 sm:px-6 lg:px-8">
          <EnquiryForm
            heading="Not Sure Which Recovery Category Fits Your Device?"
            subheading="Select your storage device type and capacity below—our specialist will call you to discuss symptoms and arrange free initial diagnosis."
          />
        </div>
      </section>
    </>
  );
};
