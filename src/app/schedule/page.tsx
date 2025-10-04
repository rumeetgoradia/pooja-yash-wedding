import Image from "next/image";
import { Content } from "~/components/layout/content";
import { type HeroImageProps } from "~/components/layout/hero";
import LandingImage from "public/heros/schedule.jpg";
import { Button } from "~/components/ui/button";

import { SCHEDULE_DATA, type ScheduleDay, type SubEvent } from "./data";
import Link from "next/link";
import { cn } from "~/lib/utils";

const HeroImage: HeroImageProps = {
    src: LandingImage,
    alt: "Schedule - Pooja & Yash",
    className: "max-sm:object-[43%]",
};

function EventDetail({
    name,
    time,
    description,
    dressCode,
    isLastEvent,
    location,
}: SubEvent & { isLastEvent: boolean }) {
    return (
        <div className="flex flex-col gap-2 text-center lg:text-left">
            <h4 className="font-serif text-3xl font-normal text-gray-800 [font-variant:small-caps]">
                {name}
            </h4>
            <p className="text-lg font-light text-gray-700">{time} @ {location}</p>
            <div className="mt-2 text-base leading-relaxed text-gray-600">
                {description}
            </div>
            <div className="mt-1 text-sm leading-relaxed text-gray-500">
                <strong>Attire:</strong> {dressCode.primary}
                {dressCode.secondary && (
                    <div className="text-xs text-gray-400 mt-1">
                        <em>{dressCode.secondary}</em>
                    </div>
                )}
            </div>
            {!isLastEvent && (
                <hr className="mx-auto mt-8 w-24 border-t border-gray-300 lg:mr-auto lg:ml-0" />
            )}
        </div>
    );
}

function EventDaySection({
    day,
    isReversed,
}: {
    day: ScheduleDay;
    isReversed: boolean;
}) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 items-start gap-y-12 lg:grid-cols-2 lg:gap-x-20",
                isReversed ? "lg:flex-row-reverse" : "lg:flex-row",
            )}
        >
            {/* Text Content Column */}
            <div
                className={cn(
                    "flex flex-col gap-8",
                    isReversed ? "lg:order-last" : "lg:order-first",
                )}
            >
                <div className="text-center lg:text-left">
                    <h2 className="font-serif text-4xl font-normal text-gray-800">
                        {day.date}
                    </h2>
                    <p className="mt-2 text-xl font-light text-gray-600">{day.title}</p>
                </div>

                <div className="flex flex-col items-center gap-8 lg:items-start">
                    {day.events.map((event, eventIndex) => (
                        <EventDetail
                            key={event.name}
                            {...event}
                            isLastEvent={eventIndex === day.events.length - 1}
                        />
                    ))}
                </div>

            </div>

            {/* Image Column */}
            <div
                className={cn(
                    "relative w-full overflow-hidden rounded-lg shadow-xl",
                    isReversed ? "lg:order-first" : "lg:order-last",
                )}
            >
                <Image
                    src={day.image.src}
                    alt={day.image.alt}
                    placeholder="blur"
                    className="h-full w-full object-cover object-center"
                    width={800} // Appropriate width for display
                    height={600} // Appropriate height for display
                />
            </div>
        </div>
    );
}

// --- Main Schedule Page Component ---
const SchedulePage = () => {
    return (
        <Content heroImage={HeroImage}>
            <div className="flex flex-col gap-20 sm:gap-32">
                {SCHEDULE_DATA.map((day, index) => (
                    <EventDaySection
                        key={day.date}
                        day={day}
                        isReversed={index % 2 !== 0}
                    />
                ))}
                {/*
                HIDDEN for now
                <div className="flex justify-center mt-16">
                    <Button
                        variant="outline"
                        className="border-primary font-xl text-primary hover:text-primary border tracking-widest transition-all hover:scale-105"
                        size="lg"
                        asChild
                    >
                        <Link href="#">RSVP</Link>
                    </Button>
                </div> */}
            </div>
        </Content>
    );
};

export default SchedulePage;
