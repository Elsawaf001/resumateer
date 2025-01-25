"use client";

import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import usePremiumModal from "./usePremuimModal";
import { env } from "@/env";
import MonthlyButton from "./paddle/MonthlyButton";
import { isOpen } from "./actions";

const premiumFeatures = ["Infinite resumes", "Design customizations" ,"AI tools", "Lead Genie" , "Ai Cover Lette" , "AI Salar Report" , "AI ATS Resume Cutomozation"];

export default function PremiumModal({ userId }: { userId: string  }) {
const { open, setOpen } = usePremiumModal();

  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
     isOpen(userId).then((isOpen) => {
      if (isOpen) {
        setOpen(true);
      }
    })
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!loading) {
          setOpen(open);
        }
      }}
    >

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Resumateer Premium</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
        <p>you have used all your free tokens</p>
          <p>Get a premium subscription to keep using all features unlimited.</p>
          <div className="flex">
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold">Premium Monthly  <span className="text-lime-400 font-bold text-lg">9$</span></h3>
              <ul className="list-inside space-y-2">
                 {premiumFeatures.map((feature) => ( 
                  <li key={feature}  className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                 ))} 
              </ul>
            </div>

             <MonthlyButton userId={userId}/>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}