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
        <div className="bg-primary">
            <section className="relative flex h-[100vh] items-center overflow-hidden bg-primary">
                {/* <div
                    className={cn(
                        "absolute top-0 left-0 z-10 h-[40%] w-full",
                        "bg-[linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,0.6)_20%,rgba(0,0,0,0.3)_40%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)]",
                    )}
                /> */}
                <div className="transition-filter absolute inset-0 h-full w-full">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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