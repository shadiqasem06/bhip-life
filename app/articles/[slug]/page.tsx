"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiClock, FiArrowRight } from "react-icons/fi";
import { useLanguage } from "../../context/language-context";
import { translations } from "../../translations";
import { articles, Article } from "../data";
import ScrollReveal from "../../scroll-reveal";

const productColors: Record<string, { badge: string }> = {
  "B-YNG": { badge: "text-orange-400 border-orange-400/30 bg-orange-400/10" },
  "X-GRN": { badge: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10" },
  INDIGO:  { badge: "text-violet-400 border-violet-400/30 bg-violet-400/10" },
};

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [article, setArticle] = useState<Article | null>(null);
  const { lang } = useLanguage();
  const t = translations[lang];
  const l = lang as "en" | "he" | "ar";
  const isRtl = lang === "he" || lang === "ar";

  useEffect(() => {
    params.then(({ slug }) => {
      setArticle(articles.find((a) => a.slug === slug) ?? null);
    });
  }, [params]);

  if (!article) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="skeleton w-64 h-6 rounded" />
      </main>
    );
  }

  const colors = productColors[article.product];
  const related = articles.filter(
    (a) => a.product === article.product && a.slug !== article.slug
  );

  return (
    <main className="min-h-screen px-4 sm:px-6 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link
          href="/articles"
          className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] inline-flex items-center gap-2 mb-8 transition-colors"
        >
          <FiArrowLeft className={isRtl ? "rtl-flip" : ""} />
          {t.articles}
        </Link>

        {/* Hero image */}
        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-10 bg-[var(--bg-elevated)]">
          <Image
            src={article.heroImage}
            alt={article.title[l]}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${article.accentColor}55 0%, transparent 60%)` }}
          />
        </div>

        {/* Header */}
        <ScrollReveal>
          <div
            className="h-1 w-20 rounded-full mb-8"
            style={{ background: article.accentColor }}
          />

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${colors.badge}`}>
              {article.product}
            </span>
            <span className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
              <FiClock size={12} />
              {article.readTime} {t.articlesReadTime}
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl leading-tight mb-6">
            {article.title[l]}
          </h1>

          <p
            className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10 border-l-2 pl-5"
            style={{ borderColor: article.accentColor }}
          >
            {article.intro[l]}
          </p>
        </ScrollReveal>

        <div className="divider-gold mb-10" />

        {/* Benefits */}
        <ScrollReveal delay={80}>
          <h2 className="font-display text-2xl md:text-3xl mb-8">
            <span style={{ color: article.accentColor }}>✦</span>{" "}
            {t.articlesBenefits}
          </h2>

          <div className="space-y-5 mb-12">
            {article.benefits.map((benefit, i) => (
              <div key={i} className="card rounded-2xl p-6 flex gap-5 items-start">
                <div
                  className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-sm font-bold mt-0.5"
                  style={{
                    background: `${article.accentColor}22`,
                    color: article.accentColor,
                    border: `1px solid ${article.accentColor}44`,
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold mb-1.5">{benefit.title[l]}</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                    {benefit.text[l]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* How to use */}
        <ScrollReveal delay={120}>
          <h2 className="font-display text-2xl md:text-3xl mb-6">
            <span style={{ color: article.accentColor }}>✦</span>{" "}
            {t.articlesHowTo}
          </h2>

          <div className="card rounded-2xl p-6 mb-12">
            <ul className="space-y-4">
              {article.howTo.map((tip, i) => (
                <li key={i} className="flex gap-4 items-start text-sm text-[var(--text-secondary)]">
                  <span
                    className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-bold mt-0.5"
                    style={{
                      background: `${article.accentColor}22`,
                      color: article.accentColor,
                    }}
                  >
                    {i + 1}
                  </span>
                  {tip[l]}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Tags */}
        <ScrollReveal delay={140}>
          <div className="flex flex-wrap gap-2 mb-12">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] px-3 py-1.5 rounded-full border border-[var(--border)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <div className="divider-gold mb-10" />

        {/* CTA */}
        <ScrollReveal delay={160}>
          <div
            className="rounded-2xl p-7 mb-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            style={{
              background: `linear-gradient(135deg, ${article.accentColor}18, ${article.accentColor}08)`,
              border: `1px solid ${article.accentColor}33`,
            }}
          >
            <div>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: article.accentColor }}>
                bhip life
              </p>
              <h3 className="font-display text-xl">
                {article.product} — {article.excerpt[l].split(":")[0]}
              </h3>
            </div>
            <Link
              href={`/products/${article.productId}`}
              className="btn-primary px-6 py-3 rounded-full inline-flex items-center gap-2 group shrink-0"
            >
              <span>{t.articlesRelatedProduct}</span>
              <FiArrowRight
                size={14}
                className={`transition-transform group-hover:translate-x-1 ${isRtl ? "rtl-flip" : ""}`}
              />
            </Link>
          </div>
        </ScrollReveal>

        {/* Related articles */}
        {related.length > 0 && (
          <ScrollReveal delay={180}>
            <h2 className="font-display text-xl mb-6 text-[var(--text-secondary)]">
              More on {article.product}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/articles/${rel.slug}`}
                  className="card card-hover-lift rounded-xl p-5 group"
                >
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${colors.badge} mb-3 inline-block`}>
                    {rel.product}
                  </span>
                  <h3 className="font-display text-base leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {rel.title[l]}
                  </h3>
                  <span className="text-xs text-[var(--accent)] flex items-center gap-1">
                    {t.articlesReadMore} <FiArrowRight size={11} />
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>
    </main>
  );
}
