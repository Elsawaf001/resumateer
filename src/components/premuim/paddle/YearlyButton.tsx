"use client";

import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";

export default function Payment() {
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
      items: [{ priceId: "pri_01jj27rsrm982vtb86zhack49f", quantity: 1 }],
      settings: {
        displayMode: "overlay",
        theme: "dark",
        successUrl: "http://resumateer.com/billing/success",
      },
    });
  };

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
      onClick={handleCheckout}
    >
      Premuim Yearly
    </button>
  );
}