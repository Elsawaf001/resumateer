
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

function Subscribe({userId} : {userId:string}) {
  return (
    <div className="flex items-center justify-center min-h-screen ">

  <Card className="max-w-md w-full p-6 text-center">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">Upgrade to Premium</CardTitle>
      <CardDescription className="mt-2 text-gray-600">
        You’ve used all your free tokens. Unlock unlimited access and premium features by subscribing to our premium tier.
      </CardDescription>
    </CardHeader>
    <CardContent className="mt-6">
    </CardContent>
  </Card>
</div>
  )
}

export default Subscribe