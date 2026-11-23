import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { SITE_CONFIG } from '../config/siteConfig';

export const NotFoundPage: React.FC = () => (
  <>
    <SeoHead
      title="Page Not Found | LOSTBYTE Data Recovery"
      description="The requested page could not be found on LOSTBYTE. Explore our data recovery services or contact our team directly."
      canonicalPath="/"
    />
    <section className="py-24">
      <div className="mx-auto max-w-xl px-4 text-center">
        <p className="font-[var(--font-mono)] text-xs font-semibold tracking-widest text-[#00D4FF]">
          ERROR 404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[#F5F7FA] sm:text-4xl">Page Not Found</h1>
        <p className="mt-4 text-sm leading-relaxed text-[#A7B2C4]">
          The page you are looking for may have moved. You can return to the LOSTBYTE homepage,
          browse all 17 specialized data recovery services, or speak with our desk directly.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-semibold text-[#07090E] hover:bg-[#38E0FF]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Homepage</span>
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-[#A7B2C4]/25 bg-[#101827] px-5 py-3 text-sm font-semibold text-[#F5F7FA] hover:border-[#00D4FF]/50"
          >
            <span>Browse Services</span>
          </Link>
          <a
            href={SITE_CONFIG.contact.phoneHref}
            className="inline-flex items-center gap-2 rounded-xl border border-[#A7B2C4]/25 px-5 py-3 text-sm font-semibold text-[#A7B2C4] hover:text-[#F5F7FA]"
          >
            <Phone className="h-4 w-4 text-[#00D4FF]" />
            <span>Call Now</span>
          </a>
        </div>
      </div>
    </section>
  </>
);
