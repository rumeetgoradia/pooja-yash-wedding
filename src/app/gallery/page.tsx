import Image from "next/image";
import { Content } from "~/components/layout/content";
import { type HeroImageProps } from "~/components/layout/hero";
import LandingImage from "public/heros/gallery.jpg";
import { galleryImages, type GalleryImage } from "~/lib/data/gallery-data";

const HeroImage: HeroImageProps = {
  src: LandingImage,
  alt: "Gallery - Pooja & Yash",
  className: "object-[70%] sm:object-[50%_20%]",
};

export default function GalleryPage() {
  return (
    <Content heroImage={HeroImage}>
      <div className="columns-1 gap-8 md:columns-2">
        {galleryImages.map((image: GalleryImage) => (
          <div key={image.src} className="mb-8 break-inside-avoid">
            <Image
              src={image.src}
              alt="Photo from the gallery"
              width={image.width}
              height={image.height}
              placeholder="blur"
              blurDataURL={image.blurDataURL}
              className="h-auto w-full rounded-lg object-cover shadow-md transition-all duration-300 hover:scale-[1.025] hover:shadow-xl"
            />
          </div>
        ))}
      </div>
    </Content>
  );
}
