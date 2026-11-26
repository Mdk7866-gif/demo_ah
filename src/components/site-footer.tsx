import { mapsDirectionsUrl, restaurant } from "@/config/restaurant";

export function SiteFooter() {
  const mapsUrl = mapsDirectionsUrl();

  return (
    <footer className="bg-espresso text-ivory">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{restaurant.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-ivory/80">
            {restaurant.tagline}
          </p>
          <address className="mt-4 text-sm leading-6 not-italic text-ivory/90">
            {restaurant.address.line1}
            <br />
            {restaurant.address.line2}
            <br />
            {restaurant.address.city}
          </address>
          <div className="mt-4 flex flex-col items-start gap-2 text-sm">
            <a
              className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
              href={`tel:${restaurant.phoneTel}`}
            >
              {restaurant.phoneDisplay}
            </a>
            <a
              className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Directions on Google Maps
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide uppercase text-ivory/70">
            Hours
          </h2>
          <table className="mt-3 w-full text-sm">
            <caption className="sr-only">
              Opening and closing hours for {restaurant.name}
            </caption>
            <tbody>
              {restaurant.hours.map((entry) => (
                <tr key={entry.day} className="border-b border-white/10">
                  <th scope="row" className="py-2 pr-3 text-left font-medium">
                    {entry.day}
                  </th>
                  <td className="py-2 text-ivory/85">
                    {entry.sessions.length === 0
                      ? "Closed"
                      : entry.sessions.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide uppercase text-ivory/70">
            Social
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {restaurant.social.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
                >
                  {link.label}
                  <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs tracking-normal text-ivory/80">
                    Demo link
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-6 text-ivory/70">
            Demonstration website. Sample offers are not live promotions.
            A table request opens WhatsApp so the guest can send it. This
            site does not store the message.
          </p>
        </div>
      </div>
    </footer>
  );
}
