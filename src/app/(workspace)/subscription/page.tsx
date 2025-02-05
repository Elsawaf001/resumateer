import PaypalButton from '@/components/premuim/paypal/PaypalPayButton2';
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





export default async function SubscriptionPage() {
  // Get the currently authenticated user
  const { userId } =await auth();

  // Redirect to sign-in if no user is found
  if (!userId) {
    redirect('/sign-in');
  }

  // Fetch the subscription for the logged-in user
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
  });

  // If no subscription exists, show an appropriate message
  if (!subscription) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Subscription Details</h1>
        <p>You do not have an active subscription at this time.</p>
        <div className="max-w-md mx-auto p-6 w-full min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-lime-400">Subscribe to Pro Plan</h1>
      <div className="rounded-lg border p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">$10/month</h2>
          <p className="text-gray-500">14-day free trial</p>
        </div>
<PaypalButton/>
      </div>
    </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Your Subscription Details</h1>
      <ul>
        <li>
          <strong>Status:</strong> {subscription.status}
        </li>
        <li>
          <strong>Current Period Start:</strong>{' '}
          {new Date(subscription.currentPeriodStart).toLocaleDateString()}
        </li>
        <li>
          <strong>Current Period End:</strong>{' '}
          {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
        </li>
        {subscription.trialStart && (
          <li>
            <strong>Trial Start:</strong>{' '}
            {new Date(subscription.trialStart).toLocaleDateString()}
          </li>
        )}
        {subscription.trialEnd && (
          <li>
            <strong>Trial End:</strong>{' '}
            {new Date(subscription.trialEnd).toLocaleDateString()}
          </li>
        )}
        <li>
          <strong>Cancel at Period End:</strong>{' '}
          {subscription.cancelAtPeriodEnd ? 'Yes' : 'No'}
        </li>
      </ul>
      <div className="max-w-md mx-auto p-6 w-full min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-lime-400">Subscribe to Pro Plan</h1>
      <div className="rounded-lg border p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">$10/month</h2>
          <p className="text-gray-500">14-day free trial</p>
        </div>
<PaypalButton/>
      </div>
    </div>
    </div>
  );
}
