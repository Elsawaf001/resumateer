//@ts-nocheck
import React from 'react'
import {FUNDING , PayPalButtons , PayPalScriptProvider} from "@paypal/react-paypal-js"

interface PaypalButtonProps{
    amount : string ,
    onSuccess : (detail : any) => void
}
const initialOptions = {
  clientId: "EGz5l0KxvCPHbb_qvuxrmrjwxHHMGP-FMn5HeNt430dBtR50FM_wqNTwbBYylv1OcYaA1UpgyPwmc8zT",
  currency: "USD",
  intent: "capture",
};
function PaypalButton({amount , onSuccess} : PaypalButtonProps) {
  return (
    <PayPalScriptProvider options={initialOptions} >
      <PayPalButtons  fundingSource={FUNDING.PAYPAL} createOrder={(data , action) => {
        return action.order.create({
          purchase_units : [{
            amount : {
              value : amount
            }
          }]
        })

      }} 
      
      onApprove = {(data , actions) => {
        return actions.order?.capture().then((details) => {
          alert(`Transaction completed by `)
          onSuccess(details)

        })
      }}
      />
    </PayPalScriptProvider>
  )
}

export default PaypalButton