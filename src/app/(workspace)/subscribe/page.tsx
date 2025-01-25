
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { redirect } from "next/navigation";
import MonthlyButton from "@/components/premuim/paddle/MonthlyButton";

const SubscribePage = ({userId} : {userId:string}) => {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="max-w-md w-full p-6 text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Upgrade to Premium</CardTitle>
          <CardDescription className="mt-2 text-gray-600">
            You’ve used all your free tokens. Unlock unlimited access and premium features by subscribing to our premium tier.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <MonthlyButton userId={userId} />
          <Button 
            variant="ghost" 
            className="w-full text-lg" 
            onClick={() => redirect("/")}
          >
            Maybe Later
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscribePage;
