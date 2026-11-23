import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionFaqItem {
  id?: string;
  question: string;
  answer: string;
  category?: string;
}

interface FaqAccordionProps {
  items: AccordionFaqItem[];
  defaultOpenIndex?: number;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items, defaultOpenIndex = 0 }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="divide-y divide-[#A7B2C4]/14 rounded-2xl border border-[#A7B2C4]/16 bg-[#101827]">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const panelId = `faq-panel-${item.id || idx}`;
        const triggerId = `faq-trigger-${item.id || idx}`;
        return (
          <div key={item.id || `${item.question}-${idx}`}>
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#131D30] sm:px-6 sm:py-5"
              >
                <span className="text-sm font-semibold text-[#F5F7FA] sm:text-base">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-[#00D4FF] transition-transform duration-150 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="px-5 pb-5 text-sm leading-relaxed text-[#A7B2C4] sm:px-6 sm:pb-6"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
