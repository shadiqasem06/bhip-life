"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useLanguage } from "./context/language-context";

const labels: Record<string, { title: string; sub: string; cta: string }> = {
  en: { title: "Page not found", sub: "The page you're looking for doesn't exist.", cta: "Back to Home" },
  he: { title: "הדף לא נמצא", sub: "הדף שחיפשת אינו קיים.", cta: "חזרה לדף הבית" },
  ar: { title: "الصفحة غير موجودة", sub: "الصفحة التي تبحث عنها غير موجودة.", cta: "العودة للرئيسية" },
};

export default function NotFound() {
  let lang = "en";
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ctx = useLanguage();
    lang = ctx.lang;
  } catch {
    // context not available — fall back to "en"
  }

  const l = labels[lang] ?? labels.en;
  const isRtl = lang === "he" || lang === "ar";

  return (
    <main className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6">
      {/* Big 404 */}
      <p className="font-display text-[9rem] md:text-[12rem] leading-none text-gradient-gold select-none">
        404
      </p>

      {/* Divider */}
      <div className="divider-gold w-40 my-6" />

      <h1 className="font-display text-2xl md:text-4xl mb-3">{l.title}</h1>
      <p className="text-[var(--text-secondary)] mb-10 max-w-sm">{l.sub}</p>

      <Link
        href="/"
        className="btn-primary px-8 py-4 rounded-full inline-flex items-center gap-2 group"
      >
        <span>{l.cta}</span>
        <FiArrowRight
          className={`transition-transform group-hover:translate-x-1 ${
            isRtl ? "rtl-flip group-hover:-translate-x-1" : ""
          }`}
        />
      </Link>
    </main>
  );
}
