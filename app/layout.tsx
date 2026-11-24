import "./globals.css";
import type { Metadata, Viewport } from "next";
import { AppProvider } from "@/components/context/AppContext";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { SearchModal } from "@/components/modals/SearchModal";
import { CartDrawer } from "@/components/modals/CartDrawer";
import { ProductQuickViewModal } from "@/components/modals/ProductQuickViewModal";
import { MobileDrawer } from "@/components/header/MobileDrawer";
import { MobileBottomBar } from "@/components/mobile/MobileBottomBar";
import { Toast } from "@/components/common/Toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://momento.com"),
  title: "Momento — Make Every Moment Special | Balloon Decoration at Home",
  description:
    "Book balloon decoration at home across India with Momento. Birthday, anniversary, baby shower, kids theme & surprise setups from ₹999. Same-day booking available.",
  keywords:
    "Momento, balloon decoration at home, birthday decoration, anniversary decoration, baby shower, balloon bouquet, surprise decoration",
  openGraph: {
    title: "Momento — Make Every Moment Special | Balloon Decoration at Home",
    description:
      "Book balloon decoration at home across India with Momento. Birthday, anniversary, baby shower, kids theme & surprise setups from ₹999. Same-day booking available.",
    url: "https://momento.com",
    siteName: "Momento",
    images: [
      {
        url: "/images/momento-logo.png",
        width: 1024,
        height: 436,
        alt: "Momento — Make Every Moment Special",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#8E2C8F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-white selection:bg-brand-500 selection:text-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white text-[13px] font-bold"
        >
          Skip to main content
        </a>
        <AppProvider>
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main id="main" className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-5 lg:px-6">
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Global Interactive Modals & Drawers */}
          <SearchModal />
          <CartDrawer />
          <ProductQuickViewModal />
          <MobileDrawer />

          {/* Mobile Navigation & Floating Actions */}
          <MobileBottomBar />
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}
