"use client";

import Image from "next/image";
import { FiAward, FiZap, FiHeart } from "react-icons/fi";
import { useLanguage } from "../context/language-context";
import { translations } from "../translations";

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <main className="min-h-screen px-4 sm:px-6 py-14 md:py-20">
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-3">
            {t.aboutEyebrow}
          </p>
          <h1 className="font-display text-4xl md:text-6xl">{t.aboutTitle}</h1>
        </div>

        <div className="grid gap-10 md:grid-cols-2 items-center mb-16">
          {/* Group product photo */}
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src="/products/hero-group.jpg"
              alt="bhip life products"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/50 to-transparent" />
          </div>

          <div>
            <h2 className="font-display text-3xl mb-5">{t.aboutWho}</h2>
            <p className="text-[var(--text-secondary)] leading-8 mb-4">
              {t.aboutText1}
            </p>
            <p className="text-[var(--text-secondary)] leading-8 mb-4">
              {t.aboutText2}
            </p>
            <p className="text-[var(--text-secondary)] leading-8">
              {t.aboutText3}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="card rounded-2xl px-6 py-4 mb-10 text-xs text-[var(--text-muted)] text-center leading-relaxed border border-[var(--border)]">
          * This product is a dietary supplement. It is not intended to diagnose, treat, cure, or prevent any disease. Please consult a healthcare professional before use.
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ValueCard
            icon={<FiAward />}
            title={t.quality}
            text={t.qualityText}
          />
          <ValueCard
            icon={<FiZap />}
            title={t.innovation}
            text={t.innovationText}
          />
          <ValueCard
            icon={<FiHeart />}
            title={t.lifestyle}
            text={t.lifestyleText}
          />
        </div>
      </section>
    </main>
  );
}

function ValueCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="card rounded-2xl p-8 text-center">
      <div className="w-12 h-12 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-xl mx-auto mb-4">
        {icon}
      </div>
      <h3 className="font-display text-xl mb-2">{title}</h3>
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
        {text}
      </p>
    </div>
  );
}
