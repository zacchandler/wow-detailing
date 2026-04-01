"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";

const MARQUEE_TEXT =
  "MIAMI'S FINEST DETAIL \u00B7 WE COME TO YOU \u00B7 CERAMIC COATING \u00B7 PAINT CORRECTION \u00B7 ";

const repeatedText = MARQUEE_TEXT.repeat(4);

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".marquee-track", {
          xPercent: -50,
          duration: 20,
          ease: "none",
          repeat: -1,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="flex h-16 w-full items-center overflow-hidden bg-[#F7B32B]"
    >
      <div className="marquee-track flex whitespace-nowrap">
        <span className="font-display text-[32px] text-[#0D1B2A]">
          {repeatedText}
        </span>
        <span className="font-display text-[32px] text-[#0D1B2A]">
          {repeatedText}
        </span>
      </div>
    </div>
  );
}
