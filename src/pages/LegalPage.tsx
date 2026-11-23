import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useEnquiry } from '../components/EnquiryContext';
import { LEGAL_DOCUMENTS } from '../data/legal';
import { SITE_CONFIG } from '../config/siteConfig';
import { NotFoundPage } from './NotFoundPage';

interface LegalPageProps {
  docKey: 'privacy-policy' | 'terms-and-conditions' | 'service-policy' | 'data-handling-policy';
}

export const LegalPage: React.FC<LegalPageProps> = ({ docKey }) => {
  const doc = LEGAL_DOCUMENTS[docKey];
  const { setPageDeviceContext } = useEnquiry();

  useEffect(() => {
    setPageDeviceContext('');
  }, [setPageDeviceContext]);

  if (!doc) {
    return <NotFoundPage />;
  }

  const otherDocs = Object.values(LEGAL_DOCUMENTS).filter((item) => item.slug !== doc.slug);

  return (
    <>
      <SeoHead
        title={doc.seoTitle}
        description={doc.seoDescription}
        canonicalPath={doc.path}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: doc.title, path: doc.path },
        ]}
      />

      <section className="border-b border-[#A7B2C4]/12 bg-[#07090E] py-12 sm:py-16">
        <div className="mx-auto max-w-[920px] px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: doc.title }]} />
          <p className="text-xs font-semibold tracking-[0.14em] text-[#00D4FF]">
            {doc.effectiveLabel}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[#F5F7FA] sm:text-4xl">{doc.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-[#A7B2C4]">{doc.intro}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[920px] px-4 sm:px-6 lg:px-8 space-y-8">
          {doc.sections.map((section) => (
            <article key={section.heading} className="surface-card rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-[#F5F7FA]">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#A7B2C4] sm:text-base">
                {section.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              {section.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#A7B2C4]">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}

          <div className="rounded-2xl border border-[#A7B2C4]/16 bg-[#0C1220] p-6 text-sm text-[#A7B2C4]">
            <p className="font-semibold text-[#F5F7FA]">Questions About This Policy?</p>
            <p className="mt-2">
              Contact LOSTBYTE at{' '}
              <a href={SITE_CONFIG.contact.emailHref} className="text-[#00D4FF] hover:underline">
                {SITE_CONFIG.contact.email}
              </a>{' '}
              or call{' '}
              <a
                href={SITE_CONFIG.contact.phoneHref}
                className="text-[#00D4FF] hover:underline tabular-nums"
              >
                {SITE_CONFIG.contact.phoneDisplay}
              </a>{' '}
              ({SITE_CONFIG.contact.hours}).
            </p>
            <div className="mt-4 flex flex-wrap gap-4 border-t border-[#A7B2C4]/12 pt-4 text-xs">
              {otherDocs.map((other) => (
                <Link key={other.slug} to={other.path} className="text-[#F5F7FA] hover:text-[#00D4FF]">
                  {other.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
