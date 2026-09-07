/**
 * The gate on the /season-planner exports.
 *
 * The planner itself is open to everyone: anyone can type in their season and
 * look at the collisions. Taking the calendar away with you is the part you buy.
 *
 * The credential is a Payhip license key, not an account. Payhip mints a unique
 * key per purchase and delivers it with the files, so there is nothing to sign
 * up for and nothing to remember. We verify the key server-side (the product
 * secret never reaches the browser), then set a signed cookie so the buyer
 * pastes it once and never sees the field again on that device.
 *
 * What this does and does not buy us: a key can still be handed to a friend.
 * What we get is a per-buyer credential we can cap and switch off, rather than
 * one shared password that can never be taken back.
 */

const VERIFY_URL = "https://payhip.com/api/v2/license/verify";
const USAGE_URL = "https://payhip.com/api/v2/license/usage";

export const UNLOCK_COOKIE = "sp_unlock";
/** A year. The cookie is the whole point: paste once, never again. */
export const UNLOCK_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * One or more Payhip product secret keys, comma separated.
 *
 * It is not documented whether a bundle sale issues license keys for the
 * products inside it, so this takes a list and tries each one. Put the bundle's
 * secret and the secret of whichever product actually carries the key in here
 * and the gate works either way.
 */
function productSecrets(): string[] {
  return (process.env.PAYHIP_PRODUCT_SECRET_KEYS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** 0 or unset means unlimited. */
function maxActivations(): number {
  const n = Number(process.env.SEASON_MAX_ACTIVATIONS ?? 6);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function gateConfigured(): boolean {
  return productSecrets().length > 0 && !!process.env.SEASON_UNLOCK_SECRET;
}

/* ---- Payhip ----------------------------------------------------------- */

export type LicenseResult =
  | { ok: true; buyerEmail: string; productName: string; uses: number }
  | { ok: false; reason: "unconfigured" | "unknown" | "disabled" | "exhausted" | "upstream" };

type PayhipLicense = {
  enabled?: unknown;
  buyer_email?: string;
  product_name?: string;
  uses?: number;
};

/**
 * Payhip's exact JSON is not something we get to assume. Treat only an explicit
 * affirmative as enabled, and treat a missing or unreadable flag as "this is not
 * a license record" rather than as a pass. The gate has to fail closed: an
 * unexpected 200 from upstream must never hand someone the downloads.
 */
function readEnabled(v: unknown): boolean | null {
  if (v === true || v === 1 || v === "true" || v === "1") return true;
  if (v === false || v === 0 || v === "false" || v === "0") return false;
  return null;
}

async function verifyAgainst(secret: string, licenseKey: string): Promise<PayhipLicense | null> {
  const url = `${VERIFY_URL}?license_key=${encodeURIComponent(licenseKey)}`;
  const res = await fetch(url, {
    headers: { "product-secret-key": secret },
    cache: "no-store",
  });
  if (!res.ok) return null; // wrong product, or no such key. Try the next secret.
  const json: unknown = await res.json().catch(() => null);
  if (!json || typeof json !== "object") return null;
  // Payhip has wrapped this in `data` at times. Accept either shape.
  const record = ("data" in json ? (json as { data: unknown }).data : json) as PayhipLicense;
  if (!record || typeof record !== "object") return null;
  // No readable enabled flag means this response is not a license record.
  if (readEnabled(record.enabled) === null) return null;
  return record;
}

/** Bump the key's usage counter. Best effort: a failure here must not block a buyer. */
async function countUse(secret: string, licenseKey: string): Promise<void> {
  try {
    await fetch(USAGE_URL, {
      method: "PUT",
      headers: { "product-secret-key": secret, "content-type": "application/json" },
      body: JSON.stringify({ license_key: licenseKey }),
      cache: "no-store",
    });
  } catch {
    /* ignore */
  }
}

export async function verifyLicense(licenseKey: string): Promise<LicenseResult> {
  const secrets = productSecrets();
  if (secrets.length === 0) return { ok: false, reason: "unconfigured" };

  for (const secret of secrets) {
    let record: PayhipLicense | null;
    try {
      record = await verifyAgainst(secret, licenseKey);
    } catch {
      return { ok: false, reason: "upstream" };
    }
    if (!record) continue;

    if (readEnabled(record.enabled) !== true) return { ok: false, reason: "disabled" };

    const uses = typeof record.uses === "number" ? record.uses : 0;
    const cap = maxActivations();
    if (cap > 0 && uses >= cap) return { ok: false, reason: "exhausted" };

    await countUse(secret, licenseKey);

    return {
      ok: true,
      buyerEmail: record.buyer_email ?? "",
      productName: record.product_name ?? "",
      uses: uses + 1,
    };
  }
  return { ok: false, reason: "unknown" };
}

/* ---- the signed cookie ------------------------------------------------ */

export type UnlockPayload = { email: string; exp: number };

function b64urlEncode(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlDecode(s: string): Uint8Array {
  const pad = s.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(pad + "=".repeat((4 - (pad.length % 4)) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

async function signingKey(): Promise<CryptoKey> {
  const secret = process.env.SEASON_UNLOCK_SECRET;
  if (!secret) throw new Error("SEASON_UNLOCK_SECRET is not set");
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function mintUnlockToken(payload: UnlockPayload): Promise<string> {
  const body = b64urlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign("HMAC", await signingKey(), new TextEncoder().encode(body));
  return `${body}.${b64urlEncode(new Uint8Array(sig))}`;
}

/** Returns the payload only if the signature checks out and it has not expired. */
export async function readUnlockToken(token: string | undefined): Promise<UnlockPayload | null> {
  if (!token) return null;
  const dot = token.indexOf(".");
  if (dot < 1) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  try {
    const valid = await crypto.subtle.verify(
      "HMAC",
      await signingKey(),
      b64urlDecode(sig) as unknown as ArrayBuffer,
      new TextEncoder().encode(body),
    );
    if (!valid) return null;
    const payload = JSON.parse(new TextDecoder().decode(b64urlDecode(body))) as UnlockPayload;
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
