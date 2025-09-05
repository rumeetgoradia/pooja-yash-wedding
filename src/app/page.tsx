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
      <h1 className="sr-only">Pooja & Yash</h1>
      <h2 className="sr-only">June 19, 2026 ⋅ Naples, Florida</h2>
      <Hero image={HeroImage}>
        <div className="flex flex-col items-center justify-center gap-2 font-serif leading-0">
          <div className="text-8xl font-light text-white uppercase">Pooja</div>
          <div className="-mt-2 flex w-full items-center justify-center gap-8">
            <hr className="border-primary w-[5vw] border" />
            <div className="shrink-0 text-4xl font-thin text-white italic">
              and
            </div>
            <hr className="border-primary w-[5vw] border" />
          </div>
          <div className="text-8xl font-light text-white uppercase">Yash</div>
        </div>
      </Hero>
      <p className="h-[2000px]">Lorem ipsum</p>
    </main>
  );
}
