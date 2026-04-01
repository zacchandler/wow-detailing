"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";

/* ------------------------------------------------------------------ */
/*  Panel Data                                                         */
/* ------------------------------------------------------------------ */

interface ServicePanel {
  image: string;
  label: string;
  headline: string;
  body: string;
  price: string;
  imagePosition: "left" | "right";
}

const panels: ServicePanel[] = [
  {
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80&fit=crop",
    label: "01 / EXTERIOR",
    headline: "SHOW ROOM\nSHINE.",
    body: "Full exterior hand wash, clay bar treatment, and tire dressing.",
    price: "from $89",
    imagePosition: "left",
  },
  {
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=85&fit=crop",
    label: "02 / INTERIOR",
    headline: "EVERY\nINCH.",
    body: "Deep vacuum, leather conditioning, odor elimination, windows.",
    price: "from $99",
    imagePosition: "right",
  },
  {
    image:
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&q=85&fit=crop",
    label: "03 / FULL DETAIL",
    headline: "THE WOW\nFACTOR.",
    body: "Complete interior + exterior. The signature experience.",
    price: "from $169",
    imagePosition: "left",
  },
  {
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=85&fit=crop",
    label: "04 / CERAMIC",
    headline: "PROTECTED\nFOR YEARS.",
    body: "Professional ceramic coating. One application, years of protection.",
    price: "from $499",
    imagePosition: "right",
  },
];

/* ------------------------------------------------------------------ */
/*  Panel Component                                                    */
/* ------------------------------------------------------------------ */

function Panel({ panel }: { panel: ServicePanel }) {
  const isReversed = panel.imagePosition === "right";

  return (
    <div
      className={`dark-bg noise-overlay relative flex min-h-[80vh] flex-col ${
        isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      {/* Image Side */}
      <div className="relative h-[50vh] w-full overflow-hidden lg:h-auto lg:w-[55%]">
        <img
          src={panel.image}
          alt={panel.label}
          className="panel-image absolute inset-0 h-full w-full object-cover"
        />
        {/* Gradient overlay on text-side edge */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: isReversed
              ? "linear-gradient(to right, rgba(13,27,42,0.85) 0%, transparent 50%)"
              : "linear-gradient(to left, rgba(13,27,42,0.85) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Text Side */}
      <div className="flex w-full flex-col justify-center px-8 py-16 lg:w-[45%] lg:px-16">
        <p
          data-reveal
          className="font-body text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#1B9AAA]"
        >
          {panel.label}
        </p>

        <h2
          data-reveal
          className="mt-4 font-display leading-[0.85] text-white"
          style={{ fontSize: "clamp(48px, 8vw, 120px)", whiteSpace: "pre-line" }}
        >
          {panel.headline}
        </h2>

        <p
          data-reveal
          className="mt-6 max-w-[400px] font-body text-base font-extralight leading-[1.8] text-white/60"
        >
          {panel.body}
        </p>

        <p
          data-reveal
          className="mt-6 font-editorial text-[28px] font-semibold italic text-[#F7B32B]"
        >
          {panel.price}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Services Section                                                   */
/* ------------------------------------------------------------------ */

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Parallax on panel images */
        const images = gsap.utils.toArray<HTMLElement>(".panel-image");
        images.forEach((img) => {
          gsap.to(img, {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".dark-bg"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        /* Reveal text elements */
        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        gsap.set(reveals, { y: 40, opacity: 0 });

        ScrollTrigger.batch(reveals, {
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.1,
              overwrite: true,
            }),
          start: "top 85%",
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="services" ref={sectionRef} className="relative overflow-hidden">
      {panels.map((panel) => (
        <Panel key={panel.label} panel={panel} />
      ))}
    </section>
  );
}
