"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "~/components/ui/field";
import { api } from "~/trpc/react";
import { useGuest } from "~/hooks/use-guest";
const partySelectorSchema = z.object({
    selectedParty: z.string().min(1, "Please select a party"),
});
type PartySelectorData = z.infer<typeof partySelectorSchema>;
interface PartySelectorProps {
    parties: string[];
    guestName: string;
    onBack: () => void;
}
export function PartySelector({
    parties,
    guestName,
    onBack,
}: PartySelectorProps) {
    const { setParty } = useGuest();
    const form = useForm<PartySelectorData>({
        resolver: zodResolver(partySelectorSchema),
        defaultValues: {
            selectedParty: "",
        },
    });
    const getPartyQuery = api.rsvp.getParty.useQuery(
        { partyName: form.watch("selectedParty") },
        { enabled: false },
    );
    const onSubmit = async (data: PartySelectorData) => {
        const party = await getPartyQuery.refetch();
        if (party.data) {
            setParty(party.data);
        }
    };
    return (
        <div className="mx-auto max-w-md">
            <div className="mb-8 text-center">
                <h1 className="font-serif text-4xl font-light text-neutral-900">
                    Select Your Party
                </h1>
                <p className="mt-2 text-neutral-600">
                    We found multiple parties with the name &quot;{guestName}&quot;.
                    Please select yours:
                </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-md">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="selectedParty"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <div className="space-y-3">
                                        {parties.map((party) => (
                                            <FieldLabel
                                                key={party}
                                                className="flex cursor-pointer items-center rounded-md border border-neutral-300 p-4 transition-colors hover:bg-neutral-50"
                                            >
                                                <input
                                                    type="radio"
                                                    {...field}
                                                    value={party}
                                                    checked={field.value === party}
                                                    className="h-4 w-4 border-neutral-300 text-neutral-900 focus:ring-neutral-500"
                                                />
                                                <span className="ml-3 text-neutral-900">{party}</span>
                                            </FieldLabel>
                                        ))}
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={!form.watch("selectedParty") || getPartyQuery.isFetching}
                        >{getPartyQuery.isFetching ? "Loading..." : "Continue"}
                        </Button>
                    </FieldGroup>
                </form>
            </div>
            <div className="mt-6 text-center">
                <button
                    onClick={onBack}
                    className="text-sm text-neutral-600 underline hover:text-neutral-900"
                >
                    Go back
                </button>
            </div>
        </div>
    );
}