import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsAndConditions = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Card className="max-w-3xl w-full p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-white">
          <p>
            Welcome to Resumateer! These Terms and Conditions govern your use of our platform. By accessing or using Resumateer, you agree to comply with these terms.
          </p>

          <h2 className="text-xl font-semibold mt-4 text-lime-400">1. Use of the Platform</h2>
          <p>
            Resumateer provides tools for CV building and AI-powered features such as Lead Genie. By using our platform, you agree to use it only for lawful purposes and in accordance with these terms.
          </p>

          <h2 className="text-xl font-semibold mt-4 text-lime-400">2. Free Tier and Tokens</h2>
          <p>
            Resumateer offers a free tier with 10,000 tokens for AI generations across all features. Tokens are deducted based on usage as calculated by OpenAI’s token system. Tokens do not expire. After consuming all free tokens, you may subscribe to our premium plan for $9.99 per month for unlimited access.
          </p>

          <h2 className="text-xl font-semibold mt-4 text-lime-400">3. Subscription and Billing</h2>
          <p>
            By subscribing to the premium plan, you agree to provide accurate payment information. Subscriptions renew automatically unless canceled prior to the renewal date. No refunds will be provided for unused periods.
          </p>

          <h2 className="text-xl font-semibold mt-4 text-lime-400">4. Intellectual Property</h2>
          <p>
            All content, features, and functionality on Resumateer, including but not limited to text, graphics, and software, are the exclusive property of Resumateer and are protected by applicable intellectual property laws.
          </p>

          <h2 className="text-xl font-semibold mt-4 text-lime-400">5. User Responsibilities</h2>
          <p>
            You agree to provide accurate information when creating an account and to keep your login credentials secure. You are responsible for all activities that occur under your account.
          </p>

          <h2 className="text-xl font-semibold mt-4 text-lime-400">6. Limitation of Liability</h2>
          <p>
            Resumateer is provided "as is" without warranties of any kind. We are not liable for any damages resulting from the use or inability to use our platform, including data loss or service interruptions.
          </p>

          <h2 className="text-xl font-semibold mt-4 text-lime-400">7. Modifications to the Terms</h2>
          <p>
            We may update these Terms and Conditions from time to time. Any changes will be posted on this page with an updated effective date. Continued use of the platform after changes are made constitutes your acceptance of the updated terms.
          </p>

          <h2 className="text-xl font-semibold mt-4 text-lime-400">8. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account if you violate these terms or engage in any unlawful activity on our platform.
          </p>

          <h2 className="text-xl font-semibold mt-4 text-lime-400">9. Contact Us</h2>
          <p>
            If you have any questions or concerns about these Terms and Conditions, please contact us at support@resumateer.com.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsAndConditions;
