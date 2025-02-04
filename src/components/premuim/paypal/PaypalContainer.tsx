"use client"
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import React from 'react'
import PayPalSubscribeButton from './PayPalSubscribeButton'

function PaypalContainer() {
  return (
    <PayPalScriptProvider
    options={{
      "clientId": "AYASVYCxqJX8F-QNcphf3DzNUHIcZRaOalHDhCVcAfrMPqBG-4L_idvcvTc0PtRpmV8cUq6FX6OVWued",
      currency: "USD",
      intent: "subscription",
      vault : true ,
      

    }}
  >
    
<PayPalSubscribeButton/>
  </PayPalScriptProvider>
  )
}



export default PaypalContainer

