// page.tsx
"use client";
import { useState, useEffect } from "react";
import { useGuest } from "~/hooks/use-guest";
import { LoginForm } from "./(components)/login-form";
import { PartySelector } from "./(components)/party-selector";
import { EventsForm } from "./(components)/events-form";
import { ContactForm } from "./(components)/contact-form";
import { RsvpHeader } from "./(components)/rsvp-header";
import { Toaster, toast } from "sonner";
import { Separator } from "~/components/ui/separator";

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
                                className="text-md text-neutral-600 underline underline-offset-4 hover:text-neutral-900  cursor-pointer"
                                aria-label="Log in again"
                            >
                                Log out
                            </button>
                            {party && <RsvpHeader partyName={party.name} />}

                        </div>

                        <div className="space-y-12">
                            <EventsForm
                                onSuccess={() => toast.success("RSVPs submitted - thank you!")}
                                onError={(msg) => toast.error(msg ?? "Something went wrong")}
                            />

                            <Separator />

                            <ContactForm
                                onSaved={() => toast.success("Contact information saved!")}
                            />
                            <div className='w-full flex items-center justify-center'>
                                <button
                                    type="button"
                                    onClick={() => {
                                        logout();
                                        setStep("login");
                                    }}
                                    className="text-md text-neutral-600 underline underline-offset-4 hover:text-neutral-900  cursor-pointer"
                                    aria-label="Log in again"
                                >
                                    Log out
                                </button>
                            </div>
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
