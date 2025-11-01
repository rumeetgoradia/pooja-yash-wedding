export type RsvpResponse = "Attending" | "Not Attending" | null;

export interface Guest {
    firstName: string;
    lastName: string;
    party: string;
    phone?: string;
    email?: string;
    rsvps: Record<string, RsvpResponse>;
}

export interface Party {
    name: string;
    members: Guest[];
}

export interface RsvpSubmission {
    partyName: string;
    responses: {
        guestFirstName: string;
        guestLastName: string;
        eventColumnName: string;
        response: RsvpResponse;
    }[];
}