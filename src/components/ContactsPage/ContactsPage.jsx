import React from 'react'

export default function ContactsPage() {
  return (
    <div className="bg-gray-100 py-12">
    <div className="container mx-auto space-y-12 px-4">
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Manage contacts"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-8 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">Organize Your Contacts</h2>
          <p className="text-lg text-gray-700">
            Easily manage your friends and colleagues contact details in one place.
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col md:flex-row-reverse items-center">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Track emails"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:pr-8 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">Track Your Emails</h2>
          <p className="text-lg text-gray-700">
            Keep logs of your email communications and never miss important details.
          </p>
        </div>
      </div>

      {/* Section 3 */}
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Phone logs"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-8 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">Monitor Phone Logs</h2>
          <p className="text-lg text-gray-700">
            Access call histories and stay on top of your important conversations.
          </p>
        </div>
      </div>
    </div>
  </div>
);
}
