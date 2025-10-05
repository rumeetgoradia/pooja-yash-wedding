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
    id: string;                    // stable key
    title: string;                 // "Sangeet Night"
    start: string;                 // ISO: "2026-06-19T18:00:00-04:00"
    end?: string;                  // ISO (optional)
    venue: Venue;
    description?: React.ReactNode;
    dressCode?: DressCode;
    tags?: Array<'outdoor' | 'beach' | 'family-only' | 'shuttle' | 'reception' | 'ceremony' | 'haldi' | 'puja' | 'sangeet'>;
};

export type DayMeta = {
    date: string;                  // "2026-06-19" (YYYY-MM-DD)
    hero: { src: StaticImageData; alt: string };
    vibe?: string;                 // "Blessings & Haldi by the Sea"
};
