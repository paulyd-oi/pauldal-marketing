import type { Metadata } from "next";
import { Reveal } from "@/components/site/reveal";

const OG_IMAGE =
  "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw/6227ea99-0217-4ef4-35bc-247a9ee7cd00/public";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Plain-language terms for Paul Dal Studios. Booking, deposits, deliverables, copyright.",
  alternates: { canonical: "https://pauldalstudios.com/terms" },
  openGraph: {
    title: "Terms — Paul Dal Studios",
    description:
      "Plain-language terms for Paul Dal Studios. Booking, deposits, deliverables, copyright.",
    url: "https://pauldalstudios.com/terms",
    siteName: "Paul Dal Studios",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Paul Dal Studios" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms — Paul Dal Studios",
    description:
      "Plain-language terms for Paul Dal Studios. Booking, deposits, deliverables, copyright.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <Reveal>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/50">
                Last updated April 27, 2026
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mb-8 font-display text-5xl leading-[1.05] tracking-tight text-ink lg:text-8xl">
                Terms.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-xl font-body text-base leading-relaxed text-ink lg:text-lg">
                Plain-language terms covering bookings, deposits, deliverables,
                and copyright. Your individual project contract is the source
                of truth for the specifics; this page covers the defaults.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-paper pb-24 lg:pb-32">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="max-w-2xl space-y-10 font-body text-base leading-relaxed text-ink lg:text-lg">
            <Reveal>
              <div>
                <h2 className="mb-4 font-display text-2xl text-ink lg:text-3xl">
                  Scope of services
                </h2>
                <p>
                  Paul Dal Studios offers photography and videography across
                  weddings, events, business and editorial work. Hybrid photo
                  and video coverage is available on every package. Any project
                  outside these categories needs a custom scope agreed in
                  writing.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div>
                <h2 className="mb-4 font-display text-2xl text-ink lg:text-3xl">
                  Booking
                </h2>
                <p>
                  An inquiry is not a booking. After we have aligned on scope,
                  pricing and date, you will receive a written contract for the
                  specific project. The booking is confirmed once that contract
                  is signed and the deposit clears.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <h2 className="mb-4 font-display text-2xl text-ink lg:text-3xl">
                  Retainer
                </h2>
                <p>
                  A 50% non-refundable retainer locks the date. The remaining
                  balance is paid in instalments that finish two weeks before
                  the shoot for weddings, or seven days before the event for
                  everything else. Cards and bank transfer are both accepted.
                  There is no fee for splitting payments.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <h2 className="mb-4 font-display text-2xl text-ink lg:text-3xl">
                  Cancellation and rescheduling
                </h2>
                <p>
                  Each contract sets out its own cancellation and rescheduling
                  terms because dates, deposits and timelines vary. If life
                  happens, we will work it out. The retainer is generally
                  non-refundable once a date is locked, but it can be moved to
                  a rescheduled date in most cases.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <h2 className="mb-4 font-display text-2xl text-ink lg:text-3xl">
                  Deliverables
                </h2>
                <p>
                  Turnaround windows are stated per package and confirmed in
                  the contract. Galleries are delivered through a private,
                  password-protected link. Files are the high-resolution edits.
                  Raw files are not delivered, because the edit is half the
                  work.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div>
                <h2 className="mb-4 font-display text-2xl text-ink lg:text-3xl">
                  Copyright and use
                </h2>
                <p>
                  Paul Dal Studios retains the copyright to all images and video.
                  Personal-use clients receive a personal print release covering
                  printing, sharing and posting. Business clients receive a
                  commercial usage license for owned channels. Paid media usage
                  is quoted separately.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div>
                <h2 className="mb-4 font-display text-2xl text-ink lg:text-3xl">
                  Precedence
                </h2>
                <p>
                  If anything on this page conflicts with a signed project
                  contract, the contract wins.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
