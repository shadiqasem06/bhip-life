"use client";

import { useState } from "react";
import { useLanguage } from "./context/language-context";

const bannerText: Record<string, string> = {
  en: "🚚 Free shipping on orders over ₪299 — limited time offer!",
  he: "🚚 משלוח חינם על הזמנות מעל ₪299 — מבצע לזמן מוגבל!",
  ar: "🚚 شحن مجاني للطلبات فوق ₪299 — عرض لفترة محدودة!",
};

export default function PromoBanner() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="relative flex items-center justify-center px-10 py-2 md:py-2.5 text-xs sm:text-sm font-medium text-[#0a0a0a]"
      style={{
        background: "linear-gradient(90deg, #b8941f 0%, #d4af37 40%, #e8c657 60%, #d4af37 100%)",
      }}
    >
      <span className="promo-text text-center">{bannerText[lang] ?? bannerText.en}</span>
      <button
        onClick={() => setVisible(false)}
        aria-label="Close banner"
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
