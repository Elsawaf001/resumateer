"use server";

import { env } from "@/env";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

export async function createCheckoutSession(priceId: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const stripeCustomerId = user.privateMetadata.stripeCustomerId as
    | string
    | undefined;

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing`,
    customer: stripeCustomerId,
    customer_email: stripeCustomerId
      ? undefined
      : user.emailAddresses[0].emailAddress,
    metadata: {
      userId: user.id,
    },
    subscription_data: {
      metadata: {
        userId: user.id,
      },
    },
    custom_text: {
      terms_of_service_acceptance: {
        message: `I have read Resumateer's [terms of service](${process.env.NEXT_PUBLIC_BASE_URL}/conditions) and agree to them.`,
      },
    },
    consent_collection: {
      terms_of_service: "required",
    },
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }

  return session.url;
}


export async function isPremium(userId : string) {
  const hasTokens = await prisma.userSubscription.findUnique({
    where: {
      userId,
    },
    select:{
      userPoints : true
    }
  })
  const ispremuim = await prisma.paddleCustomer.findUnique({
    where: {
      userId,
    },
  
  })
if(ispremuim || hasTokens?.userPoints! > 0){
  return true
}

if(hasTokens?.userPoints! < 0){
  return false
}
}