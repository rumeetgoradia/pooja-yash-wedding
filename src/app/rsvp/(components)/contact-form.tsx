"use client";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useGuest } from "~/hooks/use-guest";

interface ContactFormProps {
    onSaved?: () => void;
}

export function ContactForm({ onSaved }: ContactFormProps) {
    const { party, setParty } = useGuest();
    const utils = api.useUtils();

    const [contacts, setContacts] = useState(() => {
        if (!party) return [];
        return party.members.map((m) => ({
            firstName: m.firstName,
            lastName: m.lastName,
            phone: m.phone ?? "",
            email: m.email ?? "",
        }));
    });

    const saveMutation = api.rsvp.updateContactInfo.useMutation({
        onSuccess: async () => {
            await utils.rsvp.getParty.invalidate();
            const refreshed = await utils.rsvp.getParty.fetch({ partyName: party!.name });
            setParty(refreshed);
            onSaved?.();
        },
    });

    const handleChange = (idx: number, field: "phone" | "email", value: string) => {
        setContacts((prev) => {
            const next = [...prev];
            const current = next[idx]!;
            next[idx] = {
                firstName: current.firstName,
                lastName: current.lastName,
                phone: field === "phone" ? value : current.phone,
                email: field === "email" ? value : current.email,
            };
            return next;
        });
    };

    if (!party) return null;

    return (
        <section
            aria-labelledby="contact-heading"
            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-neutral-200/60"
        >
            <div className="mb-4">
                <h2 id="contact-heading" className="font-serif text-2xl font-medium text-neutral-900">
                    Contact information <span className="text-neutral-500">(optional)</span>
                </h2>
            </div>

            <ul className="divide-y divide-neutral-200/70">
                {contacts.map((c, idx) => (
                    <li key={`${c.firstName}-${c.lastName}`} className="py-5">
                        <div className="mb-3 font-medium text-neutral-900">
                            {c.firstName} {c.lastName}
                        </div>
                        {/* Inputs in a 2-column grid on md+ */}
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div>
                                <label htmlFor={`phone-${idx}`} className="mb-1 block text-xs font-medium text-neutral-600">
                                    Phone
                                </label>
                                <input
                                    id={`phone-${idx}`}
                                    type="tel"
                                    inputMode="tel"
                                    placeholder="(555) 555-5555"
                                    value={c.phone}
                                    onChange={(e) => handleChange(idx, "phone", e.target.value)}
                                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
                                />
                            </div>
                            <div>
                                <label htmlFor={`email-${idx}`} className="mb-1 block text-xs font-medium text-neutral-600">
                                    Email
                                </label>
                                <input
                                    id={`email-${idx}`}
                                    type="email"
                                    placeholder="name@example.com"
                                    value={c.email}
                                    onChange={(e) => handleChange(idx, "email", e.target.value)}
                                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
                                />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {saveMutation.error && (
                <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
                    {saveMutation.error.message}
                </div>
            )}

            <div className="mt-5 flex justify-end">
                <Button
                    type="button"
                    disabled={saveMutation.isPending}
                    onClick={() =>
                        saveMutation.mutate({
                            partyName: party.name,
                            contacts: contacts.map((c) => ({
                                firstName: c.firstName,
                                lastName: c.lastName,
                                phone: c.phone.trim() || undefined,
                                email: c.email.trim() || undefined,
                            })),
                        })
                    }
                >
                    {saveMutation.isPending ? "Saving…" : "Save contact info"}
                </Button>
            </div>
        </section>
    );
}
