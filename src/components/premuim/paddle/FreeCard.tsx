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
        {paidSubscription && 
        
        <Card className="mx-auto w-full space-y-6 px-3 py-6">
        <CardHeader className="text-sm font-bold">You Are on <span className='text-lime-400'>Premium</span>Plan</CardHeader>
        <Separator /> 
        <CardContent className='text-sm '>Subscription start at<span className='text-lime-400  font-bold'>{" "}{formatDate(paidSubscription?.paddleSubscriptionPeriodStart!, "MMMM dd, yyyy")}</span></CardContent>
        <Separator /> 
        <CardFooter className='text-sm '>Subscription Valid To <span className='text-lime-400  font-bold'>{" "}{formatDate(paddleSubscriptionPeriodEnd.setDate(startDate.getDate() + 30), "MMMM dd, yyyy") }</span></CardFooter>
        <Separator /> 
         <h3 className='font-lg text-lime-400 text-sm text-center'>Renew Now</h3>
        <MonthlyButton userId={userId} /> 
    </Card>
        }
        { !paidSubscription && 
                <Card className="mx-auto w-full  space-y-6 px-3 py-6">
                <CardHeader className="text-sm ">You Are on <span className='text-lime-400 font-bold'>{" "}Free</span>Plan</CardHeader>
                <Separator /> 
                <CardContent className='text-sm '>Consumed Points <span className='text-lime-400 font-bold'>{" "}{freeSubscription?.appPoints}</span></CardContent>
                <Separator /> 
                <CardFooter className='text-sm '>Avaliable Points <span className='text-lime-400 font-bold'>{" "}{freeSubscription?.userPoints}</span></CardFooter>
                <Separator />
                <h6 className='font-sm text-lime-400 text-center'>Want UnLimited Access ?</h6>
                <MonthlyButton userId={userId} />
            </Card>
        }


     </>
    )
}

export default FreeCard
