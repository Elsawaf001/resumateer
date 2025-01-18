// import { env } from "@/env";
// import { cache } from "react";
// import prisma from "./prisma";

// export type SubscriptionLevel = "free" | "pro-monthly" | "pro-yearly";

// export const getUserSubscriptionLevel = cache(
//   async (userId: string): Promise<SubscriptionLevel> => {

 

//   const subscription = await prisma.stripeSubscription.findUnique({
//       where: {
//         userId,
//       },
//     });

//   const freeSubscription = await prisma.userSubscription.findUnique({
//     where: { userId },
//   });

//   const fourteenDaysAgo = new Date();
//   fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);


//   if (!freeSubscription ||freeSubscription.createdAt < fourteenDaysAgo) {
//     return 'free';


//     if (
//       subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY
//     ) {
//       return "pro-monthly";
//     }

//     if (
//       subscription.stripePriceId ===
//       env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_YEARLY
//     ) {
//       return "pro-yearly";
//     }

//     throw new Error("Invalid subscription");
//   },
// );


import { env } from "@/env";
import { cache } from "react";
import prisma from "./prisma";

export type SubscriptionLevel = "free" | "pro-monthly" | "pro-yearly";

export const getUserSubscriptionLevel = cache(
  async (userId: string): Promise<SubscriptionLevel> => {
    const subscription = await prisma.stripeSubscription.findUnique({
      where: {
        userId,
      },
    });

    if (!subscription || subscription.stripeCurrentPeriodEnd < new Date()) {
      return "free";
    }

    if (
      subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY
    ) {
      return "pro-monthly";
    }

    if (
      subscription.stripePriceId ===
      env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_YEARLY
    ) {
      return "pro-yearly";
    }

    throw new Error("Invalid subscription");
  },
);