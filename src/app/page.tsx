import Logo from "~/components/logo";
import { Hero, type HeroImageProps } from "../components/layout/hero";
import LandingImage from "public/Landing3.png";
import Container from "~/components/layout/container";

const HeroImage: HeroImageProps = {
  src: LandingImage,
  alt: "Pooja & Yash",
};

export default async function Home() {
  return (
    <>
      <Hero image={HeroImage} />
      <Container variant="bottom">
        <main className="flex flex-col gap-16 py-8">
          <div className="flex items-center justify-center">
            <div className="border-foreground border-2 p-4">
              <Logo className="fill-foreground w-[60px] md:w-[100px]" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 text-center font-serif">
            <p className="text-xl font-light text-gray-600 md:text-2xl">
              Together with their families,
            </p>
            <p className="text-3xl text-gray-800 [font-variant:small-caps] sm:text-4xl lg:text-5xl">
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

          {/* <h1 className="sr-only">Pooja & Yash</h1> */}
          {/* <h2 className="sr-only">June 19, 2026 ⋅ Naples, Florida</h2> */}
          {/* <Hero image={HeroImage}> */}
          {/*   <div className="flex flex-col items-center justify-center gap-6 font-serif leading-0"> */}
          {/*     <div className="text-6xl font-light text-white uppercase md:text-8xl"> */}
          {/*       Pooja */}
          {/*     </div> */}
          {/*     <div className="-mt-2 flex w-full items-center justify-center gap-4 md:gap-8"> */}
          {/*       <AndLine /> */}
          {/*       <div className="font-script mb-2 shrink-0 text-[48px] text-white md:mb-4 md:text-[64px]"> */}
          {/*         and */}
          {/*       </div> */}
          {/*       <AndLine /> */}
          {/*     </div> */}
          {/*     <div className="text-6xl font-light text-white uppercase md:text-8xl"> */}
          {/*       Yash */}
          {/*     </div> */}
          {/*   </div> */}
          {/* </Hero> */}
          {/**/}
          {/* <div className="bg-white py-24 sm:py-32"> */}
          {/*   <div className="container"> */}
          {/*     {/* Section 1: The Formal Invitation (Centered) */}
          {/*     <div className="mx-auto max-w-3xl text-center"> */}
          {/*       <div className="border-primary mx-auto mb-12 inline-block border p-3"> */}
          {/*         <Logo className="fill-primary w-[80px]" /> */}
          {/*       </div> */}
          {/*       <p className="font-serif text-xl font-light text-gray-600 md:text-2xl"> */}
          {/*         Together with their families, */}
          {/*       </p> */}
          {/*       <h2 className="font-script my-4 text-[60px] leading-tight text-gray-800 sm:text-[80px] md:text-[100px]"> */}
          {/*         Pooja and Yash */}
          {/*       </h2> */}
          {/*       <p className="font-serif text-lg font-light text-gray-600 md:text-xl"> */}
          {/*         request the honor of your presence at the celebration of their */}
          {/*         marriage. */}
          {/*       </p> */}
          {/*     </div> */}
          {/**/}
          {/*     {/* Section 2: Details & Image (Dynamic Grid Layout) */}
          {/*     <div className="mx-auto mt-24 grid max-w-7xl grid-cols-1 items-center gap-16 md:mt-32 md:grid-cols-2 md:gap-12 lg:gap-24"> */}
          {/*       {/* Column 1: The Image */}
          {/*       <div className="w-full"> */}
          {/*         <Image */}
          {/*           src={FirstImage} */}
          {/*           alt="Pooja & Yash standing by a piano" */}
          {/*           placeholder="blur" */}
          {/*           className="rounded-sm" */}
          {/*         /> */}
          {/*       </div> */}
          {/**/}
          {/*       {/* Column 2: The Details */}
          {/*       <div className="flex flex-col text-center md:text-left"> */}
          {/*         <div className="font-serif"> */}
          {/*           <div className="mb-8"> */}
          {/*             <p className="text-2xl font-light text-gray-800 md:text-3xl"> */}
          {/*               Summer of 2026 */}
          {/*             </p> */}
          {/*             <p className="text-2xl text-gray-600 italic md:text-3xl"> */}
          {/*               June 18 &mdash; June 21 */}
          {/*             </p> */}
          {/*           </div> */}
          {/*           <div> */}
          {/*             <p className="text-2xl font-light text-gray-800 md:text-3xl"> */}
          {/*               Naples, Florida */}
          {/*             </p> */}
          {/*             <p className="text-2xl text-gray-600 italic md:text-3xl"> */}
          {/*               The Ritz Carlton Naples, Beach Resort */}
          {/*             </p> */}
          {/*           </div> */}
          {/*         </div> */}
          {/*       </div> */}
          {/*     </div> */}
          {/*   </div> */}
          {/* </div> */}
        </main>
      </Container>
    </>
  );
}
