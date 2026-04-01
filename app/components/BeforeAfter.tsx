"use client";

import { useRef, useState, useCallback } from "react";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);

  const updateSlider = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.min(95, Math.max(5, (x / rect.width) * 100));
      setSliderPos(percent);
    },
    []
  );

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current) return;
      updateSlider(e.clientX);
    },
    [updateSlider]
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchStart = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return;
      updateSlider(e.touches[0].clientX);
    },
    [updateSlider]
  );

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

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

          gsap.from(".ba-heading", {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          });

          gsap.from(".ba-slider-container", {
            y: 40,
            opacity: 0,
            duration: 0.7,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
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
      className="dark-bg noise-overlay relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Atmospheric glows */}
      <div className="pointer-events-none absolute left-[50%] top-[30%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-teal/[0.05] blur-[150px]" />
      <div className="pointer-events-none absolute right-[25%] bottom-[20%] h-[300px] w-[300px] rounded-full bg-gold/[0.03] blur-[100px]" />

      {/* Label */}
      <p className="relative z-10 text-center font-body text-[11px] font-extrabold uppercase tracking-[0.2em] text-teal">
        RESULTS
      </p>

      {/* Heading */}
      <h2
        className="ba-heading relative z-10 mt-4 font-editorial italic font-semibold text-white text-center"
        style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
      >
        The Difference
      </h2>

      {/* Slider */}
      <div className="ba-slider-container relative z-10 mt-16 flex flex-col items-center">
        {/* Framing border */}
        <div className="rounded-2xl border border-white/[0.08] p-2 lg:p-3 backdrop-blur-sm bg-white/[0.02]">
        <div
          ref={sliderRef}
          className="w-[85vw] lg:w-[65vw] max-w-[1100px] aspect-[16/9] rounded-xl overflow-hidden relative select-none"
          style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
          role="slider"
          aria-valuenow={Math.round(sliderPos)}
          aria-valuemin={5}
          aria-valuemax={95}
          aria-label="Before and after comparison slider"
          tabIndex={0}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* AFTER image (bottom layer - clean car, revealed by dragging) */}
          <img
            src="/images/car_should_be_202603301013.png"
            alt="After detailing — clean McLaren"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            draggable={false}
          />

          {/* BEFORE image (top layer - dirty car, clipped away by dragging) */}
          <img
            src="/images/dirty.png"
            alt="Before detailing — dirty McLaren"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            }}
            draggable={false}
          />

          {/* Handle */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 -translate-x-1/2 w-[2px] bg-gold" />

            {/* Circle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gold flex items-center justify-center"
              style={{ boxShadow: "0 0 20px rgba(247,179,43,0.4)" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-navy"
              >
                <path
                  d="M8 5L3 12L8 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 5L21 12L16 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        </div>
        {/* Instruction text */}
        <p className="font-body font-extralight text-sm text-white/40 text-center mt-8">
          Drag to reveal.
        </p>
      </div>
    </section>
  );
}
