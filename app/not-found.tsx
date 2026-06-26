import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="text-eyebrow">404</p>
      <h1 className="text-display-sm mt-5 max-w-lg font-medium">
        This page is off-script.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you&rsquo;re looking for doesn&rsquo;t exist, but the story
        continues elsewhere.
      </p>
      <Button asChild size="lg" className="mt-8 rounded-full">
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  );
}
