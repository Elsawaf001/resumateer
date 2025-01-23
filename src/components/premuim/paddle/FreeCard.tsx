import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from '../../ui/button';
import { formatDate } from 'date-fns';
import MonthlyButton from './MonthlyButton';
import YearlyButton from './YearlyButton';

async function FreeCard() {
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
        }
    });
    const startDate = new Date(paidSubscription?.paddleSubscriptionPeriodStart!);
    const paddleSubscriptionPeriodEnd = new Date(startDate);


    return (
        <>
        {paddleSubscriptionPeriodEnd > new Date() && 
        
        <Card className="mx-auto w-full space-y-6 px-3 py-6">
        <CardHeader className="text-lg font-bold">You Are on <span className='text-lime-400'>Premium</span>Plan</CardHeader>
        <CardContent>Subscription start at<span className='text-lime-400  font-bold'>{formatDate(paidSubscription?.paddleSubscriptionPeriodStart!, "MMMM dd, yyyy")}</span></CardContent>

        <CardFooter>Subscription Valid To <span className='text-lime-400  font-bold'>{paddleSubscriptionPeriodEnd.setDate(startDate.getDate() + 30)}</span></CardFooter>
        {/* <Separator /> */}
        {/* <h3 className='font-lg text-lime-400 text-center'></h3>
        <MonthlyButton userId={userId} /> */}
    </Card>
        }
        {paddleSubscriptionPeriodEnd > new Date() || !paidSubscription && 
                <Card className="mx-auto w-full  space-y-6 px-3 py-6">
                <CardHeader className="text-lg ">You Are on <span className='text-lime-400 font-bold'>Free</span>Plan</CardHeader>
                <CardContent>Consumed Points <span className='text-lime-400 font-bold'>{freeSubscription?.appPoints}</span></CardContent>
    
                <CardFooter>Avaliable Points <span className='text-lime-400 font-bold'>{freeSubscription?.userPoints}</span></CardFooter>
                <Separator />
                <h6 className='font-sm text-lime-400 text-center'>Want UnLimited Access ?</h6>
                <MonthlyButton userId={userId} />
            </Card>
        }


     </>
    )
}

export default FreeCard
