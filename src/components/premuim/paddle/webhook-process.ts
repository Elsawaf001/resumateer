import prisma from '@/lib/prisma';
import {
    CustomerCreatedEvent,
    CustomerUpdatedEvent,
    EventEntity,
    EventName,
    SubscriptionCreatedEvent,
    SubscriptionUpdatedEvent,
} from '@paddle/paddle-node-sdk';


export async function handleCustomerData(eventData: CustomerCreatedEvent | CustomerUpdatedEvent) {
    const customerId = eventData.data.id;
    const customerEmail = eventData.data.email;
    const name = eventData.data.name;

    // Create or update the customer in your database
    await prisma.paddleCustomer.upsert({
        where: { id: customerId },
        update: {
            email: customerEmail,
            name,
        },
        create: {
            id: customerId,
            email: customerEmail,
            name,
        },
    });


}

export async function handleSubscriptionData(eventData: SubscriptionCreatedEvent | SubscriptionUpdatedEvent) {
    const customerId = eventData.data.customerId;
    const subscriptionStatus = eventData.data.status;
    const productId = eventData.data.items[0].price?.productId ?? "";
    const paddlePriceId = eventData.data.items[0].price?.id ?? "";
    const paddleSubscriptionId = eventData.data.id ;
    const paddleCurrentPeriodEnd = eventData.data.items[0].nextBilledAt ? new Date(eventData.data.items[0].nextBilledAt) : new Date;
    const paddleCancelAtPeriodEnd = eventData.data.canceledAt ? true : false ;
  


}






