'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ZodType, z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from '../ui/textarea'
import { onLeadCreation } from './leadActions'
import { useRouter } from 'next/navigation'
import usePremiumModal from "@/components/premuim/usePremuimModal";

export type LeadFormProps = {
  title: string
  content: string
}

export const leadFormSchema: ZodType<LeadFormProps> = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
})


interface Props {
  canCreate: boolean;
  userId: string
}
function LeadForm({ userId, canCreate }: Props) {

  const form = useForm<z.infer<typeof leadFormSchema>>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [value, setValue] = useState<LeadFormProps>({ title: "", content: "" })
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const premiumModal = usePremiumModal();

  // const onButtonClick = () => {
  //   setIsDialogOpen(canCreate)
  //   if (!canCreate) {

  //     premiumModal.setOpen(true)

  //     return
  //   }

  const onButtonClick = () => {
    if (canCreate) {
      setIsDialogOpen(true); // Open the dialog if the user can create
    } else {
      setIsDialogOpen(false);
      premiumModal.setOpen(true); // Open the premium modal if the user cannot create
    }
  };



  async function onSubmit(values: z.infer<typeof leadFormSchema>) {
    if (!canCreate) {
      premiumModal.setOpen(true)
      return
    }
    setValue({ title: values.title, content: values.content })
    try {
      setLoading(true);
      const lead = await onLeadCreation(userId, values.title, values.content)
      if (lead) {

        toast({
          title: "Lead Created",
          description: lead.title
        })
        setLoading(false)
        setIsDialogOpen(false)
        router.push("/lead")
      }
    }
    catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message
        })
        setLoading(false)
      }
    }

  }





  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogTrigger asChild >

        <Button size={"lg"} className="mx-auto flex w-fit gap-2" onClick={onButtonClick} >
          {loading ? 'Submitting...' : 'Add Lead'}

        </Button>

      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Lead</DialogTitle>
          <DialogDescription>
            Add your lead details here
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">


            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}

                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Content
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Lead Content" className="h-48" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}

                />





                <DialogFooter>
                  <Button disabled={loading} type="submit"> {loading ? 'Submitting...' : 'Submit Lead'}</Button>
                </DialogFooter>
              </form>
            </Form>


          </div>
        </div>

      </DialogContent>

    </Dialog>
  )
}

export default LeadForm