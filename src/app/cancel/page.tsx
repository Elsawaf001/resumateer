// src/app/cancel/page.tsx
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CancelPage() {
  return (
    <div className="container max-w-lg mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Cancelled</CardTitle>
          <CardDescription>
            Your subscription process was cancelled.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            No charges were made. You can try again whenever you're ready.
          </p>
          <Button onClick={() => redirect('/pricing')} className="w-full">
            Return to Pricing
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}