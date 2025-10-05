import Logo from "~/components/logo";
import DisplayImage from "public/home/piano.jpg";
import LandingImage from "public/heros/home.png";
import Image from "next/image";
import { Content } from "~/components/layout/content";
import { type HeroImageProps } from "~/components/layout/hero";

const HeroImage: HeroImageProps = {
    src: LandingImage,
    alt: "Pooja & Yash",
    className: "max-sm:object-[43%]",
};

export default function Home() {
    return (
        <Content heroImage={HeroImage}>
            {/* UPDATED: Using responsive gaps for better balance on all screen sizes */}
            <div className="grid grid-cols-1 items-center gap-y-12 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-16">
                <div className="flex flex-col">
                    <div className="flex items-center justify-center lg:justify-start">
                        <div className="border border-gray-800 p-3">
                            <Logo className="w-[80px]" />
                        </div>
                    </div>
                    <div className="mt-12 flex flex-col gap-8 text-center lg:gap-10 lg:text-left">
                        <div className="font-serif">
                            <p className="text-xl text-gray-600">
                                Together with their families,
                            </p>
                            <h2 className="my-6 flex flex-col items-center font-light lg:items-start">
                                <span className="font-script text-6xl sm:text-8xl">
                                    Pooja & Yash
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600">
                                request the honor of your presence at the celebration of their
                                marriage.
                            </p>
                        </div>
                        <div className="mt-4 flex flex-col gap-8 tracking-wider sm:flex-row sm:justify-center sm:gap-12 lg:justify-start">
                            <div className="flex basis-1/2 flex-col">
                                <p className="font-serif text-xl font-medium tracking-wide uppercase [font-variant:small-caps] sm:text-2xl">
                                    Summer of 2026
                                </p>
                                <p className="text-lg font-light tracking-wider text-gray-500 uppercase">
                                    June 18 &mdash; June 20
                                </p>
                            </div>
                            <div className="flex basis-1/2 flex-col pt-[6px]">
                                <p className="font-serif text-xl font-medium tracking-wide uppercase [font-variant:small-caps] sm:text-2xl">
                                    Naples, Florida
                                </p>
                                <div className="text-lg font-light tracking-wider text-gray-500 uppercase flex flex-col">
                                    <p>The Ritz-Carlton Naples, Beach Resort</p>
                                    <div className='flex flex-col text-sm'>
                                        <p>280 Vanderbilt Beach Road</p>
                                        <p>Naples, Florida 34108</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <Image
                        src={DisplayImage}
                        alt="Pooja and Yash standing in front of a piano."
                        placeholder="blur"
                        className="h-auto w-full rounded-lg object-cover shadow-xl"
                    />
                </div>
            </div>
        </Content>
    );
}
