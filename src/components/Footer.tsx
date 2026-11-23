import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SITE_CONFIG } from '../config/siteConfig';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#A7B2C4]/14 bg-[#0C1220] pb-20 md:pb-10 pt-16">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link to="/" aria-label="LOSTBYTE Home" className="inline-block">
              <BrandLogo variant="footer" />
            </Link>
            <p className="text-sm font-semibold tracking-wide text-[#00D4FF]">
              {SITE_CONFIG.brand.tagline}
            </p>
            <p className="text-sm leading-relaxed text-[#A7B2C4]">
              {SITE_CONFIG.brand.category}. Dedicated to HDD, SSD, NVMe, RAID, NAS, Server, USB,
              Memory Card, and CCTV storage recovery with transparent assessment and confidential
              handling.
            </p>
            <div className="pt-1 text-xs text-[#A7B2C4]">
              <Link to="/data-recovery-delhi" className="hover:text-[#00D4FF]">
                Delhi
              </Link>
              <span className="mx-2" aria-hidden="true">
                ·
              </span>
              <Link to="/data-recovery-delhi-ncr" className="hover:text-[#00D4FF]">
                Delhi NCR
              </Link>
              <span className="mx-2" aria-hidden="true">
                ·
              </span>
              <Link to="/data-recovery-burari" className="hover:text-[#00D4FF]">
                Burari
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h2 className="mb-4 text-sm font-semibold text-[#F5F7FA]">Quick Links</h2>
            <ul className="space-y-2.5 text-sm text-[#A7B2C4]">
              <li>
                <Link to="/" className="transition-colors hover:text-[#00D4FF]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-[#00D4FF]">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="transition-colors hover:text-[#00D4FF]">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="transition-colors hover:text-[#00D4FF]">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pickup-and-drop" className="transition-colors hover:text-[#00D4FF]">
                  Pickup &amp; Drop
                </Link>
              </li>
              <li>
                <Link to="/faq" className="transition-colors hover:text-[#00D4FF]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-[#00D4FF]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h2 className="mb-4 text-sm font-semibold text-[#F5F7FA]">Services</h2>
            <ul className="space-y-2.5 text-sm text-[#A7B2C4]">
              <li>
                <Link
                  to="/services/hdd-data-recovery"
                  className="transition-colors hover:text-[#00D4FF]"
                >
                  HDD Recovery
                </Link>
              </li>
              <li>
                <Link
                  to="/services/ssd-data-recovery"
                  className="transition-colors hover:text-[#00D4FF]"
                >
                  SSD Recovery
                </Link>
              </li>
              <li>
                <Link
                  to="/services/raid-data-recovery"
                  className="transition-colors hover:text-[#00D4FF]"
                >
                  RAID Recovery
                </Link>
              </li>
              <li>
                <Link
                  to="/services/nas-data-recovery"
                  className="transition-colors hover:text-[#00D4FF]"
                >
                  NAS Recovery
                </Link>
              </li>
              <li>
                <Link
                  to="/services/usb-pen-drive-recovery"
                  className="transition-colors hover:text-[#00D4FF]"
                >
                  USB Recovery
                </Link>
              </li>
              <li>
                <Link
                  to="/services/server-data-recovery"
                  className="transition-colors hover:text-[#00D4FF]"
                >
                  Server Recovery
                </Link>
              </li>
              <li>
                <Link
                  to="/services/cctv-dvr-nvr-recovery"
                  className="transition-colors hover:text-[#00D4FF]"
                >
                  CCTV Recovery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h2 className="mb-4 text-sm font-semibold text-[#F5F7FA]">Contact</h2>
            <ul className="space-y-3 text-sm text-[#A7B2C4]">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                <a
                  href={SITE_CONFIG.contact.phoneHref}
                  className="tabular-nums text-[#F5F7FA] hover:text-[#00D4FF]"
                >
                  {SITE_CONFIG.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                <a
                  href={SITE_CONFIG.contact.emailHref}
                  className="break-all hover:text-[#00D4FF]"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                <span>{SITE_CONFIG.contact.locationLabel}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4FF]" />
                <span className="tabular-nums">{SITE_CONFIG.contact.hoursShort}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links & Copyright */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#A7B2C4]/14 pt-6 text-xs text-[#A7B2C4] sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-[#F5F7FA]">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-[#F5F7FA]">
              Terms &amp; Conditions
            </Link>
            <Link to="/service-policy" className="hover:text-[#F5F7FA]">
              Service Policy
            </Link>
            <Link to="/data-handling-policy" className="hover:text-[#F5F7FA]">
              Data Handling Policy
            </Link>
          </div>
          <p>© {currentYear} LOSTBYTE. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
