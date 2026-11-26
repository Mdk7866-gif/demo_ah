"use client";

import Link from "next/link";
import type { Offer } from "@/config/restaurant";
import { useBooking } from "@/components/booking";

export function OfferAction({ offer }: { offer: Offer }) {
  const { openBooking } = useBooking();

  if (offer.cta === "drinks") {
    return (
      <Link
        href="/menu?category=Drinks"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-4 text-sm font-semibold text-ivory"
      >
        {offer.ctaLabel}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={openBooking}
      className="inline-flex min-h-11 items-center justify-center rounded-full bg-saffron px-4 text-sm font-semibold text-white hover:bg-saffron-dark"
    >
      {offer.ctaLabel}
    </button>
  );
}
