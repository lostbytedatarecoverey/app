import React from 'react';

interface BrandSymbolProps {
  size?: number;
  className?: string;
}

/**
 * Original LOSTBYTE geometric symbol:
 * Concentric reconstructed magnetic storage arcs + restored floating cyan byte node.
 */
export const BrandSymbol: React.FC<BrandSymbolProps> = ({ size = 34, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
  >
    <rect x="2" y="2" width="60" height="60" rx="14" fill="#0C1220" stroke="#1E293B" strokeWidth="2" />
    <path
      d="M32 13C21.507 13 13 21.507 13 32C13 42.493 21.507 51 32 51C38.362 51 43.994 47.878 47.446 43.088"
      stroke="#2563EB"
      strokeWidth="4.2"
      strokeLinecap="round"
    />
    <path
      d="M32 21C25.925 21 21 25.925 21 32C21 38.075 25.925 43 32 43C36.31 43 40.043 40.528 41.86 36.924"
      stroke="#00D4FF"
      strokeWidth="3.8"
      strokeLinecap="round"
    />
    <circle cx="32" cy="32" r="4.2" fill="#F5F7FA" />
    <rect x="41.5" y="14.5" width="8.5" height="8.5" rx="2" fill="#00D4FF" />
    <rect x="46.5" y="26.5" width="5.5" height="5.5" rx="1.4" fill="#2563EB" />
  </svg>
);

interface BrandLogoProps {
  variant?: 'horizontal' | 'compact' | 'footer';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'horizontal', className = '' }) => {
  if (variant === 'compact') {
    return (
      <span className={`inline-flex items-center gap-2 whitespace-nowrap shrink-0 ${className}`}>
        <BrandSymbol size={30} />
        <span className="font-[var(--font-display)] text-base font-bold tracking-[0.12em] text-[#F5F7FA]">
          LOST<span className="text-[#00D4FF]">BYTE</span>
        </span>
      </span>
    );
  }

  if (variant === 'footer') {
    return (
      <span className={`inline-flex items-center gap-3 whitespace-nowrap shrink-0 ${className}`}>
        <BrandSymbol size={38} />
        <span className="font-[var(--font-display)] text-xl font-bold tracking-[0.14em] text-[#F5F7FA]">
          LOST<span className="text-[#00D4FF]">BYTE</span>
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <BrandSymbol size={32} />
      <span className="font-[var(--font-display)] text-[17px] font-bold tracking-[0.14em] text-[#F5F7FA]">
        LOST<span className="text-[#00D4FF]">BYTE</span>
      </span>
    </span>
  );
};
