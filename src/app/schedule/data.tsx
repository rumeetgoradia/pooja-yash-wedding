import type { StaticImageData } from "next/image";
import Link from "next/link";

// Import your event images here
import WelcomeImage from "public/schedule/welcome.jpg"; // Replace with your actual image paths
import SangeetImage from "public/schedule/sangeet.jpg";
import WeddingImage from "public/schedule/wedding.jpg";

// Describes a single event within a day (e.g., Haldi, Baraat)
export interface SubEvent {
  name: string;
  time: string;
  description: React.ReactNode;
  dressCode: React.ReactNode;
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
    date: "June 18th, 2026",
    title: "🌺 A Coastal Kickoff to Love 🌺",
    image: {
      src: WelcomeImage,
      alt: "Elegant beachside welcome dinner setup",
    },
    events: [
      {
        name: "Welcome Dinner",
        time: "6:00 PM - 10:00 PM",
        description: (
          <>
            Join us as we open the wedding celebrations with a breezy and
            beautiful Welcome Dinner by the sea! This evening is all about
            joyful reunions, laughter, and the first sparkle of the celebrations
            to come.
          </>
        ),
        dressCode: (
          <>
            <strong>Dress Code:</strong> Linen or Indian wear — think effortless
            elegance meets festive flair.
          </>
        ),
      },
    ],
  },
  {
    date: "June 19th, 2026",
    title: "🌞 Blessings, Haldi & a Night of Dance 💃🏽",
    image: {
      src: SangeetImage,
      alt: "Vibrant Sangeet decorations under the stars",
    },
    events: [
      {
        name: "Grah Shanti & Haldi",
        time: "8:00 AM - 1:30 PM",
        description: (
          <>
            We begin the day grounded in tradition with a serene Grah Shanti
            ceremony, followed by a vibrant Haldi on the beach to turn up the
            color, music, and joy! Lunch will be served following the ceremony.
          </>
        ),
        dressCode: (
          <>
            <strong>Dress Code:</strong> Traditional Indian wear that’s light,
            breezy, and sunshine-friendly.
          </>
        ),
      },
      {
        name: "Sangeet",
        time: "7:00 PM - 10:00 PM",
        description: (
          <>
            As the sun sets, the beats rise! Join us for an unforgettable
            Sangeet night — a celebration of love through music, dance, and
            unfiltered joy, with plenty of Garba planned!
          </>
        ),
        dressCode: (
          <>
            <strong>Dress Code:</strong> Festive Indian attire — bring your
            sparkle, your lehengas, and your Garba-ready energy!
          </>
        ),
      },
    ],
  },
  {
    date: "June 20th, 2026",
    title: "👑 The Wedding Day & Grand Reception ✨",
    image: {
      src: WeddingImage,
      alt: "Beautifully decorated wedding mandap",
    },
    events: [
      {
        name: "Baraat & Wedding Ceremony",
        time: "8:00 AM - 11:00 AM",
        description: (
          <>
            The day begins with the groom’s spirited Baraat, followed by a
            traditional wedding ceremony rich with rituals, meaning, and love.
            Wedding lunch will be served immediately after.
          </>
        ),
        dressCode: (
          <>
            <strong>Dress Code:</strong> Heritage Indian Attire – vibrant,
            timeless, and steeped in culture. Wear your treasured pieces with
            pride!
          </>
        ),
      },
      {
        name: "Cocktails & Reception",
        time: "6:00 PM - 11:00 PM",
        description: (
          <>
            To close this unforgettable weekend, join us for an evening of
            elegance, heartfelt speeches, and celebration as we toast the
            newlyweds and dance the night away.
          </>
        ),
        dressCode: (
          <>
            <strong>Dress Code:</strong> Formal Indian or Western attire. Think
            classic, festive, and polished.
          </>
        ),
      },
    ],
  },
];
