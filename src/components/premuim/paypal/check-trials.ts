import prisma from "@/lib/prisma"

export async function checkTrialExpirations() {
    const now = new Date()
    
    // Find expired trials
    const expiredTrials = await prisma.subscription.findMany({
      where: {
        status: 'TRIALING',
        trialEnd: {
          lt: now
        }
      }
    })

      // Update expired trials
  for (const trial of expiredTrials) {
    await prisma.subscription.update({
      where: { id: trial.id },
      data: {
        status: 'EXPIRED'
      }
    })
    
    // You might want to send an email notification here
  }
}