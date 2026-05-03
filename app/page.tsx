import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import BentoGrid from "@/components/BentoGrid";
import Testimonials from "@/components/Testimonials";
import Diagnostic from "@/components/Diagnostic";
import Video from "@/components/Video";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <Hero />
      <Marquee />
      <BentoGrid />
      <Diagnostic />
      <Testimonials />
      <Video />
      <Footer />
    </main>
  );
}
