import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from '../../ui/button';
import { formatDate } from "date-fns";
import MonthlyButton from './MonthlyButton';
import YearlyButton from './YearlyButton';
import FreeCard from './SubscriptionCard';

async function PaidCard() {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const PaidSubscription = await prisma.paddleCustomer.findUnique({where: { userId },});
    const FreeSubscription = await prisma.userSubscription.findUnique({where: { userId },});
    

    return (
       <>
       {PaidSubscription && <PaidCard/>}
       {FreeSubscription && <FreeCard/>}
       </>
    )
}

export default PaidCard
