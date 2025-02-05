// File: app/api/webhooks/clerk/route.ts

import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface ClerkUserCreatedEvent {
  type: "user.created";
  data: {
    id: string; // Clerk user ID
    email_addresses: { email_address: string }[];
    // add other fields if needed
  };
}

export async function POST(request: Request) {
  // 1. Get your signing secret from the environment
  const SIGNING_SECRET = "whsec_WGQbAGh6HiZiilgOuYi+2ycYWqTL0RuE";
  if (!SIGNING_SECRET) {
    throw new Error('Missing SIGNING_SECRET in environment variables');
  }

  // 2. Create a new Svix instance with the secret
  const wh = new Webhook(SIGNING_SECRET);

  // 3. Retrieve the necessary headers from the incoming request
  const headerPayload = await headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing Svix headers', { status: 400 });
  }

  // 4. Get the raw request body as text
  const body = await request.text();

  // 5. Verify the payload using Svix
  let evt: unknown;
  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });
  } catch (error) {
    console.error('Error verifying webhook:', error);
    return new Response('Webhook verification failed', { status: 400 });
  }
  // Assert the event is of type ClerkUserCreatedEvent (or adjust as needed)
  const event = evt as ClerkUserCreatedEvent;

  if (event.type === 'user.created') {
    const { id: clerkUserId, email_addresses } = event.data;
    if (!clerkUserId || !email_addresses || email_addresses.length === 0) {
      console.error('Invalid user data from Clerk webhook');
      return new Response('Invalid user data', { status: 400 });
    }

    const email = email_addresses[0].email_address; // choose the primary email

    try {
      // Create trial subscription
      const trialStart = new Date()
      const trialEnd = new Date(trialStart)
      trialEnd.setDate(trialEnd.getDate() + 14) // 14-day trial


      await prisma.user.create({
        data: {
          clerkUserId,
          email,
          subscription: {
            create: {
              userId : clerkUserId,
              status: 'TRIALING',
              trialStart,
              trialEnd,
              currentPeriodStart: trialStart,
              currentPeriodEnd: trialEnd ,

            }
          }
        },
      });

      console.log(`User created in DB: ${clerkUserId}`);
    } catch (dbError) {
      console.error('Error inserting user into database:', dbError);
      return new Response('Database error', { status: 500 });
    }
  }

  // 7. Return a successful response so that Clerk stops retrying
  return new Response('Webhook processed', { status: 200 });
}
