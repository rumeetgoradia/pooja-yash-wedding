// events-form.tsx
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { WEDDING_EVENTS } from "~/lib/data/rsvp-events";
import type { RsvpResponse } from "~/types/rsvp";
import { cn } from "~/lib/utils";
import { useGuest } from "~/hooks/use-guest";

interface EventsFormProps {
    onSuccess: () => void;
    onError?: (msg?: string) => void;
}

export function EventsForm({ onSuccess, onError }: EventsFormProps) {


    const { party, setParty } = useGuest();
    const [responses, setResponses] = useState<Record<string, Record<string, RsvpResponse>>>(() => {
        if (!party) return {};
        const initial: Record<string, Record<string, RsvpResponse>> = {};
        party.members.forEach((m) => {
            const k = `${m.firstName}-${m.lastName}`;
            initial[k] = { ...m.rsvps };
        });
        return initial;
    });

    const utils = api.useUtils();
    const getPartyQuery = api.rsvp.getParty.useQuery(
        { partyName: party?.name ?? "" },
        { enabled: !!party?.name, refetchOnMount: "always", staleTime: 0 }
    );

    useEffect(() => {
        if (getPartyQuery.data) {
            setParty(getPartyQuery.data);
            const refreshed: Record<string, Record<string, RsvpResponse>> = {};
            getPartyQuery.data.members.forEach((m) => {
                const k = `${m.firstName}-${m.lastName}`;
                refreshed[k] = { ...m.rsvps };
            });
            setResponses(refreshed);
        }
    }, [getPartyQuery.data, setParty]);

    const submitRsvpsMutation = api.rsvp.submitRsvps.useMutation({
        onSuccess: async () => {
            await utils.rsvp.getParty.invalidate();
            onSuccess();
        },
        onError: (e) => onError?.(e.message),
    });

    const setValue = (guestKey: string, eventColumnName: string, value: RsvpResponse) => {
        setResponses((prev) => ({
            ...prev,
            [guestKey]: { ...prev[guestKey], [eventColumnName]: value },
        }));
    };

    const toggleValue = (guestKey: string, eventColumnName: string, value: true | false) => {
        const current = responses[guestKey]?.[eventColumnName];
        // clicking the selected value again clears it (null)
        setValue(guestKey, eventColumnName, current === value ? null : value);
    };

    const unansweredCount = useMemo(() => {
        if (!party) return 0;
        let count = 0;
        for (const m of party.members) {
            const k = `${m.firstName}-${m.lastName}`;
            for (const e of WEDDING_EVENTS) {
                if (responses[k]?.[e.columnName] == null) count++;
            }
        }
        return count;
    }, [party, responses]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!party) return;
        const submissionResponses = party.members.flatMap((member) => {
            const gk = `${member.firstName}-${member.lastName}`;
            const guestResponses = responses[gk] ?? {};
            return WEDDING_EVENTS.map((event) => ({
                firstName: member.firstName,
                lastName: member.lastName,
                eventColumnName: event.columnName,
                response: guestResponses[event.columnName] ?? null,
            }));
        });
        submitRsvpsMutation.mutate({ partyName: party.name, responses: submissionResponses });
    };

    if (!party) return null;

    return (
        <section aria-labelledby="events-heading" className="relative">
            <h2 id="events-heading" className="sr-only">Events</h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                {WEDDING_EVENTS.map((event) => (
                    <div
                        key={event.id}
                        className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-neutral-200/60"
                    >
                        <div className="mb-4">
                            <h3 className="font-serif text-xl sm:text-2xl font-medium text-neutral-900">
                                {event.name}
                            </h3>
                            <p className="mt-1 text-sm text-neutral-600">
                                {event.date} &middot; {event.time}
                            </p>
                        </div>

                        <ul className="divide-y divide-neutral-200/70">
                            {party.members.map((member) => {
                                const guestKey = `${member.firstName}-${member.lastName}`;
                                const current = responses[guestKey]?.[event.columnName];

                                const isAttending = current === true;
                                const isNotAttending = current === false;

                                return (
                                    <li key={guestKey} className="py-3">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <span className="font-medium text-neutral-900">
                                                {member.firstName} {member.lastName}
                                            </span>

                                            {/* Outline pills — no fills. Active = colored border + text */}
                                            <div role="group" aria-label={`RSVP for ${member.firstName} ${member.lastName} – ${event.name}`} className="inline-flex gap-2">
                                                <Pill
                                                    ariaLabel="Attending"
                                                    active={isAttending}
                                                    color="green"
                                                    onClick={() => toggleValue(guestKey, event.columnName, true)}
                                                >
                                                    Attending
                                                </Pill>
                                                <Pill
                                                    ariaLabel="Not attending"
                                                    active={isNotAttending}
                                                    color="red"
                                                    onClick={() => toggleValue(guestKey, event.columnName, false)}
                                                >
                                                    Not attending
                                                </Pill>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}

                {submitRsvpsMutation.error && (
                    <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
                        {submitRsvpsMutation.error.message}
                    </div>
                )}

                {/* Sticky submit bar */}
                <div className="sticky bottom-4 z-10">
                    <div className="mx-auto max-w-3xl rounded-md bg-white/80 px-2 py-4 shadow-lg backdrop-blur ring-1 ring-neutral-200">
                        <div className="flex items-center gap-3 px-2">
                            <span className="ml-2 text-sm text-neutral-700">
                                {unansweredCount > 0
                                    ? `${unansweredCount} response${unansweredCount === 1 ? "" : "s"} left`
                                    : "All set!"}
                            </span>
                            <div className="ml-auto">
                                <Button type="submit" size="lg" disabled={submitRsvpsMutation.isPending}>
                                    {submitRsvpsMutation.isPending ? "Submitting…" : "Submit RSVPs"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}

function Pill({
    children,
    active,
    onClick,
    ariaLabel,
    color, // "green" | "red"
}: {
    children: React.ReactNode;
    active: boolean;
    onClick: () => void;
    ariaLabel: string;
    color: "green" | "red";
}) {
    const base =
        "rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none border";
    const palette =
        color === "green"
            ? active
                ? "border-green-600 text-green-700"
                : "border-neutral-300 text-neutral-700 hover:border-green-500 hover:text-green-700"
            : active
                ? "border-red-600 text-red-700"
                : "border-neutral-300 text-neutral-700 hover:border-red-500 hover:text-red-700";

    return (
        <button
            type="button"
            aria-pressed={active}
            aria-label={ariaLabel}
            onClick={onClick}
            className={cn(base, palette)}
        >
            {children}
        </button>
    );
}
