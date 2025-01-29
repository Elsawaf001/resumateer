import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { paypalSubscriptionId } = await req.json()
    const  userId  = (await auth()).userId
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      include: { subscription: true }
    })
    
    if (!user?.subscription) {
      return NextResponse.json(
        { error: 'No subscription found' },
        { status: 404 }
      )
    }
     // Convert trial to paid subscription
     const now = new Date()
     const periodEnd = new Date(now)
     periodEnd.setMonth(periodEnd.getMonth() + 1) // 1 month subscription
     
     const updatedSubscription = await prisma.subscription.update({
       where: { id: user.subscription.id },
       data: {
         status: 'ACTIVE',
         paypalSubscriptionId,
         currentPeriodStart: now,
         currentPeriodEnd: periodEnd,
       }
     })
     
     return NextResponse.json({ subscription: updatedSubscription })
   } catch (error) {
     console.error('Error converting to paid:', error)
     return NextResponse.json(
       { error: 'Failed to convert subscription' },
       { status: 500 }
     )
   }
 }