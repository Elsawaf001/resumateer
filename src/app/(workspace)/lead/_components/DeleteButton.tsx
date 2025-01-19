"use client"
import { deleteLead } from '@/actions/delete'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import usePremiumModal from "@/components/premuim/usePremuimModal";
interface Props{
  leadId : string ,
  canDelete : boolean
}
function DeleteButton({leadId , canDelete }: Props) {
  const premiumModal = usePremiumModal();

    const [loading , setLoading] = useState(false);
    const router = useRouter();
    function deletepost(id : string) {
        try {
          if(!canDelete){
            premiumModal.setOpen(true)
            return
          }
            setLoading(true)
            deleteLead(id)
            setLoading(false)
            revalidatePath("/lead")
          
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
