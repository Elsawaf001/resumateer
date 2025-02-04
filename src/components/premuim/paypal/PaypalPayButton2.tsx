// app/components/PaypalButton.tsx
'use client';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from 'react';

const PaypalButton = () => {
  const [error, setError] = useState<string>('');

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: "USD",
    intent: "subscription",
    vault: true,
  };

  const createSubscription = async (data: any, actions: any) => {
    try {
      const subscriptionData = {
        plan: {
          product: {
            name: "Monthly Service",
            description: "Monthly subscription service for $10"
          },
          name: "Monthly Plan",
          billing_cycles: [{
            frequency: {
              interval_unit: "MONTH",
              interval_count: 1
            },
            tenure_type: "REGULAR",
            sequence: 1,
            total_cycles: 0,
            pricing_scheme: {
              fixed_price: {
                value: "10",
                currency_code: "USD"
              }
            }
          }],
          payment_preferences: {
            auto_bill_outstanding: true,
            setup_fee_failure_action: "CONTINUE",
            payment_failure_threshold: 3
          }
        }
      };

      return actions.subscription.create(subscriptionData);
    } catch (err: any) {
      console.error('Subscription creation error:', err);
      setError(err.message || 'Failed to create subscription');
      return null;
    }
  };

  const onApprove = async (data: any) => {
    try {
      console.log('Subscription approved:', data.subscriptionID);
    } catch (err: any) {
      console.error('Approval error:', err);
      setError(err.message || 'Failed to process subscription');
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