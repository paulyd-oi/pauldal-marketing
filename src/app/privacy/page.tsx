import type { Metadata } from "next";
import { Reveal } from "@/components/site/reveal";

const OG_IMAGE =
  "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw/6227ea99-0217-4ef4-35bc-247a9ee7cd00/public";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Paul Dal Studios handles inquiry data. Plain language, no dark patterns.",
  alternates: { canonical: "https://pauldalstudios.com/privacy" },
  openGraph: {
    title: "Privacy — Paul Dal Studios",
    description:
      "How Paul Dal Studios handles inquiry data. Plain language, no dark patterns.",
    url: "https://pauldalstudios.com/privacy",
    siteName: "Paul Dal Studios",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Paul Dal Studios" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy — Paul Dal Studios",
    description:
      "How Paul Dal Studios handles inquiry data. Plain language, no dark patterns.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
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
                Privacy.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-xl font-body text-base leading-relaxed text-ink lg:text-lg">
                Plain language. No dark patterns. Here is exactly what happens
                when you send an inquiry.
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
                  What I collect
                </h2>
                <p>
                  When you submit the booking form I receive your name, email,
                  optional phone number, optional event date, optional location,
                  optional budget range, and your message. That is the entire
                  list. I do not use cookies for tracking, advertising, or
                  analytics on this site.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div>
                <h2 className="mb-4 font-display text-2xl text-ink lg:text-3xl">
                  What I use it for
                </h2>
                <p>
                  Replying to you about your project. Nothing else. I do not
                  send newsletters. I do not sell, share, or rent inquiry data
                  to anyone, ever.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <h2 className="mb-4 font-display text-2xl text-ink lg:text-3xl">
                  Where it lives
                </h2>
                <p>
                  Inquiries are stored in a private database hosted on Neon. I
                  am a solo operator. There is no third-party CRM, no marketing
                  automation, no email service provider holding your details.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <h2 className="mb-4 font-display text-2xl text-ink lg:text-3xl">
                  How long I keep it
                </h2>
                <p>
                  Inquiries that do not turn into projects are deleted after
                  twelve months. Active or completed client records are kept
                  indefinitely so I can reference past work, but only the
                  minimum needed (name, project, dates, gallery link).
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <h2 className="mb-4 font-display text-2xl text-ink lg:text-3xl">
                  Your control
                </h2>
                <p>
                  Email{" "}
                  <a
                    href="mailto:admin@pauldalstudios.com"
                    className="focus-ring text-oxblood underline underline-offset-4 hover:text-oxblood-hover"
                  >
                    admin@pauldalstudios.com
                  </a>{" "}
                  to request a copy of what I have on you, or to have it
                  deleted. I will action both within seven days.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div>
                <h2 className="mb-4 font-display text-2xl text-ink lg:text-3xl">
                  Updates
                </h2>
                <p>
                  If this page changes, the date at the top changes too.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
