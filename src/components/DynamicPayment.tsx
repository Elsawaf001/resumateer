"use client";

import React, { useEffect, useState } from "react";
import { Paddle, initializePaddle } from "@paddle/paddle-js";
import { Button } from "./ui/button";

function DynamicPayment() {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    const setupPaddle = async () => {
      try {
        const paddleInstance = await initializePaddle({
          environment: "sandbox", // Use "live" for production
          token: process.env.NEXT_PUBLIC_PADDLE_TOKEN as string,
        });
        setPaddle(paddleInstance);
      } catch (error) {
        console.error("Failed to initialize Paddle:", error);
      }
    };

    setupPaddle();
  }, []);

  const handleCheckout = async () => {
    if (!paddle) {
      return;
    }
    const response = await fetch("/api/payment");
    const data = await response.json();
    console.log(data);

    paddle.Checkout.open({
      transactionId : data.txn,
      settings : {
        displayMode : "overlay" ,
        theme : "dark" ,
        successUrl : "https://resumateer.vercel.app/resumes/success"
      }
 
    });
  };

  return (
    <div>
      <Button onClick={handleCheckout}>Dynamic Buy 10,000 Tokens</Button>
    </div>
  );
}

export default DynamicPayment;
