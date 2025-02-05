
import React from 'react'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';



async function UserCard() {


  return (
    <Card className="w-full max-w-md">
    <CardFooter>
      <Link href={'/pricing'}>
      <Button
      size={"lg"}
        variant="destructive"
        className="w-full"
      >
        Manage Subscription
      </Button>
      </Link>
    
    </CardFooter>
  </Card>
  )
}

export default UserCard
