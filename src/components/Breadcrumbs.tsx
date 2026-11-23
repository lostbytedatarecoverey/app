import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => (
  <nav aria-label="Breadcrumb" className="mb-6">
    <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#A7B2C4]">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <li key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5">
            {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-[#A7B2C4]/50" aria-hidden="true" />}
            {isLast || !item.to ? (
              <span aria-current="page" className="font-medium text-[#F5F7FA]">
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="transition-colors hover:text-[#00D4FF]">
                {item.label}
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
