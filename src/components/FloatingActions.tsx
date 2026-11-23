import React from 'react';
import { FileText, MessageCircle, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { buildWhatsAppUrl } from '../utils/enquiry';
import { useEnquiry } from './EnquiryContext';

export const FloatingActions: React.FC = () => {
  const { openEnquiryModal, pageDeviceContext } = useEnquiry();
  const whatsappHref = buildWhatsAppUrl({ deviceType: pageDeviceContext || undefined });

  return (
    <>
      {/* Compact Desktop Floating WhatsApp FAB (sits cleanly in outer viewport gutter, never overlaps form cards) */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp LOSTBYTE Data Recovery Specialist"
        title="WhatsApp Support"
        className="group fixed bottom-5 right-4 z-30 hidden md:inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#00D4FF]/45 bg-[#0C1220] text-[#00D4FF] shadow-[0_12px_32px_rgba(0,0,0,0.65)] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#00D4FF] hover:bg-[#101827]"
      >
        <MessageCircle className="h-5 w-5" />
      </a>

      {/* Compact Sticky Mobile Action Bar (height 52px; keeps total mobile sticky footprint <= 14% of 844px viewport) */}
      <div
        role="region"
        aria-label="Quick Contact Actions"
        className="fixed bottom-0 left-0 right-0 z-30 grid h-[52px] grid-cols-3 border-t border-[#A7B2C4]/18 bg-[#07090E]/98 md:hidden"
      >
        <a
          href={SITE_CONFIG.contact.phoneHref}
          className="inline-flex items-center justify-center gap-1.5 border-r border-[#A7B2C4]/14 text-xs font-semibold text-[#F5F7FA]"
        >
          <Phone className="h-3.5 w-3.5 text-[#00D4FF]" />
          <span>Call Now</span>
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 border-r border-[#A7B2C4]/14 text-xs font-semibold text-[#F5F7FA]"
        >
          <MessageCircle className="h-3.5 w-3.5 text-[#00D4FF]" />
          <span>WhatsApp</span>
        </a>
        <button
          type="button"
          onClick={() => openEnquiryModal()}
          className="inline-flex items-center justify-center gap-1.5 bg-[#00D4FF] text-xs font-semibold text-[#07090E]"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Enquire</span>
        </button>
      </div>
    </>
  );
};
