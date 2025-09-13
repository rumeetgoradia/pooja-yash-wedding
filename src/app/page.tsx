import Logo from "~/components/logo";
import { Hero, type HeroImageProps } from "~/components/layout/hero";
import LandingImage from "public/Landing3.png";

const HeroImage: HeroImageProps = {
  src: LandingImage,
  alt: "Pooja & Yash",
  className: "max-sm:object-[43%]",
};

export default async function Home() {
  return (
    <>
      <Hero image={HeroImage} />
      <main className="container flex flex-col gap-16 py-24">
        <div className="flex items-center justify-center">
          <div className="border-foreground border-2 p-4">
            <Logo className="fill-foreground w-[60px] md:w-[100px]" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 text-center font-serif">
          <p className="text-xl font-light text-gray-600 md:text-2xl">
            Together with their families,
          </p>
          <p className="font-script my-8 text-5xl text-gray-800 sm:text-6xl md:my-20 md:text-7xl">
            Pooja and Yash
          </p>
          <p className="text-xl font-light text-gray-600 md:text-2xl">
            request the honor of your presence at the celebration of their
            marriage.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-center tracking-wider">
          <div className="flex flex-col">
            <p className="font-serif text-2xl [font-variant:small-caps] md:text-3xl">
              Summer of 2026
            </p>
            <p className="text-lg font-thin uppercase md:text-2xl">
              June 18 &mdash; June 21
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-serif text-2xl [font-variant:small-caps] md:text-3xl">
              Naples, Florida
            </p>
            <p className="text-lg font-thin uppercase md:text-2xl">
              The Ritz Carlton Naples, Beach Resort
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
