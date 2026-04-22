"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiLock, FiArrowRight, FiTag } from "react-icons/fi";
import { useAuth } from "../../context/auth-context";
import { useLanguage } from "../../context/language-context";
import { translations } from "../../translations";

export default function SignUpPage() {
  const { signUp } = useAuth();
  const { lang } = useLanguage();
  const t = translations[lang];
  const isRtl = lang === "he" || lang === "ar";
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError(t.authErrorFillAll);
      return;
    }
    if (password.length < 6) {
      setError(t.authErrorPasswordLength);
      return;
    }
    if (password !== confirmPassword) {
      setError(t.authErrorPasswordMismatch);
      return;
    }

    setLoading(true);
    const result = signUp(name, email, password);
    setLoading(false);

    if (!result.ok) {
      if (result.error === "email_exists") {
        setError(t.authErrorEmailExists);
      } else {
        setError(t.authErrorFillAll);
      }
      return;
    }

    router.push("/");
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md animate-fade-up">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="font-display text-3xl">
              bhip <span className="text-gradient-gold">life</span>
            </span>
          </Link>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            {t.signUpTitle}
          </h1>
          <p className="text-[var(--text-secondary)]">{t.signUpSubtitle}</p>
        </div>

        {/* Discount badge */}
        <div className="mb-6 flex items-center justify-center gap-2 bg-[var(--accent-soft)] border border-[var(--accent)]/30 rounded-xl px-4 py-3">
          <FiTag className="text-[var(--accent)] shrink-0" />
          <span className="text-sm font-medium text-[var(--accent)]">
            {t.discountBanner}
          </span>
        </div>

        {/* Card */}
        <div className="card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name */}
            <div className="relative">
              <FiUser
                className={`absolute top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none ${
                  isRtl ? "end-3" : "start-3"
                }`}
              />
              <input
                type="text"
                placeholder={t.fullNameLabel}
                value={name}
                onChange={(e) => setName(e.target.value)}
                dir={isRtl ? "rtl" : "ltr"}
                className={`input w-full py-3 rounded-xl ${isRtl ? "pe-10 ps-4" : "ps-10 pe-4"}`}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FiMail
                className={`absolute top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none ${
                  isRtl ? "end-3" : "start-3"
                }`}
              />
              <input
                type="email"
                placeholder={t.emailLabel}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                dir="ltr"
                className={`input w-full py-3 rounded-xl ${isRtl ? "pe-10 ps-4" : "ps-10 pe-4"}`}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock
                className={`absolute top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none ${
                  isRtl ? "end-3" : "start-3"
                }`}
              />
              <input
                type="password"
                placeholder={t.passwordLabel}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                dir="ltr"
                className={`input w-full py-3 rounded-xl ${isRtl ? "pe-10 ps-4" : "ps-10 pe-4"}`}
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FiLock
                className={`absolute top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none ${
                  isRtl ? "end-3" : "start-3"
                }`}
              />
              <input
                type="password"
                placeholder={t.confirmPasswordLabel}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                dir="ltr"
                className={`input w-full py-3 rounded-xl ${isRtl ? "pe-10 ps-4" : "ps-10 pe-4"}`}
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-[var(--danger)] text-sm text-center bg-[var(--danger)]/10 rounded-lg py-2 px-3">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 rounded-full flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
            >
              <span>{t.signUpButton}</span>
              <FiArrowRight className={isRtl ? "rtl-flip" : ""} />
            </button>
          </form>

          <div className="divider-gold my-6" />

          {/* Login link */}
          <p className="text-center text-sm text-[var(--text-secondary)]">
            {t.haveAccount}{" "}
            <Link
              href="/auth/login"
              className="text-[var(--accent)] hover:underline font-medium"
            >
              {t.login}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
