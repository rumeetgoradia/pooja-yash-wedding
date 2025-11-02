interface RateLimitEntry {
    count: number;
    resetAt: number;
}

class RateLimiter {
    private requests = new Map<string, RateLimitEntry>();
    private readonly maxRequests: number;
    private readonly windowMs: number;

    constructor(maxRequests: number, windowMs: number) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
    }

    check(identifier: string): { allowed: boolean; resetAt?: number } {
        const now = Date.now();
        const entry = this.requests.get(identifier);

        if (!entry || now > entry.resetAt) {
            this.requests.set(identifier, {
                count: 1,
                resetAt: now + this.windowMs,
            });
            return { allowed: true };
        }

        if (entry.count >= this.maxRequests) {
            return { allowed: false, resetAt: entry.resetAt };
        }

        entry.count++;
        return { allowed: true };
    }

    cleanup() {
        const now = Date.now();
        for (const [key, entry] of this.requests.entries()) {
            if (now > entry.resetAt) {
                this.requests.delete(key);
            }
        }
    }
}

export const authRateLimiter = new RateLimiter(5, 60 * 1000);

setInterval(() => {
    authRateLimiter.cleanup();
}, 60 * 1000);