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
        "decoration-primary flex w-full justify-center gap-12 font-serif font-light tracking-wider uppercase decoration-2 underline-offset-8 sm:text-lg md:text-xl",
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

  return (
    <div className="relative z-1 w-full bg-black py-8 text-white">
      <div className="container flex flex-col gap-6">
        <Link href="/" title="Pooja & Yash" className="group relative">
          <h1 className="group-hover:text-primary relative z-10 flex items-center justify-center gap-6 text-4xl transition-[scale,color] [font-variant:small-caps] group-hover:scale-105 sm:text-5xl md:text-6xl">
            <span>Pooja</span>
            <span className="font-script scale-90 [font-variant:none]">
              and
            </span>
            <span>Yash</span>
          </h1>
          <div className="absolute top-1/2 left-1/2 z-0 -translate-[50%]">
            <Logo className="group-hover:fill-primary/40 w-[80px] fill-white/20 transition-[scale,color] group-hover:scale-105 md:w-[120px]" />
          </div>
        </Link>
        <Nav pathName={pathName} className="hidden sm:flex" />
      </div>
    </div>
  );
};

export default Navbar;
