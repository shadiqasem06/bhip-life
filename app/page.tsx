"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiShield, FiTruck, FiAward } from "react-icons/fi";
import { useLanguage } from "./context/language-context";
import { translations } from "./translations";

const featuredProducts = [
  {
    id: 1,
    name: "B-YNG",
    price: "₪199",
    descKey: "productDescB" as const,
    image: "/products/byng-card.jpg",
    gradient: "from-red-900/60 via-orange-700/40 to-transparent",
  },
  {
    id: 2,
    name: "X-GRN",
    price: "₪149",
    descKey: "productDescX" as const,
    image: "/products/xgrn-card.jpg",
    gradient: "from-emerald-900/60 via-green-700/40 to-transparent",
  },
  {
    id: 3,
    name: "INDIGO",
    price: "₪179",
    descKey: "productDescI" as const,
    image: "/products/indigo-card.jpg",
    gradient: "from-indigo-900/60 via-violet-700/40 to-transparent",
  },
];

export default function Home() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const isRtl = lang === "he" || lang === "ar";

  return (
    <main>
      {/* ==================  HERO  ================== */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Hero background: group product photo */}
        <div className="absolute inset-0">
          <Image
            src="/products/hero-group.jpg"
            alt="bhip life products"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-base)]/60 via-[var(--bg-base)]/50 to-[var(--bg-base)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-base)]/40 via-transparent to-[var(--bg-base)]/40" />
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 text-center relative w-full">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-[var(--accent)] mb-5 animate-fade-up">
            {t.heroEyebrow}
          </p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6 animate-fade-up">
            {t.heroTitle}
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 animate-fade-up">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up">
            <Link
              href="/products"
              className="btn-primary px-8 py-4 rounded-full inline-flex items-center gap-2 group"
            >
              <span>{t.heroCta}</span>
              <FiArrowRight
                className={`transition-transform group-hover:translate-x-1 ${
                  isRtl ? "rtl-flip group-hover:-translate-x-1" : ""
                }`}
              />
            </Link>

            <Link
              href="/about"
              className="btn-outline px-8 py-4 rounded-full inline-flex items-center"
            >
              {t.heroCtaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* ==================  FEATURED PRODUCTS  ================== */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-2">
              {t.featuredTitle}
            </p>
            <h2 className="font-display text-3xl md:text-5xl">
              {t.featuredSubtitle}
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-2 group"
          >
            {t.viewAll}
            <FiArrowRight
              className={`transition-transform group-hover:translate-x-1 ${
                isRtl ? "rtl-flip group-hover:-translate-x-1" : ""
              }`}
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="card card-hover-lift rounded-2xl overflow-hidden block group"
            >
              {/* Product image */}
              <div className={`relative h-64 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/60 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl mb-1">{p.name}</h3>
                <p className="text-[var(--text-secondary)] text-sm mb-4">
                  {t[p.descKey]}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-[var(--accent)]">
                    {p.price}
                  </span>
                  <span className="text-sm text-[var(--text-muted)] inline-flex items-center gap-1 group-hover:text-[var(--accent)] transition-colors">
                    {t.viewProduct}
                    <FiArrowRight
                      className={isRtl ? "rtl-flip" : ""}
                      size={14}
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================  WHY CHOOSE US  ================== */}
      <section className="bg-[var(--bg-raised)] border-y border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-2">
              {t.heroEyebrow}
            </p>
            <h2 className="font-display text-3xl md:text-5xl">
              {t.featuresTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<FiAward />}
              title={t.featureQualityTitle}
              text={t.featureQualityText}
            />
            <FeatureCard
              icon={<FiTruck />}
              title={t.featureShippingTitle}
              text={t.featureShippingText}
            />
            <FeatureCard
              icon={<FiShield />}
              title={t.featureTrustTitle}
              text={t.featureTrustText}
            />
          </div>
        </div>
      </section>

      {/* ==================  FINAL CTA  ================== */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="font-display text-4xl md:text-6xl mb-6">
          <span className="text-gradient-gold">{t.heroCta}</span>
        </h2>
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
          {t.heroSubtitle}
        </p>
        <Link
          href="/products"
          className="btn-primary px-10 py-4 rounded-full inline-flex items-center gap-2 group"
        >
          <span>{t.heroCta}</span>
          <FiArrowRight
            className={`transition-transform group-hover:translate-x-1 ${
              isRtl ? "rtl-flip group-hover:-translate-x-1" : ""
            }`}
          />
        </Link>
      </section>
    </main>
  );
}

function FeatureCard({
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
      <div className="w-14 h-14 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-2xl mx-auto mb-5">
        {icon}
      </div>
      <h3 className="font-display text-xl mb-3">{title}</h3>
      <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
        {text}
      </p>
    </div>
  );
}
