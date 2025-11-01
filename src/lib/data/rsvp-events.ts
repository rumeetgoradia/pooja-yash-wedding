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
        time: "7:00 PM",
        columnName: "Welcome Dinner",
    },
    {
        id: "grah-shanti",
        name: "Grah Shanti",
        date: "June 19, 2026",
        time: "10:00 AM",
        columnName: "Grah Shanti",
    },
    {
        id: "wedding-ceremony",
        name: "Wedding Ceremony",
        date: "June 19, 2026",
        time: "6:00 PM",
        columnName: "Wedding Ceremony",
    },
    {
        id: "reception",
        name: "Reception",
        date: "June 19, 2026",
        time: "8:00 PM",
        columnName: "Reception",
    },
    {
        id: "farewell-brunch",
        name: "Farewell Brunch",
        date: "June 20, 2026",
        time: "11:00 AM",
        columnName: "Farewell Brunch",
    },
];