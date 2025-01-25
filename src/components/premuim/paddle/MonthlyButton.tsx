"use client";

import { Button } from "@/components/ui/button";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import {  useEffect, useState } from "react";

export default function Payment({userId} : {userId : string | null}) {
  const [paddle, setPaddle] = useState<Paddle>();
  

  useEffect(() => {
    initializePaddle({
      environment: "sandbox",
      token: "test_84afa5e752630ed64864d7ab416",
    }).then((paddle) => setPaddle(paddle));
  }, []);

  const handleCheckout = () => {
    if (!paddle) return alert("Paddle not initialized");

    paddle.Checkout.open({
      items: [{ priceId: "pri_01jj27ptke8fjejd6fzrzpvzen", quantity: 1 }],
      settings: {
        displayMode: "overlay",
        theme: "dark",
        successUrl: "https://www.resumateer.com/success",
      },
      customData : {
        userId : userId
      }
    });
  };

  return (
    <Button
    
      className=" text-extrabold w-full font-sans text-black px-2 py-2 text-xl rounded-sm"
      onClick={handleCheckout}
    >
      Go Premium
    </Button>
  );
}