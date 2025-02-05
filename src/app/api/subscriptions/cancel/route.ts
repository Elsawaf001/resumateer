
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import axios from 'axios';
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




    const auth = Buffer.from(
      'AQKqyf_VJgQXCoedvKVGMf_4dwgjMJfDSQs2zfIEVI2atJ6wYXpilQJPGxY6mTBaCUz0zVJw9oPhHSPS:EC0u3jBh7XwWgHhC-quLFd7oQH4wNVshwLk_IxxNQzsxZgg9aGUrIFwR5CJNCkkWF1VEsWRLg0fSl46_'
    ).toString('base64');
  
    const response = await axios.post(
      `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${user.subscription.paypalSubscriptionId}/cancel`,
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );


    if (response.status !== 204) {
      throw new Error('Failed to cancel subscription');
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