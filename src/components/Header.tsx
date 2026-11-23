import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SITE_CONFIG } from '../config/siteConfig';
import { MEGA_MENU_GROUPS } from '../data/services';
import { buildWhatsAppUrl } from '../utils/enquiry';
import { useEnquiry } from './EnquiryContext';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { openEnquiryModal, pageDeviceContext } = useEnquiry();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  const whatsappHref = buildWhatsAppUrl({ deviceType: pageDeviceContext || undefined });
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
      isActive ? 'text-[#00D4FF]' : 'text-[#A7B2C4] hover:text-[#F5F7FA]'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'border-b border-[#A7B2C4]/15 bg-[#07090E]/96 shadow-[0_8px_30px_rgba(0,0,0,0.45)]'
          : 'border-b border-[#A7B2C4]/10 bg-[#07090E]/92'
      }`}
    >
      <div className="mx-auto flex h-[60px] max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to="/"
          aria-label="LOSTBYTE Home"
          className="inline-flex items-center whitespace-nowrap shrink-0 focus-visible:rounded-md"
        >
          <span className="hidden sm:inline-flex">
            <BrandLogo variant="horizontal" />
          </span>
          <span className="inline-flex sm:hidden">
            <BrandLogo variant="compact" />
          </span>
        </Link>

        {/* Zone 2: Desktop Primary Navigation */}
        <nav aria-label="Main Navigation" className="hidden xl:flex items-center gap-6">
          <NavLink to="/" end className={navItemClass}>
            Home
          </NavLink>

          {/* Services Mega Menu Trigger */}
          <div ref={megaRef} className="relative">
            <button
              type="button"
              aria-expanded={megaOpen}
              aria-haspopup="true"
              onClick={() => setMegaOpen((prev) => !prev)}
              className={`inline-flex items-center gap-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                pathname.startsWith('/services') || megaOpen
                  ? 'text-[#00D4FF]'
                  : 'text-[#A7B2C4] hover:text-[#F5F7FA]'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-150 ${megaOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {megaOpen && (
              <div
                role="region"
                aria-label="Services Directory"
                className="absolute left-1/2 top-full z-50 mt-4 w-[860px] -translate-x-1/2 rounded-2xl border border-[#A7B2C4]/18 bg-[#0C1220] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.75)]"
              >
                <div className="grid grid-cols-3 gap-6">
                  {MEGA_MENU_GROUPS.map((group) => (
                    <div key={group.title}>
                      <p className="mb-3 text-xs font-semibold tracking-wider text-[#00D4FF] uppercase">
                        {group.title}
                      </p>
                      <ul className="space-y-1.5">
                        {group.items.map((item) => (
                          <li key={item.path}>
                            <Link
                              to={item.path}
                              onClick={() => setMegaOpen(false)}
                              className="group block rounded-lg px-2.5 py-2 transition-colors hover:bg-[#101827]"
                            >
                              <span className="block text-sm font-medium text-[#F5F7FA] group-hover:text-[#00D4FF]">
                                {item.label}
                              </span>
                              <span className="block text-xs text-[#A7B2C4]">{item.note}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#A7B2C4]/14 pt-4 text-xs text-[#A7B2C4]">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      to="/services"
                      onClick={() => setMegaOpen(false)}
                      className="font-semibold text-[#00D4FF] hover:underline"
                    >
                      View All 17 Recovery Services
                    </Link>
                    <span aria-hidden="true">·</span>
                    <Link
                      to="/services/formatted-data-recovery"
                      onClick={() => setMegaOpen(false)}
                      className="hover:text-[#F5F7FA]"
                    >
                      Formatted Recovery
                    </Link>
                    <span aria-hidden="true">·</span>
                    <Link
                      to="/services/corrupted-drive-recovery"
                      onClick={() => setMegaOpen(false)}
                      className="hover:text-[#F5F7FA]"
                    >
                      Corrupted Drive Recovery
                    </Link>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/data-recovery-delhi"
                      onClick={() => setMegaOpen(false)}
                      className="hover:text-[#F5F7FA]"
                    >
                      Delhi
                    </Link>
                    <span aria-hidden="true">·</span>
                    <Link
                      to="/data-recovery-delhi-ncr"
                      onClick={() => setMegaOpen(false)}
                      className="hover:text-[#F5F7FA]"
                    >
                      Delhi NCR
                    </Link>
                    <span aria-hidden="true">·</span>
                    <Link
                      to="/data-recovery-burari"
                      onClick={() => setMegaOpen(false)}
                      className="hover:text-[#F5F7FA]"
                    >
                      Burari
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <NavLink to="/how-it-works" className={navItemClass}>
            How It Works
          </NavLink>
          <NavLink to="/services/raid-data-recovery" className={navItemClass}>
            RAID &amp; NAS
          </NavLink>
          <NavLink to="/pickup-and-drop" className={navItemClass}>
            Pickup &amp; Drop
          </NavLink>
          <NavLink to="/about" className={navItemClass}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={navItemClass}>
            Contact
          </NavLink>
        </nav>

        {/* Zone 3: Header CTAs */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <a
            href={SITE_CONFIG.contact.phoneHref}
            aria-label={`Call Now ${SITE_CONFIG.contact.phoneDisplay}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#A7B2C4]/20 px-3 py-2 text-xs font-medium text-[#F5F7FA] whitespace-nowrap shrink-0 transition-colors hover:border-[#00D4FF]/50 hover:text-[#00D4FF]"
          >
            <Phone className="h-3.5 w-3.5 text-[#00D4FF]" />
            <span>Call Now</span>
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#A7B2C4]/20 px-3 py-2 text-xs font-medium text-[#F5F7FA] whitespace-nowrap shrink-0 transition-colors hover:border-[#00D4FF]/50 hover:text-[#00D4FF]"
          >
            <MessageCircle className="h-3.5 w-3.5 text-[#00D4FF]" />
            <span>WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => openEnquiryModal()}
            className="inline-flex items-center justify-center rounded-lg bg-[#00D4FF] px-4 py-2 text-xs font-semibold text-[#07090E] whitespace-nowrap shrink-0 transition-colors hover:bg-[#38E0FF]"
          >
            Request Recovery
          </button>
        </div>

        {/* Mobile / Tablet Drawer Toggle */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            type="button"
            onClick={() => openEnquiryModal()}
            className="inline-flex md:hidden items-center justify-center rounded-lg bg-[#00D4FF] px-3 py-2 text-xs font-semibold text-[#07090E] whitespace-nowrap shrink-0"
          >
            Request Recovery
          </button>
          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#A7B2C4]/20 text-[#F5F7FA] hover:border-[#00D4FF]/50"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-[#A7B2C4]/15 bg-[#0C1220] px-4 pb-6 pt-4 shadow-2xl max-h-[82vh] overflow-y-auto">
          <nav aria-label="Mobile Navigation" className="space-y-1">
            {[
              { label: 'Home', to: '/' },
              { label: 'All Services', to: '/services' },
              { label: 'How It Works', to: '/how-it-works' },
              { label: 'RAID & NAS Recovery', to: '/services/raid-data-recovery' },
              { label: 'Pickup & Drop', to: '/pickup-and-drop' },
              { label: 'About Us', to: '/about' },
              { label: 'FAQ', to: '/faq' },
              { label: 'Contact', to: '/contact' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#F5F7FA] hover:bg-[#101827] hover:text-[#00D4FF]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 border-t border-[#A7B2C4]/14 pt-4">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[#00D4FF]">
              Popular Recovery Services
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: 'HDD Recovery', to: '/services/hdd-data-recovery' },
                { label: 'External HDD', to: '/services/external-hdd-recovery' },
                { label: 'SSD Recovery', to: '/services/ssd-data-recovery' },
                { label: 'NVMe SSD', to: '/services/nvme-ssd-recovery' },
                { label: 'RAID Recovery', to: '/services/raid-data-recovery' },
                { label: 'NAS Recovery', to: '/services/nas-data-recovery' },
                { label: 'Server Storage', to: '/services/server-data-recovery' },
                { label: 'CCTV / DVR / NVR', to: '/services/cctv-dvr-nvr-recovery' },
                { label: 'USB / Pen Drive', to: '/services/usb-pen-drive-recovery' },
                { label: 'Memory Card', to: '/services/memory-card-recovery' },
              ].map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg bg-[#101827] px-3 py-2 text-xs font-medium text-[#A7B2C4] hover:text-[#F5F7FA]"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5 border-t border-[#A7B2C4]/14 pt-4">
            <a
              href={SITE_CONFIG.contact.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#A7B2C4]/25 bg-[#101827] px-3 py-2.5 text-xs font-semibold text-[#F5F7FA]"
            >
              <Phone className="h-4 w-4 text-[#00D4FF]" />
              <span>Call Now</span>
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#A7B2C4]/25 bg-[#101827] px-3 py-2.5 text-xs font-semibold text-[#F5F7FA]"
            >
              <MessageCircle className="h-4 w-4 text-[#00D4FF]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
