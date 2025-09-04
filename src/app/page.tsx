import { Hero, type HeroImageProps } from "./hero";
import LandingImage from "public/Landing.jpg";

const HeroImage: HeroImageProps = {
  src: LandingImage,
  alt: "Pooja & Yash",
  className: "object-[82.5%] md:object-center",
};

export default async function Home() {
  return (
    <main>
      <Hero image={HeroImage}>
        <>
          <h1 className="flex flex-col items-center justify-center gap-y-10 pb-16 text-center text-7xl leading-0 text-white text-shadow-md">
            <span>Pooja</span>
            <span className="text-5xl">&</span>
            <span>Yash</span>
          </h1>
          <h2 className="text-center text-2xl text-white uppercase italic text-shadow-md">
            June 19, 2026
          </h2>
        </>
      </Hero>
      <p className="h-[2000px]">Lorem ipsum</p>
    </main>
  );
}
