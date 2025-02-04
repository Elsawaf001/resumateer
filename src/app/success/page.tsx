// src/app/success/page.tsx
import { redirect } from 'next/navigation';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function SuccessPage() {
  const { userId } =await auth();
  if (!userId) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    include: { subscription: true }
  });

  if (!user?.subscription) redirect('/pricing');

  return (
    <div className="container max-w-lg mx-auto p-6 min-h-screen my-auto">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Activated!</CardTitle>
          <CardDescription>
            Your subscription has been successfully activated.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Your subscription is now active and you have full access to all features.
          </p>
          <Link href={'/resumes'}>
          <Button  className="w-full">
            Go to Dashboard
          </Button>
          </Link>
          
        </CardContent>
      </Card>
    </div>
  );
}