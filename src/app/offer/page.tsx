import type { Metadata } from "next";
import { OfferAction } from "@/components/offer-actions";
import { restaurant } from "@/config/restaurant";

export const metadata: Metadata = {
  title: "Offers",
  description: `Current dine-in offers at ${restaurant.name} in Hanamkonda.`,
};

export default function OfferPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-semibold tracking-[0.2em] text-saffron uppercase">
        Dine in
      </p>
      <h1 className="mt-2 max-w-2xl font-display text-5xl leading-none">
        Offers
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        Lunch meals with majjiga on weekdays, a shared vegetarian starter for a
        larger table, and a lime soda in the late afternoon. Mention the offer
        when you order.
      </p>
      <ul className="mt-8 grid gap-5 lg:grid-cols-3">
        {restaurant.offers.map((offer) => (
          <li key={offer.id}>
            <article className="flex h-full flex-col rounded-3xl border border-line bg-paper p-5">
              <p className="w-fit rounded-full bg-saffron/10 px-3 py-1 text-xs font-semibold tracking-wide text-saffron-dark uppercase">
                {offer.label}
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight">
                {offer.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {offer.description}
              </p>
              <p className="mt-4 text-sm leading-6 text-ink">{offer.terms}</p>
              <div className="mt-6">
                <OfferAction offer={offer} />
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
