import { Hero, type HeroImageProps } from "~/components/layout/hero";

interface PageLayoutProps {
  /** The image configuration for the hero section. */
  heroImage: HeroImageProps;
  introSection?: React.ReactNode;
  /** The primary content of the page. */
  children: React.ReactNode;
}

export function PageLayout({
  heroImage,
  introSection,
  children,
}: PageLayoutProps) {
  return (
    <>
      <Hero image={heroImage} />

      <section className="relative z-10 -mt-16 rounded-t-2xl bg-gray-50 py-24 sm:-mt-24 sm:py-32">
        <div className="container">
          {introSection}
          <main>{children}</main>
        </div>
      </section>
    </>
  );
}
