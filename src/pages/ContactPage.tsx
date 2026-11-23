import React, { useEffect } from 'react';
import { Clock, Mail, MapPin, MessageCircle, PackageCheck, Phone, Truck } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { EnquiryForm } from '../components/EnquiryForm';
import { LocationMapSection } from '../components/LocationMapSection';
import { useEnquiry } from '../components/EnquiryContext';
import { SITE_CONFIG } from '../config/siteConfig';
import { buildWhatsAppUrl } from '../utils/enquiry';

export const ContactPage: React.FC = () => {
  const { setPageDeviceContext } = useEnquiry();

  useEffect(() => {
    setPageDeviceContext('');
  }, [setPageDeviceContext]);

  const whatsappUrl = buildWhatsAppUrl();

  return (
    <>
      <SeoHead
        title="Contact LOSTBYTE — Request Free Data Recovery Diagnosis | Delhi NCR & India"
        description="Contact LOSTBYTE for professional data recovery. Call or WhatsApp +91 63885 07400, email supportlostbyte@gmail.com, or submit our online recovery enquiry form."
        canonicalPath="/contact"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />

      <section className="border-b border-[#A7B2C4]/12 bg-[#07090E] py-12 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />

          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">
              DIRECT RECOVERY SUPPORT · 10 AM – 9 PM IST
            </p>
            <h1 className="mt-3 text-3xl font-bold text-[#F5F7FA] sm:text-4xl lg:text-5xl">
              Contact LOSTBYTE
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#A7B2C4]">
              Reach our data recovery desk by phone, WhatsApp, email, or the online enquiry form
              below. We assist individuals and businesses across Delhi NCR and all of India.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            {/* Left Contact Details & Instant Actions */}
            <div className="lg:col-span-5 space-y-5">
              <div className="surface-card rounded-2xl p-6 space-y-5">
                <div>
                  <p className="text-lg font-bold tracking-wider text-[#F5F7FA]">
                    LOST<span className="text-[#00D4FF]">BYTE</span>
                  </p>
                  <p className="mt-1 text-xs text-[#A7B2C4]">{SITE_CONFIG.brand.category}</p>
                </div>

                <dl className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                    <div>
                      <dt className="text-xs text-[#A7B2C4]">Phone</dt>
                      <dd className="mt-0.5 font-semibold text-[#F5F7FA] tabular-nums">
                        <a href={SITE_CONFIG.contact.phoneHref} className="hover:text-[#00D4FF]">
                          {SITE_CONFIG.contact.phoneDisplay}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                    <div>
                      <dt className="text-xs text-[#A7B2C4]">WhatsApp</dt>
                      <dd className="mt-0.5 font-semibold text-[#F5F7FA] tabular-nums">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#00D4FF]"
                        >
                          {SITE_CONFIG.contact.phoneDisplay}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                    <div>
                      <dt className="text-xs text-[#A7B2C4]">Email</dt>
                      <dd className="mt-0.5 font-semibold text-[#F5F7FA]">
                        <a
                          href={SITE_CONFIG.contact.emailHref}
                          className="break-all hover:text-[#00D4FF]"
                        >
                          {SITE_CONFIG.contact.email}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                    <div>
                      <dt className="text-xs text-[#A7B2C4]">Business Hours</dt>
                      <dd className="mt-0.5 font-medium text-[#F5F7FA] tabular-nums">
                        {SITE_CONFIG.contact.hours}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                    <div>
                      <dt className="text-xs text-[#A7B2C4]">Operating Base</dt>
                      <dd className="mt-0.5 font-medium text-[#F5F7FA]">
                        {SITE_CONFIG.contact.locationLabel}
                      </dd>
                    </div>
                  </div>
                </dl>

                {/* Direct Action Buttons */}
                <div className="grid grid-cols-1 gap-2.5 pt-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  <a
                    href={SITE_CONFIG.contact.phoneHref}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#00D4FF] px-4 py-2.5 text-xs font-semibold text-[#07090E] transition-colors hover:bg-[#38E0FF]"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#A7B2C4]/25 bg-[#0C1220] px-4 py-2.5 text-xs font-semibold text-[#F5F7FA] transition-colors hover:border-[#00D4FF]/50 hover:text-[#00D4FF]"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-[#00D4FF]" />
                    <span>WhatsApp Now</span>
                  </a>
                  <a
                    href={SITE_CONFIG.contact.emailHref}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#A7B2C4]/25 bg-[#0C1220] px-4 py-2.5 text-xs font-semibold text-[#F5F7FA] transition-colors hover:border-[#00D4FF]/50 hover:text-[#00D4FF]"
                  >
                    <Mail className="h-3.5 w-3.5 text-[#00D4FF]" />
                    <span>Email Us</span>
                  </a>
                </div>
              </div>

              {/* Service Coverage Summary */}
              <div className="surface-card rounded-2xl p-6 space-y-3.5">
                <h2 className="text-sm font-semibold text-[#F5F7FA]">Service Coverage</h2>
                <div className="flex items-start gap-3 text-xs leading-relaxed text-[#A7B2C4]">
                  <Truck className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                  <span>
                    <strong className="text-[#F5F7FA]">Delhi NCR:</strong> Pickup and delivery
                    coordination (case-dependent charges disclosed and approved beforehand).
                  </span>
                </div>
                <div className="flex items-start gap-3 text-xs leading-relaxed text-[#A7B2C4]">
                  <PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                  <span>
                    <strong className="text-[#F5F7FA]">All India:</strong> Eligible storage media
                    accepted via secure tracked courier with packaging guidance.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Main Enquiry Form */}
            <div className="lg:col-span-7">
              <EnquiryForm
                heading="Submit a Data Recovery Enquiry"
                subheading="Fill out your device details below. You stay on lostbyte.in and receive direct follow-up from our recovery desk."
              />
            </div>
          </div>
        </div>
      </section>

      <LocationMapSection />
    </>
  );
};
