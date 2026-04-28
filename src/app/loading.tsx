export default function Loading() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-paper px-6 py-24">
      <div className="flex flex-col items-center gap-4">
        <span
          aria-hidden="true"
          className="block h-1.5 w-1.5 animate-pulse rounded-full bg-oxblood"
        />
        <p className="font-body text-xs uppercase tracking-widest text-ink/60">
          Loading
        </p>
      </div>
    </section>
  );
}
