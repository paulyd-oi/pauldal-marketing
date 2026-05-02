"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { captureUtmData } from "@/lib/utm-capture";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function todayISODate() {
  return new Date().toISOString().split("T")[0];
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp("(^|; )" + name + "=([^;]+)"),
  );
  return match ? match[2] : undefined;
}

const API_BASE =
  process.env.NEXT_PUBLIC_FRAME_API_URL ?? "https://app.pauldalstudios.com";

const PROJECT_TYPES = [
  "Weddings",
  "Events",
  "Business",
  "Editorial",
  "Other",
] as const;

const SERVICE_PARAM_TO_PROJECT_TYPE: Record<string, (typeof PROJECT_TYPES)[number]> = {
  weddings: "Weddings",
  events: "Events",
  business: "Business",
  editorial: "Editorial",
};

const WEDDING_TIER_LABELS: Record<string, string> = {
  elopement: "The Elopement Film",
  vow: "The Vow",
  covenant: "The Covenant",
  legacy: "The Legacy",
};

const WEDDING_BUDGET_OPTIONS = [
  "Under $4K",
  "$4–$6K",
  "$6–$10K",
  "$10K+",
  "Not sure yet",
] as const;

const GENERIC_BUDGET_OPTIONS = [
  "Under $1,500",
  "$1,500–$3,000",
  "$3,000–$5,000",
  "$5,000–$7,500",
  "$7,500+",
] as const;

const GUEST_COUNT_OPTIONS = [
  "Under 50",
  "50–100",
  "100–150",
  "150–250",
  "250+",
] as const;

type FormState = {
  status: "idle" | "submitting" | "success" | "error";
  errorMessage?: string;
  fieldErrors?: Record<string, string>;
};

export function BookForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams?.get("service")?.toLowerCase() ?? "";
  const tierParam = searchParams?.get("tier")?.toLowerCase() ?? "";
  const initialProjectType = SERVICE_PARAM_TO_PROJECT_TYPE[serviceParam] ?? "";
  const initialTier =
    tierParam && WEDDING_TIER_LABELS[tierParam] ? tierParam : "";

  const [state, setState] = useState<FormState>({ status: "idle" });
  const [projectType, setProjectType] = useState<string>(initialProjectType);
  const [dateFlexible, setDateFlexible] = useState<boolean>(false);

  const isWeddingMode = projectType === "Weddings";

  useEffect(() => {
    if (state.status === "success" && typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state.status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    const clientErrors: Record<string, string> = {};

    const email = (fd.get("email") as string)?.trim() ?? "";
    if (!EMAIL_PATTERN.test(email)) {
      clientErrors.email = "That doesn't look like a valid email.";
    }

    const eventDate = fd.get("eventDate") as string;
    if (eventDate && eventDate < todayISODate()) {
      clientErrors.eventDate = "Pick a date in the future.";
    }

    if (Object.keys(clientErrors).length > 0) {
      setState({
        status: "error",
        errorMessage: "Please fix the highlighted fields.",
        fieldErrors: clientErrors,
      });
      return;
    }

    setState({ status: "submitting" });

    const payload: Record<string, unknown> = {
      name: fd.get("name"),
      email,
      message: fd.get("message"),
    };

    const phone = fd.get("phone") as string;
    if (phone) payload.phone = phone;

    if (projectType) payload.projectType = projectType.toLowerCase();

    if (eventDate && !dateFlexible) {
      payload.eventDate = new Date(eventDate).toISOString();
    }
    if (dateFlexible) payload.dateFlexible = true;

    const location = fd.get("location") as string;
    if (location) payload.location = location;

    const budget = fd.get("budget") as string;
    if (budget) payload.budget = budget;

    if (isWeddingMode) {
      const partnerName = fd.get("partnerName") as string;
      if (partnerName) payload.partnerName = partnerName;

      const guestCount = fd.get("guestCount") as string;
      if (guestCount) payload.guestCount = guestCount;

      if (initialTier) payload.tier = initialTier;
    }

    // Marketing attribution — pulled from sessionStorage if the visitor
    // landed earlier on /weddings or another page, otherwise from the
    // current URL. The seed write happens at landing time via the
    // <AttributionCapture /> component mounted in the root layout.
    const utm = captureUtmData();
    if (utm.utmSource) payload.utmSource = utm.utmSource;
    if (utm.utmMedium) payload.utmMedium = utm.utmMedium;
    if (utm.utmCampaign) payload.utmCampaign = utm.utmCampaign;
    if (utm.utmContent) payload.utmContent = utm.utmContent;
    if (utm.utmTerm) payload.utmTerm = utm.utmTerm;
    if (utm.gclid) payload.gclid = utm.gclid;
    if (utm.fbclid) payload.fbclid = utm.fbclid;
    if (utm.landingPath) payload.landingPath = utm.landingPath;
    if (utm.referrer) payload.referrer = utm.referrer;
    else if (document.referrer) payload.referrer = document.referrer;

    // Honeypots — both legacy `company_website` (mapped to `honeypot=true`)
    // and the new contract `website` field. FRAME silent-blocks either.
    const honeypotLegacy = fd.get("company_website") as string;
    if (honeypotLegacy) payload.honeypot = true;
    const honeypotWebsite = fd.get("website") as string;
    payload.website = honeypotWebsite ?? "";

    // Generate event_id for CAPI dedup. The same id is sent client-side
    // via fbq below and server-side via FRAME's CAPI handler — Meta
    // dedupes within 48hrs based on (event_name, event_id).
    const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    payload.eventId = eventId;

    const fbc = readCookie("_fbc");
    const fbp = readCookie("_fbp");
    if (fbc) payload.fbc = fbc;
    if (fbp) payload.fbp = fbp;

    try {
      const res = await fetch(`${API_BASE}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(payload),
      });

      if (res.status === 201) {
        // Fire client-side Lead pixel with the same event_id — Meta dedupes
        // against the server-side CAPI Lead event in FRAME's /api/leads.
        if (typeof window !== "undefined") {
          const fbq = (window as { fbq?: (...args: unknown[]) => void }).fbq;
          if (typeof fbq === "function") {
            fbq(
              "track",
              "Lead",
              {
                content_name: projectType.toLowerCase() || "unspecified",
                content_category: initialTier || "unspecified",
                value: 0,
                currency: "USD",
              },
              { eventID: eventId },
            );
          }
        }
        setState({ status: "success" });
        return;
      }

      if (res.status === 200) {
        // Honeypot triggered upstream → FRAME returns 200 with id:"blocked".
        // Show success to the caller so a bot can't tell it was caught;
        // do NOT fire the Pixel Lead event for blocked submissions.
        const body = (await res.json()) as { id?: string };
        if (body?.id === "blocked") {
          setState({ status: "success" });
          return;
        }
      }

      if (res.status === 429) {
        setState({
          status: "error",
          errorMessage:
            "You're submitting too quickly. Please wait a minute and try again.",
        });
        return;
      }

      if (res.status === 400) {
        const body = await res.json();
        const fieldErrors: Record<string, string> = {};
        if (body.errors) {
          for (const err of body.errors as { field: string; message: string }[]) {
            fieldErrors[err.field] = err.message;
          }
        }
        setState({
          status: "error",
          errorMessage: "Please fix the highlighted fields.",
          fieldErrors,
        });
        return;
      }

      setState({
        status: "error",
        errorMessage:
          "Something went wrong on our end. Please try again or email pauljdal@gmail.com directly.",
      });
    } catch {
      setState({
        status: "error",
        errorMessage:
          "Connection issue. Please check your internet and try again, or email pauljdal@gmail.com directly.",
      });
    }
  }

  if (state.status === "success") {
    return (
      <div className="py-12">
        <p className="mb-6 font-body text-xs uppercase tracking-widest text-muted-foreground">
          Sent
        </p>
        <h3 className="mb-6 font-display text-3xl leading-tight text-ink lg:text-4xl">
          Got it.
        </h3>
        <p className="mb-2 max-w-md font-body text-base leading-relaxed text-ink lg:text-lg">
          I&apos;ll be in touch within 24 hours.
        </p>
        <p className="mb-8 font-body text-base text-ink/70">Paul</p>
        <button
          onClick={() => {
            setProjectType("");
            setState({ status: "idle" });
          }}
          className="focus-ring group inline-flex items-center font-body text-sm tracking-wide text-oxblood transition-colors hover:text-oxblood-hover"
        >
          Send another message
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Honeypots — invisible to humans, bots auto-fill any visible text
          input. Both fields trigger a silent block at /api/leads. */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px]"
        aria-hidden="true"
      />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px]"
        aria-hidden="true"
      />

      {/* Tier banner — surfaces when arriving from a wedding tier card */}
      {isWeddingMode && initialTier && WEDDING_TIER_LABELS[initialTier] && (
        <div className="border-l-2 border-oxblood bg-cream-hover px-4 py-3">
          <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">
            Inquiring about
          </p>
          <p className="mt-1 font-display text-lg text-ink">
            {WEDDING_TIER_LABELS[initialTier]}
          </p>
        </div>
      )}

      {/* Name */}
      <label className="block">
        <span className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
          {isWeddingMode ? "Your name" : "Name"}{" "}
          <span className="text-oxblood">*</span>
        </span>
        <input
          name="name"
          type="text"
          required
          className="focus-ring-tight w-full border-b border-hairline bg-transparent px-0 py-3 font-body text-base text-ink transition-colors focus:border-oxblood"
        />
        {state.fieldErrors?.name && (
          <p className="mt-2 font-body text-sm text-oxblood">
            {state.fieldErrors.name}
          </p>
        )}
      </label>

      {/* Partner's name — wedding-only */}
      {isWeddingMode && (
        <label className="block">
          <span className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
            Partner&apos;s name <span className="text-oxblood">*</span>
          </span>
          <input
            name="partnerName"
            type="text"
            required
            className="focus-ring-tight w-full border-b border-hairline bg-transparent px-0 py-3 font-body text-base text-ink transition-colors focus:border-oxblood"
          />
        </label>
      )}

      {/* Email */}
      <label className="block">
        <span className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
          Email <span className="text-oxblood">*</span>
        </span>
        <input
          name="email"
          type="email"
          required
          aria-invalid={!!state.fieldErrors?.email}
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          className="focus-ring-tight w-full border-b border-hairline bg-transparent px-0 py-3 font-body text-base text-ink transition-colors focus:border-oxblood"
        />
        {state.fieldErrors?.email && (
          <p id="email-error" className="mt-2 font-body text-sm text-oxblood">
            {state.fieldErrors.email}
          </p>
        )}
      </label>

      {/* Phone */}
      <label className="block">
        <span className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
          Phone
        </span>
        <input
          name="phone"
          type="tel"
          className="focus-ring-tight w-full border-b border-hairline bg-transparent px-0 py-3 font-body text-base text-ink transition-colors focus:border-oxblood"
        />
        {state.fieldErrors?.phone && (
          <p className="mt-2 font-body text-sm text-oxblood">
            {state.fieldErrors.phone}
          </p>
        )}
      </label>

      {/* Project type — radio chips */}
      <fieldset>
        <legend className="mb-3 block font-body text-xs uppercase tracking-widest text-muted-foreground">
          Project type
        </legend>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((t) => (
            <label key={t} className="cursor-pointer">
              <input
                type="radio"
                name="projectType"
                value={t}
                checked={projectType === t}
                onChange={() => setProjectType(t)}
                className="peer sr-only"
              />
              <span
                className={`inline-block border px-4 py-2 font-body text-sm transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-oxblood ${
                  projectType === t
                    ? "border-oxblood bg-oxblood text-paper"
                    : "border-hairline text-ink hover:bg-cream-hover"
                }`}
              >
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Budget */}
      <label className="block">
        <span className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
          {isWeddingMode ? "Wedding budget" : "Project budget"}{" "}
          {isWeddingMode && <span className="text-oxblood">*</span>}
        </span>
        <select
          name="budget"
          defaultValue=""
          required={isWeddingMode}
          className="focus-ring-tight w-full appearance-none border-b border-hairline bg-transparent px-0 py-3 font-body text-base text-ink transition-colors focus:border-oxblood"
        >
          <option value="">
            {isWeddingMode ? "Select a range" : "Discuss with you"}
          </option>
          {(isWeddingMode ? WEDDING_BUDGET_OPTIONS : GENERIC_BUDGET_OPTIONS).map(
            (b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ),
          )}
        </select>
        <p className="mt-2 font-body text-xs text-ink/50">
          {isWeddingMode
            ? "Helps me match the right film tier to your day."
            : "Helps me match the right package to your project."}
        </p>
      </label>

      {/* Guest count — wedding-only */}
      {isWeddingMode && (
        <label className="block">
          <span className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
            Estimated guest count <span className="text-oxblood">*</span>
          </span>
          <select
            name="guestCount"
            defaultValue=""
            required
            className="focus-ring-tight w-full appearance-none border-b border-hairline bg-transparent px-0 py-3 font-body text-base text-ink transition-colors focus:border-oxblood"
          >
            <option value="">Select a range</option>
            {GUEST_COUNT_OPTIONS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
      )}

      {/* Event / wedding date + flexible checkbox */}
      <div>
        <label className="block">
          <span className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
            {isWeddingMode ? "Wedding date" : "Event date"}
          </span>
          <input
            name="eventDate"
            type="date"
            min={todayISODate()}
            disabled={dateFlexible}
            aria-invalid={!!state.fieldErrors?.eventDate}
            aria-describedby={
              state.fieldErrors?.eventDate ? "eventDate-error" : undefined
            }
            className="focus-ring-tight w-full border-b border-hairline bg-transparent px-0 py-3 font-body text-base text-ink transition-colors focus:border-oxblood disabled:opacity-50"
          />
          {state.fieldErrors?.eventDate && (
            <p
              id="eventDate-error"
              className="mt-2 font-body text-sm text-oxblood"
            >
              {state.fieldErrors.eventDate}
            </p>
          )}
        </label>
        <label className="mt-3 inline-flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={dateFlexible}
            onChange={(e) => setDateFlexible(e.target.checked)}
            className="h-4 w-4 cursor-pointer accent-oxblood"
          />
          <span className="font-body text-sm text-ink/70">
            Date is still flexible
          </span>
        </label>
      </div>

      {/* Venue / city / location */}
      <label className="block">
        <span className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
          {isWeddingMode ? "Venue / city" : "Location"}{" "}
          {isWeddingMode && <span className="text-oxblood">*</span>}
        </span>
        <input
          name="location"
          type="text"
          required={isWeddingMode}
          placeholder={
            isWeddingMode
              ? "Venue name, or city if undecided"
              : "San Diego, Encinitas, etc."
          }
          className="focus-ring-tight w-full border-b border-hairline bg-transparent px-0 py-3 font-body text-base text-ink transition-colors placeholder:text-muted-foreground/50 focus:border-oxblood"
        />
      </label>

      {/* Message */}
      <label className="block">
        <span className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
          {isWeddingMode
            ? "What's most important to you about your wedding film?"
            : "Message"}{" "}
          {!isWeddingMode && <span className="text-oxblood">*</span>}
        </span>
        <textarea
          name="message"
          required={!isWeddingMode}
          rows={6}
          placeholder={
            isWeddingMode
              ? "The moments you can't miss, the feel you're chasing, anything you want me to know."
              : "What are you planning? Dates, venues, vibe. Anything you want to share."
          }
          className="focus-ring-tight w-full resize-y border-b border-hairline bg-transparent px-0 py-3 font-body text-base text-ink transition-colors placeholder:text-muted-foreground/50 focus:border-oxblood"
        />
        {state.fieldErrors?.message && (
          <p className="mt-2 font-body text-sm text-oxblood">
            {state.fieldErrors.message}
          </p>
        )}
      </label>

      {/* Error banner */}
      {state.status === "error" && state.errorMessage && (
        <div className="border border-oxblood bg-oxblood/5 p-4">
          <p className="font-body text-sm text-oxblood">{state.errorMessage}</p>
        </div>
      )}

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={state.status === "submitting"}
          className="focus-ring inline-flex w-full items-center justify-center bg-oxblood px-8 py-3.5 font-body text-base tracking-wide text-paper transition-colors duration-200 hover:bg-oxblood-hover disabled:cursor-not-allowed disabled:opacity-50 lg:w-auto"
        >
          {state.status === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
        <p className="mt-3 font-body text-xs text-ink/50">
          I&apos;ll only use these to reply to you. No newsletters.{" "}
          <a
            href="/privacy"
            className="focus-ring underline underline-offset-2 hover:text-oxblood"
          >
            Privacy
          </a>
          .
        </p>
      </div>
    </form>
  );
}
