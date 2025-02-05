"use server"

import prisma from "@/lib/prisma"

export const getSubscription = async (userId : string ) => {
try {

    const sub = await prisma.subscription.findUnique({
        where: { userId },
        select : {
          status: true,
          currentPeriodEnd: true,
          trialEnd: true,
          currentPeriodStart : true ,
          trialStart : true ,
          cancelAtPeriodEnd : true ,
    
        }
      });

      return sub;
} 
catch (error) {
    console.log(error)
    throw new Error("Failed to create lead")
    }
}
