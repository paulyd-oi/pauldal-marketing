import { Reveal } from "./reveal";

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
}

export const DEFAULT_PROCESS_STEPS: ProcessStep[] = [
  {
    num: "1",
    title: "Reach out",
    desc: "Tell me about your project: date, location, vision. I read every inquiry personally and respond within 24 hours.",
  },
  {
    num: "2",
    title: "Get the details",
    desc: "I'll send pricing, packages, and a deeper look at how I work. No pressure, no auto-replies.",
  },
  {
    num: "3",
    title: "We talk it through",
    desc: "Quick discovery call to align on creative direction, timeline, and what success looks like for you.",
  },
  {
    num: "4",
    title: "Lock the date",
    desc: "Sign the contract, send a 25% deposit. Your date is yours.",
  },
  {
    num: "5",
    title: "Show up and shoot",
    desc: "I arrive prepared. We work through the timeline together. You stay present, I handle the rest.",
  },
  {
    num: "6",
    title: "Deliver the work",
    desc: "Sneak peeks within 72 hours. Full edited gallery in 2–4 weeks. We celebrate it together.",
  },
];

export function ProcessSteps({
  steps = DEFAULT_PROCESS_STEPS,
}: {
  steps?: ProcessStep[];
}) {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {steps.map((step, i) => (
        <Reveal key={step.num} delay={i * 0.08}>
          <div className="flex gap-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-oxblood font-body text-sm font-medium text-paper">
              {step.num}
            </div>
            <div>
              <h3 className="mb-2 font-display text-xl text-ink">
                {step.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-ink/70">
                {step.desc}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
