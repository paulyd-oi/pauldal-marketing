import Image from "next/image";

const CF_BASE = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";

type PhotoFlankedHeadingProps = {
  headline: string;
  body: string;
  imageId: string;
  imageAlt: string;
  photoSide?: "left" | "right";
};

export function PhotoFlankedHeading({
  headline,
  body,
  imageId,
  imageAlt,
  photoSide = "right",
}: PhotoFlankedHeadingProps) {
  const photoOnRight = photoSide === "right";

  const textCol = (
    <div className="flex flex-col gap-y-8">
      <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl xl:text-7xl">
        {headline}
      </h2>
      <p className="max-w-md font-body text-base text-ink/70">{body}</p>
    </div>
  );

  const photoCol = (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-md">
      <Image
        src={`${CF_BASE}/${imageId}/w=900,h=1200,fit=cover`}
        alt={imageAlt}
        fill
        sizes="(min-width: 768px) 40vw, 100vw"
        className="object-cover"
      />
    </div>
  );

  return (
    <section className="bg-paper px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16">
        {photoOnRight ? (
          <>
            {textCol}
            {photoCol}
          </>
        ) : (
          <>
            {photoCol}
            {textCol}
          </>
        )}
      </div>
    </section>
  );
}
