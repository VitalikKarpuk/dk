import { AmbientBackdrop } from "@/components/AmbientBackdrop";
import { SiteHeader } from "@/components/ui";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import BentoGrid from "@/components/BentoGrid";
import Testimonials from "@/components/Testimonials";
import Diagnostic from "@/components/Diagnostic";
import Video from "@/components/Video";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative flex w-full flex-1 flex-col">
      {/* Тот же каркас, что у /leader: подложка лежит `fixed` под всей
          страницей, содержимое едет отдельным слоем поверх неё. */}
      <AmbientBackdrop />

      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader />
        <Hero />
        <Marquee />
        <BentoGrid />
        <Diagnostic />
        <Testimonials />
        <Video />
        <Footer />
      </div>
    </main>
  );
}
