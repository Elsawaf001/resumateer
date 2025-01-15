// "use client"
// import React, { useEffect, useState } from 'react'
// import {Paddle, initializePaddle} from "@paddle/paddle-js"
// import { Button } from './ui/button'
// function Payment() {
// const [paddle , setPaddle] = useState<Paddle>()
//     useEffect(() => {
//         initializePaddle(
//             {
//             environment : "sandbox" ,
//             token : "live_353067cd84465ce861326dc2295" ,
//         }).then((paddle) => setPaddle(paddle))
//     } , [])

//     const handleChechout = () => {
//         if (!paddle) return 
//         paddle.Checkout.open({
//             items : [
//                 {priceId : "pri_01jhmwjr64q6f9x55yj9m3y6tb" , quantity :1}
//             ] ,
//             settings : {
//                 displayMode : "overlay" ,
//                 theme : "dark",
//                 successUrl : "https://resumateer.vercel.app/resumes"
//             }
//         })
//     }
//   return (
//     <div>
        
//     <Button onClick={handleChechout}>Buy 10,000 Tokens</Button>
//     </div>
//   )
// }

// export default Payment



"use client";

import React, { useEffect, useState } from "react";
import { Paddle, initializePaddle } from "@paddle/paddle-js";
import { Button } from "./ui/button";

function Payment() {
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

  const handleCheckout = () => {
    if (!paddle) {
      console.error("Paddle is not initialized");
      return;
    }

    paddle.Checkout.open({
      items: [
        {
          priceId: "pri_01jhmwjr64q6f9x55yj9m3y6tb",
          quantity: 1,
        },
      ],
      settings: {
        displayMode: "overlay",
        theme: "dark",
        successUrl: "https://resumateer.vercel.app/resumes",
      },
    });
  };

  return (
    <div>
      <Button onClick={handleCheckout}>Buy 10,000 Tokens</Button>
    </div>
  );
}

export default Payment;
