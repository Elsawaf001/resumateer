import prisma from '@/lib/prisma';
import { auth} from '@clerk/nextjs/server';
import React from 'react'

import { Separator } from '@radix-ui/react-dropdown-menu';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { getSubscription } from './premuim/paypal/actions';
import Link from 'next/link';



async function UserCard() {

  
  const { userId } = await auth();
const sub = await getSubscription(userId!);
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
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Status</span>
          <span className="font-bold text-lime-400">{sub!.status}</span>
        </div>
        
        {isTrialing&& (
          <div className="flex justify-between text-sm">
            <span>Trial Period</span>
            <span className="font-medium  text-lime-400">{trialDaysLeft} days left</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span>Current Period Ends</span>
          <span className="font-medium  text-lime-400">
            {sub!.currentPeriodEnd.toLocaleDateString()}
          </span>
        </div>

       
      </div>
    </CardContent>
    <CardFooter>
      <Link href={'/pricing'}>
      <Button
        variant="destructive"
        className="w-full"
      >
        Manage Subscription
      </Button>
      </Link>
    
    </CardFooter>
  </Card>
  )
}

export default UserCard
