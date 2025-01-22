"use client";

import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import { useState } from "react";


import { env } from "@/env";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MonthlyButton from "@/components/premuim/paddle/MonthlyButton";
import YearlyButton from "@/components/premuim/paddle/YearlyButton";

const premiumFeatures = ["Infinite resumes", "Design customizations" ,"AI tools", "Lead Genie" , "Ai Cover Lette" , "AI Salar Report" , "AI ATS Resume Cutomozation"];


export default function PremiumModal() {


  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

//   async function handlePremiumClick(priceId: string) {
//     // try {
//     //   setLoading(true);
//     //   const redirectUrl = await createCheckoutSession(priceId);
//     //   window.location.href = redirectUrl;
//     // } catch (error) {
//     //   console.error(error);
//     //   toast({
//     //     variant: "destructive",
//     //     description: "Something went wrong. Please try again.",
//     //   });
//     // } finally {
//     //   setLoading(false);
//     // }
//   }

  return (
    <Dialog
      open
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Resumateer Premium</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p>Get a premium subscription to keep using all features.</p>
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
              <MonthlyButton/>
              {/* <Button
                // onClick={() =>
                //   handlePremiumClick(
                //     env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY,
                //   )
                // }
                // disabled={loading}
              >
                Get Premium Monthly
              </Button> */}
            </div>
            <div className="mx-6 border-l" />
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-center text-lg font-bold text-transparent">
                Premium Yearly <span className="text-lime-400 font-bold text-lg">99$</span>
              </h3>
              <ul className="list-inside space-y-2">
              {premiumFeatures.map((feature) => ( 
                  <li key={feature}  className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                 ))} 
              </ul>
              <YearlyButton/>
              {/* <Button
                // variant="premium"
                // onClick={() =>
                //   handlePremiumClick(
                //     env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_YEARLY,
                //   )
                // }
                // disabled={loading}
              >
                Get Premium Yearly
              </Button> */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}