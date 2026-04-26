"use client";

export function SocialProofBadge() {
  return (
    <div className="fixed bottom-6 left-6 z-40 hidden border border-hairline bg-paper px-4 py-3 transition-colors duration-200 hover:bg-cream-hover motion-reduce:transition-none lg:block">
      <p className="font-body text-xs font-medium text-ink">
        200+ events documented
      </p>
      <p className="font-body text-xs text-ink/60">since 2019</p>
    </div>
  );
}
