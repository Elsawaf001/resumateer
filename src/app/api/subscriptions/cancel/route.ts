
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const { userId } =await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      include: { subscription: true }
    });

    if (!user?.subscription?.paypalSubscriptionId) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
    }

    // Cancel PayPal subscription
    const response = await fetch(
      `${process.env.PAYPAL_API_URL}/v1/billing/subscriptions/${user.subscription.paypalSubscriptionId}/cancel`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to cancel PayPal subscription');
    }

    // Update subscription in database
    await prisma.subscription.update({
      where: { id: user.subscription.id },
      data: {
        status: 'CANCELED',
        cancelAtPeriodEnd: true
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}