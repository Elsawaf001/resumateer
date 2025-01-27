import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RefundPolicy() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="max-w-4xl w-full shadow-lg p-6">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4 text-lime-400">Refund Policy</h1>
          <p className="mb-4 ">
            At Resumateer, we strive to provide the highest level of satisfaction with our services. This Refund Policy outlines the terms under which refunds may be issued for purchases made on our platform.
          </p>

          <h2 className="text-xl font-semibold mb-3  text-lime-400">Free Tier Usage</h2>
          <p className="mb-4 ">
            Resumateer offers a free tier that includes 10,000 tokens to use all features of the platform. These tokens can be used for AI-powered features such as CV generation, cover letter creation, and salary estimation reports. Tokens do not expire, and any unused tokens remain available until consumed. Refunds are not applicable to the free tier as it does not involve any monetary transactions.
          </p>

          <h2 className="text-xl font-semibold mb-3  text-lime-400">Subscription Plans</h2>
          <p className="mb-4 ">
            Once a user has exhausted their free tokens, they may choose to subscribe to our monthly plan for $9.99, which provides unlimited access to all Resumateer features. Due to the digital nature of our services, refunds for the subscription fee are generally not provided. However, exceptions may be made under the following circumstances:
          </p>
          <ul className="list-disc list-inside mb-4 ">
            <li>Technical issues that prevent access to Resumateer services for an extended period.</li>
            <li>Duplicate charges due to payment processing errors.</li>
            <li>Unauthorized transactions reported promptly after discovery.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-3  text-lime-400">Refund Process</h2>
          <p className="mb-4 ">
            To request a refund, please contact our support team at <a href="mailto:support@resumateer.com" className="text-blue-500 underline">support@resumateer.com</a>. Include the following details in your request:
          </p>
          <ul className="list-disc list-inside mb-4 ">
            <li>Your account email address.</li>
            <li>A detailed explanation of the issue or reason for the refund request.</li>
            <li>Any supporting documentation, such as payment receipts or error messages.</li>
          </ul>
          <p className="mb-4 ">
            Refund requests will be reviewed within 7 business days. Approved refunds will be processed to the original payment method within 5-10 business days, depending on your financial institution.
          </p>

          <h2 className="text-xl font-semibold mb-3  text-lime-400">Non-Refundable Conditions</h2>
          <p className="mb-4 ">
            Refunds will not be provided in the following cases:
          </p>
          <ul className="list-disc list-inside mb-4 ">
            <li>Change of mind after purchasing a subscription.</li>
            <li>Failure to use the available features during the subscription period.</li>
            <li>Misuse or violation of our terms of service.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-3  text-lime-400">Contact Us</h2>
          <p className="">
            If you have any questions or need further assistance regarding our Refund Policy, please do not hesitate to contact us at <a href="mailto:support@resumateer.com" className="text-blue-500 underline">support@resumateer.com</a>. Our support team is here to help.
          </p>

          <div className="mt-6 text-center">
            <Link href={"/"}>
            <Button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600">
              Back to Home
            </Button>
            </Link>
           
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
