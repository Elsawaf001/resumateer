import prisma from '@/lib/prisma';
import { auth} from '@clerk/nextjs/server';
import React from 'react'

import { Separator } from '@radix-ui/react-dropdown-menu';



async function UserCard() {
  const { userId } = await auth();

 
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <h1 className="text-3xl font-bold">Billing</h1>
    
 
  <Separator/>

    </main>
  )
}

export default UserCard
