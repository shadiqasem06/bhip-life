"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiCheck, FiShoppingBag, FiMinus, FiPlus } from "react-icons/fi";
import { useCart } from "../../context/cart-context";
import { useLanguage } from "../../context/language-context";
import { translations } from "../../translations";

const USD_TO_ILS = 3.7;
const toILS = (usd: number) => "₪" + Math.round(usd * USD_TO_ILS);

type Product = {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  descKey: "productDescB" | "productDescX" | "productDescI";
  longDescKey: "productLongDescB" | "productLongDescX" | "productLongDescI";
  howToKey: "productHowToB" | "productHowToX" | "productHowToI";
  benefitsKey: "productBenefitsB" | "productBenefitsX" | "productBenefitsI";
  ingredientsKey: "productIngredientsB" | "productIngredientsX" | "productIngredientsI";
  image: string;
  cardImage: string;
  gradient: string;
  tag: string;
};

const products: Product[] = [
  {
    id: "1", name: "B-YNG", price: "$84", priceNum: 84,
    descKey: "productDescB", longDescKey: "productLongDescB", howToKey: "productHowToB",
    benefitsKey: "productBenefitsB", ingredientsKey: "productIngredientsB",
    image: "/products/byng.jpg", cardImage: "/products/byng-card.jpg",
    gradient: "from-red-900/60 via-orange-700/40 to-transparent", tag: "BEAUTY · HAIR · SKIN · NAILS",
  },
  {
    id: "2", name: "X-GRN", price: "$84", priceNum: 84,
    descKey: "productDescX", longDescKey: "productLongDescX", howToKey: "productHowToX",
    benefitsKey: "productBenefitsX", ingredientsKey: "productIngredientsX",
    image: "/products/xgrn.jpg", cardImage: "/products/xgrn-card.jpg",
    gradient: "from-emerald-900/60 via-green-700/40 to-transparent", tag: "HEALTH · DETOX · GUT · ENERGY",
  },
  {
    id: "3", name: "INDIGO", price: "$79", priceNum: 79,
    descKey: "productDescI", longDescKey: "productLongDescI", howToKey: "productHowToI",
    benefitsKey: "productBenefitsI", ingredientsKey: "productIngredientsI",
    image: "/products/indigo.jpg", cardImage: "/products/indigo-card.jpg",
    gradient: "from-indigo-900/60 via-violet-700/40 to-transparent", tag: "ENERGY · FOCUS · VITALITY",
  },
];

const stockCounts: Record<string, number> = { "1": 7, "2": 12, "3": 5 };

type TabKey = "details" | "benefits" | "ingredients";

const tabLabels: Record<string, Record<TabKey, string>> = {
  en: { details: "Details", benefits: "Benefits", ingredients: "Ingredients" },
  he: { details: "פרטים", benefits: "יתרונות", ingredients: "רכיבים" },
  ar: { details: "التفاصيل", benefits: "الفوائد", ingredients: "المكونات" },
};

const stockLabels: Record<string, string> = { en: "🔥 Only", he: "🔥 נותרו רק", ar: "🔥 تبقى فقط" };
const stockSuffixLabels: Record<string, string> = { en: "left in stock", he: "יחידות במלאי", ar: "في المخزون" };

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>("details");
  const { updateCartCount } = useCart();
  const { lang } = useLanguage();
  const t = translations[lang];
  const isRtl = lang === "he" || lang === "ar";
  const tabs = tabLabels[lang] ?? tabLabels.en;

  useEffect(() => {
    const loadProduct = async () => {
      const { id } = await params;
      setProduct(products.find((p) => p.id === id) || null);
    };
    loadProduct();
  }, [params]);

  const addToCart = (redirect: boolean) => {
    if (!product) return;
    const existing = localStorage.getItem("cart");
    const cart: Array<{ id: string; name: string; price: string; description: string; quantity: number }> =
      existing ? JSON.parse(existing) : [];
    const index = cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      cart[index].quantity += qty;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, description: t[product.descKey], quantity: qty });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    if (redirect) { window.location.href = "/cart"; }
    else { setAdded(true); setTimeout(() => setAdded(false), 1600); }
  };

  if (!product) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="skeleton w-64 h-6 rounded" />
      </main>
    );
  }

  const benefits: string[] = t[product.benefitsKey] as unknown as string[];
  const ingredients: string[] = t[product.ingredientsKey] as unknown as string[];
  const totalPrice = "$" + product.priceNum * qty;

  return (
    <main className="min-h-screen px-4 sm:px-6 py-12 md:py-16">
      <section className="max-w-5xl mx-auto">
        <Link href="/products" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] inline-flex items-center gap-2 mb-8 transition-colors">
          <FiArrowLeft className={isRtl ? "rtl-flip" : ""} />
          {t.products}
        </Link>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div className={"relative h-[260px] sm:h-[340px] md:h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br " + product.gradient}>
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/40 to-transparent" />
          </div>

          {/* Details */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-1">bhip life</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">{product.tag}</p>
            <h1 className="font-display text-4xl md:text-5xl mb-3">{product.name}</h1>

            {/* Stock counter */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-sm font-medium text-[var(--danger)]">{stockLabels[lang] ?? stockLabels.en}</span>
              <span className="inline-block min-w-[2rem] text-center text-sm font-bold bg-[var(--danger)]/10 text-[var(--danger)] border border-[var(--danger)]/30 rounded px-2 py-0.5">
                {stockCounts[product.id] ?? 8}
              </span>
              <span className="text-sm font-medium text-[var(--danger)]">{stockSuffixLabels[lang] ?? stockSuffixLabels.en}</span>
            </div>

            <div className="divider-gold mb-5" />

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-semibold text-[var(--accent)]">{qty > 1 ? totalPrice : product.price}</p>
                {qty > 1 && <span className="text-sm text-[var(--text-muted)]">({product.price} x {qty})</span>}
              </div>
              <p className="text-sm text-[var(--text-muted)] mt-1">{"≈"} {toILS(product.priceNum * qty)}</p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-[var(--text-muted)]">{t.quantity}:</span>
              <div className="flex items-center border border-[var(--border-strong)] rounded-full overflow-hidden">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-[var(--bg-elevated)] transition-colors text-[var(--text-secondary)]" aria-label="Decrease quantity">
                  <FiMinus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-semibold tabular-nums">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(10, q + 1))} className="w-9 h-9 flex items-center justify-center hover:bg-[var(--bg-elevated)] transition-colors text-[var(--text-secondary)]" aria-label="Increase quantity">
                  <FiPlus size={14} />
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button onClick={() => addToCart(false)} className="btn-outline px-6 py-3 rounded-full inline-flex items-center justify-center gap-2">
                {added ? <FiCheck /> : <FiShoppingBag />}
                <span>{t.addToCart}</span>
              </button>
              <button onClick={() => addToCart(true)} className="btn-primary px-6 py-3 rounded-full">{t.buyNow}</button>
            </div>

            {/* How to use */}
            <div className="card rounded-xl p-4 text-sm text-[var(--text-secondary)]">
              <span className="text-[var(--accent)] font-medium">{t.howToUse}:</span>{" "}{t[product.howToKey]}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-14">
          <div className="flex border-b border-[var(--border)] mb-8">
            {(["details", "benefits", "ingredients"] as TabKey[]).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={"px-3 sm:px-6 py-3 text-sm font-medium flex-1 text-center transition-colors border-b-2 -mb-px " + (activeTab === tab ? "border-[var(--accent)] text-[var(--accent)]" : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]")}>
                {tabs[tab]}
              </button>
            ))}
          </div>

          {activeTab === "details" && (
            <div className="card rounded-2xl p-7">
              <p className="text-[var(--text-secondary)] leading-relaxed">{t[product.longDescKey]}</p>
            </div>
          )}

          {activeTab === "benefits" && (
            <div className="card rounded-2xl p-7">
              <ul className="space-y-4">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)] text-sm">
                    <span className="text-[var(--accent)] mt-0.5 shrink-0 text-base">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "ingredients" && (
            <div className="card rounded-2xl p-7">
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ing, i) => (
                  <span key={i} className="text-xs bg-[var(--bg-elevated)] border border-[var(--border)] rounded-full px-3 py-1 text-[var(--text-secondary)]">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
