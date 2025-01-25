import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="max-w-3xl w-full p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Welcome to Resumateer! This Privacy Policy outlines how we collect, use, and protect your personal information when you use our platform. By using Resumateer, you agree to the terms outlined in this policy.
          </p>

          <h2 className="text-xl font-semibold mt-4">1. Information We Collect</h2>
          <p>
            We collect the following types of information:
            <ul className="list-disc pl-5 space-y-2">
              <li>Personal details such as your name, email address, and payment information when you subscribe to our premium plan.</li>
              <li>Usage data, including the number of tokens consumed and features accessed on our platform.</li>
            </ul>
          </p>

          <h2 className="text-xl font-semibold mt-4">2. How We Use Your Information</h2>
          <p>
            Your information is used to:
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide and improve our services, including AI-based CV building and lead generation features.</li>
              <li>Track token consumption and manage subscription services.</li>
              <li>Communicate with you regarding updates, support, and promotional offers.</li>
            </ul>
          </p>

          <h2 className="text-xl font-semibold mt-4">3. Free Tier and Tokens</h2>
          <p>
            Resumateer offers a free tier with 10,000 tokens that can be used for AI generations across all features. Tokens are deducted based on usage as determined by OpenAI’s token system. These tokens do not expire. Once consumed, users may subscribe to our premium plan for $9.99 per month to enjoy unlimited access to all features.
          </p>

          <h2 className="text-xl font-semibold mt-4">4. Data Security</h2>
          <p>
            We prioritize your data security by implementing industry-standard measures to protect your personal and payment information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-xl font-semibold mt-4">5. Sharing Your Information</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. Your data is only shared with trusted third-party services necessary to provide our platform’s functionality, such as payment processors.
          </p>

          <h2 className="text-xl font-semibold mt-4">6. Your Rights</h2>
          <p>
            You have the right to:
            <ul className="list-disc pl-5 space-y-2">
              <li>Access and update your personal information.</li>
              <li>Request the deletion of your account and associated data.</li>
              <li>Withdraw consent for data usage where applicable.</li>
            </ul>
          </p>

          <h2 className="text-xl font-semibold mt-4">7. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
          </p>

          <h2 className="text-xl font-semibold mt-4">8. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at elsawaf001@gmail.com.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
