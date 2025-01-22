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


import { Environment, Paddle } from '@paddle/paddle-node-sdk';
import { NextRequest } from 'next/server';


const paddle = new Paddle("fec94087a2c6f8bf35aefaee14e9bbd9fc0cd46361aded0cca", {
  environment: Environment.sandbox,
});
export async function POST(request: NextRequest) {
  const signature = request.headers.get('paddle-signature') || '';
  const rawRequestBody = await request.text();
  const privateKey = process.env['PADDLE_NOTIFICATION_WEBHOOK_SECRET'] || '';

  let status, eventName;
  try {
    if (signature && rawRequestBody) {
      const paddle = new Paddle("fec94087a2c6f8bf35aefaee14e9bbd9fc0cd46361aded0cca", {
        environment: Environment.sandbox,
      });
      const eventData = paddle.webhooks.unmarshal(rawRequestBody, privateKey, signature);
      status = 200;
      eventName = (await eventData)?.eventType ?? 'Unknown event';
      if (eventData) {
        console.log((await eventData).eventType);
      }
    } else {
      status = 400;
      console.log('Missing signature from header');
    }
  } catch (e) {
    // Handle error
    status = 500;
    console.log(e);
  }
  return Response.json({ status, eventName });
}