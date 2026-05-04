"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiShield, FiTruck, FiAward } from "react-icons/fi";
import { useLanguage } from "./context/language-context";
import { translations } from "./translations";
import ScrollReveal from "./scroll-reveal";
import { useExchangeRate } from "./hooks/useExchangeRate";

const testimonials = [
  {
    name: "נועה כ.",
    initials: "נכ",
    product: "B-YNG",
    stars: 5,
    text: {
      en: "After 3 weeks of B-YNG my skin looks noticeably better. My nails stopped breaking and my hair feels stronger. Highly recommend!",
      he: "אחרי 3 שבועות של B-YNG העור שלי נראה טוב בצורה ניכרת. הציפורניים הפסיקו להישבר והשיער שלי מרגיש חזק יותר. ממליצה בחום!",
      ar: "بعد 3 أسابيع من B-YNG بشرتي تبدو أفضل بشكل ملحوظ. توقفت أظافري عن الكسر وشعري أصبح أقوى. أوصي به بشدة!",
    },
  },
  {
    name: "אור ל.",
    initials: "אל",
    product: "X-GRN",
    stars: 5,
    text: {
      en: "X-GRN is my morning ritual. It gives me clean energy without the coffee crash. Love the taste and how light I feel.",
      he: "X-GRN הוא הטקס הבוקר שלי. הוא נותן לי אנרגיה נקייה בלי הנפילה של קפה. אוהב את הטעם ואיך שאני מרגיש קל.",
      ar: "X-GRN هو طقوسي الصباحية. يمنحني طاقة نظيفة بدون انهيار القهوة. أحب طعمه والشعور بالخفة.",
    },
  },
  {
    name: "מיכל ר.",
    initials: "מר",
    product: "INDIGO",
    stars: 5,
    text: {
      en: "Indigo is a game changer for long work days. Sharp focus, no sugar crash, and it actually tastes great. A staple in my routine.",
      he: "Indigo שינה לי את ימי העבודה הארוכים. ריכוז חד, בלי נפילת סוכר, וטעים בצורה מפתיעה. הפך לחלק קבוע בשגרה שלי.",
      ar: "Indigo غيّر أيام عملي الطويلة. تركيز حاد، بدون انهيار السكر، وطعمه رائع. أصبح جزءاً ثابتاً من روتيني.",
    },
  },
];

const featuredProducts = [
  { id: 1, name: "B-YNG", price: "$84", descKey: "productDescB" as const, image: "/products/byng-card.jpg", gradient: "from-red-900/60 via-orange-700/40 to-transparent" },
  { id: 2, name: "X-GRN", price: "$84", descKey: "productDescX" as const, image: "/products/xgrn-card.jpg", gradient: "from-emerald-900/60 via-green-700/40 to-transparent" },
  { id: 3, name: "INDIGO", price: "$79", descKey: "productDescI" as const, image: "/products/indigo-card.jpg", gradient: "from-indigo-900/60 via-violet-700/40 to-transparent" },
];

export default function Home() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const isRtl = lang === "he" || lang === "ar";
  const { toILS } = useExchangeRate();

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[65vh] md:min-h-[85vh] [min-height:65dvh] md:[min-height:85dvh] flex items-center">
        <div className="absolute inset-0">
          <Image src="/products/hero-group.jpg" alt="bhip life products" fill priority className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-base)]/60 via-[var(--bg-base)]/50 to-[var(--bg-base)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-base)]/40 via-transparent to-[var(--bg-base)]/40" />
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-14 md:pt-28 md:pb-32 text-center relative w-full">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-[var(--accent)] mb-5 animate-fade-up">{t.heroEyebrow}</p>
          <h1 className="font-display text-4xl md:text-7xl lg:text-8xl leading-[1.05] mb-6 animate-fade-up">{t.heroTitle}</h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 animate-fade-up">{t.heroSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up">
            <Link href="/products" className="btn-primary px-8 py-4 rounded-full inline-flex items-center gap-2 group">
              <span>{t.heroCta}</span>
              <FiArrowRight className={`transition-transform group-hover:translate-x-1 ${isRtl ? "rtl-flip group-hover:-translate-x-1" : ""}`} />
            </Link>
            <Link href="/about" className="btn-outline px-8 py-4 rounded-full inline-flex items-center">{t.heroCtaSecondary}</Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 md:pb-24">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-2">{t.featuredTitle}</p>
              <h2 className="font-display text-3xl md:text-5xl">{t.featuredSubtitle}</h2>
            </div>
            <Link href="/products" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-2 group">
              {t.viewAll}
              <FiArrowRight className={`transition-transform group-hover:translate-x-1 ${isRtl ? "rtl-flip group-hover:-translate-x-1" : ""}`} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="card card-hover-lift rounded-2xl overflow-hidden block group">
                <div className={`relative h-64 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                  <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl mb-1">{p.name}</h3>
                  <p className="text-[var(--text-secondary)] text-sm mb-4">{t[p.descKey]}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-semibold text-[var(--accent)]">{p.price}</span>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">≈ {toILS(Number(p.price.replace("$", "")))}</p>
                    </div>
                    <span className="text-sm text-[var(--text-muted)] inline-flex items-center gap-1 group-hover:text-[var(--accent)] transition-colors">
                      {t.viewProduct}
                      <FiArrowRight className={isRtl ? "rtl-flip" : ""} size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* WHY CHOOSE US */}
      <ScrollReveal>
        <section className="bg-[var(--bg-raised)] border-y border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-2">{t.heroEyebrow}</p>
              <h2 className="font-display text-3xl md:text-5xl">{t.featuresTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard icon={<FiAward />} title={t.featureQualityTitle} text={t.featureQualityText} />
              <FeatureCard icon={<FiTruck />} title={t.featureShippingTitle} text={t.featureShippingText} />
              <FeatureCard icon={<FiShield />} title={t.featureTrustTitle} text={t.featureTrustText} />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* TESTIMONIALS */}
      <ScrollReveal delay={100}>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-2">{t.testimonialsEyebrow}</p>
            <h2 className="font-display text-3xl md:text-5xl">{t.testimonialsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((review, i) => (
              <div key={i} className="card rounded-2xl p-7 flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} className={s < review.stars ? "text-[var(--accent)]" : "text-[var(--border-strong)]"} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm flex-1">
                  &ldquo;{review.text[lang as "en" | "he" | "ar"]}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
                  <div className="w-9 h-9 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center font-semibold text-sm">{review.initials}</div>
                  <div>
                    <p className="text-sm font-semibold">{review.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{review.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* FINAL CTA */}
      <ScrollReveal delay={100}>
        <section className="relative overflow-hidden text-center py-14 md:py-24 mx-4 sm:mx-6 mb-4 rounded-3xl"
          style={{ background: "linear-gradient(135deg, #1a1408 0%, #0b0b0f 40%, #1a1210 100%)", border: "1px solid rgba(212,175,55,0.15)" }}>
          <div className="absolute inset-0 opacity-20"
            style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.3) 0%, transparent 70%)" }} />
          <div className="relative px-6 py-4">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--accent)] mb-4">bhip life</p>
            <h2 className="font-display text-3xl md:text-6xl mb-5">
              <span className="text-gradient-gold">{t.heroCta}</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 text-sm md:text-base">{t.heroSubtitle}</p>
            <Link href="/products" className="btn-primary px-8 py-3 md:px-10 md:py-4 rounded-full inline-flex items-center gap-2 group">
              <span>{t.heroCta}</span>
              <FiArrowRight className={`transition-transform group-hover:translate-x-1 ${isRtl ? "rtl-flip group-hover:-translate-x-1" : ""}`} />
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}

function FeatureCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="card rounded-2xl 
p-8 text-center">
      <div className="w-14 h-14 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-2xl mx-auto mb-5">{icon}</div>
      <h3 className="font-display text-xl mb-3">{title}</h3>
      <p className="text-[var(--text-secondary)] leading-relaxed text-sm">{text}</p>
    </div>
  );
}
