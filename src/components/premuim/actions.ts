"use server";

import prisma from "@/lib/prisma";
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
if(ispremuim || hasTokens?.userPoints! > 0 || !hasTokens){
  return true
}

if(hasTokens?.userPoints! < 0){
  return false
}
}