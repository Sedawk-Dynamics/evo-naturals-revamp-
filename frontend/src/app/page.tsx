import { PromoBanner } from "@/components/layout/PromoBanner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Wellness } from "@/components/sections/Wellness";
import { Philosophy } from "@/components/sections/Philosophy";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Articles } from "@/components/sections/Articles";
import { MagneticCursor } from "@/components/ui/magnetic-cursor";

// The home page, top to bottom. Light (Snow White) and dark
// (Forest Depths) bands alternate as DESIGN.md describes.
export default function HomePage() {
  return (
    // Custom cursor: follows the mouse, snaps to [data-magnetic] buttons.
    // Turned off automatically on touch devices.
    <MagneticCursor magneticFactor={0.3} cursorSize={20}>
      <PromoBanner />
      <Navbar />
      <main>
        <Hero />            {/* light — Feel Balanced. Think Clear…   */}
        <ProductShowcase /> {/* dark  — Products                       */}
        <Wellness />        {/* light — intro + wellness categories    */}
        <Philosophy />      {/* dark  — Built on Nature…               */}
        <About />           {/* light — About Evo Naturals             */}
        <Testimonials />    {/* dark  — Customer testimonials          */}
        <Articles />        {/* light — Articles                       */}
      </main>
      <Footer />            {/* dark  — links, contact, social dock    */}
    </MagneticCursor>
  );
}
