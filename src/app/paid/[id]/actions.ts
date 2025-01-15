"use server"
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function addPaidPoints(points : number | undefined) {
    const { userId } = await auth();
  
    if (!userId) {
      throw new Error("Unauthorized");
    }
    if (points === undefined) {
      throw new Error("Points not provided");
    }
  
    const existingSubscription = await prisma.userSubscription.findUnique({
      where: { userId },
    });
  
      if (!existingSubscription) {
          throw new Error("Subscription not found");
      }
  
      let updatedSubscription;
  
      if (existingSubscription) {
        // Update the existing record
        updatedSubscription = await prisma.userSubscription.update({
          where: { userId },
          data: {
            appPoints: { increment: points },
  
          },
        });
  }
  return "10000 Points Added"
  
  }