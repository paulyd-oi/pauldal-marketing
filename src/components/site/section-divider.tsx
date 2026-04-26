import { BrandMark } from "./brand-mark";

export function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-16 lg:py-24">
      <div className="h-px w-16 bg-hairline" />
      <BrandMark size="md" className="mx-6" />
      <div className="h-px w-16 bg-hairline" />
    </div>
  );
}
