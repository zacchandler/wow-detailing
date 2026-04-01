"use client";

import { useRef } from "react";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";

const reviews = [
  {
    text: "Absolutely incredible work. My Tesla looks better than the day I bought it. Carlos and his team are true artists.",
    name: "ALEX R.",
    location: "BRICKELL",
  },
  {
    text: "The ceramic coating on my Porsche is stunning. Water just beads right off. Worth every penny.",
    name: "DAVID L.",
    location: "MIAMI BEACH",
  },
  {
    text: "Best detailing service in Miami, hands down. The attention to detail is unmatched.",
    name: "SOFIA P.",
    location: "DORAL",
  },
];

const paddings = [
  "pl-8 lg:pl-20 mt-16",
  "pl-16 lg:pl-48 mt-12",
  "pl-8 lg:pl-32 mt-12",
];

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          normal: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduced } = context.conditions as {
            reduced: boolean;
            normal: boolean;
          };

          if (reduced) return;

          gsap.from(".review-item", {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none none",
            },
          });
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="dark-bg noise-overlay relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Atmospheric background — no image, pure radial glow + noise */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070E16] via-[#0D1B2A] to-[#070E16]" />
      <div className="pointer-events-none absolute left-[30%] top-[20%] h-[600px] w-[600px] rounded-full bg-teal/[0.04] blur-[120px]" />
      <div className="pointer-events-none absolute right-[20%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-gold/[0.03] blur-[100px]" />

      {/* Giant background text */}
      <span
        className="font-display absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-white/[0.03]"
        style={{ fontSize: "clamp(200px, 35vw, 400px)" }}
        aria-hidden="true"
      >
        5.0
      </span>

      {/* Section label */}
      <p className="relative z-10 font-body font-extrabold text-[11px] uppercase tracking-[0.2em] text-teal pl-6 md:pl-12 lg:pl-20">
        TESTIMONIALS
      </p>

      {/* Heading */}
      <h2
        className="relative z-10 font-editorial italic font-light text-white pl-6 md:pl-12 lg:pl-20 mt-4"
        style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
      >
        What Miami
        <br />
        Is Saying
      </h2>

      {/* Reviews */}
      <div className="relative z-10">
        {reviews.map((review, i) => (
          <div key={review.name} className={`review-item ${paddings[i]}`}>
            {/* Open quote */}
            <span
              className="font-editorial italic text-[80px] text-gold leading-[0] block mb-4"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            {/* Quote text */}
            <p
              className="font-editorial italic font-light text-white/90 max-w-[600px] leading-[1.6]"
              style={{ fontSize: "clamp(18px, 2.5vw, 28px)" }}
            >
              {review.text}
            </p>

            {/* Stars */}
            <div className="flex gap-1 text-gold text-sm mt-6" aria-label="5 out of 5 stars">
              <span aria-hidden="true">&#9733;</span>
              <span aria-hidden="true">&#9733;</span>
              <span aria-hidden="true">&#9733;</span>
              <span aria-hidden="true">&#9733;</span>
              <span aria-hidden="true">&#9733;</span>
            </div>

            {/* Name & Location */}
            <p className="font-body font-extrabold text-[11px] uppercase tracking-[0.2em] text-teal mt-2">
              {review.name} &mdash; {review.location}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
