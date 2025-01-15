import prisma from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import Tag from './home/common/Tag';
import { Avatar } from './ui/avatar';
import { Separator } from '@radix-ui/react-dropdown-menu';
import PaypalButton from './paypal/PaypalButton';
import PaddlePay from './PaddlePay';
import DynamicPayment from './DynamicPayment';

async function UserCard() {
     const { userId  } = await auth();
    //  const user = await currentUser()

      if (!userId) {
        return null;
      }
  
    
    const userSubscription = await prisma.userSubscription.findUnique({
        where: { userId },
        select: { appPoints: true,
            userPoints: true
         }, // Only retrieve the appPoints field
      });


  return (
    <Card>
        <CardHeader>Hello</CardHeader>
        <CardContent>
            <Separator/>
            <p className='text-sm text-muted-foreground'>you have {" "}<span className='font-sans text-2xl text-lime-300'>{userSubscription?.userPoints}</span> Tokens</p>
            <Separator/>
            <p className='text-sm text-muted-foreground'>you have used <span>{userSubscription?.appPoints}</span> tokens </p>
        </CardContent>
      <CardFooter>
        <PaddlePay/>
        <DynamicPayment/>
      </CardFooter>
    </Card>
  )
}

export default UserCard
