import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Card className="max-w-3xl w-full p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-white">
          <p>
            At Resumateer, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
          </p>

          <h2 className="text-xl font-semibold mt-4 text-lime-400">1. Information We Collect</h2>
          <p>
            We collect personal information that you provide directly to us, such as your name, email address, and payment details. Additionally, we may collect usage data to improve our services.
          </p>

          <h2 className="text-xl font-semibold mt-4 text-lime-400">2. How We Use Your Information</h2>
          <p>
            Your information is used to provide and improve our services, process payments, and communicate with you. We may also use your data to ensure compliance with legal obligations.
          </p>

          <h2 className="text-xl font-semibold mt-4 text-lime-400">3. Data Sharing and Security</h2>
          <p>
            We do not share your personal information with third parties except as necessary to provide our services or comply with legal requirements. We implement robust security measures to protect your data.
          </p>

          <h2 className="text-xl font-semibold mt-4 text-lime-400">4. Cookies and Tracking</h2>
          <p>
            Resumateer uses cookies to enhance your user experience. You can adjust your browser settings to manage cookie preferences.
          </p>

          <h2 className="text-xl font-semibold mt-4 text-lime-400">5. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. To exercise these rights, please contact us at support@resumateer.com.
          </p>

          <h2 className="text-xl font-semibold mt-4 text-lime-400">6. Changes to this Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of the platform constitutes acceptance of the revised policy.
          </p>

          <h2 className="text-xl font-semibold mt-4 text-lime-400">7. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at support@resumateer.com.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
