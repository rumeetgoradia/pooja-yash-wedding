"use client";
interface RsvpHeaderProps {
    partyName: string;
}
export function RsvpHeader({ partyName }: RsvpHeaderProps) {
    return (
        <header id="top" className="text-center mb-12">
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-900">
                RSVP for {partyName}
            </h1>
        </header>
    );
}