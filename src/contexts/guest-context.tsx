"use client";
import {
    createContext,
    useEffect,
    useState,
    type ReactNode,
    type FC,
} from "react";
import type { Party } from "~/types/rsvp";
interface GuestContextType {
    party: Party | null;
    isAuthenticated: boolean;
    setParty: (party: Party | null) => void;
    logout: () => void;
}
interface GuestProviderProps {
    children: ReactNode;
}
const STORAGE_KEY = "rsvp_guest_data";
/**
 * Create the context with an *optional* initial value so we can throw
 * a clear error if someone consumes it outside the provider.
 */
const GuestContext = createContext<GuestContextType | undefined>(undefined);
export const GuestProvider: FC<GuestProviderProps> = ({ children }) => {
    const [party, setPartyState] = useState<Party | null>(null);
    const [ready, setReady] = useState(false); // new flag
    /**
     * Initial load (runs once in the browser)
     * – read localStorage
     * – populate state
     * – mark provider as "ready"
     */
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            setPartyState(raw ? (JSON.parse(raw) as Party) : null);
        } catch {
            // corrupted value ⇒ wipe it
            localStorage.removeItem(STORAGE_KEY);
            setPartyState(null);
        } finally {
            setReady(true);
        }
    }, []);

    /**
     * Keep localStorage in sync every time `party` changes,
     * but only after the provider is ready (so we don't overwrite during init)
     */
    useEffect(() => {
        if (!ready) return;
        if (party) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(party));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, [party, ready]);
    // helpers exposed via context
    const setParty = (p: Party | null) => setPartyState(p);
    const logout = () => setPartyState(null);

    /**
     * Until `ready` is true we render nothing (or you could return a spinner / skeleton)
     * This prevents the "blank page" caused by mismatched auth state & UI step.
     */
    if (!ready) return null;
    return (
        <GuestContext.Provider
            value={{ party, isAuthenticated: !!party, setParty, logout }}
        >
            {children}
        </GuestContext.Provider>
    );
};
export { GuestContext };