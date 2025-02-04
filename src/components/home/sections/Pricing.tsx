import React from "react";

export default function PricingSection() {
  return (
    <section className=" text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-lime-400 mb-6">Resumateer Pricing</h1>
        <p className="text-lg mb-12">
          we offer all features for free with a limit of 10,000 tokens. Upgrade to premium for unlimited access.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="border border-gray-700 rounded-lg p-8 bg-gray-800 hover:shadow-lg">
            <h2 className="text-2xl font-semibold text-lime-400 mb-4">Free Tier</h2>
            <p className="mb-6">all features limited use by 10,000 tokens.</p>
            <ul className="mb-6 text-left space-y-3">
              {[
                "CV Builder",
                "AI CV Builder",
                "Cover Letter Creator",
                "CV Optimization per Job Description",
                "Job Leads",
                "Salary Estimate Report",
                "ATS Enhancement",
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <span className="inline-block w-4 h-4 mr-2 bg-lime-400 rounded-full"></span>
                  {feature}
                </li>
              ))}
            </ul>
            <div>
              <span className="text-lg font-semibold">Free As long as you have free tokens</span>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="border border-gray-700 rounded-lg p-8 bg-gray-800 hover:shadow-lg">
            <h2 className="text-2xl font-semibold text-lime-400 mb-4">Premium Tier</h2>
            <p className="mb-6">Unlimited access to all features for just $10/month.</p>
            <ul className="mb-6 text-left space-y-3">
              {[
                "CV Builder",
                "AI CV Builder",
                "Cover Letter Creator",
                "CV Optimization per Job Description",
                "Job Leads",
                "Salary Estimate Report",
                "ATS Enhancement",
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <span className="inline-block w-4 h-4 mr-2 bg-lime-400 rounded-full"></span>
                  {feature}
                </li>
              ))}
            </ul>
            <div>
              <p className="text-lg font-semibold mb-2">$10 / month</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
