import { BusFront, Hotel, Map, Plane } from "lucide-react";
import LandingImage from "public/heros/accomodations.jpg";
import { type HeroImageProps } from "~/components/layout/hero";
import { Content } from "~/components/layout/content";
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
        <div className="flex h-full flex-col rounded-xl border border-gray-200/80 bg-white p-8 shadow-md transition-shadow duration-300 hover:shadow-lg">
            <div className="flex items-center gap-4">
                <Icon className="size-8 text-gray-500" />
                <h3 className="text-foreground mt-1 font-serif text-3xl font-medium">
                    {title}
                </h3>
            </div>

            <div className="mt-6 text-base leading-relaxed text-gray-600">
                {children}
            </div>

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
        <Content heroImage={HeroImage} introSection={Intro}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <InfoCard
                    icon={Hotel}
                    title="Hotel"
                    ctaText="Book Your Stay"
                    ctaHref="https://book.passkey.com/event/51089211/owner/49699364/home"
                >
                    <p>
                        Events will be taking place at The Ritz-Carlton Beach Resort, Naples FL from June 18 to June 21, 2026 but the room block is available from June 17 to June 22, 2026.
                    </p>
                </InfoCard>

                <InfoCard
                    icon={Map}
                    title="Hotel Map"
                    ctaText="View Map"
                    ctaHref="https://ipoolside-media.s3.amazonaws.com/site/ritzcarltonnaples/images/attachment/RSWRZ_Resort_Map_2024.pdf"
                >
                    <p>
                        Please refer to the hotel map for event locations and the variety of amenities available at the resort.
                    </p>
                </InfoCard>

                <InfoCard
                    icon={Plane}
                    title="Airport"
                    ctaText="Get Directions"
                    ctaHref="https://maps.app.goo.gl/SQJ27eyBEMMFGBsy5"
                >
                    <p>
                        The nearest airport is Southwest Florida International Airport
                        (RSW), located approximately 30 minutes away from the hotel.
                    </p>
                </InfoCard>
            </div>
        </Content>
    );
}
