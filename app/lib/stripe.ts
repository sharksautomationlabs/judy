import type Stripe from 'stripe';

// Lazy-initialized Stripe client. The 'stripe' package is dynamically imported
// at request time only, so `next build` never touches it — the build can never
// fail with "Neither apiKey nor config.authenticator provided" even when
// STRIPE_SECRET_KEY is not configured.
let stripeClient: Stripe | null = null;

export async function getStripe(): Promise<Stripe> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      'STRIPE_SECRET_KEY is not configured. Add it to .env.local (local dev) or Vercel Project Settings → Environment Variables (production).'
    );
  }
  if (!stripeClient) {
    const { default: StripeCtor } = await import('stripe');
    stripeClient = new StripeCtor(key, {
      apiVersion: '2025-09-30.clover',
    });
  }
  return stripeClient;
}
