import { type EventItem, type DayMeta } from "./types";
import WelcomeImage from "public/schedule/welcome.jpg";
import SangeetImage from "public/schedule/sangeet.jpg";
import WeddingImage from "public/schedule/wedding.jpg";
import GoodbyeImage from "public/schedule/goodbye.jpg";

export const DAY_META: Record<string, DayMeta> = {
    "2026-06-18": {
        date: "2026-06-18",
        hero: { src: WelcomeImage, alt: "June 18" },
        vibe: "A Coastal Kickoff to Love",
    },
    "2026-06-19": {
        date: "2026-06-19",
        hero: { src: WeddingImage, alt: "June 19" },
        vibe: "Grah Shanti/Haldi & Sangeet by the Sea",
    },
    "2026-06-20": {
        date: "2026-06-20",
        hero: { src: SangeetImage, alt: "June 20" },
        vibe: "Lagna & Reception",
    },
    "2026-06-21": {
        date: "2026-06-21",
        hero: { src: GoodbyeImage, alt: "June 21" },
        vibe: "A Farewell to Remember",
    },
};

export const EVENTS: EventItem[] = [
    {
        id: "welcome-dinner",
        title: "Welcome Dinner",
        start: "2026-06-18T18:00:00-04:00",
        end: "2026-06-18T22:00:00-04:00",
        venue: { name: "The Beach House" },
        description: (
            <>
                Join us with excitement as we start wedding celebrations, with a breezy
                and beautiful Welcome Dinner by the sea!
            </>
        ),
        dressCode: {
            primary: "Linen or Resort wear",
            secondary:
                "Effortless elegance meets festive flair. Breezy kurta or flowy dress, come ready to celebrate!",
        },
    },
    {
        id: "grah-shanti-ganesh-puja",
        title: "Grah Shanti & Ganesh Puja",
        start: "2026-06-19T08:00:00-04:00",
        end: "2026-06-19T10:00:00-04:00",
        venue: { name: "The Palm Terrace" },
        description: (
            <>
                We welcome your presence to traditional Ganesh Puja marking the
                beginning of this auspicious occasion, under the open sky.
            </>
        ),
        dressCode: {
            primary: "Indian wear",
            secondary:
                "Traditional attire that's light, breezy, and Florida-friendly.",
        },
    },
    {
        id: "haldi-celebration",
        title: "Couple's Haldi Celebration",
        start: "2026-06-19T10:30:00-04:00",
        end: "2026-06-19T12:00:00-04:00",
        venue: { name: "The North Beach" },
        description: (
            <>
                Join us for a joyful beachside Haldi, where the beautiful couple,
                families and friends come together to shine in golden laughter and
                seaside bliss.
            </>
        ),
        dressCode: {
            primary: "Indian wear",
        },
    },
    {
        id: "sangeet-night",
        title: "Sangeet Night",
        start: "2026-06-19T18:00:00-04:00",
        end: "2026-06-19T22:00:00-04:00",
        venue: { name: "The Ritz Carlton Ballroom" },
        description: (
            <>
                <i>
                    &quot;I am honored to invite you all to the most unforgettable
                    sangeet, celebrating the beautiful couple. Join us for a night of
                    beats and good eats for the Sangeet Night - Hope to see all of you
                    with your love, laughter, AND don&apos;t forget to bring your best
                    moves.&quot; - Shama
                </i>
            </>
        ),
        dressCode: {
            primary: "Festive Indian attire",
            secondary:
                "Bold and sparkling Indian wear to match your bold Sangeet moves.",
        },
    },
    {
        id: "jaan-aagman",
        title: "Jaan Aagman",
        start: "2026-06-20T08:00:00-04:00",
        venue: { name: "Front Driveway" },
        description: (
            <>
                Join us to witness this sacred union &apos;Hast Melap&apos;, as Pooja
                and Yash take their seven vows &apos;Saptapadi&apos; to begin their
                journey with &apos;Char Fera&apos; four promises around the fire.
            </>
        ),
        dressCode: {
            primary: "Heritage Indian",
            secondary:
                "Vibrant, timeless, and steeped in culture. Heirloom embroidery, rich silks, bandhani, brocade, or mirror work.",
        },
    },
    {
        id: "wedding-ceremony-lunch",
        title: "Wedding Ceremony & Lunch",
        start: "2026-06-20T09:00:00-04:00",
        end: "2026-06-20T11:00:00-04:00",
        venue: { name: "The Center Courtyard" },
        description: (
            <>Sacred vows and celebration, followed by a delicious lunch.</>
        ),
        dressCode: {
            primary: "Heritage Indian",
        },
    },
    {
        id: "cocktail-hour",
        title: "Cocktail Hour",
        start: "2026-06-20T17:30:00-04:00",
        end: "2026-06-20T18:30:00-04:00",
        venue: { name: "The Vanderbilt Courtyard" },
        description: (
            <>
                A celebration of Love, Laughter & New Beginnings, join us to usher in
                the newly weds with a delightful evening filled with great food, vibrant
                music and even more fun.
            </>
        ),
        dressCode: {
            primary: "Formal Indian or Western attire",
            secondary:
                "Classic, graceful, and polished — rich tones, elegant textures, and a hint of celebration in every detail.",
        },
    },
    {
        id: "reception",
        title: "Reception",
        start: "2026-06-20T19:00:00-04:00",
        end: "2026-06-20T23:00:00-04:00",
        venue: { name: "The Vanderbilt Ballroom" },
        description: <>Celebrate the newlyweds with music, food, and fun.</>,
        dressCode: {
            primary: "Formal Indian or Western attire",
        },
    },
    {
        id: "farewell-brunch",
        title: "Farewell Brunch",
        start: "2026-06-21T09:00:00-04:00",
        end: "2026-06-21T11:00:00-04:00",
        venue: { name: "The Beach House" },
        description: (
            <>
                As we get ready to farewell this unforgettable weekend at Naples,
                let&apos;s share one last toast, savor delicious bites, and relive the
                memories from the big day. It&apos;s the perfect way to send our blessed
                newlyweds off into their new married life.
            </>
        ),
        dressCode: {
            primary: "Casual/Resort wear",
        },
    },
    {
        id: "checkout",
        title: "Checkout",
        start: "2026-06-21T11:00:00-04:00",
        venue: { name: "Hotel Lobby" },
        description: <>A bittersweet moment until we meet again, see ya!</>,
        dressCode: {
            primary: "Travel attire",
        },
        notes: (
            <>
                <div className="mt-4 text-center text-2xl md:mt-6">
                    । જય શ્રીકૃષ્ણ, આવજો ।
                </div>
            </>
        ),
    },
];
