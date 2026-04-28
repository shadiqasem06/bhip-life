"use client";

import { FaInstagram } from "react-icons/fa";
import { useLanguage } from "./context/language-context";

export default function InstagramButton() {
  const { lang } = useLanguage();
  const isRtl = lang === "he" || lang === "ar";
  const side = isRtl ? { left: "1.5rem" } : { right: "1.5rem" };

  return (
    <a
      href="https://instagram.com/bhiplife.fit"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Follow us on Instagram"
      className="fixed z-50 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
      style={{
        ...side,
        bottom: "calc(max(1.5rem, env(safe-area-inset-bottom, 1.5rem)) + 3.75rem)",
        background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
      }}
    >
      <FaInstagram size={22} color="#fff" className="md:hidden" />
      <FaInstagram size={26} color="#fff" className="hidden md:block" />
    </a>
  );
}
