import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return null;
    }

     // Find the user's subscription
     const subscription = await prisma.userSubscription.findUnique({
        where: { userId },
      });
  
      if (!subscription) {
        return NextResponse.json({ message: "User subscription not found" }, { status: 404 });
      }
  
      // Update the user's appPoints
      const updatedSubscription = await prisma.userSubscription.update({
        where: { userId },
        data: { appPoints: subscription.appPoints + 10000 },
      });

redirect("/resumes")
      return NextResponse.json({ message: "Payment successful", updatedSubscription });




  }



    catch (error) {
        console.error("Error handling payment success:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
      }
}