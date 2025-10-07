import type { EventItem } from "..//types";
import { formatTimeRange } from "../utils";

export default function EventDisplay({ event }: { event: EventItem }) {
    return (
        <li className="relative border-zinc-300/40 last:pb-0 flex flex-col gap-4">

            <div className="flex flex-col gap-1">
                <h3 className="text-2xl md:text-3xl text-zinc-800">
                    {event.title}
                </h3>
                <time className="text-sm md:text-base uppercase tracking-widest text-zinc-500">
                    {formatTimeRange(event.start, event.end)} &middot;{" "}
                    {event.venue.name}
                </time>
            </div>

            {event.description && (
                <p className="text-lg md:text-xl text-zinc-700/90 font-light">
                    {event.description}
                </p>
            )}

            {event.dressCode && (
                <div className=" text-zinc-500 flex flex-col">
                    <div><span className='[font-variant:small-caps] text-base md:text-lg font-semibold mr-1 tracking-widest'>attire</span> {event.dressCode.primary}</div>
                    {event.dressCode.secondary && (
                        <div className="text-xs md:text-sm italic">{event.dressCode.secondary}</div>
                    )}

                </div>
            )}
        </li>
    );
}