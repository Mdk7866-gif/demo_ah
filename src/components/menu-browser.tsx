"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import {
  formatInr,
  menuCategories,
  restaurant,
} from "@/config/restaurant";
import { cx } from "@/lib/cx";

const filters = ["All", ...menuCategories] as const;
type Filter = (typeof filters)[number];

function isFilter(value: string): value is Filter {
  return filters.some((filter) => filter === value);
}

export function MenuBrowser() {
  return (
    <Suspense fallback={<MenuFilters categoryParam="All" />}>
      <MenuFromSearch />
    </Suspense>
  );
}

function MenuFromSearch() {
  const categoryParam = useSearchParams().get("category") ?? "All";
  return <MenuFilters key={categoryParam} categoryParam={categoryParam} />;
}

function MenuFilters({ categoryParam }: { categoryParam: string }) {
  const [filter, setFilter] = useState<Filter>(
    isFilter(categoryParam) ? categoryParam : "All",
  );
  const [query, setQuery] = useState("");

  const dishes = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return restaurant.menu.filter((item) => {
      const categoryMatches = filter === "All" || item.category === filter;
      const nameMatches =
        needle.length === 0 || item.name.toLowerCase().includes(needle);
      return categoryMatches && nameMatches;
    });
  }, [filter, query]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-sm">
          <label htmlFor="dish-search" className="text-sm font-medium">
            Search by dish name
          </label>
          <input
            id="dish-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try biryani or gongura"
            className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2.5"
          />
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Menu categories"
        >
          {filters.map((category) => {
            const selected = filter === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(category)}
                className={cx(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium",
                  selected
                    ? "bg-saffron text-white"
                    : "bg-white text-ink ring-1 ring-line",
                )}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {dishes.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-line bg-paper px-6 py-12 text-center">
          <h2 className="font-display text-3xl">No dishes match</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
            Nothing in the {filter === "All" ? "menu" : filter.toLowerCase()}{" "}
            matched “{query.trim()}”. Try another name, or clear the search.
          </p>
          <button
            type="button"
            className="mt-5 inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm font-semibold text-ivory"
            onClick={() => {
              setQuery("");
              setFilter("All");
            }}
          >
            Clear search and filters
          </button>
        </div>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3">
          {dishes.map((item) => (
            <li key={item.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper sm:rounded-3xl">
                <div className="relative aspect-square sm:aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-2 sm:p-4">
                  <div className="flex items-start justify-between gap-1.5">
                    <h2 className="font-display text-sm leading-tight sm:text-2xl">
                      {item.name}
                    </h2>
                    <p className="shrink-0 text-xs font-semibold sm:text-sm">
                      {formatInr(item.price)}
                    </p>
                  </div>
                  {item.diet ? <DietBadge diet={item.diet} /> : null}
                  <p className="mt-1 line-clamp-2 text-xs leading-4 text-muted sm:mt-2 sm:text-sm sm:leading-6">
                    {item.description}
                  </p>
                  <p className="mt-auto pt-2 text-[10px] tracking-wide text-muted uppercase sm:pt-3 sm:text-xs">
                    {item.category}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DietBadge({ diet }: { diet: "veg" | "non-veg" }) {
  const vegetarian = diet === "veg";
  return (
    <p className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wide uppercase sm:mt-2 sm:gap-2 sm:text-xs">
      <span
        aria-hidden
        className={cx(
          "inline-block size-2 rounded-full sm:size-2.5",
          vegetarian ? "bg-leaf" : "bg-clay",
        )}
      />
      <span className={vegetarian ? "text-leaf" : "text-clay"}>
        <span className="sm:hidden">{vegetarian ? "Veg" : "Non-veg"}</span>
        <span className="hidden sm:inline">
          {vegetarian ? "Vegetarian" : "Non-vegetarian"}
        </span>
      </span>
    </p>
  );
}

