import React from 'react';
import type { ServiceDiagramType } from '../data/services';

interface ServiceDiagramProps {
  type: ServiceDiagramType;
  className?: string;
}

/**
 * Distinct, precision technical hardware schematics for each LOSTBYTE service card
 * so no two storage categories rely on a generic repeated icon.
 */
export const ServiceDiagram: React.FC<ServiceDiagramProps> = ({ type, className = 'h-10 w-10' }) => {
  switch (type) {
    case 'hdd':
    case 'internal-hdd':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="7" y="4" width="34" height="40" rx="5" stroke="#A7B2C4" strokeWidth="1.75" />
          <circle cx="24" cy="21" r="11" stroke="#00D4FF" strokeWidth="1.75" />
          <circle cx="24" cy="21" r="3.5" stroke="#F5F7FA" strokeWidth="1.5" />
          <path d="M14 38L22 26" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="14" cy="38" r="2.2" fill="#00D4FF" />
        </svg>
      );
    case 'external-hdd':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="8" y="6" width="32" height="30" rx="5" stroke="#A7B2C4" strokeWidth="1.75" />
          <circle cx="24" cy="20" r="8" stroke="#00D4FF" strokeWidth="1.75" />
          <circle cx="24" cy="20" r="2.5" fill="#F5F7FA" />
          <path d="M24 36V44M19 41H29" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'ssd':
    case 'sata-ssd':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="7" y="8" width="34" height="32" rx="4" stroke="#A7B2C4" strokeWidth="1.75" />
          <rect x="13" y="14" width="9" height="9" rx="1.5" stroke="#00D4FF" strokeWidth="1.75" />
          <rect x="26" y="14" width="9" height="9" rx="1.5" stroke="#2563EB" strokeWidth="1.75" />
          <rect x="13" y="27" width="9" height="7" rx="1.5" stroke="#2563EB" strokeWidth="1.5" />
          <rect x="26" y="27" width="9" height="7" rx="1.5" stroke="#00D4FF" strokeWidth="1.5" />
        </svg>
      );
    case 'nvme-ssd':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="4" y="15" width="40" height="18" rx="3" stroke="#A7B2C4" strokeWidth="1.75" />
          <rect x="11" y="19" width="8" height="10" rx="1" stroke="#00D4FF" strokeWidth="1.75" />
          <rect x="22" y="19" width="8" height="10" rx="1" stroke="#2563EB" strokeWidth="1.75" />
          <rect x="33" y="19" width="6" height="10" rx="1" stroke="#00D4FF" strokeWidth="1.5" />
          <path d="M4 21H7M4 27H7" stroke="#00D4FF" strokeWidth="2" />
        </svg>
      );
    case 'usb':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="15" y="16" width="18" height="26" rx="4" stroke="#A7B2C4" strokeWidth="1.75" />
          <rect x="18" y="6" width="12" height="10" rx="1.5" stroke="#00D4FF" strokeWidth="1.75" />
          <path d="M21 10V12M27 10V12" stroke="#00D4FF" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M24 23V35M20 29L24 25L28 29" stroke="#2563EB" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'memory-card':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <path d="M12 6H30L37 13V42H12V6Z" stroke="#A7B2C4" strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M17 12V19M21 12V19M25 12V19M29 14V19" stroke="#00D4FF" strokeWidth="1.75" strokeLinecap="round" />
          <rect x="17" y="26" width="15" height="10" rx="1.5" stroke="#2563EB" strokeWidth="1.6" />
        </svg>
      );
    case 'raid':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="6" y="7" width="36" height="9" rx="2" stroke="#A7B2C4" strokeWidth="1.6" />
          <rect x="6" y="19.5" width="36" height="9" rx="2" stroke="#00D4FF" strokeWidth="1.75" />
          <rect x="6" y="32" width="36" height="9" rx="2" stroke="#2563EB" strokeWidth="1.6" />
          <path d="M12 11.5H24M12 24H30M12 36.5H20" stroke="#F5F7FA" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case 'nas':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="7" y="9" width="34" height="30" rx="4" stroke="#A7B2C4" strokeWidth="1.75" />
          <rect x="12" y="14" width="6" height="20" rx="1" stroke="#00D4FF" strokeWidth="1.6" />
          <rect x="21" y="14" width="6" height="20" rx="1" stroke="#2563EB" strokeWidth="1.6" />
          <rect x="30" y="14" width="6" height="20" rx="1" stroke="#00D4FF" strokeWidth="1.6" />
        </svg>
      );
    case 'server':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="8" y="6" width="32" height="10" rx="2" stroke="#A7B2C4" strokeWidth="1.6" />
          <rect x="8" y="19" width="32" height="10" rx="2" stroke="#00D4FF" strokeWidth="1.75" />
          <rect x="8" y="32" width="32" height="10" rx="2" stroke="#A7B2C4" strokeWidth="1.6" />
          <circle cx="34" cy="11" r="1.5" fill="#00D4FF" />
          <circle cx="34" cy="24" r="1.5" fill="#00D4FF" />
          <circle cx="34" cy="37" r="1.5" fill="#2563EB" />
          <path d="M13 11H23M13 24H26M13 37H21" stroke="#A7B2C4" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'cctv':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="6" y="12" width="36" height="24" rx="4" stroke="#A7B2C4" strokeWidth="1.75" />
          <circle cx="20" cy="24" r="6" stroke="#00D4FF" strokeWidth="1.75" />
          <circle cx="20" cy="24" r="2" fill="#00D4FF" />
          <path d="M31 19H37M31 24H37M31 29H35" stroke="#2563EB" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case 'deleted':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <path d="M13 8H28L35 15V40H13V8Z" stroke="#A7B2C4" strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M24 31V20M19 25L24 20L29 25" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'formatted':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="7" y="9" width="34" height="30" rx="4" stroke="#A7B2C4" strokeWidth="1.75" />
          <path d="M7 18H41M19 18V39" stroke="#2563EB" strokeWidth="1.6" />
          <path d="M25 28L29 32L36 24" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'corrupted':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <circle cx="24" cy="24" r="16" stroke="#A7B2C4" strokeWidth="1.75" strokeDasharray="5 3" />
          <path d="M24 12A12 12 0 1 1 13.5 29.8" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" />
          <rect x="21" y="21" width="6" height="6" rx="1" fill="#2563EB" />
        </svg>
      );
    case 'physical':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <circle cx="24" cy="24" r="15" stroke="#00D4FF" strokeWidth="1.75" />
          <circle cx="24" cy="24" r="9" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx="24" cy="24" r="3" fill="#F5F7FA" />
          <path d="M9 38L20 26" stroke="#00D4FF" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case 'firmware':
    default:
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="14" y="14" width="20" height="20" rx="3" stroke="#00D4FF" strokeWidth="1.75" />
          <path
            d="M19 8V14M24 8V14M29 8V14M19 34V40M24 34V40M29 34V40M8 19H14M8 24H14M8 29H14M34 19H40M34 24H40M34 29H40"
            stroke="#2563EB"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <rect x="20" y="20" width="8" height="8" rx="1.5" fill="#F5F7FA" />
        </svg>
      );
  }
};
