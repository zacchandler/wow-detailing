import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import Marquee from "@/app/components/Marquee";
import Services from "@/app/components/Services";
import Stats from "@/app/components/Stats";
import Gallery from "@/app/components/Gallery";
import BeforeAfter from "@/app/components/BeforeAfter";
import Reviews from "@/app/components/Reviews";
import BookingCTA from "@/app/components/BookingCTA";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Stats />
        <Gallery />
        <BeforeAfter />
        <Reviews />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}
