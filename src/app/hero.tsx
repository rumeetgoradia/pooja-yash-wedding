"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface HeroProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({ src, alt, children }) => {
  const [blur, setBlur] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newBlur = Math.min(scrollY / 100, 10);
      setBlur(newBlur);
    };

    // Add event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative flex h-[75vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black to-transparent" />

      <div
        className="transition-filter absolute inset-0 h-full w-full duration-300"
        style={{ filter: `blur(${blur}px)` }}
      >
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      <div className="relative z-10 px-4 text-center text-white">
        {children}
      </div>
    </section>
  );
};
