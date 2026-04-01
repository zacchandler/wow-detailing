"use client";

import { useRef, useState } from "react";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";

const SERVICES = [
  { name: "Exterior Detail", price: "$89" },
  { name: "Interior Detail", price: "$99" },
  { name: "Full Detail", price: "$169" },
  { name: "Ceramic Coating", price: "$499" },
] as const;

export default function BookingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(0);

  /* ------------------------------------------------------------------ */
  /*  GSAP scroll-triggered entrance                                     */
  /* ------------------------------------------------------------------ */
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Left side elements stagger in
        const leftEls = section.querySelectorAll(".cta-left-anim");
        gsap.fromTo(
          leftEls,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          }
        );

        // Card animates in with slight delay
        const card = section.querySelector(".cta-card-anim");
        if (card) {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="noise-overlay relative min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0D1B2A 0%, #070E16 100%)",
      }}
    >
      {/* Animated radial pulse */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/[0.06] blur-[100px]"
        style={{ animation: "radialPulse 4s ease-in-out infinite" }}
        aria-hidden="true"
      />

      {/* Content layout */}
      <div className="flex h-full flex-col items-center py-24 lg:flex-row lg:py-0 lg:min-h-screen">
        {/* ============================================================ */}
        {/*  LEFT SIDE                                                    */}
        {/* ============================================================ */}
        <div className="relative z-10 px-6 md:px-12 lg:w-1/2 lg:px-20">
          <span className="cta-left-anim block font-body text-[11px] font-extrabold uppercase tracking-[0.2em] text-teal">
            READY?
          </span>

          <h2
            className="cta-left-anim mt-4 font-display leading-[0.85] tracking-[-0.01em] text-white"
            style={{ fontSize: "clamp(60px, 12vw, 160px)" }}
          >
            <span className="block overflow-hidden">
              <span className="block">BOOK YOUR</span>
            </span>
            <span className="block overflow-hidden">
              <span className="block">DETAIL.</span>
            </span>
          </h2>

          <p className="cta-left-anim mt-6 font-editorial text-[clamp(16px,2vw,24px)] font-light italic text-white/70">
            We come to you. Same-day available.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  RIGHT SIDE                                                   */}
        {/* ============================================================ */}
        <div className="relative z-10 mt-16 flex items-center justify-center px-6 lg:mt-0 lg:w-1/2 lg:px-12">
          <div className="cta-card-anim w-full max-w-md rounded-xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm lg:p-12">
            <h3 className="mb-8 font-editorial text-2xl font-light italic text-white">
              Select Your Service
            </h3>

            {/* Service radio buttons */}
            <div>
              {SERVICES.map((service, i) => (
                <button
                  key={service.name}
                  type="button"
                  onClick={() => setSelected(i)}
                  className="group flex w-full cursor-pointer items-center gap-3 border-b border-white/5 py-3 text-left transition"
                  aria-pressed={selected === i}
                >
                  {/* Radio circle */}
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      selected === i
                        ? "border-gold bg-gold"
                        : "border-white/30"
                    }`}
                    aria-hidden="true"
                  >
                    {selected === i && (
                      <span className="block h-1.5 w-1.5 rounded-full bg-[#070E16]" />
                    )}
                  </span>

                  {/* Name */}
                  <span className="font-body text-sm font-extralight text-white/70 transition group-hover:text-white">
                    {service.name}
                  </span>

                  {/* Dash separator */}
                  <span className="font-body text-sm font-extralight text-white/30">
                    &mdash;
                  </span>

                  {/* Price */}
                  <span className="ml-auto font-editorial text-sm font-semibold italic text-gold">
                    {service.price}
                  </span>
                </button>
              ))}
            </div>

            {/* Note */}
            <p className="mt-6 font-body text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/30">
              Available today in Miami-Dade
            </p>

            {/* CTA button */}
            <button
              type="button"
              className="mt-6 h-14 w-full cursor-pointer rounded-full bg-gold font-body text-[13px] font-extrabold uppercase tracking-[0.15em] text-[#070E16] transition hover:brightness-110"
            >
              BOOK NOW — FREE QUOTE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
