import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { BookingProvider } from "@/components/booking";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { restaurant } from "@/config/restaurant";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  title: {
    default: restaurant.name,
    template: `%s · ${restaurant.name}`,
  },
  description: restaurant.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <BookingProvider>
          <div className="flex min-h-full flex-col">
            <SiteHeader />
            <main id="content" className="flex-1 pb-28">
              {children}
            </main>
            <SiteFooter />
          </div>
        </BookingProvider>
      </body>
    </html>
  );
}
