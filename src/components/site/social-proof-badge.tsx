"use client";

export function SocialProofBadge() {
  return (
    <div className="fixed bottom-4 left-4 z-40 border border-hairline bg-paper px-3 py-2 shadow-sm transition-colors duration-200 hover:bg-cream-hover motion-reduce:transition-none lg:bottom-6 lg:left-6 lg:px-4 lg:py-3 lg:shadow-none">
      <p className="font-body text-[11px] font-medium leading-tight text-ink lg:text-xs">
        200+ events documented
      </p>
      <p className="font-body text-[11px] leading-tight text-ink/50 lg:text-xs">
        since 2019
      </p>
    </div>
  );
}
