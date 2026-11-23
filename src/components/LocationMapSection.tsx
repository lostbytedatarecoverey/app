import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, MapPin, PackageCheck, Truck } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface LocationMapSectionProps {
  heading?: string;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({
  heading = 'Serving Delhi NCR and Customers Across India',
}) => (
  <section aria-labelledby="location-map-heading" className="border-t border-[#A7B2C4]/12 bg-[#0C1220] py-16 sm:py-20">
    <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        {/* Left Coverage Details */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">
              REGIONAL &amp; NATIONWIDE COVERAGE
            </p>
            <h2
              id="location-map-heading"
              className="mt-3 text-2xl font-bold text-[#F5F7FA] sm:text-3xl"
            >
              {heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#A7B2C4]">
              {SITE_CONFIG.maps.landmarkStatement}
            </p>
          </div>

          <div className="space-y-4">
            <div className="surface-card rounded-xl p-4 flex items-start gap-3.5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#00D4FF]" />
              <div>
                <p className="text-sm font-semibold text-[#F5F7FA]">
                  Geographical Landmark Reference
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#A7B2C4]">
                  {SITE_CONFIG.maps.landmarkLabel} (landmark reference only—device pickups and
                  courier intake are scheduled after enquiry confirmation).
                </p>
              </div>
            </div>

            <div className="surface-card rounded-xl p-4 flex items-start gap-3.5">
              <Truck className="mt-0.5 h-5 w-5 shrink-0 text-[#00D4FF]" />
              <div>
                <p className="text-sm font-semibold text-[#F5F7FA]">
                  Delhi NCR Pickup &amp; Delivery Coordination
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#A7B2C4]">
                  Available across eligible areas of Delhi, Noida, Gurugram, Ghaziabad, and
                  Faridabad. Pickup charges are case-dependent and approved upfront.
                </p>
              </div>
            </div>

            <div className="surface-card rounded-xl p-4 flex items-start gap-3.5">
              <PackageCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#00D4FF]" />
              <div>
                <p className="text-sm font-semibold text-[#F5F7FA]">
                  All-India Courier Device Acceptance
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#A7B2C4]">
                  Customers anywhere in India can dispatch eligible HDDs, SSDs, RAID/NAS drives,
                  and flash media via secure courier after receiving packaging instructions.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
            <a
              href={SITE_CONFIG.maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-[#00D4FF] hover:underline"
            >
              <span>Open Burari Chowk on Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <span className="text-[#A7B2C4]/40" aria-hidden="true">
              ·
            </span>
            <Link to="/pickup-and-drop" className="font-medium text-[#F5F7FA] hover:text-[#00D4FF]">
              View Pickup &amp; Drop Details
            </Link>
          </div>
        </div>

        {/* Right Responsive Google Maps Embed */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative flex-1 min-h-[340px] overflow-hidden rounded-2xl border border-[#A7B2C4]/18 bg-[#101827]">
            <iframe
              title="Burari Chowk, Burari, Delhi, India — LOSTBYTE Regional Landmark Reference"
              src={SITE_CONFIG.maps.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[340px] w-full border-0"
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#A7B2C4]">
            <span>Landmark reference: Burari Chowk · Burari, Delhi</span>
            <div className="flex items-center gap-3">
              <Link to="/data-recovery-delhi" className="hover:text-[#00D4FF]">
                Delhi
              </Link>
              <span aria-hidden="true">·</span>
              <Link to="/data-recovery-delhi-ncr" className="hover:text-[#00D4FF]">
                Delhi NCR
              </Link>
              <span aria-hidden="true">·</span>
              <Link to="/data-recovery-burari" className="hover:text-[#00D4FF]">
                Burari
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
