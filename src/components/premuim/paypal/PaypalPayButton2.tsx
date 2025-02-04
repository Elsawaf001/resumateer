'use client';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useEffect } from 'react';

const PaypalButton = () => {
  const [error, setError] = useState<string>('');
  const [planId, setPlanId] = useState<string>('');

  useEffect(() => {
    // Step 1: Create a product
    const createProductAndPlan = async () => {
      try {
        // Create a product
        const productResponse = await fetch('/api/subscriptions/create-product', {
          method: 'POST',
        });
        const { product_id } = await productResponse.json();

        // Create a plan using the product ID
        const planResponse = await fetch('/api/subscriptions/create-plan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ product_id }),
        });
        const { plan_id } = await planResponse.json();

        setPlanId(plan_id);
      } catch (err) {
        console.error('Failed to create product or plan:', err);
        setError('Failed to create subscription plan');
      }
    };

    createProductAndPlan();
  }, []);

  const initialOptions = {
    clientId: "AQKqyf_VJgQXCoedvKVGMf_4dwgjMJfDSQs2zfIEVI2atJ6wYXpilQJPGxY6mTBaCUz0zVJw9oPhHSPS",
    currency: "USD",
    intent: "subscription",
    vault: true,
  };

  const createSubscription = async (data: any, actions: any) => {
    if (!planId) {
      setError('Subscription plan not available');
      return;
    }

    try {
      return actions.subscription.create({
        plan_id: planId,
      });
    } catch (err: any) {
      console.error('Subscription creation error:', err);
      setError(err.message || 'Failed to create subscription');
      return null;
    }
  };

  const onApprove = async (data: any) => {
    try {
      console.log('Subscription approved:', data.subscriptionID);
      // Optionally, send the subscription ID to your backend for further processing
    } catch (err: any) {
      console.error('Approval error:', err);
      setError(err.message || 'Failed to process subscription');
    }
  };

  if (!planId) {
    return <p>Loading subscription plan...</p>;
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-black rounded-lg shadow-lg">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createSubscription={createSubscription}
          onApprove={onApprove}
          style={{
            layout: 'vertical',
            color: 'gold', // Button color
            shape: 'rect', // Button shape
            label: 'subscribe', // Button label
            height: 48, // Button height
            tagline: false, // Hide the tagline ("The safer, easier way to pay")
          }}
        />
      </PayPalScriptProvider>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default PaypalButton;