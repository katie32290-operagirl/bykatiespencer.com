/**
 * POST   /api/season/unlock  — trade a Payhip license key for the unlock cookie
 * GET    /api/season/unlock  — is this browser unlocked?
 * DELETE /api/season/unlock  — forget the key on this device
 *
 * The product secret never leaves the server, so a buyer's key is checked
 * against Payhip here and nowhere else.
 */

import { cookies } from "next/headers";
import {
  UNLOCK_COOKIE,
  UNLOCK_MAX_AGE,
  gateConfigured,
  mintUnlockToken,
  readUnlockToken,
  verifyLicense,
} from "@/lib/season-gate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REFUSALS: Record<string, { status: number; message: string }> = {
  unknown: { status: 404, message: "We could not find that key. Check for a stray space, and make sure you are using the key from your purchase email." },
  disabled: { status: 403, message: "That key is no longer active. If your purchase was refunded this is expected. Otherwise email hello@bykatiespencer.com and we will sort it out." },
  exhausted: { status: 429, message: "That key has been unlocked on the maximum number of devices. Email hello@bykatiespencer.com and we will reset it." },
  unconfigured: { status: 503, message: "Downloads are not switched on yet. Try again shortly." },
  upstream: { status: 502, message: "We could not reach Payhip to check that key. Try again in a moment." },
};

export async function GET() {
  const jar = await cookies();
  const payload = await readUnlockToken(jar.get(UNLOCK_COOKIE)?.value).catch(() => null);
  return Response.json({ unlocked: !!payload, configured: gateConfigured() });
}

export async function POST(request: Request) {
  if (!gateConfigured()) {
    return Response.json({ ok: false, message: REFUSALS.unconfigured.message }, { status: 503 });
  }

  let licenseKey = "";
  try {
    const body = (await request.json()) as { licenseKey?: unknown };
    if (typeof body.licenseKey === "string") licenseKey = body.licenseKey.trim();
  } catch {
    /* falls through to the empty-key check */
  }

  if (!licenseKey || licenseKey.length > 100) {
    return Response.json({ ok: false, message: "Paste the license key from your purchase email." }, { status: 400 });
  }

  const result = await verifyLicense(licenseKey);
  if (!result.ok) {
    const refusal = REFUSALS[result.reason] ?? REFUSALS.upstream;
    return Response.json({ ok: false, message: refusal.message }, { status: refusal.status });
  }

  const token = await mintUnlockToken({
    email: result.buyerEmail,
    exp: Date.now() + UNLOCK_MAX_AGE * 1000,
  });

  const jar = await cookies();
  jar.set(UNLOCK_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: UNLOCK_MAX_AGE,
  });

  return Response.json({ ok: true });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(UNLOCK_COOKIE);
  return Response.json({ ok: true });
}
