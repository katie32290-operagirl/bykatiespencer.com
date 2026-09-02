"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Fragment } from "react";
import { site } from "@/content/site";
import { REDESIGNED } from "@/components/redesign/routes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

/** Opening Night top bar — the wordmark lockup, tracked wayfinding, a program
 *  rule. On dark-ground hero pages the bar takes that page's ground + gilt so it
 *  sits seamlessly on the hero: green (About), burgundy (Notes), gold (Narratives). */
export function Navbar() {
  const pathname = usePathname();
  // redesigned routes carry their own nav; the old Opening Night bar is hidden
  if (REDESIGNED.has(pathname)) return null;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // velvet = cream text + gilt rule; the two velvet grounds differ only in color
  const velvetColor =
    pathname === "/about" || pathname === "/contact"
      ? "green"
      : pathname === "/writing"
        ? "burgundy"
        : pathname === "/portfolio"
          ? "black"
          : null;
  const velvet = velvetColor !== null;
  const velvetBg =
    velvetColor === "green"
      ? "bg-green"
      : velvetColor === "burgundy"
        ? "bg-burgundy"
        : "bg-ink";
  const velvetGround =
    velvetColor === "green"
      ? "var(--green)"
      : velvetColor === "burgundy"
        ? "var(--burgundy)"
        : "var(--ink)";
  const gold = pathname === "/narratives";
  // the homepage sits on paper: same gilt ornament rule as the velvet pages,
  // grounded in the hero's paper + grain so the ornament patch is seamless
  const home = pathname === "/";

  return (
    <header
      className={cn(
        "px-[clamp(20px,4.5vw,56px)]",
        velvet
          ? cn("text-on-black", velvetBg)
          : gold
            ? ""
            : "bg-transparent",
      )}
      style={
        velvet
          ? { backgroundImage: "var(--paper-grain-light)" }
          : gold
            ? { backgroundColor: "#E3A81C", backgroundImage: "var(--paper-grain)" }
            : undefined
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-x-7 gap-y-3 pb-3.5 pt-5">
        <Link href="/" aria-label="Katie Spencer, home" className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/on/wordmark-horizontal.webp"
            alt="Katie Spencer"
            className="block h-8 w-auto"
            style={
              velvet
                ? { filter: "brightness(0) invert(0.93) sepia(0.28) saturate(0.85)" }
                : undefined
            }
          />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden flex-wrap items-center gap-x-4 gap-y-2 font-sans text-xs font-bold uppercase tracking-[0.2em] md:flex"
        >
          {site.nav.map((item, i) => {
            const external = item.href.startsWith("http");
            const active = isActive(item.href);
            const cls = cn(
              "transition-colors",
              velvet
                ? active
                  ? "text-gold-bright"
                  : "text-on-black hover:text-gold-pale"
                : active
                  ? "text-brand"
                  : "text-foreground hover:text-brand",
            );
            return (
              <Fragment key={item.href}>
                {i > 0 && (
                  <span aria-hidden className="text-[8px] text-gold">
                    &#9670;
                  </span>
                )}
                {external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} className={cls}>
                    {item.label}
                  </Link>
                )}
              </Fragment>
            );
          })}
        </nav>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn("md:hidden", velvet && "text-on-black hover:text-gold-pale")}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs bg-paper-bright">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="mt-10 flex flex-col gap-1 px-2">
              {site.nav.map((item) => {
                const external = item.href.startsWith("http");
                const cls =
                  "rounded-sm px-3 py-3 font-serif text-3xl italic text-foreground transition-colors hover:text-brand";
                return external ? (
                  <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {item.label}
                  </a>
                ) : (
                  <SheetClose asChild key={item.href}>
                    <Link href={item.href} className={cls}>
                      {item.label}
                    </Link>
                  </SheetClose>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {velvet || home ? (
        <div className="relative">
          <div aria-hidden className="h-[3px] border-t-2 border-gold" />
          <div aria-hidden className="border-t border-gold/50" />
          <span
            aria-hidden
            className="absolute left-1/2 top-[-10px] -translate-x-1/2 px-3 text-[15px] leading-none text-gold"
            style={{
              backgroundColor: velvet ? velvetGround : "var(--paper)",
              backgroundImage: velvet
                ? "var(--paper-grain-light)"
                : "var(--paper-grain)",
            }}
          >
            &#10022;
          </span>
        </div>
      ) : (
        <>
          <div aria-hidden className="h-[3px] border-t-2 border-ink" />
          <div aria-hidden className="border-t border-ink" />
        </>
      )}
    </header>
  );
}
