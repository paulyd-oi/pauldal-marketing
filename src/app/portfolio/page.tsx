import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="font-display text-4xl text-ink">Portfolio</h1>
    </main>
  );
}
