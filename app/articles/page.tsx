"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiClock } from "react-icons/fi";
import { useLanguage } from "../context/language-context";
import { translations } from "../translations";
import { articles } from "./data";
import ScrollReveal from "../scroll-reveal";

type Filter = "All" | "B-YNG" | "X-GRN" | "INDIGO";

const productColors: Record<string, string> = {
  "B-YNG": "text-orange-400 border-orange-400/30 bg-orange-400/10",
  "X-GRN": "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  INDIGO: "text-violet-400 border-violet-400/30 bg-violet-400/10",
};

export default function ArticlesPage() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const l = lang as "en" | "he" | "ar";
  const [filter, setFilter] = useState<Filter>("All");

  const filtered =
    filter === "All" ? articles : articles.filter((a) => a.product === filter);

  const filters: Filter[] = ["All", "B-YNG", "X-GRN", "INDIGO"];

  return (
    <main className="min-h-screen px-4 sm:px-6 py-14 md:py-20">
      <section className="max-w-6xl mx-auto">

        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--accent)] mb-3">
              {t.articlesEyebrow}
            </p>
            <h1 className="font-display text-4xl md:text-6xl mb-5">
              {t.articlesTitle}
            </h1>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg">
              {t.articlesSubtitle}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  filter === f
                    ? "bg-[var(--accent)] text-[var(--bg-base)] border-[var(--accent)]"
                    : "border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                }`}
              >
                {f === "All" ? t.articlesFilterAll : f}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, i) => (
            <ScrollReveal key={article.slug} delay={i * 80}>
              <Link
                href={`/articles/${article.slug}`}
                className="card card-hover-lift rounded-2xl overflow-hidden flex flex-col group h-full"
              >
                <div className="relative h-48 overflow-hidden bg-[var(--bg-elevated)]">
                  <Image
                    src={article.image}
                    alt={article.title[l]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${article.accentColor}44, transparent)` }}
                  />
                  <span
                    className={`absolute top-3 start-3 text-xs font-semibold px-3 py-1 rounded-full border backdrop-blur-sm ${productColors[article.product]}`}
                  >
                    {article.product}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-end mb-3">
                    <span className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                      <FiClock size={12} />
                      {article.readTime} {t.articlesReadTime}
                    </span>
                  </div>

                  <h2 className="font-display text-xl mb-3 leading-snug group-hover:text-[var(--accent)] transition-colors">
                    {article.title[l]}
                  </h2>

                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1 mb-6">
                    {article.excerpt[l]}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-elevated)] px-2 py-0.5 rounded-full border border-[var(--border)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-medium text-[var(--accent)] group-hover:gap-3 transition-all">
                    {t.articlesReadMore}
                    <FiArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
}
