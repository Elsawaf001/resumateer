// src/app/providers.tsx
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PayPalScriptProvider
      options={{
        "clientId": "AQKqyf_VJgQXCoedvKVGMf_4dwgjMJfDSQs2zfIEVI2atJ6wYXpilQJPGxY6mTBaCUz0zVJw9oPhHSPS",
        currency: "USD",
        intent: "subscription",
        vault: true,
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}