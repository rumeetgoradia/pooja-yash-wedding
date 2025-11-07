export interface Event {
    id: string;
    name: string;
    date: string;
    time: string;
    columnName: string;
}

export const WEDDING_EVENTS: Event[] = [
    {
        id: "welcome-dinner",
        name: "Welcome Dinner",
        date: "June 18, 2026",
        time: "6:00 PM",
        columnName: "Welcome Dinner",
    },
    {
        id: "grah-shanti",
        name: "Grah Shanti & Haldi",
        date: "June 19, 2026",
        time: "8:00 AM",
        columnName: "Grah Shanti",
    },
    {
        id: "sangeet",
        name: "Sangeet",
        date: "June 19, 2026",
        time: "6:00 PM",
        columnName: "Sangeet",
    },
    {
        id: "wedding-ceremony",
        name: "Wedding Ceremony",
        date: "June 20, 2026",
        time: "9:00 AM",
        columnName: "Wedding Ceremony",
    },
    {
        id: "reception",
        name: "Reception",
        date: "June 20, 2026",
        time: "7:00 PM",
        columnName: "Reception",
    }
];