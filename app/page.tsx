"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import IntroVideo from "@/components/IntroVideo";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import BentoGrid from "@/components/BentoGrid";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <IntroVideo onFinish={() => setIntroDone(true)} />}

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex w-full flex-1 flex-col"
      >
        <Hero />
        <Marquee />
        <BentoGrid />
        <Testimonials />
        <Footer />
      </motion.main>
    </>
  );
}
