import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book",
};

export default function BookPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="font-display text-4xl text-ink">Book</h1>
    </main>
  );
}
