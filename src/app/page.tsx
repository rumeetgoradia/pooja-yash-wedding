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
        <h1 className="text-left text-5xl text-white">Pooja & Yash</h1>
      </Hero>
      <p className="h-[2000px]">Lorem ipsum</p>
    </main>
  );
}
