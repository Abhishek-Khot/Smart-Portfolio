import React from "react";
import { useNavigate } from "react-router-dom";

const PortfolioLandingPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/"); // Update this route as needed
  };

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white min-h-screen text-gray-900">
      {/* Main Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
          Build Your Professional Presence
          <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Manage and Update Your Portfolio with Ease
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-600 mt-6">
          Develop a professional platform to display projects, skills, and
          personal achievements. Effortlessly manage and update content to enhance
          your online visibility and credibility.
        </p>
        <div className="mt-10">
          <button
            onClick={handleButtonClick}
            className="relative font-extrabold text-xl tracking-wide bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 active:from-blue-800 active:to-blue-700 text-white px-10 py-6 rounded-full shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 hover:scale-[1.02] active:scale-[0.98]"
          >
            Search User
          </button>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">CUSTOMIZABLE</div>
            <div className="text-gray-600 mt-1">Manage content effortlessly</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">DYNAMIC</div>
            <div className="text-gray-600 mt-1">Showcase skills and projects</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">PROFESSIONAL</div>
            <div className="text-gray-600 mt-1">Enhance your visibility</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PortfolioLandingPage;