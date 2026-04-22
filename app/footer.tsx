"use client";

import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "./context/language-context";
import { translations } from "./translations";

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--bg-raised)]">
      {/* gold divider */}
      <div className="divider-gold" />

      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        {/* BRAND */}
        <div>
          <h2 className="font-display text-3xl mb-3">
            bhip <span className="text-gradient-gold">life</span>
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-xs">
            {t.footerTagline}
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold mb-4 text-[var(--accent)] uppercase text-xs tracking-[0.2em]">
            {t.footerQuickLinks}
          </h3>
          <div className="flex flex-col gap-2.5">
            <Link
              href="/"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {t.home}
            </Link>
            <Link
              href="/products"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {t.products}
            </Link>
            <Link
              href="/cart"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {t.cart}
            </Link>
            <Link
              href="/about"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {t.about}
            </Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4 text-[var(--accent)] uppercase text-xs tracking-[0.2em]">
            {t.footerContact}
          </h3>
          <div className="flex flex-col gap-2 text-[var(--text-secondary)]">
            <p>
              <span className="text-[var(--text-muted)]">{t.footerEmail}: </span>
              <a
                href="mailto:info@bhiplife.com"
                className="hover:text-[var(--text-primary)] transition-colors"
              >
                info@bhiplife.com
              </a>
            </p>
            <p>
              <span className="text-[var(--text-muted)]">{t.footerPhone}: </span>
              <a
                href="tel:+972542508596"
                className="hover:text-[var(--text-primary)] transition-colors"
                dir="ltr"
              >
                054-250-8596
              </a>
            </p>
          </div>

          <h3 className="font-semibold mt-6 mb-3 text-[var(--accent)] uppercase text-xs tracking-[0.2em]">
            {t.footerFollow}
          </h3>
          <div className="flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/972542508596"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-5 text-center text-sm text-[var(--text-muted)]">
          © {year} bhip life. {t.footerRights}
        </div>
      </div>
    </footer>
  );
}
