"use client";

import { useLanguage } from "../context/language-context";
import { translations } from "../translations";

export default function RefundPolicyPage() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const isRtl = lang === "he" || lang === "ar";

  return (
    <main className="min-h-screen px-4 sm:px-6 py-14 md:py-20" dir={isRtl ? "rtl" : "ltr"}>
      <section className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-3">
            {t.refundPolicyEyebrow}
          </p>
          <h1 className="font-display text-4xl md:text-5xl">{t.refundPolicyTitle}</h1>
        </div>

        {/* Intro */}
        <div className="card rounded-2xl p-6 mb-8 border border-[var(--border)]">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {t.refundPolicyIntro}
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-6">
          <PolicySection
            number="1"
            title={t.refundSection1Title}
            text={t.refundSection1Text}
          />
          <PolicySection
            number="2"
            title={t.refundSection2Title}
            text={t.refundSection2Text}
          />
          <PolicySection
            number="3"
            title={t.refundSection3Title}
            text={t.refundSection3Text}
          />
          <PolicySection
            number="4"
            title={t.refundSection4Title}
            text={t.refundSection4Text}
          />
          <PolicySection
            number="5"
            title={t.refundSection5Title}
            text={t.refundSection5Text}
          />
        </div>

        {/* Contact section */}
        <div className="mt-8 card rounded-2xl p-6 border border-[var(--border)]">
          <h2 className="font-display text-xl mb-3 text-[var(--accent)]">
            {t.refundSection6Title}
          </h2>
          <p className="text-[var(--text-secondary)] mb-4">{t.refundSection6Text}</p>
          <div className="flex flex-col gap-2 text-[var(--text-secondary)]">
            <p>
              <span className="text-[var(--text-muted)]">{t.refundContactEmail}: </span>
              <a
                href="mailto:info@bhiplife.com"
                className="text-[var(--accent)] hover:underline"
              >
                info@bhiplife.com
              </a>
            </p>
            <p>
              <span className="text-[var(--text-muted)]">{t.refundContactPhone}: </span>
              <a
                href="tel:+972542508596"
                className="text-[var(--accent)] hover:underline"
                dir="ltr"
              >
                054-250-8596
              </a>
            </p>
          </div>
        </div>

        {/* Last updated */}
        <p className="text-center text-xs text-[var(--text-muted)] mt-8">
          {t.refundLastUpdated}
        </p>
      </section>
    </main>
  );
}

function PolicySection({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="card rounded-2xl p-6 border border-[var(--border)]">
      <div className="flex items-start gap-4">
        <div className="w-9 h-9 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-sm font-bold shrink-0">
          {number}
        </div>
        <div>
          <h2 className="font-display text-xl mb-2">{title}</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
}
