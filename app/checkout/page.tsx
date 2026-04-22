"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FiTag, FiLogIn, FiCheck, FiX } from "react-icons/fi";
import { useCart } from "../context/cart-context";
import { useLanguage } from "../context/language-context";
import { useAuth } from "../context/auth-context";
import { translations } from "../translations";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./payment-form";

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  quantity?: number;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

// קודי קופון תקינים: קוד → אחוז הנחה
const PROMO_CODES: Record<string, number> = {
  BHIP10: 0.10,
  BHIP20: 0.20,
  SAVE15: 0.15,
  bhip10: 0.10,
  bhip20: 0.20,
  save15: 0.15,
};

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [clientSecret, setClientSecret] = useState("");
  const [loadingIntent, setLoadingIntent] = useState(true);

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
    if (saved) {
      const parsed = JSON.parse(saved);
      setCartItems(parsed);
    } else {
      setLoadingIntent(false);
    }
  }, []);

  useEffect(() => {
    const createIntent = async () => {
      if (cartItems.length === 0) return;

      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartItems }),
        });

        const data = await res.json();

        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingIntent(false);
      }
    };

    createIntent();
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + Number(item.price.replace("₪", "")) * quantity;
    }, 0);
  }, [cartItems]);

  const discountAmount = hasDiscount ? Math.round(subtotal * DISCOUNT) : 0;
  const promoAmount = appliedPromo ? Math.round(subtotal * appliedPromo.rate) : 0;
  const totalPrice = subtotal - discountAmount - promoAmount;

  const applyPromo = () => {
    setPromoError("");
    const code = promoInput.trim().toUpperCase();
    const rate = PROMO_CODES[code] ?? PROMO_CODES[promoInput.trim()];
    if (!rate) {
      setPromoError(t.promoInvalid);
      return;
    }
    setAppliedPromo({ code: promoInput.trim().toUpperCase(), rate });
    setPromoInput("");
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoError("");
  };

  useEffect(() => {
    if (window.location.pathname === "/success") {
      localStorage.removeItem("cart");
      updateCartCount();
    }
  }, [updateCartCount]);

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-5xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl mb-10">
          {t.checkoutTitle}
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Customer details */}
          <div className="card rounded-2xl p-6">
            <h2 className="font-display text-xl mb-5 text-[var(--accent)]">
              {t.customerDetails}
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder={t.fullName}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                dir={isRtl ? "rtl" : "ltr"}
                className="input w-full p-3 rounded-xl"
              />
              <input
                type="email"
                placeholder={t.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                dir="ltr"
                className="input w-full p-3 rounded-xl"
              />
              <input
                type="text"
                placeholder={t.phone}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                dir="ltr"
                className="input w-full p-3 rounded-xl"
              />
              <input
                type="text"
                placeholder={t.address}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                dir={isRtl ? "rtl" : "ltr"}
                className="input w-full p-3 rounded-xl"
              />
            </div>
          </div>

          {/* Order summary + payment */}
          <div className="card rounded-2xl p-6">
            <h2 className="font-display text-xl mb-5 text-[var(--accent)]">
              {t.orderSummary}
            </h2>

            {/* Discount banner */}
            {hasDiscount && (
              <div className="flex items-center gap-2 bg-[var(--accent-soft)] border border-[var(--accent)]/30 rounded-xl px-3 py-2.5 mb-4">
                <FiTag className="text-[var(--accent)] shrink-0" size={14} />
                <span className="text-xs font-medium text-[var(--accent)]">
                  {t.discountBanner}
                </span>
              </div>
            )}

            {/* Login promo if not logged in */}
            {!user && cartItems.length > 0 && (
              <Link
                href="/auth/signup"
                className="flex items-start gap-2 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl px-3 py-2.5 mb-4 hover:border-[var(--accent)]/40 transition-colors"
              >
                <FiLogIn className="text-[var(--accent)] shrink-0 mt-0.5" size={14} />
                <span className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {t.loginForDiscount}
                </span>
              </Link>
            )}

            {cartItems.length === 0 ? (
              <p className="text-[var(--text-muted)]">{t.emptyCart}</p>
            ) : (
              <div>
                <div className="space-y-3 mb-5">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-baseline border-b border-[var(--border)] pb-3"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold truncate">
                          {item.name}
                          {item.quantity ? ` × ${item.quantity}` : ""}
                        </p>
                      </div>
                      <p className="text-[var(--text-secondary)] shrink-0 ms-4">
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Promo code input */}
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">
                    {t.promoCode}
                  </p>

                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-[var(--accent-soft)] border border-[var(--accent)]/30 rounded-xl px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <FiCheck className="text-[var(--accent)]" size={14} />
                        <span className="text-sm font-medium text-[var(--accent)]">
                          {appliedPromo.code} — {Math.round(appliedPromo.rate * 100)}%
                        </span>
                      </div>
                      <button
                        onClick={removePromo}
                        className="text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors"
                        aria-label="Remove promo"
                      >
                        <FiX size={15} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder={t.promoPlaceholder}
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value);
                          setPromoError("");
                        }}
                        onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                        dir="ltr"
                        className="input flex-1 px-3 py-2.5 rounded-xl text-sm uppercase placeholder:normal-case placeholder:tracking-normal tracking-widest"
                      />
                      <button
                        onClick={applyPromo}
                        disabled={!promoInput.trim()}
                        className="btn-outline px-4 py-2.5 rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        {t.promoApply}
                      </button>
                    </div>
                  )}

                  {promoError && (
                    <p className="text-[var(--danger)] text-xs mt-1.5 flex items-center gap-1">
                      <FiX size={12} />
                      {promoError}
                    </p>
                  )}
                </div>

                {/* Price breakdown with discount */}
                {(hasDiscount || appliedPromo) && (
                  <div className="space-y-1.5 mb-3 text-sm">
                    <div className="flex justify-between text-[var(--text-secondary)]">
                      <span>{t.orderSummary}</span>
                      <span>₪{subtotal}</span>
                    </div>
                    {hasDiscount && (
                      <div className="flex justify-between text-[var(--success)]">
                        <span>{t.discountLabel}</span>
                        <span>-₪{discountAmount}</span>
                      </div>
                    )}
                    {appliedPromo && (
                      <div className="flex justify-between text-[var(--success)]">
                        <span>{t.promoLabel} ({appliedPromo.code})</span>
                        <span>-₪{promoAmount}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-baseline mb-6">
                  <p className="text-[var(--text-muted)] uppercase text-xs tracking-wider">
                    {t.total}
                  </p>
                  <p className="text-2xl font-semibold text-[var(--accent)]">
                    ₪{totalPrice}
                  </p>
                </div>

                <div className="divider-gold mb-6" />

                {loadingIntent ? (
                  <div className="skeleton h-12 rounded-xl" />
                ) : clientSecret ? (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "night",
                        variables: {
                          colorPrimary: "#d4af37",
                          colorBackground: "#14141b",
                          colorText: "#f5f5f5",
                          colorDanger: "#e05757",
                          fontFamily: "Inter, system-ui, sans-serif",
                          borderRadius: "10px",
                        },
                      },
                    }}
                  >
                    <PaymentForm onSuccess={markDiscountUsed} />
                  </Elements>
                ) : (
                  <p className="text-[var(--danger)] text-sm">
                    {t.paymentError}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
