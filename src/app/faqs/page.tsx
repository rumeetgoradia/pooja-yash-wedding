import Link from "next/link";
import { ChevronDown } from "lucide-react";
import LandingImage from "public/heros/faqs.jpeg";
import { PageLayout } from "~/components/layout/layout";
import { type HeroImageProps } from "~/components/layout/hero";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

const FAQS_DATA: { question: string; answer: React.ReactNode[] }[] = [
  {
    question: "When and how should I RSVP?",
    answer: [
      <>
        We kindly request that you RSVP by <strong>April 15th, 2026</strong>.
        You can RSVP for each event directly on the{" "}
        <Link
          className="text-primary underline-offset-4 hover:underline"
          href="/schedule"
        >
          Schedule
        </Link>{" "}
        page of our website.
      </>,
    ],
  },
  {
    question: "What is the dress code for the events?",
    answer: [
      <>
        The dress code for each event is listed on the{" "}
        <Link
          className="text-primary underline-offset-4 hover:underline"
          href="/schedule"
        >
          Schedule
        </Link>{" "}
        page. We encourage guests to wear vibrant, festive attire for the
        Sangeet and formal wear for the Wedding Ceremony and Reception.
      </>,
      <>
        For any events where Indian attire is suggested, please feel free to
        wear Western formal wear if you prefer. Your presence is what's most
        important to us!
      </>,
    ],
  },
  {
    question: "How do I get to the venue?",
    answer: [
      <>
        All wedding events will be held at{" "}
        <strong>The Ritz-Carlton Naples, Beach Resort</strong>. The closest
        airport is{" "}
        <strong>Southwest Florida International Airport (RSW)</strong>, about a
        30-minute drive away. We recommend using a ride-sharing service or
        renting a car.
      </>,
    ],
  },
  {
    question: "Where should I stay?",
    answer: [
      <>
        We have reserved a block of rooms at a special rate at{" "}
        <strong>The Ritz-Carlton Naples, Beach Resort</strong>. Please visit the{" "}
        <Link
          className="text-primary underline-offset-4 hover:underline"
          href="/accommodations"
        >
          Accommodations
        </Link>{" "}
        page to find the booking link.
      </>,
    ],
  },
  {
    question: "Are children welcome?",
    answer: [
      <>
        While we love your little ones, our wedding events will be adults-only.
        We appreciate you making arrangements ahead of time so you can celebrate
        with us.
      </>,
    ],
  },
];

function FaqList() {
  return (
    <div className="mx-auto max-w-3xl">
      {FAQS_DATA.map((faq, index) => (
        <Collapsible key={index} className="border-b border-gray-200">
          <CollapsibleTrigger className="flex w-full items-center justify-between py-6 text-left hover:bg-gray-50/50">
            <h3 className="text-lg font-medium text-gray-900">
              {faq.question}
            </h3>
            <ChevronDown className="size-5 shrink-0 text-gray-500 transition-transform duration-300 ease-in-out [data-state=open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden transition-all">
            <div className="space-y-4 px-2 pb-6 text-base text-gray-600">
              {faq.answer.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}

const HeroImage: HeroImageProps = {
  src: LandingImage,
  alt: "Frequently Asked Questions - Pooja & Yash",
  className: "max-sm:object-center",
};

export default function FaqsPage() {
  return (
    <PageLayout heroImage={HeroImage}>
      <FaqList />
    </PageLayout>
  );
}
