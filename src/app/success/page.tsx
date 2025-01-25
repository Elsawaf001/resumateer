"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const BillingSuccessPage = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-md w-full p-6 text-center">
        <CardHeader>
          <CardTitle className="text-3xl text-lime-400 font-bold">Payment Successful</CardTitle>
          <CardDescription className="mt-2 text-gray-600">
            Thank you for your payment! Your subscription has been activated successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <Button 
            className="w-full mb-4 text-lg" 
            onClick={() => router.push("/resumes")}
          >
            Go to Dashboard
          </Button>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSuccessPage;
