"use client";
import { useState, useEffect } from "react";
import { useGuest } from "~/hooks/use-guest";
import { LoginForm } from "./(components)/login-form";
import { PartySelector } from "./(components)/party-selector";
import { EventsForm } from "./(components)/events-form";
import { SuccessMessage } from "./(components)/success-message";

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
                <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 px-4 py-16">
                    <SuccessMessage />
                </div>
            );
        }
        return (
            <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 px-4 py-16">
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
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 px-4 py-16">
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