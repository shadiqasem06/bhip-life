"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { useLanguage } from "../context/language-context";
import { translations } from "../translations";
import { useCart } from "../context/cart-context";

export default function SuccessPage() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const { updateCartCount } = useCart();

  useEffect(() => {
    localStorage.removeItem("cart");
    updateCartCount();
  }, [updateCartCount]);

  return (
    <main className="min-h-[80vh] px-6 py-16 flex items-center justify-center">
      <section className="max-w-xl w-full text-center card rounded-2xl p-10 animate-fade-up">
        <div className="w-20 h-20 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-4xl mx-auto mb-6">
          <FiCheck />
        </div>

        <h1 className="font-display text-4xl md:text-5xl mb-4">
          <span className="text-gradient-gold">{t.successTitle}</span>
        </h1>

        <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
          {t.successMessage}
        </p>

        <div className="divider-gold mb-8" />

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/"
            className="btn-outline px-6 py-3 rounded-full"
          >
            {t.backHome}
          </Link>
          <Link
            href="/products"
            className="btn-primary px-6 py-3 rounded-full"
          >
            {t.continueShopping}
          </Link>
        </div>
      </section>
    </main>
  );
}
