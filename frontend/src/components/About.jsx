import React, { useEffect, useState } from "react";
import axios from "axios";

const About = ({ userId }) => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        if (!userId) return; // Ensure userId is available before fetching
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}/about`
        );
        setAbout(response.data);
      } catch (error) {
        console.error("Error fetching About data:", error);
      }
    };

    fetchAbout();
  }, [userId]);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-10">
      {about ? (
        <>
          {/* About Me Section */}
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-12 drop-shadow-lg shadow-white">
            About Me
          </h1>
          <p
            className="text-xl text-gray-300 max-w-7xl px-6 text-center leading-loose mb-20 drop-shadow-md shadow-white"
          >
            {about.description || "No description available"}
          </p>

          {/* Skillset Section */}
          <h2 className="text-5xl font-bold bg-gradient-to-r from-red-400 via-yellow-500 to-purple-500 bg-clip-text text-transparent mb-8 drop-shadow-lg shadow-white">
            Professional Skillset
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 w-11/12 max-w-7xl">
            {about.skillset.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-20 w-36 md:h-24 md:w-48 border border-gray-600 rounded-lg bg-gray-700 text-lg font-semibold text-gray-100 shadow-md hover:shadow-2xl hover:scale-110 transition-transform duration-300 hover:bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-500"
              >
                {skill}
              </div>
            ))}
          </div>

          {/* Tools Section */}
          <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 bg-clip-text text-transparent mt-16 mb-8 drop-shadow-lg shadow-white">
            Tools I Use
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 w-11/12 max-w-7xl">
            {about.tools.map((tool, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-20 w-36 md:h-24 md:w-48 border border-gray-600 rounded-lg bg-gray-700 text-lg font-semibold text-gray-100 shadow-md hover:shadow-2xl hover:scale-110 transition-transform duration-300 hover:bg-gradient-to-r from-teal-500 via-blue-600 to-green-500"
              >
                {tool}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-400 text-lg mt-20">
          {userId
            ? "Loading About information..."
            : "Please select a user from the SearchBar."}
        </p>
      )}
    </div>
  );
};

export default About;
