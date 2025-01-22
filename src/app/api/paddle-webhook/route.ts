import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Environment, EventName, SubscriptionCreatedEvent, SubscriptionUpdatedEvent } from "@paddle/paddle-node-sdk";
import { Paddle } from "@paddle/paddle-node-sdk";
import { NextRequest, NextResponse } from "next/server";

const paddle = new Paddle("fec94087a2c6f8bf35aefaee14e9bbd9fc0cd46361aded0cca", {
  environment: Environment.sandbox,
});



export async function POST(req: NextRequest) {


  const signature = (req.headers.get("paddle-signature") as string) || "";
  // req.body should be of type `buffer`, convert to string before passing it to `unmarshal`.
  // If express returned a JSON, remove any other middleware that might have processed raw request to object
  const rawRequestBody = (await req.text()) || "";
  // Replace `WEBHOOK_SECRET_KEY` with the secret key in notifications from vendor dashboard
  const secretKey = "pdl_ntfset_01jj2bwe5mty43vgv47w8z237j_EBNtCSrC7nkKiH7p7hAJ1MSxftmChSLx";


  try {

    if (signature && rawRequestBody) {
      const eventData = await paddle.webhooks.unmarshal(
        rawRequestBody,
        secretKey,
        signature
      );





      switch (eventData.eventType) {
        case EventName.SubscriptionCreated:
          {
            const customerId = eventData.data.customerId;
            const subscriptionStatus = eventData.data.status;
            const productId = eventData.data.items[0].price?.productId ?? "";
            const paddlePriceId = eventData.data.items[0].price?.id ?? "";
            const paddleSubscriptionId = eventData.data.id;
            
            
  
           



          }
            // handle subscription created event
            break;
        case EventName.TransactionBilled:
            // handle subscription updated event
            break;
        case EventName.SubscriptionCanceled:
            // handle subscription cancelled event
            break;
        case EventName.SubscriptionUpdated:
            // handle transaction succeeded event
            break;
        default:
            break;
    }



    }



  }

  catch (e) {
    console.log(e);
  }

  return NextResponse.json(
    {
      message: "done",
    },
    {
      status: 200,
    }
  );


}



























