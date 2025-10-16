import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
    }

    const { items, customerEmail, deliveryMethod, deliveryPrice } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    console.log('Creating checkout session for items:', items);
    console.log('Request origin:', request.nextUrl.origin);

    // Create line items for Stripe checkout
    const lineItems = items.map((item: { title: string; format: string; author: string; image: string; price: number; quantity: number }) => {
      // Convert relative image URLs to absolute URLs
      let imageUrl = item.image;
      if (!item.image.startsWith('http')) {
        imageUrl = `${request.nextUrl.origin}${item.image}`;
      }

      const productData: { name: string; description: string; images?: string[] } = {
        name: `${item.title} (${item.format})`,
        description: `By ${item.author}`,
      };

      // Only add images if we have a valid URL
      if (imageUrl && imageUrl !== 'undefined' && imageUrl !== 'null') {
        productData.images = [imageUrl];
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: productData,
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    // Add delivery fee as a line item if delivery method is selected
    if (deliveryMethod && deliveryPrice && deliveryPrice > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Delivery - ${deliveryMethod}`,
            description: 'Shipping and handling',
          },
          unit_amount: Math.round(deliveryPrice * 100), // Convert to cents
        },
        quantity: 1,
      });
    }

    console.log('Line items including delivery:', lineItems);

    // Create embedded checkout session
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionConfig: any = {
      ui_mode: 'embedded',
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      return_url: `${request.nextUrl.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
      metadata: {
        // Store only essential information to avoid metadata limit
        itemCount: items.length.toString(),
        totalAmount: (items.reduce((sum: number, item: { price: number; quantity: number }) => sum + (item.price * item.quantity), 0) * 100).toString(),
        // Store a summary instead of full cart data
        cartSummary: items.map((item: { title: string; format: string }) => `${item.title}(${item.format})`).join(', ').substring(0, 150),
        deliveryMethod: deliveryMethod || 'none',
        deliveryPrice: deliveryPrice ? (deliveryPrice * 100).toString() : '0',
      },
    };

    // Only add customer_email if it's provided and valid
    if (customerEmail && customerEmail.trim() !== '') {
      sessionConfig.customer_email = customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log('Checkout session created successfully:', session.id);
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to create checkout session';
    if (error instanceof Error) {
      if (error.message.includes('Invalid API Key')) {
        errorMessage = 'Invalid Stripe API key';
      } else if (error.message.includes('No such price')) {
        errorMessage = 'Invalid product pricing';
      } else if (error.message.includes('Metadata values can have up to 500 characters')) {
        errorMessage = 'Cart has too many items for metadata storage';
      } else if (error.message.includes('Not a valid URL')) {
        errorMessage = 'Invalid product image URL';
      } else if (error.message.includes('Invalid email address')) {
        errorMessage = 'Invalid customer email';
      } else {
        errorMessage = error.message;
      }
    }
    
    console.error('Detailed error:', {
      message: errorMessage,
      originalError: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
