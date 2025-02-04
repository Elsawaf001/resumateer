'use client';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from 'react';

const PaypalButton = () => {
  const [error, setError] = useState<string>('');

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: "USD",
    vault: true,
  };

  const createSubscription = async (data: any, actions: any) => {
    try {
      return actions.subscription.create({
        plan_id: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID!,
        application_context: {
          shipping_preference: "NO_SHIPPING"
        }
      });
    } catch (err) {
      setError('Failed to create subscription');
      return null;
    }
  };

  const onApprove = async (data: any) => {
    try {
      // Handle successful subscription
      console.log('Subscription approved:', data.subscriptionID);
    } catch (err) {
      setError('Failed to process subscription');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createSubscription={createSubscription}
          onApprove={onApprove}
          style={{ layout: "vertical" }}
        />
      </PayPalScriptProvider>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default PaypalButton;