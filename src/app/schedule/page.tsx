import { EVENTS, DAY_META } from "./data";
import { groupByDay } from "./utils";
import DayDisplay from "./(components)/DayDisplay";
import LandingImage from "public/heros/schedule.jpg"
import type { HeroImageProps } from "~/components/layout/hero";
import { Content } from "~/components/layout/content";
import { Button } from "~/components/ui/button";
import Link from "next/link";

const HeroImage: HeroImageProps = {
    src: LandingImage,
    alt: "Schedule - Pooja & Yash",
    className: "max-sm:object-[58%]",
};

export default function SchedulePage() {
    const grouped = groupByDay(EVENTS);
    const days = Array.from(grouped.keys());

    return (
        <Content heroImage={HeroImage}>
            <div className='flex flex-col gap-y-12 md:gap-y-20'>
                {days.map((k, idx) => {
                    const meta = DAY_META[k];
                    const events = grouped.get(k)!;
                    return (
                        <DayDisplay
                            key={k}
                            dayISO={k}
                            hero={meta!.hero}
                            vibe={meta!.vibe}
                            events={events}
                            flip={idx % 2 === 1}
                        />
                    );
                })}
            </div>
            <div className='flex mt-10 items-center justify-center w-full'>
                <Button variant="default" size="lg" className='tracking-widest text-xl py-6 font-serif font-bold sm:max-w-[200px] w-full' asChild>
                    <Link href="/rsvp" aria-label="RSVP to the wedding">RSVP</Link>
                </Button>
            </div>
        </Content>
    );
}