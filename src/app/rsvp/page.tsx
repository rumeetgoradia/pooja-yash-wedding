// page.tsx
"use client";
import { useState, useEffect } from "react";
import { useGuest } from "~/hooks/use-guest";
import { LoginForm } from "./(components)/login-form";
import { PartySelector } from "./(components)/party-selector";
import { EventsForm } from "./(components)/events-form";
import { ContactForm } from "./(components)/contact-form";
import { RsvpHeader } from "./(components)/rsvp-header";
import { Button } from "~/components/ui/button";
import { Toaster, toast } from "sonner";

type RsvpStep = "login" | "party-selection" | "events";

export default function RsvpPage() {
    const { isAuthenticated, party, logout } = useGuest();
    const [step, setStep] = useState<RsvpStep>("login");
    const [parties, setParties] = useState<string[]>([]);
    const [guestName, setGuestName] = useState("");

    useEffect(() => {
        if (!isAuthenticated && step !== "login" && step !== "party-selection") {
            setStep("login");
        }
    }, [isAuthenticated, step]);

    useEffect(() => {
        if (isAuthenticated && step !== "events") {
            setStep("events");
        }
    }, [isAuthenticated, step]);

    const handleLoginSuccess = (
        needsPartySelection: boolean,
        availableParties?: string[],
        name?: string
    ) => {
        if (needsPartySelection && availableParties) {
            setParties(availableParties);
            if (name) setGuestName(name);
            setStep("party-selection");
        } else {
            setStep("events");
        }
    };

    return (
        <>
            <Toaster richColors position="top-center" />
            <div className="mx-auto max-w-3xl px-4 pt-16 pb-24">
                {/* Authenticated page */}
                {isAuthenticated && step === "events" && (
                    <>
                        <div className="flex gap-y-6 flex-col items-center justify-center">
                            <button
                                type="button"
                                onClick={() => {
                                    logout();
                                    setStep("login");
                                }}
                                className="text-sm text-neutral-600 underline underline-offset-4 hover:text-neutral-900  cursor-pointer"
                                aria-label="Log in again"
                            >
                                Log out
                            </button>
                            {party && <RsvpHeader partyName={party.name} />}

                        </div>

                        <div className="space-y-12">
                            <ContactForm
                                onSaved={() => toast.success("Contact information saved!")}
                            />

                            {/* Section divider for visual separation */}
                            <div className="relative my-8">
                                <div className="h-px w-full bg-neutral-200" />
                                <span
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-neutral-500 shadow-sm"
                                >
                                    RSVP
                                </span>
                            </div>


                            <EventsForm
                                onSuccess={() => toast.success("RSVPs submitted - thank you!")}
                                onError={(msg) => toast.error(msg ?? "Something went wrong")}
                            />
                        </div>
                    </>
                )}

                {/* Log in / Party select */}
                {!isAuthenticated && step === "login" && (
                    <LoginForm onSuccess={handleLoginSuccess} />
                )}
                {!isAuthenticated && step === "party-selection" && (
                    <PartySelector
                        parties={parties}
                        guestName={guestName}
                        onBack={() => setStep("login")}
                    />
                )}
            </div>
        </>
    );
}
