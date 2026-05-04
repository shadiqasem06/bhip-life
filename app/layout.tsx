import "./globals.css";
import { Playfair_Display, Inter, Heebo, Cairo } from "next/font/google";
import { CartProvider } from "./context/cart-context";
import { LanguageProvider } from "./context/language-context";
import { AuthProvider } from "./context/auth-context";
import Navbar from "./navbar";
import Footer from "./footer";
import LanguageWrapper from "./language-wrapper";
import WhatsappButton from "./whatsapp-button";
import InstagramButton from "./instagram-button";
import PromoBanner from "./promo-banner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0b0b0f",
};

export const metadata = {
  title: "bhip life — Premium Wellness",
  description:
    "מוצרי בריאות ולייפסטייל פרימיום. B-YNG, X-GRN ו-INDIGO — כי אתה לא מוכן להתפשר. משלוח מהיר לכל הארץ.",
  keywords: "bhip life, ויטמינים, תוספי תזונה, קולגן, אנרגיה, ספירולינה, בריאות, לייפסטייל",
  authors: [{ name: "bhip life" }],
  openGraph: {
    title: "bhip life — Premium Wellness",
    description: "מוצרי בריאות ולייפסטייל פרימיום. B-YNG, X-GRN ו-INDIGO.",
    url: "https://bhiplife.com",
    siteName: "bhip life",
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "bhip life — Premium Wellness",
    description: "מוצרי בריאות ולייפסטייל פרימיום.",
  },
  icons: {
    icon: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClass = `${playfair.variable} ${inter.variable} ${heebo.variable} ${cairo.variable}`;

  return (
    <html lang="en" dir="ltr" className={fontClass}>
      <body className="overflow-x-hidden">
        <LanguageProvider>
          <AuthProvider>
            <LanguageWrapper>
              <CartProvider>
                <PromoBanner />
                <Navbar />
                <div className="min-h-[70vh]">{children}</div>
                <Footer />
                <InstagramButton />
                <WhatsappButton />
              </CartProvider>
            </LanguageWrapper>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
