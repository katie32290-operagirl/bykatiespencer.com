/**
 * Routes that have been rebuilt in the warm redesign and carry their own
 * nav/footer. The old Opening Night global chrome is suppressed on these.
 */
const EXACT = new Set<string>([
  "/",
  "/about",
  "/portfolio",
  "/narratives",
  "/writing",
  "/contact",
  "/knoxville-opera",
]);

export function isRedesigned(pathname: string): boolean {
  return EXACT.has(pathname) || pathname.startsWith("/writing/");
}
