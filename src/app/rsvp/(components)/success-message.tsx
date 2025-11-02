"use client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
export function SuccessMessage() {
    const router = useRouter();
    return (
        <div className="mx-auto max-w-2xl text-center">
            <div className="rounded-lg bg-white p-8 shadow-md">
                <div className="mb-4 text-6xl">✓</div>
                <h1 className="mb-4 font-serif text-4xl font-light text-neutral-900">
                    Thank You!
                </h1>
                <p className="mb-6 text-neutral-600">
                    Your RSVPs have been submitted successfully.
                    We look forward to
                    celebrating with you!
                </p>
                <Button onClick={() => router.push("/")}>Return to Home</Button>
            </div>
        </div>
    );
}