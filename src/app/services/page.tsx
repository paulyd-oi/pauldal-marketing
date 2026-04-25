import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="font-display text-4xl text-ink">Services</h1>
    </main>
  );
}
