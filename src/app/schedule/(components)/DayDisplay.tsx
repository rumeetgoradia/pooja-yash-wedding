"use client";

import Image, { type StaticImageData } from "next/image";
import type { EventItem } from "../types";
import EventDisplay from "./EventDisplay";
import { formatDayHeader } from "../utils";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

type Props = {
    dayISO: string;
    hero: { src: StaticImageData; alt: string }; // imported static image -> has intrinsic width/height
    vibe?: string;
    events: EventItem[];
    flip?: boolean;
};

export default function DayDisplay({ dayISO, hero, vibe, events, flip }: Props) {
    const stickyTop = "top-24";

    return (
        <section id={dayISO} className="py-12 md:py-20">
            <div className="grid items-start gap-8 md:gap-10 md:grid-cols-12">
                <aside
                    className={cn(
                        "md:col-span-5 md:sticky",
                        stickyTop,
                        "self-start",
                        flip ? "md:order-2" : "md:order-1",
                        flip && "md:text-right"
                    )}
                >
                    <header className="mb-4 md:mb-6">
                        <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
                            {formatDayHeader(dayISO)}
                        </h2>
                        {vibe && (
                            <p className="mt-1 font-serif text-xl md:text-3xl [font-variant:small-caps]  text-zinc-700 ">
                                {vibe}
                            </p>
                        )}
                    </header>

                    <div className="rounded-lg shadow-sm overflow-hidden">
                        <Image
                            src={hero.src}
                            alt={hero.alt}
                            sizes="(min-width: 1280px) 38vw, (min-width: 768px) 45vw, 100vw"
                            className="w-full h-auto"
                            priority={false}
                            placeholder="blur"
                        />
                    </div>

                </aside>

                <div className={["md:col-span-7 md:pt-28", flip ? "md:order-1" : "md:order-2"].join(" ")}>
                    <ol className="space-y-4 md:space-y-5 max-w-[66ch]">
                        {events.map((e, i) => (
                            <div key={e.id} className=''>
                                <EventDisplay event={e} />
                                {i < events.length - 1 && <Separator className='my-6 md:my-12 !w-20' />}
                            </div>
                        ))}
                    </ol>
                </div>
            </div >
        </section >
    );
}
