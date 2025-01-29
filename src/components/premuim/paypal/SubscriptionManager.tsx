// src/components/SubscriptionManager.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

interface Subscription {
  status: string;
  currentPeriodEnd: string;
  trialEnd?: string | null;
  usage: number;
  maxUsage: number;
}

export default function SubscriptionManager({ 
  subscription,
  onUpdate
}: { 
  subscription: Subscription;
  onUpdate: () => void;
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

      onUpdate();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const usagePercentage = (subscription.usage / subscription.maxUsage) * 100;
  const isTrialing = subscription.status === 'TRIALING';
  const trialDaysLeft = subscription.trialEnd 
    ? Math.max(0, Math.ceil((new Date(subscription.trialEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
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
            <span className="font-medium">{subscription.status}</span>
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
              {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Usage</span>
              <span className="font-medium">
                {subscription.usage} / {subscription.maxUsage}
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