import "./globals.css";
import { Playfair_Display, Inter, Heebo, Cairo } from "next/font/google";
import { CartProvider } from "./context/cart-context";
import { LanguageProvider } from "./context/language-context";
import { AuthProvider } from "./context/auth-context";
import Navbar from "./navbar";
import Footer from "./footer";
import LanguageWrapper from "./language-wrapper";

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

export const metadata = {
  title: "bhip life — Premium Wellness",
  description:
    "Premium wellness and lifestyle products. Live Better. Live Bhip.",
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
      <body>
        <LanguageProvider>
          <AuthProvider>
            <LanguageWrapper>
              <CartProvider>
                <Navbar />
                <div className="min-h-[70vh]">{children}</div>
                <Footer />
              </CartProvider>
            </LanguageWrapper>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
