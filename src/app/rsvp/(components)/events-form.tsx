// events-form.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { Check, X } from "lucide-react";
import { api } from "~/trpc/react";
import { WEDDING_EVENTS } from "~/lib/data/rsvp-events";
import type { RsvpResponse } from "~/types/rsvp";
import { useGuest } from "~/hooks/use-guest";
import { cn } from "~/lib/utils";
import { useRouter } from 'next/navigation'

interface EventsFormProps {
    onSuccess: () => void;
    onError?: (msg?: string) => void;
}

export function EventsForm({ onSuccess, onError }: EventsFormProps) {
    const { party, setParty } = useGuest();
    const [submitted, setSubmitted] = useState<boolean>(false)

    const [responses, setResponses] = useState<
        Record<string, Record<string, RsvpResponse>>
    >({});

    const utils = api.useUtils();

    const getPartyQuery = api.rsvp.getParty.useQuery(
        { partyName: party?.name ?? "" },
        { enabled: !!party?.name, refetchOnMount: "always", staleTime: 0 },
    );

    const router = useRouter();

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
            setSubmitted(true);
            router.push("#contact");
        },
        onError: (e) => onError?.(e.message),
    });

    const setValue = (
        guestKey: string,
        eventColumnName: string,
        value: RsvpResponse,
    ) => {
        setResponses((prev) => ({
            ...prev,
            [guestKey]: { ...(prev[guestKey] ?? {}), [eventColumnName]: value },
        }));
    };

    const unansweredCount = useMemo(() => {
        if (!party) return 0;
        let count = 0;
        for (const m of party.members) {
            const k = `${m.firstName}-${m.lastName}`;
            for (const event of WEDDING_EVENTS) {
                const v = responses[k]?.[event.columnName];
                if (v === null || typeof v === "undefined") count++;
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

        submitRsvpsMutation.mutate({
            partyName: party.name,
            responses: submissionResponses,
        });
    };

    if (!party) return null;

    return (
        <section aria-labelledby="events-heading" className="relative">
            <h2 id="events-heading" className="sr-only">
                Events
            </h2>

            <form onSubmit={handleSubmit} className="space-y-7">
                {WEDDING_EVENTS.map((event) => (
                    <div
                        key={event.id}
                        className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/60"
                    >
                        <div className="mb-3">
                            <h3 className="font-serif text-xl sm:text-2xl font-medium text-neutral-900">
                                {event.name}
                            </h3>
                            <p className="mt-1 text-sm text-neutral-600">
                                {event.date} · {event.time}
                            </p>
                        </div>

                        <ul className="divide-y divide-neutral-200/60">
                            {party.members.map((member) => {
                                const guestKey = `${member.firstName}-${member.lastName}`;
                                const current = responses[guestKey]?.[event.columnName];

                                const radioValue: "yes" | "no" | "" =
                                    current === true ? "yes" : current === false ? "no" : "";

                                const nameId = `${guestKey}-${event.columnName}`;
                                const isPending = radioValue === "";

                                return (
                                    <li key={guestKey} className="py-2.5">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-neutral-900">
                                                    {member.firstName} {member.lastName}
                                                </span>
                                                {isPending && <PendingDot ariaLabel="Response pending" />}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <RadioGroup
                                                    aria-label={`${member.firstName} ${member.lastName} - ${event.name}`}
                                                    value={radioValue}
                                                    onValueChange={(val) => {
                                                        setSubmitted(false);
                                                        if (val === "yes") setValue(guestKey, event.columnName, true);
                                                        else if (val === "no") setValue(guestKey, event.columnName, false);
                                                    }}
                                                    className="grid w-full grid-cols-2 gap-2 sm:inline-flex sm:w-auto"
                                                >
                                                    <ColorRadio
                                                        id={`${nameId}-yes`}
                                                        value="yes"
                                                        label="Attending"
                                                        scheme="green"
                                                    />
                                                    <ColorRadio
                                                        id={`${nameId}-no`}
                                                        value="no"
                                                        label="Not attending"
                                                        scheme="red"
                                                    />
                                                </RadioGroup>

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
                        {submitted ?
                            <div className="flex justify-center items-center text-sm gap-3 px-2">
                                Responses saved! Please provide your contact info below.
                            </div>
                            :
                            <div className="flex items-center gap-3 px-2">
                                <span className="ml-2 flex items-center gap-2 text-sm text-neutral-700">
                                    {unansweredCount === 0 ?
                                        "All set! Please save your responses."
                                        : (
                                            <div className="flex items-center text-muted-foreground gap-2">
                                                <PendingDot />
                                                {unansweredCount} responses left
                                            </div>
                                        )}
                                </span>
                                <Button type="submit" className="ml-auto" disabled={submitRsvpsMutation.isPending || unansweredCount == party.members.length * WEDDING_EVENTS.length}>
                                    Save responses
                                </Button>
                            </div>
                        }
                    </div>
                </div>
            </form>
        </section>
    );
}

function ColorRadio({
    id,
    value,
    label,
    scheme,
}: {
    id: string;
    value: "yes" | "no";
    label: string;
    scheme: "green" | "red";
}) {
    const checked =
        scheme === "green"
            ? [
                "peer-data-[state=checked]:bg-green-50",
                "peer-data-[state=checked]:border-green-600",
                "peer-data-[state=checked]:text-green-700",
            ].join(" ")
            : [
                "peer-data-[state=checked]:bg-red-50",
                "peer-data-[state=checked]:border-red-600",
                "peer-data-[state=checked]:text-red-700",
            ].join(" ");

    const focus =
        scheme === "green"
            ? "focus-visible:outline-green-600"
            : "focus-visible:outline-red-600";

    return (
        <div className="relative">
            {/* important: the radio must be a peer */}
            <RadioGroupItem id={id} value={value} className="peer sr-only" />
            <Label
                htmlFor={id}
                className={cn(
                    "w-full sm:w-auto justify-center min-w-0",
                    "inline-flex select-none items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors",
                    "border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50",
                    "focus-visible:outline-2 focus-visible:outline-offset-2",
                    focus,
                    // selected (faint tint + stronger border + label color)
                    checked,
                )}
            >
                {value === "yes" ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                    <X className="h-4 w-4" aria-hidden="true" />
                )}
                <span>{label}</span>
            </Label>
        </div>
    );
}



function PendingDot({ ariaLabel }: { ariaLabel?: string }) {
    return (
        <span
            className="relative inline-flex h-2.5 w-2.5"
            aria-label={ariaLabel ?? "Pending"}
            title="Pending"
        >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
        </span>
    );
}
