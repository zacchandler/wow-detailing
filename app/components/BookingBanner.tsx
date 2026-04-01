"use client";

import { useRef } from "react";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function BookingBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        )
          .fromTo(
            underlineRef.current,
            { opacity: 0, scaleX: 0 },
            { opacity: 1, scaleX: 1, duration: 0.4, ease: "power2.out" },
            "-=0.3"
          )
          .fromTo(
            subtextRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.2"
          )
          .fromTo(
            ctaRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.2"
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [headingRef.current, underlineRef.current, subtextRef.current, ctaRef.current],
          { opacity: 1, y: 0, scaleX: 1 }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{
        background: "linear-gradient(135deg, #0D1B2A 0%, #1B9AAA 100%)",
      }}
    >
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        {/* ---- Heading ---- */}
        <h2
          ref={headingRef}
          className="font-poppins text-4xl font-black text-white opacity-0 lg:text-6xl"
        >
          Ready for the WOW Experience?
        </h2>

        {/* ---- Decorative gold underline ---- */}
        <div
          ref={underlineRef}
          className="gold-shimmer mx-auto mt-4 h-1 w-24 origin-center rounded-full bg-gold opacity-0"
        />

        {/* ---- Subtext ---- */}
        <p
          ref={subtextRef}
          className="mx-auto mt-6 max-w-lg font-nunito text-lg font-light text-white/80 opacity-0"
        >
          Book your premium mobile detail today. We come to you.
        </p>

        {/* ---- CTA Button ---- */}
        <a
          ref={ctaRef}
          href="#contact"
          className="ripple-btn mt-8 inline-flex h-16 cursor-pointer items-center justify-center rounded-full bg-gold px-12 font-poppins text-xl font-bold text-navy opacity-0 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          Book Your Detail &rarr;
        </a>
      </div>
    </section>
  );
}
