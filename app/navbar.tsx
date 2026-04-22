"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiShoppingBag, FiMenu, FiX, FiGlobe, FiUser, FiLogOut, FiLogIn } from "react-icons/fi";
import { useCart } from "./context/cart-context";
import { useLanguage } from "./context/language-context";
import { useAuth } from "./context/auth-context";
import { translations } from "./translations";

export default function Navbar() {
  const { cartCount } = useCart();
  const { lang, setLang } = useLanguage();
  const { user, signOut } = useAuth();
  const t = translations[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg-base)]/85 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between gap-6">
        {/* Logo + desktop links */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/logo-icon.png"
              alt="bhip life logo"
              width={40}
              height={40}
              priority
              className="object-contain"
            />
            <span className="font-display text-xl tracking-wide">
              bhip <span className="text-gradient-gold">life</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <Link
              href="/products"
              className="hover:text-[var(--accent)] transition-colors"
            >
              {t.products}
            </Link>
            <Link
              href="/about"
              className="hover:text-[var(--accent)] transition-colors"
            >
              {t.about}
            </Link>
            <Link
              href="/cart"
              className="hover:text-[var(--accent)] transition-colors"
            >
              {t.cart}
            </Link>
          </div>
        </div>

        {/* Desktop: language + auth + cart */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="relative">
            <FiGlobe className="absolute top-1/2 -translate-y-1/2 start-2.5 text-[var(--text-muted)] pointer-events-none" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as "en" | "he" | "ar")}
              aria-label="Language"
              className="input ps-8 pe-3 py-2 rounded-lg text-sm appearance-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="he">עברית</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <div className="w-8 h-8 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/40 flex items-center justify-center">
                  <FiUser className="text-[var(--accent)]" size={14} />
                </div>
                <span className="max-w-[120px] truncate">{t.hello}, {user.name.split(" ")[0]}</span>
              </div>
              <button
                onClick={signOut}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--danger)] inline-flex items-center gap-1.5 transition-colors"
                title={t.logout}
              >
                <FiLogOut size={15} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] inline-flex items-center gap-1.5 transition-colors"
              >
                <FiLogIn size={15} />
                {t.login}
              </Link>
              <Link
                href="/auth/signup"
                className="btn-primary px-4 py-2 rounded-full text-sm inline-flex items-center gap-1.5"
              >
                {t.signUp}
              </Link>
            </div>
          )}

          <Link
            href="/cart"
            className="relative flex items-center gap-2 px-4 py-2 rounded-lg btn-outline text-sm"
          >
            <FiShoppingBag />
            <span>{t.cart}</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -end-1.5 bg-[var(--accent)] text-[var(--bg-base)] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-[var(--bg-raised)] transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-[var(--border)] bg-[var(--bg-base)] animate-fade-up">
          <div className="px-6 py-6 flex flex-col gap-1">
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="py-3 border-b border-[var(--border)] hover:text-[var(--accent)] transition-colors"
            >
              {t.products}
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="py-3 border-b border-[var(--border)] hover:text-[var(--accent)] transition-colors"
            >
              {t.about}
            </Link>
            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
              className="py-3 border-b border-[var(--border)] hover:text-[var(--accent)] transition-colors flex items-center justify-between"
            >
              <span>{t.cart}</span>
              {cartCount > 0 && (
                <span className="bg-[var(--accent)] text-[var(--bg-base)] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="pt-4">
              <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">
                {t.language}
              </label>
              <select
                value={lang}
                onChange={(e) =>
                  setLang(e.target.value as "en" | "he" | "ar")
                }
                className="input w-full px-3 py-2 rounded-lg"
              >
                <option value="en">English</option>
                <option value="he">עברית</option>
                <option value="ar">العربية</option>
              </select>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2 py-2 text-sm text-[var(--text-secondary)]">
                    <div className="w-8 h-8 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/40 flex items-center justify-center shrink-0">
                      <FiUser className="text-[var(--accent)]" size={14} />
                    </div>
                    <span className="truncate">{t.hello}, {user.name.split(" ")[0]}</span>
                  </div>
                  <button
                    onClick={() => { signOut(); setMenuOpen(false); }}
                    className="flex items-center gap-2 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors"
                  >
                    <FiLogOut size={15} />
                    {t.logout}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 py-2 text-sm hover:text-[var(--accent)] transition-colors"
                  >
                    <FiLogIn size={15} />
                    {t.login}
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setMenuOpen(false)}
                    className="btn-primary px-4 py-2.5 rounded-full text-sm text-center"
                  >
                    {t.signUp}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
