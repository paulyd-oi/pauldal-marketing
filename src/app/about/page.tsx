import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
      <h1 className="font-display text-4xl text-ink">About</h1>
    </div>
  );
}
