
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  try {
    // IMPORTANT: Read the raw body for PayPal signature verification.
    const rawBody = await req.text();

    // Get required headers from the request.
    const headersList = req.headers;
    const transmissionId = headersList.get('paypal-transmission-id');
    const transmissionTime = headersList.get('paypal-transmission-time');
    const certUrl = headersList.get('paypal-cert-url');
    const authAlgo = headersList.get('paypal-auth-algo');
    const transmissionSig = headersList.get('paypal-transmission-sig');

    if (
      !transmissionId ||
      !transmissionTime ||
      !certUrl ||
      !authAlgo ||
      !transmissionSig
    ) {
      console.error('Missing required PayPal headers for webhook verification');
      return NextResponse.json(
        { error: 'Missing PayPal headers' },
        { status: 400 }
      );
    }

    // Parse the JSON payload for further processing.
    const payload = JSON.parse(rawBody);

    // Retrieve your configuration from environment variables.
    const webhookId = "8J629894TT447703G";
const paypalClientId = "AQKqyf_VJgQXCoedvKVGMf_4dwgjMJfDSQs2zfIEVI2atJ6wYXpilQJPGxY6mTBaCUz0zVJw9oPhHSPS";
const paypalSecret = "EC0u3jBh7XwWgHhC-quLFd7oQH4wNVshwLk_IxxNQzsxZgg9aGUrIFwR5CJNCkkWF1VEsWRLg0fSl46_";


    if (!webhookId) {
      console.error('Missing PayPal webhook ID configuration');
      return NextResponse.json(
        { error: 'Webhook configuration error' },
        { status: 500 }
      );
    }

    if (!paypalClientId || !paypalSecret) {
      console.error('Missing PayPal client credentials');
      return NextResponse.json(
        { error: 'Missing PayPal client credentials' },
        { status: 500 }
      );
    }

    // Verify the webhook signature.
    const isValid = await verifyPayPalWebhook({
      transmissionId,
      transmissionTime,
      certUrl,
      authAlgo,
      transmissionSig,
      webhookId,
      rawBody,
      paypalClientId,
      paypalSecret,
    });

    if (!isValid) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    // Check if this event has already been processed.
    const existingEvent = await prisma.webhookEvent.findUnique({
      where: { id: payload.id },
    });

    if (existingEvent) {
      return NextResponse.json({ success: true });
    }

    // Store the event in your database.
    await prisma.webhookEvent.create({
      data: {
        id: payload.id,
        eventType: payload.event_type,
        success: true,
        payload: payload,
      },
    });

    // Process the webhook event based on its type.
    switch (payload.event_type) {
      case 'BILLING.SUBSCRIPTION.ACTIVATED':
        await prisma.subscription.update({
          where: { paypalSubscriptionId: payload.resource.id },
          data: {
            status: 'ACTIVE',
            currentPeriodStart: new Date(payload.resource.start_time),
            currentPeriodEnd: new Date(payload.resource.billing_info.next_billing_time),
          },
        });
        break;

      case 'BILLING.SUBSCRIPTION.CANCELLED':
        await prisma.subscription.update({
          where: { paypalSubscriptionId: payload.resource.id },
          data: {
            status: 'CANCELED',
            cancelAtPeriodEnd: true,
          },
        });
        break;

      case 'BILLING.SUBSCRIPTION.PAYMENT.FAILED':
        await prisma.subscription.update({
          where: { paypalSubscriptionId: payload.resource.id },
          data: {
            status: 'PAST_DUE',
          },
        });
        break;

      default:
        console.log('Unhandled event type:', payload.event_type);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}

/**
 * Verifies the PayPal webhook signature by:
 *   1. Obtaining an access token from PayPal.
 *   2. Calling PayPal's verify-webhook-signature API.
 */
interface VerifyPayload {
  transmissionId: string;
  transmissionTime: string;
  certUrl: string;
  authAlgo: string;
  transmissionSig: string;
  webhookId: string;
  rawBody: string;
  paypalClientId: string;
  paypalSecret: string;
}

async function verifyPayPalWebhook({
  transmissionId,
  transmissionTime,
  certUrl,
  authAlgo,
  transmissionSig,
  webhookId,
  rawBody,
  paypalClientId,
  paypalSecret,
}: VerifyPayload): Promise<boolean> {
  // Obtain an access token from PayPal.
  const authResponse = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // Using Node's Buffer to create a Basic auth string.
      Authorization:
        'Basic ' + Buffer.from(`${paypalClientId}:${paypalSecret}`).toString('base64'),
    },
    body: 'grant_type=client_credentials',
  });

  if (!authResponse.ok) {
    console.error('Failed to obtain PayPal access token');
    return false;
  }

  const authData = await authResponse.json();
  const accessToken = authData.access_token;
  if (!accessToken) {
    console.error('No access token received from PayPal');
    return false;
  }

  // Call PayPal's verify-webhook-signature API.
  const verifyResponse = await fetch(
    'https://api-m.paypal.com/v1/notifications/verify-webhook-signature',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        auth_algo: authAlgo,
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: transmissionTime,
        webhook_id: webhookId,
        // Use the parsed JSON payload for verification.
        webhook_event: JSON.parse(rawBody),
      }),
    }
  );

  if (!verifyResponse.ok) {
    console.error('PayPal webhook verification request failed');
    return false;
  }

  const verifyData = await verifyResponse.json();
  // PayPal returns { verification_status: 'SUCCESS' } (or 'VERIFIED' in some cases)
  return (
    verifyData.verification_status === 'SUCCESS' ||
    verifyData.verification_status === 'VERIFIED'
  );
}
