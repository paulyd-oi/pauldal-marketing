"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function todayISODate() {
  return new Date().toISOString().split("T")[0];
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

type FormState = {
  status: "idle" | "submitting" | "success" | "error";
  errorMessage?: string;
  fieldErrors?: Record<string, string>;
};

export function BookForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams?.get("service")?.toLowerCase() ?? "";
  const initialProjectType = SERVICE_PARAM_TO_PROJECT_TYPE[serviceParam] ?? "";

  const [state, setState] = useState<FormState>({ status: "idle" });
  const [projectType, setProjectType] = useState<string>(initialProjectType);

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

    if (eventDate) payload.eventDate = new Date(eventDate).toISOString();

    const location = fd.get("location") as string;
    if (location) payload.location = location;

    const budget = fd.get("budget") as string;
    if (budget) payload.budget = budget;

    if (document.referrer) payload.referrer = document.referrer;

    const honeypot = fd.get("company_website") as string;
    if (honeypot) payload.honeypot = true;

    try {
      const res = await fetch(`${API_BASE}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(payload),
      });

      if (res.status === 201 || (res.ok && (await res.json()).ok)) {
        setState({ status: "success" });
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
      {/* Honeypot */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px]"
        aria-hidden="true"
      />

      {/* Name */}
      <label className="block">
        <span className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
          Name <span className="text-oxblood">*</span>
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
          Project budget
        </span>
        <select
          name="budget"
          defaultValue=""
          className="focus-ring-tight w-full appearance-none border-b border-hairline bg-transparent px-0 py-3 font-body text-base text-ink transition-colors focus:border-oxblood"
        >
          <option value="">Discuss with you</option>
          <option value="Under $1,500">Under $1,500</option>
          <option value="$1,500–$3,000">$1,500–$3,000</option>
          <option value="$3,000–$5,000">$3,000–$5,000</option>
          <option value="$5,000–$7,500">$5,000–$7,500</option>
          <option value="$7,500+">$7,500+</option>
        </select>
        <p className="mt-2 font-body text-xs text-ink/50">
          Helps me match the right package to your project.
        </p>
      </label>

      {/* Event date */}
      <label className="block">
        <span className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
          Event date
        </span>
        <input
          name="eventDate"
          type="date"
          min={todayISODate()}
          aria-invalid={!!state.fieldErrors?.eventDate}
          aria-describedby={
            state.fieldErrors?.eventDate ? "eventDate-error" : undefined
          }
          className="focus-ring-tight w-full border-b border-hairline bg-transparent px-0 py-3 font-body text-base text-ink transition-colors focus:border-oxblood"
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

      {/* Location */}
      <label className="block">
        <span className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
          Location
        </span>
        <input
          name="location"
          type="text"
          placeholder="San Diego, Encinitas, etc."
          className="focus-ring-tight w-full border-b border-hairline bg-transparent px-0 py-3 font-body text-base text-ink transition-colors placeholder:text-muted-foreground/50 focus:border-oxblood"
        />
      </label>

      {/* Message */}
      <label className="block">
        <span className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
          Message <span className="text-oxblood">*</span>
        </span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="What are you planning? Dates, venues, vibe. Anything you want to share."
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
