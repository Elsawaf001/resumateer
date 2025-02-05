
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';


// interface Subscription {
//   status: string;
//   currentPeriodEnd: string;
//   trialEnd?: string | null;
//   usage: number;
//   maxUsage: number;
// }

export default async function SubscriptionManager({ 
   sub,
  // onUpdate ,
  userId ,
}: { 
   sub: any;
  // onUpdate: () => void; 
  userId: string;
}) {
  const cancelSubscription = async () => {
    try {
      const response = await fetch('/api/subscriptions/cancel', {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      // onUpdate();
    } catch (err: any) {
 console.log("")
    } finally {
      console.log("")
    }
  };

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
        {/* {err && (
          <Alert variant="destructive">
            <AlertDescription>{err}</AlertDescription>
          </Alert>
        )} */}

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
            <Progress value={usagePercentage} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="destructive"
          onClick={cancelSubscription}
        
          className="w-full"
        >
          Cancel Subscription
        </Button>
      </CardFooter>
    </Card>
  );
}