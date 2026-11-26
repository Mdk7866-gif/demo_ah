import type { Metadata } from "next";
import Image from "next/image";
import { MenuBrowser } from "@/components/menu-browser";
import { WelcomePrompt } from "@/components/welcome-prompt";
import { restaurant } from "@/config/restaurant";

export const metadata: Metadata = {
  title: "Menu",
  description: `Digital menu for ${restaurant.name}. Browse without signing in.`,
};

export default function MenuPage() {
  return (
    <>
      <section className="relative min-h-[440px] overflow-hidden sm:min-h-[480px]">
        <Image
          src="/images/hero-dining.jpg"
          alt="Dining room with timber tables, brass lamps, and copper plates"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/35 to-espresso/15" />
        <div className="relative mx-auto flex min-h-[440px] w-full max-w-6xl items-end px-4 py-10 sm:min-h-[480px] sm:px-6">
          <div className="w-full min-w-0 max-w-xl text-ivory">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-ivory/80">
              Digital menu
            </p>
            <h1 className="mt-2 font-display text-4xl leading-tight text-balance sm:text-6xl">
              {restaurant.name}
            </h1>
            <p className="mt-3 text-base leading-7 text-ivory/90">
              {restaurant.tagline} Browse the menu without an account, an app,
              or your phone number.
            </p>
          </div>
        </div>
      </section>
      <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        <WelcomePrompt />
        <MenuBrowser />
      </div>
    </>
  );
}
