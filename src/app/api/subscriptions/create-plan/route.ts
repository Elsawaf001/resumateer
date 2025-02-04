import { NextResponse } from 'next/server';
import axios from 'axios';

// Helper function to get PayPal access token
async function getPayPalAccessToken() {
  const auth = Buffer.from(
    'AQKqyf_VJgQXCoedvKVGMf_4dwgjMJfDSQs2zfIEVI2atJ6wYXpilQJPGxY6mTBaCUz0zVJw9oPhHSPS:EC0u3jBh7XwWgHhC-quLFd7oQH4wNVshwLk_IxxNQzsxZgg9aGUrIFwR5CJNCkkWF1VEsWRLg0fSl46_'
  ).toString('base64');

  const response = await axios.post(
    'https://api.sandbox.paypal.com/v1/oauth2/token',
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return response.data.access_token;
}

export async function POST(request: Request) {
  const accessToken = await getPayPalAccessToken();
  const { product_id } = await request.json(); // Get product_id from the request body

  const planData = {
    product_id,
    name: "Monthly Plan",
    description: "Monthly subscription for $10",
    billing_cycles: [
      {
        frequency: {
          interval_unit: "MONTH",
          interval_count: 1,
        },
        tenure_type: "REGULAR",
        sequence: 1,
        total_cycles: 0, // 0 means infinite
        pricing_scheme: {
          fixed_price: {
            value: "10",
            currency_code: "USD",
          },
        },
      },
    ],
    payment_preferences: {
      auto_bill_outstanding: true,
      setup_fee_failure_action: "CONTINUE",
      payment_failure_threshold: 3,
    },
  };

  try {
    const response = await axios.post(
      'https://api.sandbox.paypal.com/v1/billing/plans',
      planData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json({ plan_id: response.data.id });
  } catch (error: any) {
    console.error('Error creating plan:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to create plan' },
      { status: 500 }
    );
  }
}