import Stripe from 'stripe';

// Lazy-initialized Stripe client. Instantiating Stripe at module scope crashes
// `next build` when STRIPE_SECRET_KEY is missing, so routes must call this
// inside their handlers instead.
let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      'STRIPE_SECRET_KEY is not configured. Add it to .env.local (local dev) or Vercel Project Settings → Environment Variables (production).'
    );
  }
  if (!stripeClient) {
    stripeClient = new Stripe(key, {
      apiVersion: '2025-09-30.clover',
    });
  }
  return stripeClient;
}
