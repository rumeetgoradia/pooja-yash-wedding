"use client";
interface RsvpHeaderProps {
    partyName: string;
}
export function RsvpHeader({ partyName }: RsvpHeaderProps) {
    return (
        <header id="top" className="text-center mb-12">
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-neutral-900">
                RSVP for {partyName}
            </h1>
            <p className="mt-4 text-neutral-600 text-lg">
                Please review your contact info and let us know who will attend each event.
            </p>
        </header>
    );
}