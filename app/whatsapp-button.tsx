"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "./context/language-context";

export default function WhatsappButton() {
  const { lang } = useLanguage();
  const isRtl = lang === "he" || lang === "ar";
  const side = isRtl ? { left: "1.5rem" } : { right: "1.5rem" };

  return (
    <a
      href="https://wa.me/972542508596"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed z-50 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
      style={{
        ...side,
        bottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))",
        background: "#25D366",
      }}
    >
      <FaWhatsapp size={24} color="#fff" className="md:hidden" />
      <FaWhatsapp size={28} color="#fff" className="hidden md:block" />
      <span
        className="absolute inset-0 rounded-full animate-ping opacity-30"
        style={{ background: "#25D366" }}
      />
    </a>
  );
}
