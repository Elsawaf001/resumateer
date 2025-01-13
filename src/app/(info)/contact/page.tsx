import React from "react";

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
        <span className="text-lg font-semibold">elsawaf001@gmail.com</span>
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
