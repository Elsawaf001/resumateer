import React from "react";
import type { Metadata } from "next";

// Contact Us Page Metadata
export const contactMetadata: Metadata = {
  title: "Contact Us - Resumateer",
  description: "Get in touch with the Resumateer team for support, inquiries, or feedback. We're here to help!",
  keywords: "contact Resumateer, support, inquiries, feedback, help",
  openGraph: {
    title: "Contact Us - Resumateer",
    description: "Reach out to Resumateer for assistance or to share your feedback.",
    url: "https://www.resumateer.com/contact",
    siteName: "Resumateer",
    images: [
      {
        url: "https://www.resumateer.com/images/contact-og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Resumateer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Resumateer",
    description: "Get support or share your feedback with the Resumateer team.",
    images: ["https://www.resumateer.com/images/contact-twitter-card.png"],
  },
};
const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-semibold mb-4">Contact Us</h1>
      
      <p className="text-lg mb-6">
        We’re here to help! If you have any questions, suggestions, or need assistance with creating your resume or cover letter, feel free to reach out to us. Our team at Resumateer is ready to assist you.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Email Us</h2>
      <p className="text-lg mb-6">
        You can contact us directly via email at:
      </p>

      <div className="flex items-center mb-6">
        <span className="text-lg font-semibold">support@resumateer.com</span>
      </div>

      <h2 className="text-2xl font-semibold mb-3">Response Time</h2>
      <p className="mb-6">
        We strive to respond to all inquiries within 1-2 business days. We appreciate your patience!
      </p>

      <h2 className="text-2xl font-semibold mb-3">Follow Us</h2>
      <p className="mb-6">
        Stay connected and updated by following us on our social media channels:
      </p>
      {/* <div className="flex space-x-4">
        <a href="https://facebook.com" className="text-blue-600">Facebook</a>
        <a href="https://twitter.com" className="text-blue-400">Twitter</a>
        <a href="https://linkedin.com" className="text-blue-800">LinkedIn</a>
      </div> */}
    </div>
  );
};

export default ContactUs;
