import type { StaticImageData } from "next/image";

// schedule/types.ts
export type DressCode = {
    primary: string;
    secondary?: string;
};

export type Venue = {
    name: string;
    address?: string;
    mapUrl?: string;
    onSiteMapAnchor?: string;
};

export type EventItem = {
    id: string;
    title: string;
    start: string;
    end?: string;
    venue: Venue;
    description?: React.ReactNode;
    dressCode?: DressCode;
    notes?: React.ReactNode;
};

export type DayMeta = {
    date: string;
    hero: { src: StaticImageData; alt: string };
    vibe?: string;
};
