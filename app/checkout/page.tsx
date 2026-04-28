"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FiTag, FiLogIn, FiCheck, FiX, FiLock, FiArrowRight } from "react-icons/fi";
import { useCart } from "../context/cart-context";
import { useLanguage } from "../context/language-context";
import { useAuth } from "../context/auth-context";
import { translations } from "../translations";

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  quantity?: number;
};

const PROMO_CODES: Record<string, number> = {
  BHIP10: 0.10, BHIP20: 0.20, SAVE15: 0.15,
  bhip10: 0.10, bhip20: 0.20, save15: 0.15,
};

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [step, setStep] = useState<"details" | "payment">("details");
  const [iframeUrl, setIframeUrl] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; rate: number } | null>(null);
  const [promoError, setPromoError] = useState("");

  const { updateCartCount } = useCart();
  const { lang } = useLanguage();
  const { user, markDiscountUsed } = useAuth();
  const t = translations[lang];
  const isRtl = lang === "he" || lang === "ar";

  const hasDiscount = !!user && !user.firstDiscountUsed;
  const DISCOUNT = 0.15;

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/success") {
      localStorage.removeItem("cart");
      updateCartCount();
    }
  }, [updateCartCount]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const qty = item.quantity || 1;
      return total + Number(item.price.replace("\u20aa", "").replace("$", "")) * qty;
    }, 0);
  }, [cartItems]);

  const discountAmount = hasDiscount ? Math.round(subtotal * DISCOUNT * 100) / 100 : 0;
  const promoAmount = appliedPromo ? Math.round(subtotal * appliedPromo.rate * 100) / 100 : 0;
  const totalPrice = Math.round((subtotal - discountAmount - promoAmount) * 100) / 100;

  const applyPromo = () => {
    setPromoError("");
    const code = promoInput.trim().toUpperCase();
    const rate = PROMO_CODES[code] ?? PROMO_CODES[promoInput.trim()];
    if (!rate) { setPromoError(t.promoInvalid); return; }
    setAppliedPromo({ code: promoInput.trim().toUpperCase(), rate });
    setPromoInput("");
  };

  const removePromo = () => { setAppliedPromo(null); setPromoError(""); };

  const proceedToPayment = async () => {
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setPaymentError(
        lang === "he" ? "\u05e0\u05d0 \u05dc\u05de\u05dc\u05d0 \u05e9\u05dd, \u05d0\u05d9\u05de\u05d9\u05d9\u05dc \u05d5\u05d8\u05dc\u05e4\u05d5\u05df" :
        lang === "ar" ? "\u064a\u0631\u062c\u0649 \u0645\u0644\u0621 \u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0648\u0627\u0644\u0647\u0627\u062a\u0641" :
        "Please fill in name, email and phone"
      );
      return;
    }
    setLoadingPayment(true);
    setPaymentError("");
    try {
      const origin = window.location.origin;
      const res = await fetch("/api/tranzila-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          contact: fullName,
          email,
          phone,
          address,
          successUrl: origin + "/success",
          failUrl: origin + "/checkout?error=1",
        }),
      });
      const data = await res.json();
      if (data.iframeUrl) {
        markDiscountUsed?.();
        setIframeUrl(data.iframeUrl);
        setStep("payment");
      } else {
        setPaymentError(data.error || t.paymentError);
      }
    } catch {
      setPaymentError(t.paymentError);
    } finally {
      setLoadingPayment(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-5xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl mb-10">{t.checkoutTitle}</h1>

        {step === "payment" && iframeUrl ? (
          <div className="card rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border)]">
              <FiLock className="text-[var(--accent)]" size={15} />
              <span className="text-sm font-medium">
                {lang === "he" ? "\u05ea\u05e9\u05dc\u05d5\u05dd \u05de\u05d0\u05d5\u05d1\u05d8\u05d7" : lang === "ar" ? "\u062f\u0641\u0639 \u0622\u0645\u0646" : "Secure Payment"}
              </span>
              <span className="ms-auto text-xs text-[var(--text-muted)]">
                Total: ${totalPrice}
              </span>
            </div>
            <iframe
              src={iframeUrl}
              width="100%"
              height="520"
              frameBorder="0"
              title="Tranzila Secure Payment"
              className="block"
              allow="payment"
            />
            <div className="px-6 py-3 border-t border-[var(--border)] flex justify-center">
              <button
                onClick={() => setStep("details")}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              >
                {lang === "he" ? "\u2190 \u05d7\u05d6\u05e8\u05d4 \u05dc\u05e4\u05e8\u05d8\u05d9\u05dd" : lang === "ar" ? "\u2190 \u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644" : "\u2190 Back to details"}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card rounded-2xl p-6">
              <h2 className="font-display text-xl mb-5 text-[var(--accent)]">{t.customerDetails}</h2>
              <div className="space-y-3">
                <input type="text" placeholder={t.fullName} value={fullName} onChange={(e) => setFullName(e.target.value)} dir={isRtl ? "rtl" : "ltr"} className="input w-full p-3 rounded-xl" />
                <input type="email" placeholder={t.email} value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" className="input w-full p-3 rounded-xl" />
                <input type="tel" placeholder={t.phone} value={phone} onChange={(e) => setPhone(e.target.value)} dir="ltr" className="input w-full p-3 rounded-xl" />
                <input type="text" placeholder={t.address} value={address} onChange={(e) => setAddress(e.target.value)} dir={isRtl ? "rtl" : "ltr"} className="input w-full p-3 rounded-xl" />
              </div>
            </div>

            <div className="card rounded-2xl p-6">
              <h2 className="font-display text-xl mb-5 text-[var(--accent)]">{t.orderSummary}</h2>

              {hasDiscount && (
                <div className="flex items-center gap-2 bg-[var(--accent-soft)] border border-[var(--accent)]/30 rounded-xl px-3 py-2.5 mb-4">
                  <FiTag className="text-[var(--accent)] shrink-0" size={14} />
                  <span className="text-xs font-medium text-[var(--accent)]">{t.discountBanner}</span>
                </div>
              )}

              {!user && cartItems.length > 0 && (
                <Link href="/auth/signup" className="flex items-start gap-2 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl px-3 py-2.5 mb-4 hover:border-[var(--accent)]/40 transition-colors">
                  <FiLogIn className="text-[var(--accent)] shrink-0 mt-0.5" size={14} />
                  <span className="text-xs text-[var(--text-secondary)] leading-relaxed">{t.loginForDiscount}</span>
                </Link>
              )}

              {cartItems.length === 0 ? (
                <p className="text-[var(--text-muted)]">{t.emptyCart}</p>
              ) : (
                <div>
                  <div className="space-y-3 mb-5">
                    {cartItems.map((item, i) => (
                      <div key={i} className="flex justify-between items-baseline border-b border-[var(--border)] pb-3">
                        <p className="font-semibold truncate min-w-0">{item.name}{item.quantity ? " x " + item.quantity : ""}</p>
                        <p className="text-[var(--text-secondary)] shrink-0 ms-4">{item.price}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">{t.promoCode}</p>
                    {appliedPromo ? (
                      <div className="flex items-center justify-between bg-[var(--accent-soft)] border border-[var(--accent)]/30 rounded-xl px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <FiCheck className="text-[var(--accent)]" size={14} />
                          <span className="text-sm font-medium text-[var(--accent)]">{appliedPromo.code} - {Math.round(appliedPromo.rate * 100)}%</span>
                        </div>
                        <button onClick={removePromo} className="text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors"><FiX size={15} /></button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input type="text" placeholder={t.promoPlaceholder} value={promoInput} onChange={(e) => { setPromoInput(e.target.value); setPromoError(""); }} onKeyDown={(e) => e.key === "Enter" && applyPromo()} dir="ltr" className="input flex-1 px-3 py-2.5 rounded-xl text-sm uppercase placeholder:normal-case placeholder:tracking-normal tracking-widest" />
                        <button onClick={applyPromo} disabled={!promoInput.trim()} className="btn-outline px-4 py-2.5 rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap">{t.promoApply}</button>
                      </div>
                    )}
                    {promoError && (
                      <p className="text-[var(--danger)] text-xs mt-1.5 flex items-center gap-1"><FiX size={12} /> {promoError}</p>
                    )}
                  </div>

                  {(hasDiscount || appliedPromo) && (
                    <div className="space-y-1.5 mb-3 text-sm">
                      <div className="flex justify-between text-[var(--text-secondary)]"><span>{t.orderSummary}</span><span>${subtotal}</span></div>
                      {hasDiscount && <div className="flex justify-between text-[var(--success)]"><span>{t.discountLabel}</span><span>-${discountAmount}</span></div>}
                      {appliedPromo && <div className="flex justify-between text-[var(--success)]"><span>{t.promoLabel} ({appliedPromo.code})</span><span>-${promoAmount}</span></div>}
                    </div>
                  )}

                  <div className="flex justify-between items-baseline mb-6">
                    <p className="text-[var(--text-muted)] uppercase text-xs tracking-wider">{t.total}</p>
                    <p className="text-2xl font-semibold text-[var(--accent)]">${totalPrice}</p>
                  </div>

                  <div className="divider-gold mb-6" />

                  {paymentError && (
                    <p className="text-[var(--danger)] text-sm mb-4 flex items-center gap-1"><FiX size={13} /> {paymentError}</p>
                  )}

                  <button
                    onClick={proceedToPayment}
                    disabled={loadingPayment || cartItems.length === 0}
                    className="btn-primary w-full py-3 rounded-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <FiLock size={15} />
                    <span>{loadingPayment ? (lang === "he" ? "\u05d8\u05d5\u05e2\u05df..." : lang === "ar" ? "\u062c\u0627\u0631 \u0627\u0644\u062a\u062d\u0645\u064a\u0644..." : "Loading...") : t.payNow}</span>
                    {!loadingPayment && <FiArrowRight size={15} className={isRtl ? "rtl-flip" : ""} />}
                  </button>

                  <p className="text-center text-xs text-[var(--text-muted)] mt-3 flex items-center justify-center gap-1">
                    <FiLock size={11} />
                    {lang === "he" ? "\u05ea\u05e9\u05dc\u05d5\u05dd \u05de\u05d0\u05d5\u05d1\u05d8\u05d7 \u05d3\u05e8\u05da Tranzila" : lang === "ar" ? "\u062f\u0641\u0639 \u0622\u0645\u0646 \u0639\u0628\u0631 Tranzila" : "Secured by Tranzila"}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
