
import React from 'react'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';



async function UserCard() {


  return (
      <Link href={'/subscription'}>
      <Button
      size={"lg"}
        className="w-full rounded-none text-xl font-bold"
      >
        Manage Subscription
      </Button>
      </Link>
  )
}

export default UserCard
