"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { restaurant } from "@/config/restaurant";
import { usePinToVisualViewport } from "@/lib/use-visual-viewport";

type Status = "asking" | "skipped" | "submitted";

export function WelcomePrompt() {
  const [status, setStatus] = useState<Status>("asking");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const titleId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const sheetOpen = mounted && status !== "skipped";
  usePinToVisualViewport(overlayRef, sheetOpen);

  useEffect(() => {
    if (!mounted || status === "skipped") {
      return;
    }
    const mobileScreen = window.matchMedia("(max-width: 767px)");
    if (!mobileScreen.matches) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setStatus("skipped");
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mounted, status]);

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

  const fields = (idPrefix: string) => (
    <WelcomeFields
      idPrefix={idPrefix}
      name={name}
      mobile={mobile}
      error={error}
      onName={setName}
      onMobile={setMobile}
      onSubmit={onSubmit}
      onSkip={() => setStatus("skipped")}
    />
  );

  const mobileSheet =
    mounted &&
    createPortal(
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[80] flex flex-col justify-end md:hidden"
      >
        <button
          type="button"
          aria-label="Skip and view menu"
          className="absolute inset-0 bg-espresso/50"
          onClick={() => setStatus("skipped")}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="sheet-rise relative z-10 max-h-full min-h-0 w-full min-w-0 overflow-x-hidden overflow-y-auto overscroll-contain rounded-t-3xl bg-paper px-5 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl"
        >
          <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-line" aria-hidden />
          {status === "submitted" ? (
            <Submitted name={name} titleId={titleId} />
          ) : (
            <>
              <h2 id={titleId} className="font-display text-2xl">
                Welcome
              </h2>
              <p className="mt-2 text-sm leading-6 break-words text-muted">
                {restaurant.welcomeNote}
              </p>
              {fields("mobile")}
            </>
          )}
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      {mobileSheet}

      <section className="hidden rounded-2xl border border-line bg-paper p-5 md:block">
        {status === "submitted" ? (
          <Submitted name={name} />
        ) : (
          <>
            <h2 className="font-display text-2xl">Welcome</h2>
            <p className="mt-2 text-sm leading-6 break-words text-muted">
              {restaurant.welcomeNote}
            </p>
            {fields("desktop")}
          </>
        )}
      </section>
    </>
  );
}

function Submitted({ name, titleId }: { name: string; titleId?: string }) {
  return (
    <div role="status">
      <h2 id={titleId} className="font-display text-2xl">
        Hello, {name}
      </h2>
      <p className="mt-2 text-sm leading-6 break-words text-muted">
        {restaurant.welcomeDemoNote}
      </p>
    </div>
  );
}

function WelcomeFields({
  idPrefix,
  name,
  mobile,
  error,
  onName,
  onMobile,
  onSubmit,
  onSkip,
}: {
  idPrefix: string;
  name: string;
  mobile: string;
  error: string;
  onName: (value: string) => void;
  onMobile: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onSkip: () => void;
}) {
  const fieldClass =
    "mt-1 w-full min-w-0 max-w-full rounded-xl border border-line bg-white px-3 py-2.5 outline-offset-0";

  return (
    <form className="mt-4 min-w-0 space-y-3" onSubmit={onSubmit} noValidate>
      <Field label="Name" id={`visit-name-${idPrefix}`}>
        <input
          id={`visit-name-${idPrefix}`}
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => onName(event.target.value)}
          className={fieldClass}
        />
      </Field>
      <Field label="Mobile number" id={`visit-mobile-${idPrefix}`}>
        <input
          id={`visit-mobile-${idPrefix}`}
          name="mobile"
          autoComplete="tel"
          inputMode="tel"
          placeholder="10-digit number"
          value={mobile}
          onChange={(event) => onMobile(event.target.value)}
          className={fieldClass}
        />
      </Field>
      {error ? (
        <p className="text-sm break-words text-clay" role="alert">
          {error}
        </p>
      ) : null}
      <div className="flex flex-col gap-2">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-4 text-sm font-semibold text-ivory"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-paper px-4 text-sm font-semibold"
        >
          Skip and view menu
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
