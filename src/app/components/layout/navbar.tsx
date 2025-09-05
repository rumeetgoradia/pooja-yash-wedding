"use client";
import Link from "next/link";
import Logo from "../logo";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  SheetContent,
  Sheet,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "~/components/ui/sheet";

const ROUTES: { title: string; path: string }[] = [
  {
    title: "Schedule",
    path: "/schedule",
  },
  {
    title: "Travel & Accommodations",
    path: "/accomodations",
  },
  {
    title: "FAQs",
    path: "/faqs",
  },
  {
    title: "Gallery",
    path: "/gallery",
  },
];

const Navbar: React.FC = () => {
  const pathName = usePathname();

  return (
    <>
      <div className="hidden justify-center bg-black md:flex">
        <div className="container flex max-w-[64rem] items-center justify-between px-8 pt-4 text-white lg:pt-8"></div>
      </div>

      <header className="sticky top-0 z-50 flex w-full justify-center bg-black py-4">
        <div className="container flex items-center justify-between">
          <Link href="/" title="Pooja & Yash">
            <Logo className="hover:fill-primary w-[36px] fill-white transition-[fill] md:w-[48px]" />
          </Link>
          <nav className="hidden gap-6 font-serif md:flex">
            {ROUTES.map((route) => (
              <Link
                href={route.path}
                title={route.title}
                className={cn(
                  "hover:text-primary text-lg font-medium text-white transition-[color]",
                  pathName === route.path && "text-primary",
                )}
                key={`nav-${route.title}`}
              >
                {route.title}
              </Link>
            ))}
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <Button
                  variant="unstyled"
                  className="text-lg text-white"
                  size="icon"
                >
                  <Menu width={32} height={32} />
                </Button>
              </SheetTrigger>
              <SheetContent className="border-none bg-black px-8 py-20 text-white">
                <nav className="flex flex-col gap-6 font-serif">
                  {ROUTES.map((route) => (
                    <Link
                      href={route.path}
                      title={route.title}
                      className={cn(
                        "hover:text-primary text-xl font-medium text-white transition-[color]",
                        pathName === route.path && "text-primary",
                      )}
                      key={`nav-${route.title}`}
                    >
                      {route.title}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
