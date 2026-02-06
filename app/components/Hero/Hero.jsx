"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

// Dynamically import typewriter (client-only, no SSR)
const TypeWriterEffect = dynamic(
  () => import("react-typewriter-effect"),
  { ssr: false }
);

const images = [
  "/img/slide1.jpg",
  "/img/bersamajuara.jpg",
  "/img/fotobersama.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Ensure client-only rendering (fix hydration error)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto slide
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative w-full h-[90vh] overflow-hidden mt-16">
      {/* Background Image */}
      <div className="absolute inset-0 transition-all duration-700">
        <Image
          src={images[current]}
          alt="Hero Image"
          fill
          className="object-cover brightness-75"
          priority
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 min-h-[3.5rem]">
          {mounted && (
            <TypeWriterEffect
              textStyle={{
                fontFamily: "inherit",
                color: "#ffffff",
                fontWeight: "bold",
              }}
              startDelay={300}
              cursorColor="#ffffff"
              multiText={[
                "Welcome to SD Muhammadiyah 34 Cikupa",
                "Sekolah Unggul, Islami & Berprestasi",
              ]}
              multiTextDelay={1500}
              typeSpeed={80}
              loop={true}   // 🔁 LOOP TERUS
            />
          )}
        </h1>


        <Button asChild size="lg" className="bg-green-400 hover:bg-yellow-500">
          <a href="/spmb">Info SPMB Online</a>
        </Button>
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full hover:bg-black/60 transition"
        aria-label="Previous slide"
      >
        <ChevronLeft className="text-white" />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full hover:bg-black/60 transition"
        aria-label="Next slide"
      >
        <ChevronRight className="text-white" />
      </button>
    </section>
  );
}
