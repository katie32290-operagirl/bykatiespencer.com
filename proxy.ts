import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Password-protects ONLY the isolated Opera Saratoga concept site under
// /operasaratoga. Everything else on bykatiespencer.com is untouched.
// The password can be overridden in Vercel with the SARATOGA_PREVIEW_PASS
// environment variable; otherwise it falls back to the default below.
const PASSWORD = process.env.SARATOGA_PREVIEW_PASS || "saratoga2027";

export function proxy(request: NextRequest) {
  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    try {
      const decoded = atob(auth.slice(6));
      // Accept any username; only the password must match.
      const password = decoded.slice(decoded.indexOf(":") + 1);
      if (password === PASSWORD) return NextResponse.next();
    } catch {
      // fall through to the 401 below
    }
  }
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Opera Saratoga preview", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/operasaratoga", "/operasaratoga/:path*"],
};
