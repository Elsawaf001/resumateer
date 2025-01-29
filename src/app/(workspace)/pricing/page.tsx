


import PayPalSubscribeButton from "@/components/premuim/paypal/PayPalSubscribeButton";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Card from "./Card";
import { auth } from "@clerk/nextjs/server";

export default async function PricingPage() {
  const userId = auth();
  if (await userId) {
    return <Card />;
  }
  

}