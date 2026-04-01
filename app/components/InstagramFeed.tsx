"use client";

import { useRef } from "react";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Heart, MessageCircle } from "lucide-react";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const INSTAGRAM_URL =
  "https://www.instagram.com/wow_mobiledetail?igsh=MTQ2M3p0N3ZiY2tvdQ==";

const TILE_GRADIENTS = [
  "linear-gradient(135deg, #0D1B2A 0%, #1B9AAA 100%)",
  "linear-gradient(180deg, #F7B32B 0%, #E08A1E 100%)",
  "linear-gradient(225deg, #1B9AAA 0%, #0D1B2A 100%)",
  "linear-gradient(90deg, #0D1B2A 0%, #1B9AAA 100%)",
  "linear-gradient(45deg, #1B9AAA 0%, #0D1B2A 100%)",
  "linear-gradient(315deg, #F7B32B 0%, #D4781A 100%)",
  "linear-gradient(135deg, #1B9AAA 0%, #14707D 100%)",
  "linear-gradient(270deg, #0D1B2A 0%, #1B9AAA 100%)",
  "linear-gradient(180deg, #1B9AAA 0%, #0D1B2A 100%)",
];

const FAKE_STATS = [
  { likes: 234, comments: 18 },
  { likes: 412, comments: 31 },
  { likes: 189, comments: 12 },
  { likes: 567, comments: 42 },
  { likes: 321, comments: 27 },
  { likes: 298, comments: 15 },
  { likes: 445, comments: 33 },
  { likes: 178, comments: 9 },
  { likes: 523, comments: 38 },
];

export default function InstagramFeed() {
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

          const tiles =
            sectionRef.current?.querySelectorAll(".insta-tile");
          if (!tiles || tiles.length === 0) return;

          if (!motion) {
            gsap.set(tiles, { opacity: 1, y: 0 });
            return;
          }

          gsap.set(tiles, { opacity: 0, y: 30 });

          gsap.to(tiles, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
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
      className="w-full bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Heading */}
        <h2
          className="text-center font-poppins text-4xl font-black lg:text-5xl"
          style={{ color: "#0D1B2A" }}
        >
          Follow the Shine
        </h2>

        {/* Subheading / Instagram Handle */}
        <p className="mt-3 text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer font-poppins text-xl font-bold transition-opacity duration-200 hover:opacity-80"
            style={{ color: "#1B9AAA" }}
          >
            @wow_mobiledetail
          </a>
        </p>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
          {TILE_GRADIENTS.map((gradient, i) => (
            <a
              key={i}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="insta-tile group relative aspect-square cursor-pointer overflow-hidden rounded-xl transition-shadow duration-300 hover:shadow-2xl"
            >
              {/* Placeholder gradient background */}
              <div
                className="absolute inset-0"
                style={{ background: gradient }}
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 z-10 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ backgroundColor: "rgba(247, 179, 43, 0.80)" }}
              >
                <span className="flex items-center gap-1.5">
                  <Heart
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="#0D1B2A"
                    style={{ color: "#0D1B2A" }}
                  />
                  <span
                    className="font-poppins text-xs font-bold sm:text-sm"
                    style={{ color: "#0D1B2A" }}
                  >
                    {FAKE_STATS[i].likes}
                  </span>
                </span>

                <span className="flex items-center gap-1.5">
                  <MessageCircle
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    style={{ color: "#0D1B2A" }}
                  />
                  <span
                    className="font-poppins text-xs font-bold sm:text-sm"
                    style={{ color: "#0D1B2A" }}
                  >
                    {FAKE_STATS[i].comments}
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex justify-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full px-8 py-3.5 font-poppins text-base font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: "#1B9AAA" }}
          >
            <InstagramIcon />
            View on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
