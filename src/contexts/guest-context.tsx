"use client";
import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Party } from "~/types/rsvp";
interface GuestContextType {
    party: Party | null;
    isAuthenticated: boolean;
    setParty: (party: Party | null) => void;
    logout: () => void;
}
const GuestContext = createContext<GuestContextType | undefined>(undefined);
const STORAGE_KEY = "rsvp_guest_data";
export function GuestProvider({ children }: { children: ReactNode }) {
    const [party, setPartyState] = useState<Party | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as Party;
                setPartyState(parsed);
            } catch {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
        setIsHydrated(true);
    }, []);
    const setParty = (newParty: Party | null) => {
        setPartyState(newParty);
        if (newParty) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newParty));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    };
    const logout = () => {
        setPartyState(null);
        localStorage.removeItem(STORAGE_KEY);
    };
    if (!isHydrated) {
        return null;
    }
    return (
        <GuestContext.Provider
            value={{
                party,
                isAuthenticated: !!party,
                setParty,
                logout,
            }}
        >
            {children}
        </GuestContext.Provider>
    );
}
export { GuestContext };