import prisma from '@/lib/prisma';
import { auth} from '@clerk/nextjs/server';
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from './ui/button';
import { formatDate } from 'date-fns';
import MonthlyButton from './premuim/paddle/MonthlyButton';
import YearlyButton from './premuim/paddle/YearlyButton';

async function UserCard() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const subscription = await prisma.stripeSubscription.findUnique({
    where: { userId },
  });

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <h1 className="text-3xl font-bold">Billing</h1>
    
  <MonthlyButton userId={userId}/>
  <Separator/>
  <YearlyButton/>
    </main>
  )
}

export default UserCard
