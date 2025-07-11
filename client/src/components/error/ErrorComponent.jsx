import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

export default function ErrorPage({
  code,
  message ,
  status ,
  onRetry = () => window.location.reload(),
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-white to-blue-100 px-4 py-12">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 sm:p-10 text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50">
            <FiAlertTriangle className="text-red-500 text-5xl" />
          </span>
        </div>
        <h1 className="text-5xl font-extrabold text-red-600 mb-2">{code}</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
          {message}
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-6">{status}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 px-6 py-2 rounded-full bg-red-600 text-white cursor-pointer font-bold hover:bg-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 shadow"
          >
            Try Again
          </button>
        )}
      </div>
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.7s ease;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
}
