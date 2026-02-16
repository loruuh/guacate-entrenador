import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia' as Stripe.LatestApiVersion,
});

// Use service role for DB updates (bypasses RLS)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode === 'subscription') {
          const userId = session.client_reference_id;
          const customerId = session.customer as string;
          const subscriptionId = session.subscription as string;

          if (!userId) {
            console.error('No client_reference_id in session');
            break;
          }

          // Get subscription details for accurate period end
          const sub = await stripe.subscriptions.retrieve(subscriptionId);
          const periodEnd = sub.items.data[0]?.current_period_end;
          const expiresAt = periodEnd
            ? new Date(periodEnd * 1000).toISOString()
            : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

          const { error } = await supabase
            .from('subscriptions')
            .upsert({
              user_id: userId,
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              status: 'active',
              expires_at: expiresAt,
              updated_at: new Date().toISOString(),
            }, { onConflict: 'user_id' });

          if (error) {
            console.error('DB error on checkout.session.completed:', error);
          } else {
            console.log('Subscription activated for user:', userId);
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const newStatus = subscription.status === 'active' ? 'active' : 'inactive';
        const periodEnd = subscription.items.data[0]?.current_period_end;
        const expiresAt = periodEnd
          ? new Date(periodEnd * 1000).toISOString()
          : new Date().toISOString();

        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: newStatus,
            expires_at: expiresAt,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId);

        if (error) {
          console.error('DB error on subscription.updated:', error);
        } else {
          console.log('Subscription updated:', customerId, newStatus);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: 'inactive',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId);

        if (error) {
          console.error('DB error on subscription.deleted:', error);
        } else {
          console.log('Subscription cancelled:', customerId);
        }
        break;
      }

      default:
        // Unhandled event type - ignore silently
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Webhook handler error:', message);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
