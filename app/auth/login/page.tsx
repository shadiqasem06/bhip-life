"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../../context/auth-context";
import { useLanguage } from "../../context/language-context";
import { translations } from "../../translations";

export default function LoginPage() {
  const { signIn } = useAuth();
  const { lang } = useLanguage();
  const t = translations[lang];
  const isRtl = lang === "he" || lang === "ar";
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError(t.authErrorFillAll);
      return;
    }

    setLoading(true);
    const result = signIn(email, password);
    setLoading(false);

    if (!result.ok) {
      setError(t.authErrorInvalidCredentials);
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
            {t.signInTitle}
          </h1>
          <p className="text-[var(--text-secondary)]">{t.signInSubtitle}</p>
        </div>

        {/* Card */}
        <div className="card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
              <span>{t.signInButton}</span>
              <FiArrowRight className={isRtl ? "rtl-flip" : ""} />
            </button>
          </form>

          <div className="divider-gold my-6" />

          {/* Signup link */}
          <p className="text-center text-sm text-[var(--text-secondary)]">
            {t.noAccount}{" "}
            <Link
              href="/auth/signup"
              className="text-[var(--accent)] hover:underline font-medium"
            >
              {t.signUp}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
