"use client";

import { useRef } from "react";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";

const steps = [
  {
    number: "01",
    title: "Book Online",
    description: "Pick your service and time slot in just 60 seconds.",
    Icon: Calendar,
  },
  {
    number: "02",
    title: "We Come to You",
    description:
      "Our expert team arrives at your home or office, fully equipped.",
    Icon: MapPin,
  },
  {
    number: "03",
    title: "Drive Away Gleaming",
    description: "Showroom-quality shine, satisfaction guaranteed.",
    Icon: Sparkles,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

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
          const { reduced } = context.conditions as { reduced: boolean; normal: boolean };

          if (reduced) return;

          // Animate steps staggering in
          gsap.from(stepsRef.current.filter(Boolean), {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          });

          // Animate the connector line drawing on scroll
          if (lineRef.current) {
            const length = lineRef.current.getTotalLength();
            gsap.set(lineRef.current, {
              strokeDasharray: length,
              strokeDashoffset: length,
            });

            gsap.to(lineRef.current, {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
                end: "bottom 80%",
                scrub: true,
              },
            });
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#0D1B2A] py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <p className="font-poppins font-bold uppercase tracking-[0.12em] text-sm text-[#1B9AAA] text-center">
          SIMPLE PROCESS
        </p>

        {/* Heading */}
        <h2 className="font-poppins font-black text-5xl lg:text-6xl text-white text-center mt-4">
          How It Works
        </h2>

        {/* Steps container */}
        <div className="relative mt-20">
          {/* Connector SVG — desktop only */}
          <svg
            className="hidden lg:block absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none"
            width="700"
            height="4"
            viewBox="0 0 700 4"
            fill="none"
            aria-hidden="true"
          >
            <path
              ref={lineRef}
              d="M0 2 H700"
              stroke="#F7B32B"
              strokeWidth={2}
              strokeDasharray="8 6"
              fill="none"
            />
          </svg>

          {/* Steps row */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 lg:gap-8">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => {
                  stepsRef.current[i] = el;
                }}
                className="relative flex flex-col items-center text-center max-w-xs"
              >
                {/* Large background number */}
                <span className="font-poppins font-black text-6xl text-[#F7B32B]/20 absolute -top-6 left-1/2 -translate-x-1/2 select-none pointer-events-none">
                  {step.number}
                </span>

                {/* Icon circle */}
                <div className="relative z-10 w-20 h-20 rounded-full border-2 border-[#1B9AAA] bg-[#1B9AAA]/10 flex items-center justify-center">
                  <step.Icon className="size-8 text-[#1B9AAA]" />
                </div>

                {/* Title */}
                <h3 className="font-poppins font-extrabold text-xl text-white mt-6">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-nunito font-light text-white/70 text-sm mt-3">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
