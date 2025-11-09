import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sheetsService } from "~/server/services/sheets";
import { env } from "~/env";
import { authRateLimiter } from "~/server/lib/rate-limiter";

const getClientIp = (headers: Headers): string => {
    return (
        headers.get("x-forwarded-for")?.split(",")[0] ??
        headers.get("x-real-ip") ??
        "unknown"
    );
};

export const rsvpRouter = createTRPCRouter({
    authenticate: publicProcedure
        .input(
            z.object({
                name: z.string().min(1, "Name is required"),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const clientIp = getClientIp(ctx.headers);
            const rateLimitResult = authRateLimiter.check(clientIp);

            if (!rateLimitResult.allowed) {
                const resetAt = rateLimitResult.resetAt ?? Date.now();
                const secondsRemaining = Math.ceil((resetAt - Date.now()) / 1000);
                throw new TRPCError({
                    code: "TOO_MANY_REQUESTS",
                    message: `Too many attempts. Please try again in ${secondsRemaining} seconds.`,
                });
            }

            const guests = await sheetsService.findGuestsByName(input.name);

            if (guests.length === 0) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "No guests found with that name.",
                });
            }

            const parties = Array.from(
                new Set(guests.map((g) => g.party)),
            ).filter((p) => p.length > 0);

            if (parties.length === 0) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "No party found for this guest. Please contact the couple.",
                });
            }

            if (parties.length === 1) {
                const party = await sheetsService.getPartyByName(parties[0]!);
                return {
                    needsPartySelection: false,
                    party: party ?? undefined,
                };
            }

            return {
                needsPartySelection: true,
                parties,
            };
        }),

    getParty: publicProcedure
        .input(
            z.object({
                partyName: z.string().min(1),
            }),
        )
        .query(async ({ input }) => {
            const party = await sheetsService.getPartyByName(input.partyName);

            if (!party) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Party not found",
                });
            }

            return party;
        }),

    submitRsvps: publicProcedure
        .input(
            z.object({
                partyName: z.string().min(1),
                responses: z.array(
                    z.object({
                        firstName: z.string(),
                        lastName: z.string(),
                        eventColumnName: z.string(),
                        response: z.boolean().nullable(),
                    }),
                ),
            }),
        )
        .mutation(async ({ input }) => {
            console.log("Submitting RSVPs for party:", input.partyName);
            console.log("Responses:", input.responses);
            await sheetsService.updateRsvps(input.partyName, input.responses);

            return {
                success: true,
                message: "RSVPs submitted successfully",
            };
        }),

    updateContactInfo: publicProcedure
        .input(
            z.object({
                partyName: z.string().min(1, 'Party name required'),
                contacts: z.array(
                    z.object({
                        firstName: z.string(),
                        lastName: z.string(),
                        phone: z.string().optional(),  // allow empty / undefined → clear cell
                        email: z.string().email().optional(),
                    }),
                ),
            }),
        )
        .mutation(async ({ input }) => {
            await sheetsService.updateContacts(input.partyName, input.contacts);
            return {
                success: true,
                message: 'Contact information saved',
            };
        }),
});