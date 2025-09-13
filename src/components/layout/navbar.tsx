"use client";

import Link from "next/link";
import Logo from "~/components/logo";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { Mail, Menu } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  SheetContent,
  Sheet,
  SheetTrigger,
  SheetTitle,
} from "~/components/ui/sheet";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { EMAIL_ADDRESS } from "~/lib/constants";

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
  includeHome?: boolean;
  className?: string;
}> = ({ pathName, includeHome, className }) => {
  const routes = includeHome
    ? [{ title: "Home", path: "/" }, ...ROUTES]
    : [...ROUTES];

  return (
    <nav
      className={cn(
        "decoration-primary font-serif font-light tracking-wider decoration-2 underline-offset-8",
        className,
      )}
    >
      {routes.map((route) => (
        <Link
          href={route.path}
          title={route.title}
          className={cn(
            "hover:text-primary transition-[color]",
            pathName === route.path && "text-primary underline",
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
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="w-full bg-black py-6 text-white">
      <div className="container flex items-center justify-between">
        <Link href="/" className="cursor-pointer">
          <Logo className="hover:fill-primary w-[60px] fill-white transition-[fill] md:w-[90px]" />
        </Link>
        <div className="max-sm:hidden">
          <nav
            className={cn(
              "decoration-primary font-serif font-light tracking-wider decoration-2 underline-offset-8",
              "flex gap-8 md:gap-12 md:text-lg",
            )}
          >
            {ROUTES.map((route) => (
              <Link
                href={route.path}
                title={route.title}
                className={cn(
                  "hover:text-primary transition-[color]",
                  pathName === route.path && "text-primary underline",
                )}
                key={`nav-${route.title}`}
              >
                {route.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="sm:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger>
              <Button variant="unstyled" size="icon" className="cursor-pointer">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex h-full flex-col gap-8 px-8 pt-18 pb-10">
              <SheetTitle className="flex w-full grow-0 flex-col gap-1">
                <div className="-mb-1 font-serif text-xl tracking-wide [font-variant:small-caps]">
                  Pooja & Yash
                </div>
                <div className="font-sans font-light tracking-wider uppercase">
                  June 21, 2026
                </div>
                <div className="font-sans font-light tracking-wider uppercase">
                  Naples, Florida
                </div>
              </SheetTitle>
              <Separator />
              <nav className="flex grow-1 flex-col gap-3">
                {[{ title: "Home", path: "/" }, ...ROUTES].map((route) => (
                  <Link
                    href={route.path}
                    title={route.title}
                    className={cn(
                      "hover:text-primary border-l-4 border-l-transparent px-4 py-2 text-lg font-medium transition-colors",
                      pathName === route.path &&
                        "text-primary bg-primary/5 border-l-primary",
                    )}
                    key={`nav-${route.title}`}
                    onClick={() => setSheetOpen(false)}
                  >
                    {route.title}
                  </Link>
                ))}
              </nav>
              <Separator />
              <Link
                className="group flex items-center justify-center gap-4"
                href={`mailto::${EMAIL_ADDRESS}`}
              >
                <div className="bg-primary/50 group-hover:bg-primary flex items-center justify-center rounded-full p-1 transition-colors">
                  <Mail className="text-background h-3 w-3" />
                </div>{" "}
                <p
                  className={cn(
                    "font-serif",
                    "text-primary text-xs tracking-widest decoration-1 underline-offset-4 group-hover:underline",
                  )}
                >
                  {EMAIL_ADDRESS}
                </p>{" "}
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
