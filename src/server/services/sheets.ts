import { google } from "googleapis";
import { env } from "~/env";
import { WEDDING_EVENTS } from "~/lib/data/rsvp-events";
import type { Guest, Party, RsvpResponse } from "~/types/rsvp";

const getSheets = () => {
    const serviceAccountEmail = env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const privateKey = env.GOOGLE_PRIVATE_KEY

    if (!serviceAccountEmail || !privateKey) {
        throw new Error("Missing Google Sheets credentials");
    }

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: serviceAccountEmail,
            private_key: privateKey.replace(/\\n/g, "\n"),
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    return google.sheets({ version: "v4", auth });
};

interface SheetRow {
    firstName: string;
    lastName: string;
    party: string;
    phone?: string;
    email?: string;
    [key: string]: string | undefined;
}

const COLUMN_MAPPING = {
    firstName: 0,
    lastName: 1,
    party: 2,
    phone: 3,
    email: 4,
} as const

const EVENT_COLUMN_START = 5;

export class GoogleSheetsService {
    private sheets = getSheets();
    private sheetId: string;

    constructor() {
        const sheetId = env.GOOGLE_SHEETS_ID
        if (!sheetId) {
            throw new Error("Missing Google Sheets ID");
        }
        this.sheetId = sheetId;
    }

    private parseRow(row: unknown[]): SheetRow | null {
        const firstName = row[COLUMN_MAPPING.firstName];
        const lastName = row[COLUMN_MAPPING.lastName];

        if (typeof firstName !== "string" || typeof lastName !== "string") {
            return null;
        }

        const party = row[COLUMN_MAPPING.party];
        const phone = row[COLUMN_MAPPING.phone];
        const email = row[COLUMN_MAPPING.email];

        const parsed: SheetRow = {
            firstName,
            lastName,
            party: typeof party === "string" ? party : "",
            phone: typeof phone === "string" ? phone : undefined,
            email: typeof email === "string" ? email : undefined,
        };

        WEDDING_EVENTS.forEach((event, index) => {
            const columnIndex = EVENT_COLUMN_START + index;
            const value = row[columnIndex];
            parsed[event.columnName] =
                typeof value === "string" ? value : undefined;
        });

        return parsed;
    }

    private rowToGuest(row: SheetRow): Guest {
        const rsvps: Record<string, RsvpResponse> = {};

        WEDDING_EVENTS.forEach((event) => {
            const value = row[event.columnName];
            if (!value) {
                rsvps[event.columnName] = null;
            } else if (value.toLowerCase() === "true") {
                rsvps[event.columnName] = true
            } else {
                rsvps[event.columnName] = false
            }
        });

        return {
            firstName: row.firstName,
            lastName: row.lastName,
            party: row.party,
            phone: row.phone,
            email: row.email,
            rsvps,
        };
    }

    async getAllGuests(): Promise<Guest[]> {
        const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.sheetId,

            range: "Guests!A2:Z",

        });

        const rows = response.data.values ?? [];
        const guests: Guest[] = [];

        for (const row of rows) {
            const parsed = this.parseRow(row);
            if (parsed) {
                guests.push(this.rowToGuest(parsed));
            }
        }

        return guests;
    }

    async findGuestsByName(name: string): Promise<Guest[]> {
        const allGuests = await this.getAllGuests();
        const searchTerm = name.toLowerCase().trim();

        return allGuests.filter((guest) => {
            const fullName = `${guest.firstName} ${guest.lastName}`.toLowerCase();
            return fullName.includes(searchTerm);
        });
    }

    async getPartyByName(partyName: string): Promise<Party | null> {
        const allGuests = await this.getAllGuests();
        const partyMembers = allGuests.filter((g) => g.party === partyName);

        if (partyMembers.length === 0) {
            return null;
        }

        return {
            name: partyName,
            members: partyMembers,
        };
    }

    async updateRsvps(
        partyName: string,
        updates: Array<{
            firstName: string;
            lastName: string;
            eventColumnName: string;
            response: RsvpResponse;
        }>,
    ): Promise<void> {
        const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.sheetId,
            range: "Guests!A2:Z",
        });
        const rows = response.data.values ?? [];
        const valueUpdateRequests: Array<{
            range: string;
            values: (string | boolean)[][];
        }> = [];
        const checkboxRanges: string[] = [];
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            const row = rows[rowIndex];
            if (!row) continue;
            const parsed = this.parseRow(row);
            if (!parsed || parsed.party !== partyName) {
                continue;
            }
            const guestUpdates = updates.filter(
                (u) =>
                    u.firstName === parsed.firstName &&
                    u.lastName === parsed.lastName,
            );
            for (const update of guestUpdates) {
                const eventIndex = WEDDING_EVENTS.findIndex(
                    (e) => e.columnName === update.eventColumnName,
                );
                if (eventIndex === -1) continue;
                const columnIndex = EVENT_COLUMN_START + eventIndex;
                const columnLetter = this.getColumnLetter(columnIndex);
                const actualRowNumber = rowIndex + 2;
                const cellRange = `Guests!${columnLetter}${actualRowNumber}`;
                checkboxRanges.push(cellRange);
                const cellValue = update.response ?? "";
                valueUpdateRequests.push({
                    range: cellRange,
                    values: [[cellValue]],
                });
            }
        }
        if (valueUpdateRequests.length > 0) {
            await this.sheets.spreadsheets.values.batchUpdate({
                spreadsheetId: this.sheetId,
                requestBody: {
                    valueInputOption: "USER_ENTERED",
                    data: valueUpdateRequests,
                },
            });
        }
        if (checkboxRanges.length > 0) {
            const sheetMetadata = await this.sheets.spreadsheets.get({
                spreadsheetId: this.sheetId,
            });
            const guestsSheet = sheetMetadata.data.sheets?.find(
                (sheet) => sheet.properties?.title === "Guests",
            );
            const guestsSheetId = guestsSheet?.properties?.sheetId;
            if (guestsSheetId === undefined || guestsSheetId === null) {
                throw new Error("Could not find Guests sheet ID");
            }
            const requests = checkboxRanges.map((range) => ({
                setDataValidation: {
                    range: this.rangeToGridRange(range, guestsSheetId),
                    rule: {
                        condition: {
                            type: "BOOLEAN" as const,
                        },
                        strict: true,
                    },
                },
            }));
            await this.sheets.spreadsheets.batchUpdate({
                spreadsheetId: this.sheetId,
                requestBody: {
                    requests,
                },
            });
        }
    }
    private rangeToGridRange(a1Notation: string, sheetId: number) {
        const match = /^Guests!([A-Z]+)(\d+)$/.exec(a1Notation);
        if (!match) {
            throw new Error(`Invalid range format: ${a1Notation}`);
        }
        const column = match[1];
        const row = parseInt(match[2]!, 10);
        const columnIndex = column!.split("").reduce((acc, char) => {
            return acc * 26 + char.charCodeAt(0) - 64;
        }, 0) - 1;
        return {
            sheetId,
            startRowIndex: row - 1,
            endRowIndex: row,
            startColumnIndex: columnIndex,
            endColumnIndex: columnIndex + 1,
        };
    }


    private getColumnLetter(columnIndex: number): string {
        let letter = "";
        let index = columnIndex;

        while (index >= 0) {
            letter = String.fromCharCode((index % 26) + 65) + letter;
            index = Math.floor(index / 26) - 1;
        }

        return letter;
    }
}

export const sheetsService = new GoogleSheetsService();