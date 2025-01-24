import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from '../../ui/button';
import { formatDate, sub } from 'date-fns';
import MonthlyButton from './MonthlyButton';
import Link from 'next/link';

async function SubscriptionCard() {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const freeSubscription = await prisma.userSubscription.findUnique({
        where: { userId },
        select: {
            appPoints: true,
            userPoints: true,
        }
    });

    const paidSubscription = await prisma.paddleCustomer.findUnique({
        where: { userId },
        select: {

                paddlePriceId : true ,
                paddleSubscriptionPeriodStart : true ,
                nextBillDate : true ,
                paddleCancelAtPeriodEnd : true ,
              
        }
    });



    return (
        <>
        {paidSubscription && 
        
        <Card className="mx-auto w-full space-y-2 px-1 py-2">
        <CardHeader className="text-sm font-bold">You Are on <span className='text-lime-400'>{" "}Premium</span>Plan</CardHeader>
{paidSubscription?.paddleCancelAtPeriodEnd && 
        <CardContent className='text-sm'>Subscription will be Cancelled at <div className='text-lime-400 font-bold'>{paidSubscription?.nextBillDate?.slice(0,10)}</div></CardContent> 

}
{
    !paidSubscription?.paddleCancelAtPeriodEnd && 
    <CardContent className='text-sm'>Subscription will be renewed on <div className='text-lime-400 font-bold'>{paidSubscription?.nextBillDate?.slice(0,10)}</div></CardContent>
}
      
            <Link href={"https://sandbox-customer-portal.paddle.com/cpl_01jhn5nar1b0dyv89x0a4sv8f7"}>
            <Button className='text-sm'>Manage Subscription</Button>
            </Link>
      
    </Card>
        }
        { !paidSubscription && 
                <Card className="mx-auto w-full  space-y-2 px-1 py-2">
                <CardHeader className="text-sm ">You Are on <span className='text-lime-400 font-bold'>{" "}Free</span>Plan</CardHeader>
           
                <CardFooter className='text-sm '>Avaliable Points <span className='text-lime-400 font-bold'>{" "}{freeSubscription?.userPoints}{" "}</span></CardFooter>
                
                <h6 className='font-sm text-lime-400 text-center'>Want UnLimited Access ?</h6>
                <MonthlyButton userId={userId} />
            </Card>
        }


     </>
    )
}

export default SubscriptionCard
