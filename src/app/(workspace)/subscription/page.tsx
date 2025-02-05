'use client';
import PaypalButton from '@/components/premuim/paypal/PaypalPayButton2';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'



// async function Page() {
//   const {userId} = await auth();
//   if(!userId){
//     redirect("/sign-in")
//   }
//   return (
//     <div className="max-w-md mx-auto p-6 w-full min-h-screen">
//       <h1 className="text-2xl font-bold mb-4 text-lime-400">Subscribe to Pro Plan</h1>
//       <div className="rounded-lg border p-6">
//         <div className="mb-6">
//           <h2 className="text-3xl font-bold">$10/month</h2>
//           <p className="text-gray-500">14-day free trial</p>
//         </div>
// <PaypalButton/>
//       </div>
//     </div>
//   )
// }

// export default Page



// app/subscription/page.tsx


import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';


interface Subscription {
  id: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  trialStart?: string | null;
  trialEnd?: string | null;
  cancelAtPeriodEnd: boolean;
}

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchSubscription() {
      try {
        const res = await fetch('/api/subscriptions/subscription');
        if (!res.ok) {
          throw new Error('Failed to fetch subscription');
        }
        const data = await res.json();
        setSubscription(data.subscription);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSubscription();
  }, []);

  if (loading) {
    return <div className="container mx-auto py-8 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-xl font-semibold">No Subscription Found</h2>
        <p>You do not have an active subscription at this time.</p>
        <div className="max-w-md mx-auto p-6 w-full min-h-screen">
          <h1 className="text-2xl font-bold mb-4 text-lime-400">Subscribe to Pro Plan</h1>
          <div className="rounded-lg border p-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold">$10/month</h2>
              <p className="text-gray-500">14-day free trial</p>
            </div>
            <PaypalButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-md mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Your Subscription Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>Status:</strong> {subscription.status}
          </div>
          <div>
            <strong>Current Period Start:</strong>{' '}
            {new Date(subscription.currentPeriodStart).toLocaleDateString()}
          </div>
          <div>
            <strong>Current Period End:</strong>{' '}
            {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
          </div>
          {subscription.trialStart && (
            <div>
              <strong>Trial Start:</strong>{' '}
              {new Date(subscription.trialStart).toLocaleDateString()}
            </div>
          )}
          {subscription.trialEnd && (
            <div>
              <strong>Trial End:</strong>{' '}
              {new Date(subscription.trialEnd).toLocaleDateString()}
            </div>
          )}
          <div>
            <strong>Cancel at Period End:</strong>{' '}
            {subscription.cancelAtPeriodEnd ? 'Yes' : 'No'}
          </div>
          <div className="pt-4">
            <Button variant="outline">Manage Subscription</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

