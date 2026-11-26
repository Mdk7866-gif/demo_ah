"use client";

import { useState, type FormEvent } from "react";
import { marketingConsentLabel, restaurant } from "@/config/restaurant";

type Status = "asking" | "skipped" | "submitted";

export function WelcomePrompt() {
  const [status, setStatus] = useState<Status>("asking");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const consentText = marketingConsentLabel();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();
    const digits = mobile.replace(/\D/g, "");
    const normalized =
      digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
    if (trimmed.length < 2) {
      setError("Add a name, or skip and view the menu.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(normalized)) {
      setError("Enter a 10-digit mobile number, or skip and view the menu.");
      return;
    }
    setError("");
    setName(trimmed);
    setMobile(normalized);
    setStatus("submitted");
  }

  if (status === "skipped") {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-paper px-4 py-3 text-sm text-muted">
        Browsing without sharing your details.{" "}
        <button
          type="button"
          className="font-semibold text-ink underline decoration-saffron underline-offset-4"
          onClick={() => setStatus("asking")}
        >
          Add your name
        </button>
      </div>
    );
  }

  if (status === "submitted") {
    return (
      <div
        className="rounded-2xl border border-line bg-paper p-4 sm:p-5"
        role="status"
      >
        <h2 className="font-display text-2xl">Hello, {name}</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          {restaurant.welcomeDemoNote}
        </p>
        {consent ? (
          <p className="mt-2 text-sm leading-6 text-muted">
            You ticked the offers box. That choice is not saved in this
            prototype.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-line bg-paper p-4 sm:p-5">
      <h2 className="font-display text-2xl">Welcome</h2>
      <p className="mt-2 text-sm leading-6 text-muted">{restaurant.welcomeNote}</p>
      <form className="mt-4 space-y-3" onSubmit={onSubmit} noValidate>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="visit-name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="visit-name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2.5"
            />
          </div>
          <div>
            <label htmlFor="visit-mobile" className="text-sm font-medium">
              Mobile number
            </label>
            <input
              id="visit-mobile"
              name="mobile"
              autoComplete="tel"
              inputMode="tel"
              placeholder="10-digit number"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2.5"
            />
          </div>
        </div>
        <label className="flex items-start gap-3 rounded-xl border border-line bg-ivory px-3 py-3 text-sm leading-6">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-1 size-4 accent-saffron"
          />
          <span>{consentText}</span>
        </label>
        {error ? (
          <p className="text-sm text-clay" role="alert">
            {error}
          </p>
        ) : null}
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-4 text-sm font-semibold text-ivory"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={() => setStatus("skipped")}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-4 text-sm font-semibold"
          >
            Skip and view menu
          </button>
        </div>
      </form>
    </section>
  );
}
