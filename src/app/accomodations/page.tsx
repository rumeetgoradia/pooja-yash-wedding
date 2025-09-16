import { BusFront, Hotel, Plane } from "lucide-react";
import LandingImage from "public/heros/accomodations.jpg";
import { Hero, type HeroImageProps } from "~/components/layout/hero";
import { PageLayout } from "~/components/layout/layout";
import { Button } from "~/components/ui/button";

const HeroImage: HeroImageProps = {
  src: LandingImage,
  alt: "Travel & Accomodations - Pooja & Yash",
};

interface InfoCardProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  ctaText: string;
  ctaHref: string;
}

function InfoCard({
  icon: Icon,
  title,
  children,
  ctaText,
  ctaHref,
}: InfoCardProps) {
  return (
    <div className="flex h-full flex-col rounded-xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
      {/* Icon and Title - Refined icon color */}
      <div className="flex items-center gap-4">
        <Icon className="size-8 text-gray-500" /> {/* Softer color */}
        <h3 className="text-foreground mt-1 font-serif text-3xl">{title}</h3>
      </div>

      {/* Description Text - Improved line height for readability */}
      <div className="mt-6 text-base leading-relaxed text-gray-600">
        {" "}
        {/* Added leading-relaxed */}
        {children}
      </div>

      {/* Call-to-Action Button */}
      <div className="mt-auto pt-6">
        <Button asChild className="w-full sm:w-auto">
          <a href={ctaHref} target="_blank" rel="noopener noreferrer">
            {ctaText}
          </a>
        </Button>
      </div>
    </div>
  );
}

const Intro = (
  <div className="mb-16 text-center">
    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
      To make your travel seamless, we&apos;ve gathered some helpful information
      below.
    </p>
  </div>
);

export default function Accommodations() {
  return (
    <PageLayout heroImage={HeroImage} introSection={Intro}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          icon={Hotel}
          title="Hotel"
          ctaText="Book Your Stay"
          // TODO add link
          ctaHref="#"
        >
          <p>
            All events will be taking place at The Ritz-Carlton, Naples. A guest
            room block will be available from June 19 to June 21, 2026.
          </p>
        </InfoCard>

        <InfoCard
          icon={BusFront}
          title="Shuttle"
          ctaText="View Schedule"
          // TODO add link
          ctaHref="#"
        >
          <p>
            Complimentary shuttles will be provided from the hotel to all
            wedding events. Please refer to the schedule for pickup times and
            locations.
          </p>
        </InfoCard>

        <InfoCard
          icon={Plane}
          title="Airport"
          // TODO add link
          ctaText="Get Directions"
          ctaHref="#"
        >
          <p>
            The nearest airport is Southwest Florida International Airport
            (RSW), located approximately 30 minutes away from the hotel.
          </p>
        </InfoCard>
      </div>
    </PageLayout>
  );
}
