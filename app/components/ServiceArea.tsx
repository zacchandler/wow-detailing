"use client";

import { useRef } from "react";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { MapPin } from "lucide-react";

const AREAS = [
  { name: "Aventura", top: "8%", left: "62%" },
  { name: "Miami Beach", top: "28%", left: "78%" },
  { name: "Hialeah", top: "22%", left: "30%" },
  { name: "Doral", top: "40%", left: "12%" },
  { name: "Brickell", top: "48%", left: "58%" },
  { name: "Coral Gables", top: "62%", left: "38%" },
  { name: "Kendall", top: "80%", left: "25%" },
] as const;

export default function ServiceArea() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const badges = badgesRef.current?.querySelectorAll(".area-badge");
      if (!badges?.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          badges,
          { opacity: 0, y: 24, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(badges, { opacity: 1, y: 0, scale: 1 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="service-area"
      className="bg-navy py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* ---- Section label ---- */}
        <p className="text-center font-poppins text-sm font-bold uppercase tracking-[0.12em] text-teal">
          COVERAGE
        </p>

        {/* ---- Heading ---- */}
        <h2 className="mt-4 text-center font-poppins text-4xl font-black text-white lg:text-5xl">
          We Serve All of Miami-Dade
        </h2>

        {/* ---- Subtext ---- */}
        <p className="mx-auto mt-4 max-w-lg text-center font-nunito text-lg font-light text-text-light/70">
          From Aventura to Homestead, our mobile team comes to you.
        </p>

        {/* ---- Stylized map container ---- */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-navy-light p-6 sm:p-10">
          <div
            ref={badgesRef}
            className="relative mx-auto"
            style={{ height: "420px", maxWidth: "600px" }}
          >
            {/* Decorative grid lines */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
              aria-hidden="true"
            >
              {[...Array(6)].map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={`${(i + 1) * 16.6}%`}
                  x2="100%"
                  y2={`${(i + 1) * 16.6}%`}
                  stroke="white"
                  strokeWidth="1"
                />
              ))}
              {[...Array(6)].map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={`${(i + 1) * 16.6}%`}
                  y1="0"
                  x2={`${(i + 1) * 16.6}%`}
                  y2="100%"
                  stroke="white"
                  strokeWidth="1"
                />
              ))}
            </svg>

            {/* Area badges */}
            {AREAS.map((area) => (
              <div
                key={area.name}
                className="area-badge absolute opacity-0"
                style={{ top: area.top, left: area.left }}
              >
                <button
                  type="button"
                  className="group flex cursor-pointer items-center gap-2 rounded-full border border-teal/30 bg-teal/5 px-4 py-2 transition-all duration-200 hover:scale-105 hover:bg-teal/20"
                >
                  {/* Pulsing dot */}
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal" />
                  </span>
                  <MapPin
                    size={14}
                    className="shrink-0 text-teal transition-colors duration-200 group-hover:text-teal-light"
                  />
                  <span className="whitespace-nowrap font-poppins text-sm font-bold text-white">
                    {area.name}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reduced-motion: disable pulsing dot animation */}
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          .area-badge .animate-ping {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
