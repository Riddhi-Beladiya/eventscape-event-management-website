
import React from "react";

const page = () => {
  return (
    <div className="overflow-auto min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div
          className="relative bg-[url('https://www.shutterstock.com/image-photo/privacy-policy-security-concepts-protect-260nw-369815372.jpg')] bg-cover bg-center h-[40vh] flex items-center justify-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center shadow-lg">
            Privacy Policy
          </h1>
        </div>
      </div>

      {/* Privacy Policy Content */}
      <section className="py-16 px-8  m-4 mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">Introduction</h2>
        <p className="text-gray-700 leading-relaxed text-xl mb-6">
          Welcome to <span className="font-semibold">EventScape</span>. We respect your privacy and are committed 
          to protecting the personal information you share with us. This Privacy Policy explains how 
          we collect, use, and safeguard your information when you visit our website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">1. Information We Collect</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-xl pl-6">
          <li><span className="font-semibold">Personal Information:</span> Name, email, phone number when you register.</li>
          <li><span className="font-semibold">Event Preferences:</span> To provide personalized experiences.</li>
          <li><span className="font-semibold">Technical Data:</span> IP address, browser type for security and analytics.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-700 text-xl space-y-2 pl-6">
          <li>To provide and improve our event management services.</li>
          <li>To notify you about upcoming events, promotions, or important updates.</li>
          <li>To analyze user behavior and enhance our platform.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">3. Data Protection & Security</h2>
        <p className="text-gray-700 text-xl leading-relaxed">
          We use advanced security measures to protect your personal information. However, 
          no online service can be 100% secure, and we encourage users to take precautions.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">4. Sharing of Information</h2>
        <p className="text-gray-700 text-xl leading-relaxed">
          We do not sell or rent your personal data. We may share data with trusted partners 
          only for event-related services or legal compliance.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">5. Your Rights & Choices</h2>
        <p className="text-gray-700 text-xl leading-relaxed">
          You have the right to access, update, or delete your data. To request changes, 
          please contact us at <span className="text-blue-600">support@eventscape.com</span>.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">6. Updates to This Policy</h2>
        <p className="text-gray-700 text-xl leading-relaxed">
          We may update this Privacy Policy from time to time. Any changes will be posted 
          on this page with an updated effective date.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">7. Contact Us</h2>
        <p className="text-gray-700 text-xl leading-relaxed">
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="text-gray-800 font-semibold mt-2">📧 Email: support@eventscape.com</p>
        <p className="text-gray-800 font-semibold">📞 Phone: +91 98765 43210</p>

        {/* Footer */}
        <div className="mt-10 text-center text-gray-600 border-t ">
          <p>&copy; 2025 <span className="font-semibold">EventScape</span>. All Rights Reserved.</p>
        </div>
      </section>
    </div>
  );
};

export default page;
