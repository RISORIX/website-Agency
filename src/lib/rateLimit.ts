/**
 * Simple in-memory rate limiter.
 *
 * LIMITATION: this state lives in the Node.js process memory. It works
 * correctly for local dev and a single-instance deployment, but on a
 * multi-instance serverless deployment (e.g. Vercel under load), each
 * instance has its own memory — so this becomes "N requests per instance"
 * rather than a true global limit. Fine for a v1 lead form; if abuse
 * becomes a real problem, replace with Upstash Redis (same interface,
 * shared state).
 */

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const store = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 3; // max submissions per IP per window

export function checkRateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const entry = store.get(identifier);

  // No record, or the previous window has expired — start fresh.
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    store.set(identifier, { count: 1, windowStart: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}

/**
 * Periodically clear stale entries so the Map doesn't grow unbounded
 * over a long-running process. Not critical for low traffic, but cheap
 * insurance.
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now - entry.windowStart > WINDOW_MS) {
      store.delete(key);
    }
  }
}, WINDOW_MS).unref();