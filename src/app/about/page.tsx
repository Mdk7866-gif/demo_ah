import type { Metadata } from "next";
import Image from "next/image";
import { restaurant } from "@/config/restaurant";

export const metadata: Metadata = {
  title: "About",
  description: restaurant.description,
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-semibold tracking-[0.2em] text-saffron uppercase">
        The dining room
      </p>
      <h1 className="mt-2 max-w-3xl font-display text-4xl leading-tight text-balance sm:text-6xl">
        About {restaurant.name}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
        {restaurant.description}
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {restaurant.gallery.map((photo) => (
          <figure
            key={photo.src}
            className="overflow-hidden rounded-3xl border border-line bg-paper"
          >
            <div className="relative aspect-[3/2]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="px-4 py-3 text-sm text-muted">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <section className="mt-14 max-w-3xl">
        <h2 className="font-display text-4xl">The story</h2>
        <div className="mt-4 space-y-4 text-base leading-7 text-ink/90">
          {restaurant.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-4xl">What makes it special</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {restaurant.highlights.map((item) => (
            <li
              key={item.title}
              className="rounded-3xl border border-line bg-paper p-5"
            >
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 rounded-3xl bg-espresso px-5 py-8 text-ivory sm:px-8">
        <h2 className="font-display text-4xl">Visit</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-ivory/80">
          {restaurant.address.full}. The kitchen is closed on Monday. Phone{" "}
          <a className="underline underline-offset-4" href={`tel:${restaurant.phoneTel}`}>
            {restaurant.phoneDisplay}
          </a>
          . Full hours and a directions link are in the footer.
        </p>
      </section>
    </div>
  );
}
