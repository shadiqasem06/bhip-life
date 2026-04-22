"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { useLanguage } from "../context/language-context";
import { translations } from "../translations";

type ProductCard = {
  id: number;
  name: string;
  price: string;
  descKey: "productDescB" | "productDescX" | "productDescI";
  image: string;
  gradient: string;
};

const products: ProductCard[] = [
  {
    id: 1,
    name: "B-YNG",
    price: "₪199",
    descKey: "productDescB",
    image: "/products/byng-card.jpg",
    gradient: "from-red-900/60 via-orange-700/40 to-transparent",
  },
  {
    id: 2,
    name: "X-GRN",
    price: "₪149",
    descKey: "productDescX",
    image: "/products/xgrn-card.jpg",
    gradient: "from-emerald-900/60 via-green-700/40 to-transparent",
  },
  {
    id: 3,
    name: "INDIGO",
    price: "₪179",
    descKey: "productDescI",
    image: "/products/indigo-card.jpg",
    gradient: "from-indigo-900/60 via-violet-700/40 to-transparent",
  },
];

export default function ProductsPage() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const isRtl = lang === "he" || lang === "ar";

  return (
    <main className="min-h-screen px-6 py-20">
      <section className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-3">
            {t.heroEyebrow}
          </p>
          <h1 className="font-display text-4xl md:text-6xl mb-4">
            {t.productsTitle}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            {t.productsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="card card-hover-lift rounded-2xl overflow-hidden block group"
            >
              <div className={`relative h-64 bg-gradient-to-br ${product.gradient} overflow-hidden`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/60 to-transparent" />
              </div>

              <div className="p-6">
                <h2 className="font-display text-2xl mb-1">{product.name}</h2>
                <p className="text-[var(--text-secondary)] text-sm mb-4">
                  {t[product.descKey]}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-[var(--accent)]">
                    {product.price}
                  </span>
                  <span className="text-sm inline-flex items-center gap-1 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                    {t.viewProduct}
                    <FiArrowRight className={isRtl ? "rtl-flip" : ""} size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
