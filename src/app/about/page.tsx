import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="font-display text-4xl text-ink">About</h1>
    </main>
  );
}
