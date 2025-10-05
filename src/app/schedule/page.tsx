import { EVENTS, DAY_META } from "./data";
import { groupByDay } from "./utils";
import DayDisplay from "./(components)/DayDisplay";
import LandingImage from "public/heros/schedule.jpg"
import type { HeroImageProps } from "~/components/layout/hero";
import { Content } from "~/components/layout/content";

const HeroImage: HeroImageProps = {
    src: LandingImage,
    alt: "Pooja & Yash",
    className: "max-sm:object-[43%]",
};

export default function SchedulePage() {
    const grouped = groupByDay(EVENTS);
    const days = Array.from(grouped.keys());

    return (
        <Content heroImage={HeroImage}>
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
        </Content>
    );
}