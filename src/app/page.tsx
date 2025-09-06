import Logo from "~/components/logo";
import { Hero, type HeroImageProps } from "./hero";
import LandingImage from "public/Landing2.png";
import FirstImage from "public/Home/first.jpg";
import Image from "next/image";

const HeroImage: HeroImageProps = {
  src: LandingImage,
  alt: "Pooja & Yash",
  className: "object-[48%] md:object-center",
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
        <div className="flex flex-col items-center justify-center gap-6 font-serif leading-0">
          <div className="text-6xl font-light text-white uppercase md:text-8xl">
            Pooja
          </div>
          <div className="-mt-2 flex w-full items-center justify-center gap-4 md:gap-8">
            <AndLine />
            <div className="font-script mb-2 shrink-0 text-[48px] text-white md:mb-4 md:text-[64px]">
              and
            </div>
            <AndLine />
          </div>
          <div className="text-6xl font-light text-white uppercase md:text-8xl">
            Yash
          </div>
        </div>
      </Hero>
      <div className="container flex flex-col gap-28 py-32 md:flex-row">
        <div className="flex w-full flex-col items-center justify-center gap-12">
          <div className="border-primary border-2 p-4">
            <Logo className="fill-primary w-[100px]" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-center font-serif text-2xl font-light">
              Together with their families,
            </div>
            <div className="text-serif font-script mb-4 text-center text-[50px] sm:text-[75px] md:text-[100px]">
              Pooja and Yash
            </div>
            <div className="text-center font-serif text-xl font-light">
              request the honor of your presence at the celebration of their
              marriage.
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center justify-center gap-2 text-center font-serif text-2xl">
              <div className="font-light">Summer of 2026</div>
              <div className="italic">June 18 &mdash; June 21</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 text-center font-serif text-2xl">
              <div className="font-light">Naples, Florida</div>
              <div className="italic">
                The Ritz Carlton Naples, Beach Resort
              </div>
            </div>
          </div>
          <div className="border-primary text-primary border p-4 text-center font-serif text-3xl font-light italic">
            More information to come shortly!
          </div>
        </div>
        <div className="w-full">
          <Image src={FirstImage} alt="Pooja & Yash" placeholder="blur" />
        </div>
      </div>
    </main>
  );
}
