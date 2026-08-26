"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

/** Top bar — wordmark with the red mark, tracked uppercase wayfinding. */
export function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="border-b border-border bg-background">
      <nav
        aria-label="Primary"
        className="mx-auto flex flex-wrap items-center justify-between gap-5 px-6 py-5 sm:px-14"
      >
        <Link
          href="/"
          aria-label="Katie Spencer, home"
          className="font-serif text-[21px] tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          Katie Spencer<span className="text-brand">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden flex-wrap items-center gap-7 md:flex">
          {site.nav.map((item) => {
            const external = item.href.startsWith("http");
            const cls = cn(
              "font-sans text-xs font-medium uppercase tracking-[0.18em] transition-colors",
              item.label === "Connect"
                ? "text-brand hover:text-red-deep"
                : isActive(item.href)
                  ? "text-brand"
                  : "text-foreground hover:text-brand",
            );
            return external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
              >
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className={cls}>
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="mt-10 flex flex-col gap-1 px-2">
              {site.nav.map((item) => {
                const external = item.href.startsWith("http");
                const cls =
                  "rounded-sm px-3 py-3 font-serif text-2xl transition-colors text-foreground hover:text-brand";
                return external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cls}
                  >
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
      </nav>
    </header>
  );
}
