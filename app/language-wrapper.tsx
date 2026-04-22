"use client";

import { useEffect } from "react";
import { useLanguage } from "./context/language-context";

export default function LanguageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang } = useLanguage();

  useEffect(() => {
    const html = document.documentElement;

    html.lang = lang;
    html.dir = lang === "he" || lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return <>{children}</>;
}