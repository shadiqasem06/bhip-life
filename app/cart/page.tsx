"use client";

import { useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiTag, FiLogIn } from "react-icons/fi";
import { useCart } from "../context/cart-context";
import { useLanguage } from "../context/language-context";
import { useAuth } from "../context/auth-context";
import { translations } from "../translations";
import { useExchangeRate } from "../hooks/useExchangeRate";

type CartItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  quantity: number;
};

const CART_EVENT = "bhip-cart-updated";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CART_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CART_EVENT, callback);
  };
}

function readCart(): CartItem[] {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? (JSON.parse(saved) as CartItem[]) : [];
  } catch {
    return [];
  }
}

let cachedRaw: string | null = null;
let cachedItems: CartItem[] = [];
function getCartSnapshot(): CartItem[] {
  const raw = typeof window !== "undefined" ? localStorage.getItem("cart") : null;
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedItems = raw ? (JSON.parse(raw) as CartItem[]) : [];
  }
  return cachedItems;
}

const EMPTY_CART: CartItem[] = [];
function getServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

export default function CartPage() {
  const cartItems = useSyncExternalStore(subscribe, getCartSnapshot, getServerSnapshot);
  const { updateCartCount } = useCart();
  const { lang } = useLanguage();
  const { user } = useAuth();
  const t = translations[lang];
  const { toILS } = useExchangeRate();

  const hasDiscount = !!user && !user.firstDiscountUsed;
  const DISCOUNT = 0.15;

  const persist = useCallback(
    (updated: CartItem[]) => {
      localStorage.setItem("cart", JSON.stringify(updated));
      updateCartCount();
    },
    [updateCartCount]
  );

  const increaseQty = (index: number) => {
    const updated = readCart();
    updated[index].quantity += 1;
    persist(updated);
  };

  const decreaseQty = (index: number) => {
    const updated = readCart();
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
    } else {
      updated.splice(index, 1);
    }
    persist(updated);
  };

  const removeItem = (index: number) => {
    const updated = readCart().filter((_, i) => i !== index);
    persist(updated);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    updateCartCount();
  };

  const subtotal = cartItems.reduce((total, item) => {
    return total + Number(item.price.replace(/[$₪]/g, "")) * item.quantity;
  }, 0);
  const discountAmount = hasDiscount ? Math.round(subtotal * DISCOUNT * 100) / 100 : 0;
  const totalPrice = Math.round((subtotal - discountAmount) * 100) / 100;

  return (
    <main className="min-h-screen w-full px-4 sm:px-6 py-12 md:py-16">
      <section className="max-w-3xl mx-auto w-full">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl mb-8">{t.yourCart}</h1>

        {cartItems.length === 0 ? (
          <div className="card rounded-2xl p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-2xl mx-auto mb-4">
              <FiShoppingBag />
            </div>
            <p className="text-[var(--text-secondary)] mb-6">{t.emptyCart}</p>
            <Link href="/products" className="btn-primary inline-block px-6 py-3 rounded-full">
              {t.emptyCartCta}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Items */}
            <div className="space-y-3">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="card rounded-2xl p-4 flex gap-3 items-center w-full min-w-0">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-amber-900/30 to-transparent flex items-center justify-center">
                    <span className="font-display text-2xl text-white/90">{item.name.charAt(0)}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="font-display text-lg leading-tight mb-0.5 truncate">{item.name}</h2>
                    <p className="text-[var(--text-muted)] text-xs mb-1.5 truncate">{item.description}</p>
                    <p className="text-[var(--accent)] font-semibold text-sm">{item.price}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-1 border border-[var(--border)] rounded-full px-1 py-0.5">
                      <button onClick={() => decreaseQty(index)} aria-label="decrease" className="w-7 h-7 rounded-full hover:bg-[var(--bg-elevated)] flex items-center justify-center transition-colors">
                        <FiMinus size={12} />
                      </button>
                      <span className="font-semibold w-5 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => increaseQty(index)} aria-label="increase" className="w-7 h-7 rounded-full hover:bg-[var(--bg-elevated)] flex items-center justify-center transition-colors">
                        <FiPlus size={12} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(index)} className="text-xs text-[var(--text-muted)] hover:text-[var(--danger)] inline-flex items-center gap-1 transition-colors">
                      <FiTrash2 size={11} />
                      {t.remove}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="card rounded-2xl p-5 w-full">
              <h2 className="font-display text-xl mb-4">{t.total}</h2>

              {hasDiscount && (
                <div className="flex items-center gap-2 bg-[var(--accent-soft)] border border-[var(--accent)]/30 rounded-xl px-3 py-2 mb-3">
                  <FiTag className="text-[var(--accent)] shrink-0" size={13} />
                  <span className="text-xs font-medium text-[var(--accent)]">{t.discountBanner}</span>
                </div>
              )}

              {!user && cartItems.length > 0 && (
                <Link href="/auth/signup" className="flex items-start gap-2 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl px-3 py-2 mb-3 hover:border-[var(--accent)]/40 transition-colors">
                  <FiLogIn className="text-[var(--accent)] shrink-0 mt-0.5" size={13} />
                  <span className="text-xs text-[var(--text-secondary)] leading-relaxed">{t.loginForDiscount}</span>
                </Link>
              )}

              {hasDiscount && (
                <div className="space-y-1.5 mb-3 text-sm">
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>{t.orderSummary}</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[var(--success)]">
                    <span>{t.discountLabel}</span>
                    <span>-${discountAmount}</span>
                  </div>
                </div>
              )}

              <p className="text-3xl font-semibold text-[var(--accent)] mb-0.5">${totalPrice}</p>
              <p className="text-sm text-[var(--text-muted)] mb-4">{"~ " + toILS(totalPrice)}</p>

              <div className="divider-gold mb-4" />

              <div className="flex flex-col gap-3">
                <Link href="/checkout" className="btn-primary px-6 py-3 rounded-full text-center text-sm font-semibold">
                  {t.checkout}
                </Link>
                <button onClick={clearCart} className="text-sm text-[var(--text-muted)] hover:text-[var(--danger)] inline-flex items-center justify-center gap-2 py-1 transition-colors">
                  <FiTrash2 size={13} />
                  {t.clearCart}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
