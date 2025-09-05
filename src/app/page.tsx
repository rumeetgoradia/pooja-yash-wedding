import { Hero, type HeroImageProps } from "./hero";
import LandingImage from "public/Landing.jpg";

const HeroImage: HeroImageProps = {
  src: LandingImage,
  alt: "Pooja & Yash",
  className: "object-[82.5%] md:object-center",
};

const AndLine = () => {
  return <hr className="border-primary w-[64px] border md:w-[96px]" />;
};

export default async function Home() {
  return (
    <main>
      <h1 className="sr-only">Pooja & Yash</h1>
      <h2 className="sr-only">June 19, 2026 ⋅ Naples, Florida</h2>
      <Hero image={HeroImage}>
        <div className="flex flex-col items-center justify-center gap-2 font-serif leading-0">
          <div className="text-6xl font-light text-white uppercase md:text-8xl">
            Pooja
          </div>
          <div className="-mt-2 flex w-full items-center justify-center gap-4 md:gap-8">
            <AndLine />
            <div className="shrink-0 text-2xl font-thin text-white italic md:text-4xl">
              and
            </div>
            <AndLine />
          </div>
          <div className="text-6xl font-light text-white uppercase md:text-8xl">
            Yash
          </div>
        </div>
      </Hero>
      <p className="h-[2000px]">Lorem ipsum</p>
    </main>
  );
}
