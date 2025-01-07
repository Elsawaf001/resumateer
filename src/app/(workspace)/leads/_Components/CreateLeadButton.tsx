"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LeadInfoValues, leadInfoSchema } from '@/lib/validation';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';




import { PlusSquare } from "lucide-react";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation";

import { useState } from "react";


export default function CreateResumeButton() {
  const [isOpen, setIsOpen] = useState(false); // Control dialog state
  const router = useRouter(); // For navigation

  
  const form = useForm<LeadInfoValues>({
    resolver: zodResolver(leadInfoSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (data: LeadInfoValues) => {
console.log(data)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>

        <Button className="mx-auto flex w-fit gap-2" size="lg" onClick={() => setIsOpen(true)}>
          <PlusSquare className="size-5" />
          New Lead
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Your Lead</DialogTitle>
          <DialogDescription>
            Copy and Past Your Lead Here.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">




            <Form {...form}>
              <form className="space-y-3 " onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lead Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="EX:- Tesla Job Opening" autoFocus />
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
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea className="h-60 w-full text-lg" {...field} placeholder="Add Job Details Here" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

              </form>
              <DialogFooter>
                <Button type="submit">Save Lead</Button>
              </DialogFooter>
            </Form>





          </div>
        </div>

      </DialogContent>
    </Dialog>




  );


}