import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useEnquiry } from './EnquiryContext';
import { EnquiryForm } from './EnquiryForm';

export const EnquiryModal: React.FC = () => {
  const { modalOpen, selectedDevice, closeEnquiryModal } = useEnquiry();

  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeEnquiryModal();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [modalOpen, closeEnquiryModal]);

  if (!modalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Request Data Recovery Enquiry"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#07090E]/82 p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeEnquiryModal();
      }}
    >
      <div className="relative my-auto w-full max-w-2xl rounded-2xl border border-[#A7B2C4]/22 bg-[#0C1220] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.8)]">
        <button
          type="button"
          onClick={closeEnquiryModal}
          aria-label="Close enquiry dialog"
          className="absolute right-5 top-5 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#A7B2C4]/20 bg-[#07090E] text-[#A7B2C4] transition-colors hover:border-[#00D4FF]/50 hover:text-[#F5F7FA]"
        >
          <X className="h-4 w-4" />
        </button>

        <EnquiryForm
          initialDeviceType={selectedDevice}
          compact
          heading={
            selectedDevice
              ? `Request ${selectedDevice} Recovery`
              : 'Request Data Recovery Assessment'
          }
          subheading="Complete the 6-field enquiry below. You stay on lostbyte.in and receive direct follow-up from our recovery team."
        />
      </div>
    </div>
  );
};
