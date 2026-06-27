import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Brand wordmark — Katie's "bykatiespencer" logo artwork (background keyed to
 * transparent). Two versions swap with the theme: espresso letters on light,
 * cream letters on dark.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="bykatiespencer, home"
      className={cn(
        "inline-flex items-center transition-opacity hover:opacity-80",
        className,
      )}
    >
      <Image
        src="/logo-light.png"
        alt="bykatiespencer"
        width={631}
        height={103}
        priority
        className="block h-5 w-auto md:h-[22px] dark:hidden"
      />
      <Image
        src="/logo-dark.png"
        alt="bykatiespencer"
        width={631}
        height={103}
        priority
        className="hidden h-5 w-auto md:h-[22px] dark:block"
      />
    </Link>
  );
}
