"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";

const NAV_LINKS = [
  { label: "SERVICES", href: "#services" },
  { label: "GALLERY", href: "#gallery" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
] as const;

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ------------------------------------------------------------------ */
  /*  GSAP: scroll-driven frosted glass background                      */
  /* ------------------------------------------------------------------ */
  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const onScroll = () => {
          if (window.scrollY > 80) {
            gsap.to(nav, {
              backgroundColor: "rgba(7, 14, 22, 0.85)",
              backdropFilter: "blur(20px)",
              duration: 0.35,
              ease: "power2.out",
              overwrite: true,
            });
          } else {
            gsap.to(nav, {
              backgroundColor: "rgba(7, 14, 22, 0)",
              backdropFilter: "blur(0px)",
              duration: 0.35,
              ease: "power2.out",
              overwrite: true,
            });
          }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        return () => window.removeEventListener("scroll", onScroll);
      });

      /* Fallback: instant switch for reduced-motion users */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const handleScroll = () => {
          if (window.scrollY > 80) {
            nav.style.backgroundColor = "rgba(7, 14, 22, 0.85)";
            nav.style.backdropFilter = "blur(20px)";
            (nav.style as unknown as Record<string, string>).webkitBackdropFilter = "blur(20px)";
          } else {
            nav.style.backgroundColor = "transparent";
            nav.style.backdropFilter = "none";
            (nav.style as unknown as Record<string, string>).webkitBackdropFilter = "none";
          }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
      });
    },
    { scope: navRef }
  );

  /* ------------------------------------------------------------------ */
  /*  GSAP: mobile drawer link stagger on open                          */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!mobileOpen || !mobileLinksRef.current) return;

    const links = mobileLinksRef.current.querySelectorAll(".mobile-nav-link");
    if (!links.length) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        links,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    });

    return () => mm.revert();
  }, [mobileOpen]);

  /* ------------------------------------------------------------------ */
  /*  Lock body scroll when drawer is open                              */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ------------------------------------------------------------------ */
  /*  Toggle / close drawer                                              */
  /* ------------------------------------------------------------------ */
  const toggleDrawer = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeDrawer = useCallback(() => {
    setMobileOpen(false);
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */
  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 h-[72px]"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* ---- Logo ---- */}
          <a
            href="#"
            aria-label="WOW Detailing home"
            className="group flex items-center gap-2.5 cursor-pointer"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:scale-105"
            >
              {/* Water droplet body — navy fill */}
              <path
                d="M18 3C18 3 6 16 6 23a12 12 0 0 0 24 0C30 16 18 3 18 3Z"
                fill="#0D1B2A"
              />
              {/* W letter inside */}
              <path
                d="M11 19l3 9 4-6.5 4 6.5 3-9"
                stroke="#F8F9FA"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Gold tip at the top */}
              <path
                d="M18 3C18 3 15.5 8 14 11.5c1.3-1.2 2.6-1.8 4-1.8s2.7.6 4 1.8C20.5 8 18 3 18 3Z"
                fill="#F7B32B"
              />
            </svg>
            <span className="font-display text-xl tracking-wider text-white">
              WOW
            </span>
          </a>

          {/* ---- Desktop nav links ---- */}
          <ul className="hidden items-center gap-12 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-body text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/60 transition-colors duration-200 hover:text-white cursor-pointer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ---- CTA + hamburger ---- */}
          <div className="flex items-center gap-6">
            {/* Book Now — desktop */}
            <a
              href="#contact"
              className="hidden font-body text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#F7B32B] border border-[#F7B32B]/70 px-6 py-2.5 rounded-none transition-all duration-200 hover:bg-[#F7B32B] hover:text-[#070E16] cursor-pointer lg:inline-block"
            >
              BOOK NOW
            </a>

            {/* Hamburger — mobile */}
            <button
              type="button"
              onClick={toggleDrawer}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="relative flex h-10 w-10 flex-col items-center justify-center gap-[6px] cursor-pointer lg:hidden"
            >
              <span
                className={`block w-7 h-[1.5px] bg-white transition-all duration-300 origin-center ${
                  mobileOpen ? "translate-y-[3.75px] rotate-45" : ""
                }`}
              />
              <span
                className={`block w-7 h-[1.5px] bg-white transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-x-0" : "opacity-100"
                }`}
              />
              <span
                className={`block w-7 h-[1.5px] bg-white transition-all duration-300 origin-center ${
                  mobileOpen ? "-translate-y-[3.75px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ================================================================ */}
      {/*  Mobile drawer — full-screen slide from right                    */}
      {/* ================================================================ */}
      <div
        id="mobile-menu"
        ref={drawerRef}
        role="dialog"
        aria-modal={mobileOpen}
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-50 bg-[#070E16] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Noise texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
          aria-hidden="true"
        />

        {/* Close button in drawer (hamburger X) */}
        <div className="flex h-[72px] items-center justify-end px-6">
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close menu"
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[6px] cursor-pointer"
          >
            <span className="block w-7 h-[1.5px] bg-white translate-y-[3.75px] rotate-45 transition-all duration-300 origin-center" />
            <span className="block w-7 h-[1.5px] bg-white opacity-0 scale-x-0 transition-all duration-300" />
            <span className="block w-7 h-[1.5px] bg-white -translate-y-[3.75px] -rotate-45 transition-all duration-300 origin-center" />
          </button>
        </div>

        {/* Mobile links */}
        <div
          ref={mobileLinksRef}
          className="flex h-[calc(100vh-72px)] flex-col justify-center pl-8 pb-24"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeDrawer}
              className="mobile-nav-link block font-display text-[48px] leading-[0.9] text-white py-4 cursor-pointer transition-colors duration-200 hover:text-[#F7B32B]"
            >
              {link.label}
            </a>
          ))}

          {/* Book Now — mobile */}
          <a
            href="#contact"
            onClick={closeDrawer}
            className="mobile-nav-link mt-12 inline-block self-start font-body text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#F7B32B] border border-[#F7B32B]/70 px-6 py-2.5 rounded-none transition-all duration-200 hover:bg-[#F7B32B] hover:text-[#070E16] cursor-pointer"
          >
            BOOK NOW
          </a>
        </div>
      </div>
    </>
  );
}
