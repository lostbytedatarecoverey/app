import React, { createContext, useCallback, useContext, useState } from 'react';
import type { DeviceTypeOption } from '../config/siteConfig';
import { resolveContextualDeviceType } from '../utils/enquiry';

interface EnquiryContextValue {
  modalOpen: boolean;
  selectedDevice: DeviceTypeOption | '';
  pageDeviceContext: DeviceTypeOption | '';
  openEnquiryModal: (deviceHint?: string) => void;
  closeEnquiryModal: () => void;
  setPageDeviceContext: (device?: DeviceTypeOption | '') => void;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export const EnquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<DeviceTypeOption | ''>('');
  const [pageDeviceContext, setPageDeviceContextState] = useState<DeviceTypeOption | ''>('');

  const openEnquiryModal = useCallback(
    (deviceHint?: string) => {
      const resolved = resolveContextualDeviceType(deviceHint) || pageDeviceContext;
      setSelectedDevice(resolved);
      setModalOpen(true);
    },
    [pageDeviceContext],
  );

  const closeEnquiryModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const setPageDeviceContext = useCallback((device?: DeviceTypeOption | '') => {
    setPageDeviceContextState(device || '');
  }, []);

  return (
    <EnquiryContext.Provider
      value={{
        modalOpen,
        selectedDevice,
        pageDeviceContext,
        openEnquiryModal,
        closeEnquiryModal,
        setPageDeviceContext,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
};

export function useEnquiry(): EnquiryContextValue {
  const ctx = useContext(EnquiryContext);
  if (!ctx) {
    throw new Error('useEnquiry must be used inside EnquiryProvider');
  }
  return ctx;
}
