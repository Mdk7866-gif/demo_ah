"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { restaurant } from "@/config/restaurant";
import { cx } from "@/lib/cx";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/offer", label: "Offers" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link
          href="/menu"
          className="group flex items-center gap-2 rounded-md"
        >
          <span
            aria-hidden
            className="grid size-9 place-items-center rounded-full bg-saffron text-sm font-semibold text-white"
          >
            K
          </span>
          <span className="font-display text-lg leading-tight tracking-tight text-ink sm:text-xl">
            {restaurant.name}
          </span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors",
                      active
                        ? "bg-ink text-ivory"
                        : "text-ink hover:bg-white",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
