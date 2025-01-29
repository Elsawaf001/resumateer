
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const {userId}  = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      include: { subscription: true }
    })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    if (user.subscription) {
      return NextResponse.json(
        { error: 'User already has a subscription' },
        { status: 400 }
      )
    }

      // Create trial subscription
      const trialStart = new Date()
      const trialEnd = new Date(trialStart)
      trialEnd.setDate(trialEnd.getDate() + 14) // 14-day trial
      
      const subscription = await prisma.subscription.create({
        data: {
          userId: user.id,
          status: 'TRIALING',
          trialStart,
          trialEnd,
          currentPeriodStart: trialStart,
          currentPeriodEnd: trialEnd
        }
      })
      
      return NextResponse.json({ subscription })
    } catch (error) {
      console.error('Error creating trial:', error)
      return NextResponse.json(
        { error: 'Failed to create trial' },
        { status: 500 }
      )
    }
  }