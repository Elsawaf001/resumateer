"use client"
// src/app/pricing/page.tsx

import PayPalSubscribeButton from "@/components/premuim/paypal/PayPalSubscribeButton";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PricingPage() {
  return (
    <PayPalScriptProvider
    options={{
      "clientId": "AQKqyf_VJgQXCoedvKVGMf_4dwgjMJfDSQs2zfIEVI2atJ6wYXpilQJPGxY6mTBaCUz0zVJw9oPhHSPS",
      currency: "USD",
      intent: "subscription",
      vault: true,
    }}
  >
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-lime-400">Subscribe to Pro Plan</h1>
      <div className="rounded-lg border p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">$10/month</h2>
          <p className="text-gray-500">14-day free trial</p>
        </div>
        
        <PayPalSubscribeButton 
          onSuccess={() => {
            // Handle successful subscription
            console.log('Subscription successful!');
          }}
          onError={(error) => {
            // Handle error
            console.error('Subscription failed:', error);
          }}
        />
      </div>
    </div>
    </PayPalScriptProvider>
  );
}