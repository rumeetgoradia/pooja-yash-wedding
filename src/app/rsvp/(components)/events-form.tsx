"use client";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { WEDDING_EVENTS } from "~/lib/data/rsvp-events";
import type { RsvpResponse } from "~/types/rsvp";
import { cn } from "~/lib/utils";
import { useGuest } from "~/hooks/use-guest";
interface EventsFormProps {
    onSuccess: () => void;
}
export function EventsForm({ onSuccess }: EventsFormProps) {
    const { party, setParty, logout } = useGuest();

    const [responses, setResponses] = useState<
        Record<string, Record<string, RsvpResponse>>
    >(() => {
        if (!party) return {};
        const initialResponses: Record<string, Record<string, RsvpResponse>> = {};
        party.members.forEach((member) => {
            const guestKey = `${member.firstName}-${member.lastName}`;
            initialResponses[guestKey] = { ...member.rsvps };
        });
        return initialResponses;
    });

    const utils = api.useUtils();

    const getPartyQuery = api.rsvp.getParty.useQuery(
        { partyName: party?.name ?? "" },
        {
            enabled: !!party?.name,
            refetchOnMount: "always",
            staleTime: 0,
        },
    );

    useEffect(() => {
        if (getPartyQuery.data) {
            setParty(getPartyQuery.data);

            const refreshedResponses: Record<string, Record<string, RsvpResponse>> = {};
            getPartyQuery.data.members.forEach((member) => {
                const guestKey = `${member.firstName}-${member.lastName}`;
                refreshedResponses[guestKey] = { ...member.rsvps };
            });
            setResponses(refreshedResponses);
        }
    }, [getPartyQuery.data, setParty]);

    const submitRsvpsMutation = api.rsvp.submitRsvps.useMutation({
        onSuccess: async () => {
            await utils.rsvp.getParty.invalidate();
            onSuccess();
        },
    });

    const handleResponseChange = (
        guestKey: string,
        eventColumnName: string,
        response: RsvpResponse,
    ) => {
        setResponses((prev) => ({
            ...prev,
            [guestKey]: {
                ...prev[guestKey],
                [eventColumnName]: response,
            },
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!party) return;
        const submissionResponses = party.members.flatMap((member) => {
            const guestKey = `${member.firstName}-${member.lastName}`;
            const guestResponses = responses[guestKey] ?? {};
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
    if (!party) {
        return null;
    }
    return (
        <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
                <h1 className="font-serif text-4xl font-light text-neutral-900">
                    RSVP for {party.name}
                </h1>
                <p className="mt-2 text-neutral-600">
                    Please let us know who will be attending each event.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
                {WEDDING_EVENTS.map((event) => (
                    <div key={event.id} className="rounded-lg bg-white p-6 shadow-md">
                        <div className="mb-4 border-b border-neutral-200 pb-4">
                            <h2 className="font-serif text-2xl font-medium text-neutral-900">
                                {event.name}
                            </h2>
                            <p className="text-sm text-neutral-600">
                                {event.date} at {event.time}
                            </p>
                        </div>
                        <div className="space-y-4">
                            {party.members.map((member) => {
                                const guestKey = `${member.firstName}-${member.lastName}`;
                                const currentResponse = responses[guestKey]?.[event.columnName];
                                return (
                                    <div
                                        key={guestKey}
                                        className="flex flex-col gap-3 border-b border-neutral-100 pb-3 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-0"
                                    >
                                        <span className="font-medium text-neutral-900">
                                            {member.firstName} {member.lastName}
                                        </span>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleResponseChange(guestKey, event.columnName, true)
                                                }
                                                className={cn(
                                                    "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors sm:flex-none",
                                                    currentResponse === true
                                                        ? "bg-green-600 text-white"
                                                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
                                                )}
                                            >
                                                Attending
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleResponseChange(guestKey, event.columnName, false)
                                                }
                                                className={cn(
                                                    "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors sm:flex-none",
                                                    currentResponse === false
                                                        ? "bg-red-700 text-white"
                                                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
                                                )}
                                            >
                                                Not Attending
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
                {submitRsvpsMutation.error && (
                    <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
                        {submitRsvpsMutation.error.message}
                    </div>
                )}
                <div className="flex gap-4">
                    <Button
                        type="submit"
                        className="flex-1"
                        size='lg'
                        disabled={submitRsvpsMutation.isPending}
                    >
                        {submitRsvpsMutation.isPending ? "Submitting..." : "Submit RSVPs"}
                    </Button>
                </div>
            </form>
            <div className='flex items-center justify-center mt-6'>
                <Button
                    type="button"
                    variant="unstyled"
                    onClick={logout}
                    className="text-muted-foreground font text-sm hover:underline underline-offset-4 cursor-pointer"
                >
                    Start Over
                </Button>
            </div>
        </div>
    );
}