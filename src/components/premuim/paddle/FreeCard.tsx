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

    const subscription = await prisma.userSubscription.findUnique({
        where: { userId },
        select: {
            appPoints: true,
            userPoints: true,
        }
    });

    return (
        <Card className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
            <CardHeader className="text-2xl font-bold">You Are on <span className='text-lime-400'>Free</span>Plan</CardHeader>
            <CardContent>Consumed Points <span className='text-lime-400 text-2xl font-bold'>{subscription?.appPoints}</span></CardContent>

            <CardFooter>Avaliable Points <span className='text-lime-400 text-2xl font-bold'>{subscription?.userPoints}</span></CardFooter>
            <Separator />
            <h3 className='font-lg text-lime-400 text-center'>Want UnLimited Access ?</h3>
            <MonthlyButton userId={userId} />
        </Card>
    )
}

export default FreeCard
