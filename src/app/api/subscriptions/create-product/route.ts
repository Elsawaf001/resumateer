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

export async function POST() {
  const accessToken = await getPayPalAccessToken();

  const productData = {
    name: "Monthly Service",
    description: "Monthly subscription service",
    type: "SERVICE", // Can be "SERVICE", "PHYSICAL", or "DIGITAL"
    category: "SOFTWARE", // Category of the product
  };

  try {
    const response = await axios.post(
      'https://api.sandbox.paypal.com/v1/catalogs/products',
      productData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json({ product_id: response.data.id });
  } catch (error: any) {
    console.error('Error creating product:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}