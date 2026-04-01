"use client";

import { useRef, useState } from "react";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import ImageStack from "./ImageStack";

const TRUST_ITEMS = [
  "★ 5.0 RATED",
  "200+ DETAILS",
  "MIAMI-DADE",
  "LATINO-OWNED",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [galleryVisible, setGalleryVisible] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { motion } = context.conditions as {
            motion: boolean;
            reduced: boolean;
          };

          const allElements = [
            ".hero-line-1 span",
            ".hero-line-2 span",
            ".hero-sub",
            ".hero-trust > *",
            ".hero-cta",
            ".hero-scroll",
          ];

          if (!motion) {
            gsap.set(allElements, { opacity: 1, y: 0, x: 0 });
            return;
          }

          /* ── Phase 1: Intro animation ── */
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

          tl.from(".hero-line-1 span", { y: "110%", duration: 1.2 })
            .from(".hero-line-2 span", { y: "110%", duration: 1.2 }, "-=0.9")
            .from(".hero-sub", { opacity: 0, y: 30, duration: 0.8 }, "-=0.6")
            .from(
              ".hero-trust > *",
              { opacity: 0, y: 20, duration: 0.6, stagger: 0.08 },
              "-=0.4"
            )
            .from(".hero-cta", { opacity: 0, x: -20, duration: 0.6 }, "-=0.3")
            .from(".hero-scroll", { opacity: 0, duration: 0.8 }, "-=0.2");

          /* ── Phase 2: Scroll-driven — pinned for 300vh total ── */
          /*
           * 0.00–0.33: Navy overlay fades in over image
           * 0.33–0.66: Text slides from bottom-left to bottom-right
           * 0.66–1.00: Spline gallery slides up into the left side
           */
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=300%",
              pin: true,
              scrub: 0.4,
              anticipatePin: 1,
            },
          });

          /* --- Phase A (0–0.33): Navy fades in over image --- */
          scrollTl.to(
            ".hero-navy-cover",
            { opacity: 1, duration: 0.33, ease: "none" },
            0
          );

          scrollTl.to(
            ".hero-glow",
            { opacity: 0, duration: 0.2, ease: "none" },
            0
          );

          scrollTl.to(
            ".hero-scroll",
            { opacity: 0, y: 20, duration: 0.1, ease: "none" },
            0
          );

          /* --- Phase B (0.33–0.66): Text slides to bottom-right --- */
          scrollTl.to(
            ".hero-inner",
            {
              x: () => {
                const section = sectionRef.current;
                if (!section) return 0;
                const inner = section.querySelector(
                  ".hero-inner"
                ) as HTMLElement;
                if (!inner) return 0;
                // Move to right side: section width - inner width - right padding
                const sectionRect = section.getBoundingClientRect();
                const innerRect = inner.getBoundingClientRect();
                const currentLeft = innerRect.left - sectionRect.left;
                return section.offsetWidth - inner.offsetWidth - currentLeft - 48;
              },
              duration: 0.33,
              ease: "power2.inOut",
            },
            0.33
          );

          scrollTl.to(
            ".hero-inner",
            { textAlign: "right", duration: 0.2, ease: "none" },
            0.33
          );

          scrollTl.to(
            ".hero-gold-line",
            { marginLeft: "auto", duration: 0.33, ease: "power2.inOut" },
            0.33
          );

          /* --- Phase C (0.66–1.0): Image stack slides up from bottom-left --- */
          scrollTl.call(() => setGalleryVisible(true), [], 0.5);

          scrollTl.fromTo(
            ".hero-spline",
            { y: "100%", opacity: 0 },
            {
              y: "0%",
              opacity: 1,
              duration: 0.34,
              ease: "power3.out",
            },
            0.66
          );
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="noise-overlay relative h-screen w-full overflow-hidden"
    >
      {/* ─── Background Image ─── */}
      <img
        src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1800&q=85&fit=crop"
        alt="Luxury vehicle detail in dramatic lighting"
        className="hero-bg-image absolute inset-0 h-full w-full object-cover"
      />

      {/* ─── Initial Gradient Overlay ─── */}
      <div className="hero-gradient absolute inset-0 bg-gradient-to-r from-[#070E16] via-[#070E16]/80 to-transparent" />

      {/* ─── Navy Cover (fades in on scroll) ─── */}
      <div
        className="hero-navy-cover absolute inset-0 z-[1] opacity-0"
        style={{ background: "#070E16" }}
      />

      {/* ─── Teal Radial Glow ─── */}
      <div
        className="hero-glow pointer-events-none absolute left-[70%] top-[40%] h-[800px] w-[800px] rounded-full bg-teal/[0.08] blur-3xl"
        aria-hidden="true"
      />

      {/* ─── Interactive Image Stack (slides up into left side) ─── */}
      <div
        className="hero-spline absolute bottom-0 left-0 z-[5] flex h-[80%] w-full items-center justify-center opacity-0 lg:w-[55%]"
        style={{ transform: "translateY(100%)", background: "#070E16", overflow: "visible" }}
      >
        {galleryVisible && <ImageStack />}
      </div>

      {/* ─── Content ─── */}
      <div className="hero-content relative z-[4] flex h-full items-end pb-20 pl-6 pr-6 md:pl-12 md:pr-12 lg:pl-20 lg:pr-12 pointer-events-none">
        <div className="hero-inner pointer-events-auto">
          {/* Headline */}
          <div aria-label="We come to you.">
            <div className="hero-line-1 overflow-hidden">
              <span
                className="block font-display leading-[0.85] tracking-[-0.01em] text-white"
                style={{ fontSize: "clamp(80px, 16vw, 220px)" }}
              >
                WE COME
              </span>
            </div>
            <div className="hero-line-2 overflow-hidden">
              <span
                className="block font-display leading-[0.85] tracking-[-0.01em] text-white"
                style={{ fontSize: "clamp(80px, 16vw, 220px)" }}
              >
                TO YOU.
              </span>
            </div>
            {/* Gold underline accent */}
            <div className="hero-gold-line mt-2 h-[2px] w-[40%] bg-gold" />
          </div>

          {/* Subheadline */}
          <p
            className="hero-sub mt-6 font-editorial font-light italic text-white/80"
            style={{ fontSize: "clamp(18px, 3vw, 36px)" }}
          >
            Miami&apos;s Mobile Detailing Experts
          </p>

          {/* Trust Row */}
          <div className="hero-trust mt-8 flex flex-wrap items-center gap-8">
            {TRUST_ITEMS.map((item, i) => (
              <div key={item} className="flex items-center gap-8">
                {i > 0 && (
                  <div
                    className="h-4 w-[1px] bg-white/20"
                    aria-hidden="true"
                  />
                )}
                <span className="font-body text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/50">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            className="hero-cta cta-underline mt-10 inline-block cursor-pointer font-body text-[13px] font-extrabold uppercase tracking-[0.15em] text-gold transition-all duration-300 hover:tracking-[0.2em]"
            href="#contact"
          >
            GET A FREE QUOTE &rarr;
          </a>
        </div>
      </div>

      {/* ─── Scroll Indicator ─── */}
      <div className="hero-scroll absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center">
        <span
          className="font-body text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/30"
          style={{ writingMode: "vertical-rl" }}
        >
          SCROLL
        </span>
        <div className="mt-3 h-[60px] w-[1px] overflow-hidden bg-white/20">
          <div className="scroll-line h-full w-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}
