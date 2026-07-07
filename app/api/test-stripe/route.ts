import { NextResponse } from 'next/server';
import { getStripe } from '../../lib/stripe';

export async function GET() {
  try {
    // Test Stripe connection by retrieving account information
    const stripe = await getStripe();
    const account = await stripe.accounts.retrieve();
    
    return NextResponse.json({ 
      success: true,
      account: {
        id: account.id,
        country: account.country,
        default_currency: account.default_currency,
        charges_enabled: account.charges_enabled,
        payouts_enabled: account.payouts_enabled,
      }
    });
  } catch (error) {
    console.error('Stripe connection test failed:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to connect to Stripe',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
