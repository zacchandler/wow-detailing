"use client";

import { useRef } from "react";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";

const STATS = [
  { value: "5.0", label: "STAR RATING" },
  { value: "200+", label: "HAPPY CLIENTS" },
  { value: "60", label: "SECOND BOOKING" },
  { value: "1", label: "CALL & WE'RE THERE" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

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

          const items =
            sectionRef.current?.querySelectorAll(".stat-item");
          if (!items || items.length === 0) return;

          if (!motion) {
            gsap.set(items, { opacity: 1, y: 0 });
            return;
          }

          gsap.set(items, { opacity: 0, y: 40 });

          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
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
      className="stats-section dark-bg noise-overlay relative overflow-hidden py-32 lg:py-40"
    >
      {/* Background texture text */}
      <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[clamp(200px,30vw,500px)] text-white/[0.03]">
        WOW
      </span>

      {/* Stats grid */}
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 gap-8 px-8 lg:grid-cols-4 lg:gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="stat-item">
            <p
              className="stat-number text-center font-editorial font-semibold leading-none text-gold"
              style={{ fontSize: "clamp(80px, 12vw, 160px)" }}
            >
              {stat.value}
            </p>
            <p className="mt-4 text-center font-body text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/40">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
