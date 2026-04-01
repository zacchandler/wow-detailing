"use client";

const SERVICES_LINKS = [
  "Exterior Detail",
  "Interior Detail",
  "Full Detail",
  "Ceramic Coating",
] as const;

const COMPANY_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Service Area", href: "#service-area" },
] as const;

const CONTACT_ITEMS = [
  { text: "(305) 555-0199", href: "tel:+13055550199" },
  { text: "hello@wowdetailmiami.com", href: "mailto:hello@wowdetailmiami.com" },
  { text: "Miami-Dade County", href: undefined },
] as const;

const FOLLOW_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/wow_mobiledetail" },
  { label: "Facebook", href: "#" },
  { label: "Google Business", href: "#" },
] as const;

export default function Footer() {
  return (
    <footer className="noise-overlay relative border-t border-white/[0.05] bg-[#070E16]">
      {/* ================================================================ */}
      {/*  TOP ROW                                                         */}
      {/* ================================================================ */}
      <div className="flex flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row md:px-12 lg:px-20">
        {/* Logo */}
        <a
          href="#"
          aria-label="WOW Detailing home"
          className="flex cursor-pointer items-center gap-2"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Water droplet body */}
            <path
              d="M18 3C18 3 6 16 6 23a12 12 0 0 0 24 0C30 16 18 3 18 3Z"
              fill="#1B9AAA"
            />
            {/* W-shape highlight */}
            <path
              d="M11 20l3 8 4-6 4 6 3-8"
              stroke="#F8F9FA"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Gold tip */}
            <path
              d="M18 3C18 3 15.5 8 14 11.5c1.3-1.2 2.6-1.8 4-1.8s2.7.6 4 1.8C20.5 8 18 3 18 3Z"
              fill="#F7B32B"
            />
          </svg>
          <span className="font-display text-lg text-white">WOW</span>
        </a>

        {/* Center tagline */}
        <p className="hidden font-editorial text-sm font-light italic text-white/40 lg:block lg:text-base">
          MIAMI&apos;S MOBILE DETAIL. WE COME TO YOU.
        </p>

        {/* Instagram icon */}
        <a
          href="https://www.instagram.com/wow_mobiledetail"
          aria-label="Instagram"
          className="cursor-pointer text-white/40 transition-colors hover:text-gold"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
      </div>

      {/* ================================================================ */}
      {/*  DIVIDER                                                         */}
      {/* ================================================================ */}
      <div className="mx-6 border-t border-white/[0.05] md:mx-12 lg:mx-20" />

      {/* ================================================================ */}
      {/*  MIDDLE — 4-column grid                                          */}
      {/* ================================================================ */}
      <div className="grid grid-cols-2 gap-8 px-6 py-12 md:px-12 lg:grid-cols-4 lg:px-20">
        {/* ---- Column 1: Services ---- */}
        <div>
          <h3 className="mb-6 font-body text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/30">
            Services
          </h3>
          <ul className="space-y-0">
            {SERVICES_LINKS.map((service) => (
              <li key={service}>
                <a
                  href="#services"
                  className="block cursor-pointer py-1 font-body text-sm font-extralight text-white/40 transition-colors hover:text-white"
                >
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Column 2: Company ---- */}
        <div>
          <h3 className="mb-6 font-body text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/30">
            Company
          </h3>
          <ul className="space-y-0">
            {COMPANY_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="block cursor-pointer py-1 font-body text-sm font-extralight text-white/40 transition-colors hover:text-white"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Column 3: Contact ---- */}
        <div>
          <h3 className="mb-6 font-body text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/30">
            Contact
          </h3>
          <ul className="space-y-0">
            {CONTACT_ITEMS.map(({ text, href }) => (
              <li key={text}>
                {href ? (
                  <a
                    href={href}
                    className="block cursor-pointer py-1 font-body text-sm font-extralight text-white/40 transition-colors hover:text-white"
                  >
                    {text}
                  </a>
                ) : (
                  <span className="block py-1 font-body text-sm font-extralight text-white/40">
                    {text}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Column 4: Follow ---- */}
        <div>
          <h3 className="mb-6 font-body text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/30">
            Follow
          </h3>
          <ul className="space-y-0">
            {FOLLOW_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="block cursor-pointer py-1 font-body text-sm font-extralight text-white/40 transition-colors hover:text-white"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ================================================================ */}
      {/*  BOTTOM BAR                                                      */}
      {/* ================================================================ */}
      <div className="border-t border-white/[0.05] px-6 md:px-12 lg:px-20">
        <div className="flex flex-wrap items-center justify-between gap-4 py-6">
          <p className="font-body text-xs font-extralight text-white/20">
            &copy; 2025 WOW Mobile Detailing Miami
          </p>
          <span className="flex items-center gap-2 font-body text-[10px] font-extrabold uppercase tracking-[0.2em]">
            <span className="text-gold/40">Latino-Owned &amp; Operated</span>
            <span className="text-white/20">&middot;</span>
            <span className="text-white/20">Miami-Dade County</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
