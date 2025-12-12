// src/pages/ThankYouPage.tsx
import { Link } from "@inertiajs/react";
import React from "react";


const ThankYouPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-10 text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Thank You!</h1>
        <p className="text-gray-700 mb-6">
          Your order has been placed successfully. We’ll notify you once it’s shipped.
        </p>
        <Link
          href="/products"
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
