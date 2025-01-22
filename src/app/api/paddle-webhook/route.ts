// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";
// import { Environment, EventName, SubscriptionCreatedEvent, SubscriptionUpdatedEvent } from "@paddle/paddle-node-sdk";
// import { Paddle } from "@paddle/paddle-node-sdk";
// import { NextRequest, NextResponse } from "next/server";

// const paddle = new Paddle("fec94087a2c6f8bf35aefaee14e9bbd9fc0cd46361aded0cca", {
//   environment: Environment.sandbox,
// });

// export async function POST(req: NextRequest) {
//   const signature = (req.headers.get("paddle-signature") as string) || "";
//   // req.body should be of type `buffer`, convert to string before passing it to `unmarshal`.
//   // If express returned a JSON, remove any other middleware that might have processed raw request to object
//   const rawRequestBody = (await req.text()) || "";
//   // Replace `WEBHOOK_SECRET_KEY` with the secret key in notifications from vendor dashboard
//   const secretKey = "pdl_ntfset_01jj2bwe5mty43vgv47w8z237j_EBNtCSrC7nkKiH7p7hAJ1MSxftmChSLx";

//   try {
//     if (signature && rawRequestBody) {
//       // The `unmarshal` function will validate the integrity of the webhook and return an entity
//       const eventData = await paddle.webhooks.unmarshal(
//         rawRequestBody,
//         secretKey,
//         signature
//       );

//       // database operation, and provision the user with stuff purchased
//       switch (eventData.eventType) {
//         case EventName.SubscriptionActivated:
//           {
//             const customerId = eventData.data.customerId;
//             const subscriptionStatus = eventData.data.status;
//             const productId = eventData.data.items[0].price?.productId ?? "";
//             const paddlePriceId = eventData.data.items[0].price?.id ?? "";
//             const paddleSubscriptionId = eventData.data.id ;
//             const paddleCurrentPeriodEnd = eventData.data.items[0].nextBilledAt ? new Date(eventData.data.items[0].nextBilledAt) : new Date;
//             const paddleCancelAtPeriodEnd = eventData.data.canceledAt ? true : false ;
 

          
//             break;
//           }
        
//         case EventName.SubscriptionCanceled:
//           {
//             const customerId = eventData.data.customerId;
//             const subscriptionStatus = eventData.data.status;
//             const productId = eventData.data.items[0].price?.productId ?? "";
//             const paddlePriceId = eventData.data.items[0].price?.id ?? "";
//             const paddleSubscriptionId = eventData.data.id ;
//             const paddleCurrentPeriodEnd = eventData.data.items[0].nextBilledAt ? new Date(eventData.data.items[0].nextBilledAt) : new Date;
//             const paddleCancelAtPeriodEnd = eventData.data.canceledAt ? true : false ;

          
//             console.log(`Subscription ${eventData.data.id} was canceled`);
//             break;
//           }
          
//         case EventName.TransactionPaid:
//           {
//             const customerId = eventData.data.customerId!;
//             const subscriptionStatus = eventData.data.status;
//             const productId = eventData.data.items[0].price?.productId ?? "";
//             const paddlePriceId = eventData.data.items[0].price?.id ?? "";
//             const paddleSubscriptionId = eventData.data.id ;
//             const currentPeriodEnd = eventData.data.billingPeriod?.endsAt ? new Date(eventData.data.billingPeriod?.endsAt) : undefined;
//             const cutomerEmail = await currentUser();
           
// const customerExists = await prisma.paddleCustomer.findUnique({
//   where: {
//     id : customerId,
//   },
// });

// if (!customerExists) {
//   await prisma.paddleCustomer.create({
//     data: {
//       email: cutomerEmail?.emailAddresses[0].emailAddress ?? "",
//       paddleSubscriptionId ,
//       paddlePriceId ,
//       paddleCurrentPeriodEnd : currentPeriodEnd,
//     },
//   }),
// console.log("Customer created");
// } else {
//   await prisma.paddleCustomer.update({
//     where: {
//       id : customerId,
//     },
//     data: {
//       paddleSubscriptionId ,
//       paddlePriceId ,
//       paddleCurrentPeriodEnd : currentPeriodEnd,
//     },
//   }),
//   console.log("Customer already exists");
// }




//             console.log(`Transaction ${eventData.data.id} was paid`);
//             break;
//           }
          
//         default:
//           console.log(eventData.eventType);
//       }
//     } else {
//       console.log("Signature missing in header");
//     }
//   } catch (e) {
//     // Handle signature mismatch or other runtime errors
//     console.log(e);
//   }

//   // Return a response to acknowledge
//   return NextResponse.json({ ok: true });
// }


import { validateSignature } from '@/components/premuim/paddle/validate';
import { Environment, Paddle } from '@paddle/paddle-node-sdk';
import { NextRequest, NextResponse } from 'next/server';



export async function POST(request: NextRequest) {
  const signature = request.headers.get("Paddle-Signature")!;
  const rawRequestBody = await request.text();
  const privateKey = 'pdl_ntfset_01jj2bwe5mty43vgv47w8z237j_EBNtCSrC7nkKiH7p7hAJ1MSxftmChSLx';
  const isValid = await validateSignature(signature, rawRequestBody, 'pdl_ntfset_01jj2bwe5mty43vgv47w8z237j_EBNtCSrC7nkKiH7p7hAJ1MSxftmChSLx');

 
  if (!isValid)
    return NextResponse.json(
        {
        message: "Invalid webhook signature!",
        },
        {
        status: 401,
        }
    );
    const parsedBody = JSON.parse(rawRequestBody);

    switch (parsedBody.event_type) {
        case "subscription.created":
            // handle subscription created event
            break;
        case "subscription.updated":
            // handle subscription updated event
            break;
        case "subscription.cancelled":
            // handle subscription cancelled event
            break;
        case "transaction.completed":
            // handle transaction succeeded event
            break;
        default:
            break;
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