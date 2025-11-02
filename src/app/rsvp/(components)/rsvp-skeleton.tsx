export function RsvpSkeleton() {
    return (
        <div className="mx-auto max-w-md animate-pulse">
            <div className="mb-8 text-center">
                <div className="mx-auto h-10 w-32 rounded bg-neutral-200" />
                <div className="mx-auto mt-2 h-4 w-64 rounded bg-neutral-200" />
            </div>
            <div className="rounded-lg bg-white p-8 shadow-md">
                <div className="space-y-6">
                    <div>
                        <div className="mb-2 h-4 w-20 rounded bg-neutral-200" />
                        <div className="h-10 w-full rounded bg-neutral-200" />
                    </div>
                    <div>
                        <div className="mb-2 h-4 w-20 rounded bg-neutral-200" />
                        <div className="h-10 w-full rounded bg-neutral-200" />
                    </div>
                    <div className="h-10 w-full rounded bg-neutral-200" />
                </div>
            </div>
        </div>
    );
}