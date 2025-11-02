import { useContext } from "react";
import { GuestContext } from "~/contexts/guest-context";
export function useGuest() {
    const context = useContext(GuestContext);

    if (context === undefined) {
        throw new Error("useGuest must be used within a GuestProvider");
    }

    return context;
}