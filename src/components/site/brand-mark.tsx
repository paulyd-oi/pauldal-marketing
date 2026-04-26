type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE_CLASSES = {
  sm: "text-base",
  md: "text-2xl",
  lg: "text-4xl",
} as const;

export function BrandMark({ size = "md", className = "" }: BrandMarkProps) {
  return (
    <span
      className={`font-display text-oxblood ${SIZE_CLASSES[size]} ${className}`}
      aria-hidden="true"
    >
      ✱
    </span>
  );
}
