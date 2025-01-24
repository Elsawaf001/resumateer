import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from '../../ui/button';
import { formatDate, sub } from 'date-fns';
import MonthlyButton from './MonthlyButton';
import YearlyButton from './YearlyButton';
import Link from 'next/link';

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
                nextBillDate : true ,
        }
    });



    return (
        <>
        {paidSubscription && 
        
        <Card className="mx-auto w-full space-y-6 px-3 py-6">
        <CardHeader className="text-sm font-bold">You Are on <span className='text-lime-400'>Premium</span>Plan</CardHeader>
        <Separator /> 
        <Separator /> 
        <CardFooter className='text-sm '>Next Billing Data 
            <div className='text-lime-400  font-bold'>
            {paidSubscription?.nextBillDate ? formatDate(new Date(paidSubscription?.nextBillDate), 'dd/MM/yyyy') : 'N/A'}
            </div></CardFooter>
            <Link href={"https://sandbox-customer-portal.paddle.com/cpl_01jhn5nar1b0dyv89x0a4sv8f7"}>
            <Button className='text-sm'>Manage Subscription</Button>
            </Link>
      
    </Card>
        }
        { !paidSubscription && 
                <Card className="mx-auto w-full  space-y-6 px-3 py-6">
                <CardHeader className="text-sm ">You Are on <span className='text-lime-400 font-bold'>{" "}Free</span>Plan</CardHeader>
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
