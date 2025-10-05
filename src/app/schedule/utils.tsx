import type { EventItem } from "./types";

export const dayKey = (iso: string) => iso.slice(0, 10); // YYYY-MM-DD

export function groupByDay(events: EventItem[]) {
    const sorted = [...events].sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );
    const map = new Map<string, EventItem[]>();
    for (const e of sorted) {
        const k = dayKey(e.start);
        if (!map.has(k)) map.set(k, []);
        map.get(k)!.push(e);
    }
    return map;
}

export function formatDayHeader(isoDate: string) {
    // isoDate is YYYY-MM-DD
    const d = new Date(`${isoDate}T12:00:00`); // avoid TZ edge cases
    return d.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export function formatTimeRange(startISO: string, endISO?: string) {
    const start = new Date(startISO);
    const end = endISO ? new Date(endISO) : null;
    const fmt: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit" };
    return end
        ? `${start.toLocaleTimeString(undefined, fmt)} – ${end.toLocaleTimeString(
            undefined,
            fmt
        )}`
        : start.toLocaleTimeString(undefined, fmt);
}

export const segmentLabel = (iso: string) => {
    const h = new Date(iso).getHours();
    if (h < 12) return "Morning";
    if (h < 17) return "Afternoon";
    return "Evening";
};