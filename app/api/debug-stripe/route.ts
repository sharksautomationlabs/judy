import { NextResponse } from 'next/server';

export async function GET() {
  const debugInfo = {
    hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
    hasPublishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    secretKeyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 7) + '...',
    publishableKeyPrefix: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.substring(0, 7) + '...',
    nodeEnv: process.env.NODE_ENV,
  };

  return NextResponse.json(debugInfo);
}
