"use client";

import Image, { type StaticImageData } from "next/image";
import { cn } from "~/lib/utils";

export interface HeroImageProps {
  src: StaticImageData;
  alt: string;
  className?: string;
}

export interface HeroProps {
  image: HeroImageProps;
  children?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({
  image: { src, alt, className },
  children,
}) => {
  return (
    <div className="relative z-[1] container mx-auto w-full max-w-6xl px-4">
      <section className="relative flex h-[48vh] items-center overflow-hidden md:h-[64vh]">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 to-transparent" />
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
        {!!children && <div>{children}</div>}
      </section>
    </div>
  );
};
