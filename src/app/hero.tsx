"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import { cn } from "~/lib/utils";

export interface HeroImageProps {
  src: StaticImageData;
  alt: string;
  className: string;
}

export interface HeroProps {
  image: HeroImageProps;
  children: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({
  image: { src, alt, className },
  children,
}) => {
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
    <div className="bg-black pt-24">
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
            placeholder="blur"
            className={cn(className)}
          />
        </div>

        <div className="relative z-10 w-full p-12">{children}</div>
      </section>
    </div>
  );
};
