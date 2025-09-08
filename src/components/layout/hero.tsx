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
    <div className="bg-black">
      <section className="relative flex h-[72vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black to-transparent to-95%" />
        <div className="transition-filter absolute inset-0 h-full w-full">
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
        {!!children && <div className="relative z-10">{children}</div>}
      </section>
    </div>
  );
};
