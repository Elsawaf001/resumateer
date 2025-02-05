"use client"
// src/components/SubscriptionManager.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import prisma from '@/lib/prisma';

// interface Subscription {
//   status: string;
//   currentPeriodEnd: string;
//   trialEnd?: string | null;
//   usage: number;
//   maxUsage: number;
// }

export default async function SubscriptionManager({ 
  // subscription,
  // onUpdate ,
  userId ,
}: { 
  // subscription: Subscription;
  // onUpdate: () => void; 
  userId: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancelSubscription = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/subscriptions/cancel', {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      // onUpdate();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
const sub = await prisma.subscription.findUnique({
    where: { userId },
    select : {
      status: true,
      currentPeriodEnd: true,
      trialEnd: true,
      currentPeriodStart : true ,
      trialStart : true ,
      cancelAtPeriodEnd : true ,

    }
  });


  const usage = sub?.currentPeriodStart 
  ? Math.max(0, Math.ceil((new Date(sub?.currentPeriodStart).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
  : 0;

  const MaxUsage = sub?.currentPeriodEnd 
  ? Math.max(0, Math.ceil((new Date(sub?.currentPeriodEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
  : 0;
  const usagePercentage = (usage/ MaxUsage) * 100;
  
  const isTrialing = sub?.status === 'TRIALING';
  const trialDaysLeft = sub?.trialEnd 
    ? Math.max(0, Math.ceil((new Date(sub?.trialEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Your Subscription</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Status</span>
            <span className="font-medium">{sub ? sub.status : 'Loading...'}</span>
          </div>
          
          {isTrialing && (
            <div className="flex justify-between text-sm">
              <span>Trial Period</span>
              <span className="font-medium">{trialDaysLeft} days left</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span>Current Period Ends</span>
            <span className="font-medium">
              {new Date(sub ? sub.currentPeriodEnd : "Loading...").toLocaleDateString()}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Usage</span>
              <span className="font-medium">
                {usage} / {MaxUsage}
              </span>
            </div>
            <Progress value={usagePercentage} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="destructive"
          onClick={cancelSubscription}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Canceling...' : 'Cancel Subscription'}
        </Button>
      </CardFooter>
    </Card>
  );
}