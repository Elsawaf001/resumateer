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
        'plan': {
          'name': 'Monthly Subscription',
          'description': 'Monthly subscription for $10',
          'billing_cycles': [{
            'frequency': {
              'interval_unit': 'MONTH',
              'interval_count': 1
            },
            'tenure_type': 'REGULAR',
            'sequence': 1,
            'total_cycles': 0,
            'pricing_scheme': {
              'fixed_price': {
                'value': '10',
                'currency_code': 'USD'
              }
            }
          }],
          'payment_preferences': {
            'auto_bill_outstanding': true,
            'setup_fee': {
              'value': '0',
              'currency_code': 'USD'
            },
            'setup_fee_failure_action': 'CONTINUE',
            'payment_failure_threshold': 3
          }
        }
      });
    } catch (err: any) {
      setError(err.message || 'Failed to create subscription');
      return null;
    }
  };

  const onApprove = async (data: any) => {
    try {
      console.log('Subscription approved:', data.subscriptionID);
      // Handle successful subscription (e.g., call your API)
    } catch (err: any) {
      setError(err.message || 'Failed to process subscription');
    }
  };

  const onError = (err: any) => {
    setError(err.message || 'An error occurred with PayPal');
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createSubscription={createSubscription}
          onApprove={onApprove}
          onError={onError}
          style={{ layout: "vertical" }}
        />
      </PayPalScriptProvider>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default PaypalButton;