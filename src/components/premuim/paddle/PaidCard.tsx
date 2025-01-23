import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from '../../ui/button';
import { formatDate } from "date-fns";
import MonthlyButton from './MonthlyButton';
import YearlyButton from './YearlyButton';

async function PaidCard() {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const subscription = await prisma.paddleCustomer.findUnique({
        where: { userId },
        select: {

                paddlePriceId : true ,
                paddleSubscriptionPeriodStart : true ,
        }
    });
    const startDate = new Date(subscription?.paddleSubscriptionPeriodStart!);
    const paddleSubscriptionPeriodEnd = new Date(startDate);
    

    return (
        <Card className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
            <CardHeader className="text-2xl font-bold">You Are on <span className='text-lime-400'>Premium</span>Plan</CardHeader>
            <CardContent>Subscription start at<span className='text-lime-400 text-2xl font-bold'>{formatDate(subscription?.paddleSubscriptionPeriodStart!, "MMMM dd, yyyy")}</span></CardContent>

            <CardFooter>Subscription Valid To <span className='text-lime-400 text-2xl font-bold'>{paddleSubscriptionPeriodEnd.setDate(startDate.getDate() + 30)}</span></CardFooter>
            {/* <Separator /> */}
            {/* <h3 className='font-lg text-lime-400 text-center'></h3>
            <MonthlyButton userId={userId} /> */}
        </Card>
    )
}

export default PaidCard
