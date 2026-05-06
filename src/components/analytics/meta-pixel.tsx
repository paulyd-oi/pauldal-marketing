"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

type FbqWindow = Window & {
  fbq?: (...args: unknown[]) => void;
};

function MetaPixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    if (!pixelId) return;
    if (typeof window === "undefined") return;
    const w = window as FbqWindow;
    if (typeof w.fbq === "function") {
      w.fbq("track", "PageView");
    }
  }, [pathname, searchParams, pixelId]);

  return null;
}

export function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixelId) return null;

  return (
    <>
      <Script
        id="meta-pixel-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          // Audit C-5: PageView is intentionally NOT fired here. The
          // MetaPixelTracker effect below owns every PageView (initial
          // mount + every client-side route change), giving Meta exactly
          // one PageView per route. Firing here AND in the tracker
          // double-counted every initial pageview, polluting all
          // conversion math from the moment ad spend starts. fbq('init')
          // stays so the queue is set up before the tracker effect runs.
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
          `,
        }}
      />
      <noscript>
        {/* Meta Pixel noscript fallback must be a raw <img> — next/image
            requires JS, which defeats the purpose of the noscript path. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <Suspense fallback={null}>
        <MetaPixelTracker />
      </Suspense>
    </>
  );
}
