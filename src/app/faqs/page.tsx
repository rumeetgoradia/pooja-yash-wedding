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

const FAQS_DATA: {
  icon: string;
  question: string;
  answer: React.ReactNode[];
}[] = [
  {
    icon: "🕒",
    question: "When should we plan on arriving?",
    answer: [
      <>
        The celebrations begin with a Welcome Dinner on Thursday evening (June
        18). We recommend arriving earlier that day to start the festivities
        with us!
      </>,
    ],
  },
  {
    icon: "🏝️",
    question: "Is this an all-inclusive resort?",
    answer: [
      <>
        No, this is not an all-inclusive resort. However, many wonderful
        amenities are included in your stay (see below!).
      </>,
    ],
  },
  {
    icon: "✈️",
    question: "Which airport should I fly into?",
    answer: [
      <>
        The closest airport is Southwest Florida International Airport (RSW) —
        approximately 27 miles from the resort.
      </>,
    ],
  },
  {
    icon: "🎨",
    question: "Are there any colors guests should avoid wearing?",
    answer: [
      <>
        We can&apos;t wait to see everyone dressed in their favorite outfits and
        Indian attire! We kindly ask that you avoid wearing black on the Wedding
        Day and Grah Shanti out of respect for tradition.
      </>,
    ],
  },
  {
    icon: "🌡️",
    question: "What's the weather like in South Florida in June?",
    answer: [
      <>
        Hot and humid. Be sure to pack light, breathable clothing — and
        don&apos;t forget your sunscreen!
      </>,
    ],
  },
  {
    icon: "🚗",
    question: "Is parking available?",
    answer: [<>Yes, free valet parking is available at the resort.</>],
  },
  {
    icon: "💵",
    question: "Are there any extra fees beyond the room rate?",
    answer: [
      <>
        Nope! The daily resort fee has been gifted to you, so you won&apos;t be
        charged anything beyond your room rate.
      </>,
    ],
  },
  {
    icon: "🎉",
    question: "What activities and amenities are included at the resort?",
    answer: [
      <>
        There&apos;s something for everyone to enjoy! The resort stay includes:
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>
            Two beach chairs & towel service at The Ritz-Carlton, Naples Beach
            Resort
          </li>
          <li>One beach umbrella</li>
          <li>Driving range access at Tiburón Golf Club</li>
          <li>Fitness & yoga classes</li>
          <li>Two-hour rental of two resort bicycles</li>
          <li>Enhanced in-room Wi-Fi</li>
          <li>Access to the Teen Lounge, VUE</li>
          <li>Shuttle service between both Ritz-Carlton properties</li>
          <li>
            Water park for kids and golfing for adults at The Ritz-Carlton
            Naples, Tiburón
          </li>
        </ul>
      </>,
    ],
  },
  {
    icon: "🎁",
    question: "Is there a gift registry?",
    answer: [
      <>
        No gifts, please! Your presence at our wedding is the greatest gift we
        could ask for. We&apos;re so grateful to have you celebrating with us.
      </>,
    ],
  },
  {
    icon: "🏨",
    question: "Should I wait to book my room?",
    answer: [
      <>
        Please book as soon as possible to take advantage of our room block —
        especially if you need a room with two beds, as those are limited. If
        you&apos;re turning the trip into a vacation, our discounted rate
        applies two days before and two days after the wedding events.
      </>,
    ],
  },
  {
    icon: "🌙",
    question: "Can we go to the beach at night?",
    answer: [
      <>
        While the beach is beautiful at night, the resort has a strict
        no-swimming policy after dark due to sea turtle nesting season. Thank
        you for helping protect the wildlife!
      </>,
    ],
  },
];

// --- 2. The refactored component to render the new structure ---
function FaqList() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-4">
        {FAQS_DATA.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 p-6 text-left">
                <div className="flex items-center gap-4">
                  <span className="text-2xl" aria-hidden="true">
                    {faq.icon}
                  </span>
                  <h3 className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown className="size-5 shrink-0 text-gray-500 transition-transform duration-300 ease-in-out [data-state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden transition-all">
                <div className="space-y-4 px-6 pb-6 pl-16 leading-relaxed text-gray-600">
                  {faq.answer.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>
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
