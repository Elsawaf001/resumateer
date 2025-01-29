"use client"
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import React from 'react'
import PayPalSubscribeButton from './PayPalSubscribeButton'

function PaypalContainer() {
  return (
    <PayPalScriptProvider
    options={{
      "clientId": "AQKqyf_VJgQXCoedvKVGMf_4dwgjMJfDSQs2zfIEVI2atJ6wYXpilQJPGxY6mTBaCUz0zVJw9oPhHSPS",
      currency: "USD",
      intent: "subscription",
      vault: true,
    }}
  >
    
<PayPalSubscribeButton/>
  </PayPalScriptProvider>
  )
}



export default PaypalContainer

