"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiCheck, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../../context/cart-context";
import { useLanguage } from "../../context/language-context";
import { translations } from "../../translations";

type Product = {
  id: string;
  name: string;
  price: string;
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
    id: "1",
    name: "B-YNG",
    price: "₪199",
    descKey: "productDescB",
    longDescKey: "productLongDescB",
    howToKey: "productHowToB",
    benefitsKey: "productBenefitsB",
    ingredientsKey: "productIngredientsB",
    image: "/products/byng.jpg",
    cardImage: "/products/byng-card.jpg",
    gradient: "from-red-900/60 via-orange-700/40 to-transparent",
    tag: "BEAUTY · HAIR · SKIN · NAILS",
  },
  {
    id: "2",
    name: "X-GRN",
    price: "₪149",
    descKey: "productDescX",
    longDescKey: "productLongDescX",
    howToKey: "productHowToX",
    benefitsKey: "productBenefitsX",
    ingredientsKey: "productIngredientsX",
    image: "/products/xgrn.jpg",
    cardImage: "/products/xgrn-card.jpg",
    gradient: "from-emerald-900/60 via-green-700/40 to-transparent",
    tag: "HEALTH · DETOX · GUT · ENERGY",
  },
  {
    id: "3",
    name: "INDIGO",
    price: "₪179",
    descKey: "productDescI",
    longDescKey: "productLongDescI",
    howToKey: "productHowToI",
    benefitsKey: "productBenefitsI",
    ingredientsKey: "productIngredientsI",
    image: "/products/indigo.jpg",
    cardImage: "/products/indigo-card.jpg",
    gradient: "from-indigo-900/60 via-violet-700/40 to-transparent",
    tag: "ENERGY · FOCUS · VITALITY",
  },
];

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [added, setAdded] = useState(false);
  const { updateCartCount } = useCart();
  const { lang } = useLanguage();
  const t = translations[lang];
  const isRtl = lang === "he" || lang === "ar";

  useEffect(() => {
    const loadProduct = async () => {
      const { id } = await params;
      const found = products.find((p) => p.id === id) || null;
      setProduct(found);
    };
    loadProduct();
  }, [params]);

  const addToCart = (redirect: boolean) => {
    if (!product) return;

    const existing = localStorage.getItem("cart");
    const cart: Array<{
      id: string;
      name: string;
      price: string;
      description: string;
      quantity: number;
    }> = existing ? JSON.parse(existing) : [];

    const index = cart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        description: t[product.descKey],
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    if (redirect) {
      window.location.href = "/cart";
    } else {
      setAdded(true);
      setTimeout(() => setAdded(false), 1600);
    }
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

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-5xl mx-auto">
        <Link
          href="/products"
          className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] inline-flex items-center gap-2 mb-8 transition-colors"
        >
          <FiArrowLeft className={isRtl ? "rtl-flip" : ""} />
          {t.products}
        </Link>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Product image */}
          <div className={`relative h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br ${product.gradient}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/40 to-transparent" />
          </div>

          {/* Details */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-1">
              bhip life
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">
              {product.tag}
            </p>
            <h1 className="font-display text-4xl md:text-5xl mb-4">
              {product.name}
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
              {t[product.longDescKey]}
            </p>

            <div className="divider-gold mb-6" />

            <p className="text-3xl font-semibold text-[var(--accent)] mb-8">
              {product.price}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={() => addToCart(false)}
                className="btn-outline px-6 py-3 rounded-full inline-flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <FiCheck />
                    <span>{t.addToCart}</span>
                  </>
                ) : (
                  <>
                    <FiShoppingBag />
                    <span>{t.addToCart}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => addToCart(true)}
                className="btn-primary px-6 py-3 rounded-full"
              >
                {t.buyNow}
              </button>
            </div>

            {/* How to use */}
            <div className="card rounded-xl p-4 text-sm text-[var(--text-secondary)]">
              <span className="text-[var(--accent)] font-medium">{t.howToUse}:</span>{" "}
              {t[product.howToKey]}
            </div>
          </div>
        </div>

        {/* Benefits + Ingredients */}
        <div className="grid md:grid-cols-2 gap-8 mt-14">
          {/* Key benefits */}
          <div className="card rounded-2xl p-6">
            <h2 className="font-display text-2xl mb-5 text-[var(--accent)]">
              {t.keyBenefits}
            </h2>
            <ul className="space-y-3">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)] text-sm">
                  <span className="text-[var(--accent)] mt-0.5 shrink-0">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Ingredients */}
          <div className="card rounded-2xl p-6">
            <h2 className="font-display text-2xl mb-5 text-[var(--accent)]">
              {t.ingredients}
            </h2>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="text-xs bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] px-3 py-1.5 rounded-full"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
