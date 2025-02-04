// src/app/api/webhooks/paypal/route.ts

import { verifyPayPalWebhook } from '@/components/premuim/paypal/verify-webhook'
import prisma from '@/lib/prisma'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'


export async function POST(req: Request) {
    try {
      const body = await req.json()
      const headersList = headers()
      const webhookId = (await headersList).get('paypal-webhook-id')

const paypalWebhookId = "8J629894TT447703G";
const paypalClientId = "AYASVYCxqJX8F-QNcphf3DzNUHIcZRaOalHDhCVcAfrMPqBG-4L_idvcvTc0PtRpmV8cUq6FX6OVWued";
const paypalSecret = "EPDzanMIpDMid6eQlGQx0G-YEVUrXwMj1_HyAboZ0D_boYViaQFMnipHs6yn8nkHjdwz0ysOq6ZfggpP";


  // Verify the webhook signature
  const isValid = await verifyPayPalWebhook(body, await headersList);
    
  if (!isValid) {
    console.error('Invalid webhook signature');
    return NextResponse.json(
      { error: 'Invalid webhook signature' },
      { status: 401 }
    );
  }


const existingEvent = await prisma.webhookEvent.findUnique({
    where: { id: body.id }
  });
  
  if (existingEvent) {
    return NextResponse.json({ success: true }); // Already processed
  }
  // Process the webhook...

await prisma.webhookEvent.create({
    data: {
      id: body.id,
      eventType: body.event_type,
      success: true,
      payload: body
    }
  });

      // Verify webhook signature (implement PayPal verification)
      // This is a simplified version - you should add proper verification
      
      switch (body.event_type) {
        case 'BILLING.SUBSCRIPTION.ACTIVATED':
          await prisma.subscription.update({
            where: { paypalSubscriptionId: body.resource.id },
            data: {
              status: 'ACTIVE',
              currentPeriodStart: new Date(body.resource.start_time),
              currentPeriodEnd: new Date(body.resource.billing_info.next_billing_time)
            }
          })
          break
          
        case 'BILLING.SUBSCRIPTION.CANCELLED':
          await prisma.subscription.update({
            where: { paypalSubscriptionId: body.resource.id },
            data: {
              status: 'CANCELED',
              cancelAtPeriodEnd: true
            }
          })
          break
          
        case 'BILLING.SUBSCRIPTION.PAYMENT.FAILED':
          await prisma.subscription.update({
            where: { paypalSubscriptionId: body.resource.id },
            data: {
              status: 'PAST_DUE'
            }
          })
          break
      }
      
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Webhook error:', error)
      return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 })
    }
  }







;