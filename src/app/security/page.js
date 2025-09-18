import React from 'react';
import { FaShieldAlt, FaLock, FaUserShield } from 'react-icons/fa';

const SecurityPage = () => {
  return (
    <div className='overflow-auto min-h-screen bg-gray-100'>
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative bg-[url('https://zd-brightspot.s3.us-east-1.amazonaws.com/wp-content/uploads/2022/02/24114642/shutterstock_1706226751-1.jpg')] bg-cover bg-center h-[40vh] flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center shadow-lg">
            Security & Privacy
          </h1>
        </div>
      </div>

      {/* Security Features */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Our Security Measures</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <FaShieldAlt className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Data Encryption</h3>
            <p className="text-gray-600">We use end-to-end encryption to protect your sensitive data.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <FaLock className="text-green-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
            <p className="text-gray-600">Multi-factor authentication enhances account security.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <FaUserShield className="text-purple-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">User Privacy</h3>
            <p className="text-gray-600">We never share your personal data with third parties.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <details className="bg-white p-4 rounded-xl shadow-md">
            <summary className="font-semibold cursor-pointer">How do you protect user data?</summary>
            <p className="text-gray-600 mt-2">We use advanced encryption and secure authentication protocols.</p>
          </details>
          <details className="bg-white p-4 rounded-xl shadow-md">
            <summary className="font-semibold cursor-pointer">Can I enable two-factor authentication?</summary>
            <p className="text-gray-600 mt-2">Yes, 2FA is available in your account settings for added security.</p>
          </details>
          <details className="bg-white p-4 rounded-xl shadow-md">
            <summary className="font-semibold cursor-pointer">Do you sell user data?</summary>
            <p className="text-gray-600 mt-2">No, we strictly protect user privacy and never sell personal data.</p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;