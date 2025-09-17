import Logo from "~/components/logo";
import DisplayImage from "public/home/piano.jpg";
import LandingImage from "public/heros/home.png";
import Image from "next/image";
import { PageLayout } from "~/components/layout/layout"; // <-- Import the new layout
import { type HeroImageProps } from "~/components/layout/hero";

const HeroImage: HeroImageProps = {
  src: LandingImage,
  alt: "Pooja & Yash",
  className: "max-sm:object-[43%]",
};

export default function Home() {
  return (
    <PageLayout heroImage={HeroImage}>
      <div className="grid grid-cols-1 items-center gap-y-16 lg:grid-cols-2 lg:gap-x-20">
        <div className="flex flex-col">
          <div className="flex items-center justify-center lg:justify-start">
            <div className="border border-black p-3">
              <Logo className="w-[80px]" />
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-8 text-center lg:mt-16 lg:gap-10 lg:text-left">
            <div className="font-serif">
              <p className="text-xl font-light text-gray-600">
                Together with their families,
              </p>
              <h2 className="font-script my-6 text-6xl font-light sm:text-8xl lg:my-6">
                Pooja & Yash
              </h2>
              <p className="text-xl font-light text-gray-600">
                request the honor of your presence at the celebration of their
                marriage.
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-8 tracking-wider sm:flex-row sm:justify-center sm:gap-12 lg:justify-start">
              <div className="flex basis-1/2 flex-col">
                <p className="font-serif text-xl tracking-wide uppercase [font-variant:small-caps] sm:text-2xl">
                  Summer of 2026
                </p>
                <p className="text-lg font-thin tracking-wider text-gray-500 uppercase">
                  June 19 &mdash; June 21
                </p>
              </div>
              <div className="flex basis-1/2 flex-col">
                <p className="font-serif text-xl tracking-wide uppercase [font-variant:small-caps] sm:text-2xl">
                  Naples, Florida
                </p>
                <p className="text-lg font-thin tracking-wider text-gray-500 uppercase">
                  The Ritz-Carlton Naples, Beach Resort
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <Image
            src={DisplayImage}
            alt="Pooja and Yash standing in front of a piano."
            placeholder="blur"
            className="h-auto w-full rounded-lg object-cover shadow-2xl"
          />
        </div>
      </div>
    </PageLayout>
  );
}
