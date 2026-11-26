"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { restaurant, whatsappChatUrl } from "@/config/restaurant";
import { cx } from "@/lib/cx";
import { usePinToVisualViewport } from "@/lib/use-visual-viewport";

type BookingContextValue = {
  openBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking(): BookingContextValue {
  const value = useContext(BookingContext);
  if (!value) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return value;
}

type Fields = {
  name: string;
  mobile: string;
  date: string;
  time: string;
  guests: string;
  message: string;
};

type FieldName = keyof Fields;

const emptyFields: Fields = {
  name: "",
  mobile: "",
  date: "",
  time: "",
  guests: "2",
  message: "",
};

function todayIso(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

function latestIso(): string {
  const now = new Date();
  now.setMonth(now.getMonth() + 6);
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

function normalizeMobile(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }
  return digits;
}

function validate(fields: Fields): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};
  const name = fields.name.trim();
  if (name.length < 2) {
    errors.name = "Please add the name for the table.";
  }

  const mobile = normalizeMobile(fields.mobile);
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    errors.mobile = "Enter a 10-digit Indian mobile number.";
  }

  if (!fields.date) {
    errors.date = "Choose a date.";
  } else if (fields.date < todayIso()) {
    errors.date = "Choose today or a future date.";
  } else if (fields.date > latestIso()) {
    errors.date = "Choose a date within the next six months.";
  }

  if (!restaurant.bookingTimeSlots.includes(fields.time)) {
    errors.time = "Choose a time slot.";
  }

  const guests = Number(fields.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > restaurant.maxGuests) {
    errors.guests = `Choose between 1 and ${restaurant.maxGuests} guests.`;
  }

  return errors;
}

function bookingMessage(fields: Fields): string {
  const lines = [
    `Table request for ${restaurant.name}`,
    `Name: ${fields.name.trim()}`,
    `Mobile: ${normalizeMobile(fields.mobile)}`,
    `Date: ${fields.date}`,
    `Time: ${fields.time}`,
    `Guests: ${fields.guests}`,
  ];
  const note = fields.message.trim();
  if (note) {
    lines.push(`Note: ${note}`);
  }
  lines.push("Sent from the demo website.");
  return lines.join("\n");
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 16.7L1 23l6.5-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.9.6.7-3.8-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}

const fieldClass =
  "mt-1 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-base text-ink";

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [confirmation, setConfirmation] = useState<"demo" | null>(null);
  const titleId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const whatsappReady = whatsappChatUrl("table") !== null;
  usePinToVisualViewport(overlayRef, open);

  const close = useCallback(() => {
    setOpen(false);
    const target = returnFocus.current;
    window.setTimeout(() => target?.focus(), 0);
  }, []);

  const openBooking = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setConfirmation(null);
    setErrors({});
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus({ preventScroll: true });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));
      if (focusable.length === 0) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === dialogRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close, confirmation]);

  function update<K extends FieldName>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      const firstInvalid = (
        Object.keys(nextErrors) as FieldName[]
      ).find((key) => nextErrors[key]);
      if (firstInvalid) {
        dialogRef.current
          ?.querySelector<HTMLElement>(`#booking-${firstInvalid}`)
          ?.focus();
      }
      return;
    }

    if (whatsappReady) {
      const url = whatsappChatUrl(bookingMessage(fields));
      if (url) {
        window.location.assign(url);
        return;
      }
    }

    setConfirmation("demo");
  }

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <button
        type="button"
        onClick={openBooking}
        className="fixed right-4 bottom-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-saffron px-4 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-saffron-dark sm:right-6 sm:bottom-6"
      >
        <WhatsAppIcon />
        Book a Table
      </button>

      {open
        ? createPortal(
            <div
              ref={overlayRef}
              className="fixed inset-0 z-[70] flex flex-col justify-end sm:items-center sm:justify-center"
            >
          <button
            type="button"
            aria-label="Close booking form"
            className="absolute inset-0 bg-espresso/60"
            onClick={close}
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="sheet-rise relative z-10 max-h-full min-h-0 w-full overflow-y-auto overscroll-contain rounded-t-3xl bg-paper px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl outline-none sm:max-h-[min(100%,760px)] sm:max-w-lg sm:rounded-3xl sm:px-6 sm:pt-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-wide text-saffron uppercase">
                  Table request
                </p>
                <h2 id={titleId} className="font-display text-3xl text-ink">
                  Book a table
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-ink hover:bg-ivory"
              >
                Close
              </button>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted">
              There is no charge and no payment.{" "}
              {whatsappReady
                ? "Submit opens WhatsApp with this request filled in, so you can send it to the restaurant."
                : "No WhatsApp number is configured, so this demo will not contact the restaurant."}
            </p>

            {confirmation === "demo" ? (
              <div className="mt-5 rounded-2xl border border-line bg-ivory p-4" role="status">
                <h3 className="font-display text-2xl">Demo confirmation</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  This is a demo confirmation only. No booking reached the
                  restaurant, and nothing you typed was saved.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-4 inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-semibold"
                >
                  Back to the site
                </button>
              </div>
            ) : (
              <form className="mt-5 space-y-4" onSubmit={onSubmit} noValidate>
                <Field
                  id="booking-name"
                  label="Name"
                  error={errors.name}
                  autoComplete="name"
                  value={fields.name}
                  onChange={(value) => update("name", value)}
                />
                <Field
                  id="booking-mobile"
                  label="Mobile number"
                  error={errors.mobile}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="10-digit number"
                  value={fields.mobile}
                  onChange={(value) => update("mobile", value)}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="booking-date" className="text-sm font-medium">
                      Booking date
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      required
                      min={todayIso()}
                      max={latestIso()}
                      value={fields.date}
                      aria-invalid={errors.date ? true : undefined}
                      aria-describedby={errors.date ? "booking-date-error" : undefined}
                      onChange={(event) => update("date", event.target.value)}
                      className={fieldClass}
                    />
                    {errors.date ? (
                      <p id="booking-date-error" className="mt-1 text-sm text-clay">
                        {errors.date}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="booking-time" className="text-sm font-medium">
                      Booking time slot
                    </label>
                    <select
                      id="booking-time"
                      required
                      value={fields.time}
                      aria-invalid={errors.time ? true : undefined}
                      aria-describedby={errors.time ? "booking-time-error" : undefined}
                      onChange={(event) => update("time", event.target.value)}
                      className={fieldClass}
                    >
                      <option value="">Choose a time</option>
                      {restaurant.bookingTimeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    {errors.time ? (
                      <p id="booking-time-error" className="mt-1 text-sm text-clay">
                        {errors.time}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div>
                  <label htmlFor="booking-guests" className="text-sm font-medium">
                    Number of guests
                  </label>
                  <select
                    id="booking-guests"
                    required
                    value={fields.guests}
                    aria-invalid={errors.guests ? true : undefined}
                    aria-describedby={errors.guests ? "booking-guests-error" : undefined}
                    onChange={(event) => update("guests", event.target.value)}
                    className={fieldClass}
                  >
                    {Array.from({ length: restaurant.maxGuests }, (_, index) => {
                      const count = String(index + 1);
                      return (
                        <option key={count} value={count}>
                          {count}
                        </option>
                      );
                    })}
                  </select>
                  {errors.guests ? (
                    <p id="booking-guests-error" className="mt-1 text-sm text-clay">
                      {errors.guests}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="booking-message" className="text-sm font-medium">
                    Message <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <textarea
                    id="booking-message"
                    rows={3}
                    maxLength={400}
                    value={fields.message}
                    onChange={(event) => update("message", event.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div className="sticky bottom-0 -mx-5 bg-paper px-5 pt-3 sm:-mx-6 sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-saffron px-5 text-sm font-semibold text-white hover:bg-saffron-dark"
                  >
                    {whatsappReady ? "Send on WhatsApp" : "Show demo confirmation"}
                  </button>
                </div>
              </form>
            )}
          </div>
            </div>,
            document.body,
          )
        : null}
    </BookingContext.Provider>
  );
}

function Field({
  id,
  label,
  error,
  value,
  onChange,
  autoComplete,
  inputMode,
  placeholder,
}: {
  id: string;
  label: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  inputMode?: "tel" | "text";
  placeholder?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        required
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cx(fieldClass, error && "border-clay")}
      />
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-clay">
          {error}
        </p>
      ) : null}
    </div>
  );
}
