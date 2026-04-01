import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond, Nunito } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "600"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WOW Mobile Detailing Miami | Premium Mobile Car Detailing",
  description:
    "Miami's premier mobile car detailing service. 5.0 rated, Latino-owned. We come to you. Exterior, interior, ceramic coating & more. Book in 60 seconds.",
  keywords: [
    "mobile detailing Miami",
    "car detailing Miami",
    "ceramic coating Miami",
    "paint correction Miami",
    "mobile car wash",
    "WOW detailing",
  ],
  openGraph: {
    title: "WOW Mobile Detailing Miami",
    description: "Miami's Premium Mobile Detail. We Come to You.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${cormorant.variable} ${nunito.variable}`}
    >
      <body className="font-body font-extralight antialiased bg-[#070E16] text-[#F0F2F4]">
        {children}
      </body>
    </html>
  );
}
