"use client";

import { useRef } from "react";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&q=85&fit=crop", label: "FULL DETAIL", span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=85&fit=crop", label: "INTERIOR", span: "" },
  { src: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=85&fit=crop", label: "CERAMIC", span: "" },
  { src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=85&fit=crop", label: "LUXURY", span: "col-span-2" },
  { src: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=85&fit=crop", label: "FOAM WASH", span: "" },
  { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=90&fit=crop", label: "EXTERIOR", span: "" },
  { src: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=85&fit=crop", label: "POLISH", span: "col-span-2" },
];

export default function Gallery() {
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

          const cells =
            sectionRef.current?.querySelectorAll(".gallery-cell");
          if (!cells || cells.length === 0) return;

          if (!motion) {
            gsap.set(cells, { opacity: 1, y: 0 });
            return;
          }

          gsap.set(cells, { opacity: 0, y: 30 });

          gsap.to(cells, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
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
      id="gallery"
      ref={sectionRef}
      className="dark-bg noise-overlay relative overflow-hidden py-24 lg:py-32"
    >
      {/* Section Label */}
      <p className="pl-6 font-body text-[11px] font-extrabold uppercase tracking-[0.2em] text-teal md:pl-12 lg:pl-20">
        GALLERY
      </p>

      {/* Header */}
      <h2
        className="mt-4 mb-12 pl-6 font-display leading-none text-white md:pl-12 lg:mb-16 lg:pl-20"
        style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
      >
        THE DETAIL
      </h2>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 gap-2 px-6 auto-rows-[200px] md:px-12 lg:grid-cols-4 lg:gap-3 lg:px-20 lg:auto-rows-[280px]">
        {IMAGES.map((image) => (
          <div
            key={image.label}
            className={`gallery-cell group relative cursor-pointer overflow-hidden rounded-lg ${image.span}`}
          >
            {/* Image */}
            <img
              src={image.src}
              alt={image.label}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-teal/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Label on hover */}
            <span className="absolute bottom-4 left-4 translate-y-2 font-display text-[28px] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {image.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
