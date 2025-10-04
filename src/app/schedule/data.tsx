import type { StaticImageData } from "next/image";

// Import your event images here
import WelcomeImage from "public/schedule/welcome.jpg";
import SangeetImage from "public/schedule/sangeet.jpg";
import WeddingImage from "public/schedule/wedding.jpg";

// Describes a single event within a day (e.g., Haldi, Baraat)
export interface SubEvent {
    name: string;
    time: string;
    location: string;
    description: React.ReactNode;
    dressCode: {
        primary: string;
        secondary?: string
    }
}

// Describes an entire day's worth of events
export interface ScheduleDay {
    date: string;
    title: string;
    image: {
        src: StaticImageData;
        alt: string;
    };
    events: SubEvent[];
}


export const SCHEDULE_DATA: ScheduleDay[] = [
    {
        date: "June 18, 2026",
        title: "A Coastal Kickoff to Love",
        image: {
            src: WelcomeImage,
            alt: "Pooja & Yash - June 18, 2026",
        },
        events: [
            {
                name: "Welcome Dinner",
                time: "6:00 PM - 10:00 PM",
                location: "The Beach House",
                description: (
                    <>
                        Join us with excitement as we start wedding celebrations, with a breezy and beautiful Welcome Dinner by the sea!
                    </>
                ),
                dressCode: {
                    primary: "Linen or Resort wear",
                    secondary: "Effortless elegance meets festive flair. Breezy kurta or flowy dress, come ready to celebrate!",
                },
            },
        ],
    },
    {
        date: "June 19, 2026",
        title: "Blessings & Haldi by the Sea",
        image: {
            src: WeddingImage,
            alt: "Pooja & Yash - June 19, 2026",
        },
        events: [
            {
                name: "Grah Shanti & Ganesh Puja",
                time: "8:00 AM - 10:00 AM",
                location: "The Palm Terrace",
                description: (
                    <>
                        We welcome your presence to traditional Ganesh Puja marking the beginning of this auspicious occasion, under the open sky.
                    </>
                ),
                dressCode: {
                    primary: "Indian wear",
                    secondary: "Traditional attire that's light, breezy, and Florida-friendly.",
                },
            },
            {
                name: "Couple's Haldi Celebration",
                time: "10:30 AM - 12:00 PM",
                location: "The North Beach",
                description: (
                    <>
                        Join us for a joyful beachside Haldi, where the beautiful couple, families and friends come together to shine in golden laughter and seaside bliss.
                    </>
                ),
                dressCode: {
                    primary: "Indian wear",
                },
            },
        ],
    },
    {
        date: "June 19, 2026",
        title: "Sangeet & Sway, Let's Dance the Night Away",
        image: {
            src: SangeetImage,
            alt: "Pooja & Yash - June 19, 2026",
        },
        events: [
            {
                name: "Sangeet Night",
                time: "6:00 PM - 10:00 PM",
                location: "The Ritz Carlton Ballroom",
                description: (
                    <>
                        <i>&quot;I am honored to invite you all to the most unforgettable sangeet, celebrating the beautiful couple. Join us for a night of beats and good eats for the Sangeet Night- Hope to see all of you with your love, laughter, AND don&apos;t forget to bring your best moves.&quot; - Shama</i>
                    </>
                ),
                dressCode: {
                    primary: "Festive Indian attire",
                    secondary: "Bold and sparkling Indian wear to match your bold Sangeet moves.",
                },
            },
        ],
    },
    {
        date: "June 20, 2026",
        title: "Jaan, Vows & Matrimony: The Lagna",
        image: {
            src: WeddingImage,
            alt: "Pooja & Yash - June 20, 2026",
        },
        events: [
            {
                name: "Jaan Aagman",
                time: "8:15 AM",
                location: "Front Driveway",
                description: (
                    <>
                        Join us to witness this sacred union &apos;Hast Melap&apos;, as Pooja and Yash take their seven vows &apos;Saptapadi&apos; to begin their journey with &apos;Char Fera&apos; four promises around the fire.
                    </>
                ),
                dressCode: {
                    primary: "Heritage Indian",
                    secondary: "Vibrant, timeless, and steeped in culture. Heirloom embroidery, rich silks, bandhani, brocade, or mirror work.",
                },
            },
            {
                name: "Wedding Ceremony & Lunch",
                time: "9:00 AM - 11:00 AM",
                location: "The Center Courtyard",
                description: (
                    <>
                        Sacred vows and celebration, followed by a delicious lunch.
                    </>
                ),
                dressCode: {
                    primary: "Heritage Indian",
                },
            },
        ],
    },
    {
        date: "June 20, 2026",
        title: "The Reception",
        image: {
            src: SangeetImage,
            alt: "Pooja & Yash - June 20, 2026",
        },
        events: [
            {
                name: "Cocktail Hour",
                time: "5:30 PM - 6:30 PM",
                location: "The Vanderbilt Courtyard",
                description: (
                    <>
                        A celebration of Love, Laughter & New Beginnings, join us to usher in the newly weds with a delightful evening filled with great food, vibrant music and even more fun.
                    </>
                ),
                dressCode: {
                    primary: "Formal Indian or Western attire",
                    secondary: "Classic, graceful, and polished — rich tones, elegant textures, and a hint of celebration in every detail.",
                },
            },
            {
                name: "Reception",
                time: "7:00 PM - 11:00 PM",
                location: "The Vanderbilt Ballroom",
                description: (
                    <>
                        Celebrate the newlyweds with music, food, and fun.
                    </>
                ),
                dressCode: {
                    primary: "Formal Indian or Western attire",
                },
            },
        ],
    },
    {
        date: "June 21, 2026",
        title: "A Farewell to Remember: Brunch",
        image: {
            src: WelcomeImage,
            alt: "Pooja & Yash - June 21, 2026",
        },
        events: [
            {
                name: "Farewell Brunch",
                time: "9:00 AM - 11:00 AM",
                location: "The Beach House",
                description: (
                    <>
                        As we get ready to farewell this unforgettable weekend at Naples, let&apos;s share one last toast, savor delicious bites, and relive the memories from the big day. It&apos;s the perfect way to send our blessed newlyweds off into their new married life.
                    </>
                ),
                dressCode: {
                    primary: "Casual/Resort wear",
                },
            },
            {
                name: "Checkout",
                time: "After brunch",
                location: "The Beach House",
                description: (
                    <>
                        A bittersweet moment until we meet again, see ya!
                    </>
                ),
                dressCode: {
                    primary: "Travel attire",
                },
            },
        ],
    },
];

