"use client"
import { deleteLead } from '@/actions/delete'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function DeleteButton({leadId }: {leadId :string}) {
    const [loading , setLoading] = useState(false);
    const router = useRouter();
    function deletepost(id : string) {
        try {
            setLoading(true)
            deleteLead(id)
            setLoading(false)
            revalidatePath("/lead")
            // router.push("/lead")
        }
        catch{

        }

    }

  return (
    <Button variant={"destructive"} size={"sm"} onClick={() => deletepost(leadId)}>
      {!loading && <Trash2Icon/>}
      {loading &&' Deleting...'}

    </Button>
  )
}

export default DeleteButton
