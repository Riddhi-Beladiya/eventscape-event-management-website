import React from 'react';

const page = () => {
  return (
    <div className="overflow-auto min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative bg-[url('https://img.freepik.com/premium-photo/white-question-mark-sign-punctuation-blue-background-with-abstract-symbol-concept-faq-icon-problem-ask-answer-solution-message-help-support-customer-service-information-confusion-element_79161-2407.jpg?semt=ais_hybrid')] bg-cover bg-center h-[40vh] flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center shadow-lg">
            FAQs
          </h1>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl w-full px-10 py-12 mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <details className="bg-white p-4 rounded-xl shadow-md ">
            <summary className="font-semibold cursor-pointer text-2xl">How do I create an event on EventScape?</summary>
            <p className="text-gray-600 mt-2 text-xl">To create an event on EventScape, first sign in to your account. Then, navigate to the 'Create Event' section, where you can enter details such as event name, date, time, location, description, and ticket pricing. Once all required details are filled in, click 'Publish' to make your event live.</p>
          </details>
          <details className="bg-white p-4 rounded-xl shadow-md">
            <summary className="font-semibold cursor-pointer text-2xl">Is there a fee for listing events?</summary>
            <p className="text-gray-600 mt-2 text-xl">No, listing an event on EventScape is free. However, we offer premium features, such as event promotion, featured listings, and advanced analytics, which can be purchased to increase event visibility.</p>
          </details>
          <details className="bg-white p-4 rounded-xl shadow-md">
            <summary className="font-semibold cursor-pointer text-2xl">How can attendees register for an event?</summary>
            <p className="text-gray-600 mt-2 text-xl">Attendees can register for an event by visiting the event page and clicking the 'Register' button. They will need to provide their details and select a ticket type before proceeding to payment (if applicable). Upon successful registration, they will receive a confirmation email with their ticket details.</p>
          </details>
          <details className="bg-white p-4 rounded-xl shadow-md">
            <summary className="font-semibold cursor-pointer text-2xl">Can I edit my event details after publishing?</summary>
            <p className="text-gray-600 mt-2 text-xl">Yes, you can edit your event details even after publishing. Simply go to the 'Manage Events' section in your dashboard, select the event you want to update, and modify the necessary details. However, some changes, such as date or location, may require notifying registered attendees.</p>
          </details>
          <details className="bg-white p-4 rounded-xl shadow-md">
            <summary className="font-semibold cursor-pointer text-2xl">What payment methods are supported?</summary>
            <p className="text-gray-600 mt-2 text-xl">EventScape supports multiple payment methods, including credit/debit cards, UPI, PayPal, and digital wallets. These options ensure secure and convenient transactions for attendees purchasing tickets.</p>
          </details>
          <details className="bg-white p-4 rounded-xl shadow-md">
            <summary className="font-semibold cursor-pointer text-2xl">How do I cancel an event?</summary>
            <p className="text-gray-600 mt-2 text-xl">To cancel an event, go to the 'Manage Events' section in your dashboard, select the event you want to cancel, and click on 'Cancel Event'. All registered attendees will be notified of the cancellation, and refunds will be processed if applicable.</p>
          </details>
          <details className="bg-white p-4 rounded-xl shadow-md">
            <summary className="font-semibold cursor-pointer text-2xl">Can I offer discounts on tickets?</summary>
            <p className="text-gray-600 mt-2 text-xl">Yes, you can create discount codes in the event management settings. Set the discount percentage or fixed amount, specify the validity period, and share the code with attendees for promotional purposes.</p>
          </details>
          <details className="bg-white p-4 rounded-xl shadow-md">
            <summary className="font-semibold cursor-pointer text-2xl">How do I contact support?</summary>
            <p className="text-gray-600 mt-2 text-xl">You can contact our support team through the 'Help' section of the website. We offer support via email, live chat, and phone for any inquiries or issues related to your events.</p>
          </details>
          <details className="bg-white p-4 rounded-xl shadow-md">
            <summary className="font-semibold cursor-pointer text-2xl">What happens if an event is postponed?</summary>
            <p className="text-gray-600 mt-2 text-xl">If an event is postponed, all attendees will be notified via email with the new event date and details. Tickets will remain valid for the rescheduled date, and attendees can request refunds if they cannot attend.</p>
          </details>
          <details className="bg-white p-4 rounded-xl shadow-md">
            <summary className="font-semibold cursor-pointer text-2xl">Can I host virtual events on EventScape?</summary>
            <p className="text-gray-600 mt-2 text-xl">Yes, EventScape supports virtual events. When creating an event, choose 'Virtual Event' and provide the necessary streaming links or online meeting details. Attendees will receive the access link upon registration.</p>
          </details>
          <details className="bg-white p-4 rounded-xl shadow-md">
            <summary className="font-semibold cursor-pointer text-2xl">How do I promote my event?</summary>
            <p className="text-gray-600 mt-2 text-xl">EventScape offers multiple promotion options, including social media integration, email campaigns, paid advertisements, and featured event listings to enhance visibility and attract attendees.</p>
          </details>
          <details className="bg-white p-4 rounded-xl shadow-md">
            <summary className="font-semibold cursor-pointer text-2xl">Is there a refund policy for tickets?</summary>
            <p className="text-gray-600 mt-2 text-xl">Refund policies vary by event. Some organizers offer full or partial refunds within a certain period before the event. Check the specific event page for refund details, or contact the organizer for clarification.</p>
          </details>
          <details className="bg-white p-4 rounded-xl shadow-md">
            <summary className="font-semibold cursor-pointer text-2xl">How do I manage event attendees?</summary>
            <p className="text-gray-600 mt-2 text-xl">You can track registrations, view attendee details, send updates, and manage check-ins from the event dashboard. EventScape also allows you to export attendee lists for better event management.</p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default page;
