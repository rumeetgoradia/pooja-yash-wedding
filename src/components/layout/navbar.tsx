"use client";
import Link from "next/link";
import Logo from "~/components/logo";
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

const Nav: React.FC<{
  pathName: string;
  col?: boolean;
  className?: string;
}> = ({ pathName, col, className }) => {
  return (
    <nav
      className={cn(
        "flex gap-6 text-lg tracking-wide text-white",
        col && "flex-col",
        className,
      )}
    >
      {ROUTES.map((route) => (
        <Link
          href={route.path}
          title={route.title}
          className={cn(
            "hover:text-primary transition-[color]",
            pathName === route.path && "text-primary",
          )}
          key={`nav-${route.title}`}
        >
          {route.title}
        </Link>
      ))}
    </nav>
  );
};

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
            <Logo className="hover:fill-primary w-[48px] fill-white transition-[fill] md:w-[64px]" />
          </Link>
          <Nav pathName={pathName} className="max-md:hidden" />
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <Button
                  variant="unstyled"
                  className="text-lg text-white"
                  size="default"
                >
                  <Menu className="size-8 font-light" />
                </Button>
              </SheetTrigger>
              <SheetContent className="border-none bg-black px-8 py-24 text-white">
                <Nav pathName={pathName} col />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
