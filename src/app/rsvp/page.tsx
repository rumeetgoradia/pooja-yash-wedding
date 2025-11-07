"use client";
import { useState, useEffect } from "react";
import { useGuest } from "~/hooks/use-guest";
import { LoginForm } from "./(components)/login-form";
import { PartySelector } from "./(components)/party-selector";
import { EventsForm } from "./(components)/events-form";
import { SuccessMessage } from "./(components)/success-message";
import { ContactForm } from "./(components)/contact-form";
import { RsvpHeader } from "./(components)/rsvp-header";

type RsvpStep = "login" | "party-selection" | "events" | "success";

export default function RsvpPage() {
    const { isAuthenticated } = useGuest();
    const [step, setStep] = useState<RsvpStep>("login");
    const [parties, setParties] = useState<string[]>([]);
    const [guestName, setGuestName] = useState("");

    useEffect(() => {
        if (!isAuthenticated && step !== "login" && step !== "party-selection") {
            setStep("login");
        }
    }, [isAuthenticated, step]);

    if (isAuthenticated) {
        if (step === "success") {
            return (
                <div className="mx-auto max-w-3xl px-4 pb-24">
                    <SuccessMessage />
                </div>
            );
        }
        return (
            <div className="mx-auto max-w-3xl px-4 pb-24">
                {/* TODO implement toasts */}
                <ContactForm onSaved={() => console.log("Contact info saved")} />
                <EventsForm onSuccess={() => setStep("success")} />
            </div>
        );
    }
    const handleLoginSuccess = (
        needsPartySelection: boolean,
        availableParties?: string[],
        name?: string,
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
        <div className="mx-auto max-w-3xl px-4 pb-24">
            {step === "login" && (
                <LoginForm onSuccess={handleLoginSuccess} />
            )}
            {step === "party-selection" && (
                <PartySelector
                    parties={parties}
                    guestName={guestName}
                    onBack={() => setStep("login")}
                />
            )}
        </div>
    );
}