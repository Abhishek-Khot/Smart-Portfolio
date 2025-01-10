// src/components/PortfolioLandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const PortfolioLandingPage = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      {/* Header */}
      {/* <header className="flex items-center py-4 px-6 bg-gray-800 shadow-md">
        <div className="text-2xl font-bold text-blue-400">SmartTrack</div>
      </header> */}

      {/* Main Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-100 tracking-tight">
          Build Your Professional Presence
          <span className="block mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent leading-tight">
            Manage and Update Your Portfolio with Ease
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-400 mt-6">
          Develop a professional platform to display projects, skills, and
          personal achievements. Effortlessly manage and update content to enhance
          your online visibility and credibility.
        </p>
        <div className="mt-10">
          <button
            onClick={handleSearchClick}
            className="relative font-extrabold text-xl tracking-wide bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-indigo-700 active:from-blue-700 active:to-indigo-800 text-white px-10 py-6 rounded-full shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 hover:scale-[1.02] active:scale-[0.98]"
          >
            Search the User
          </button>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 text-center">
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              CUSTOMIZABLE
            </div>
            <div className="text-gray-400 mt-1">Manage content effortlessly</div>
          </div>
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              DYNAMIC
            </div>
            <div className="text-gray-400 mt-1">Showcase skills and projects</div>
          </div>
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
              PROFESSIONAL
            </div>
            <div className="text-gray-400 mt-1">Enhance your visibility</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PortfolioLandingPage;
