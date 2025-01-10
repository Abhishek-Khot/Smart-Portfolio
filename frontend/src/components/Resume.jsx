import React, { useEffect, useState } from "react";
import axios from "axios";

const Resume = ({ userId }) => {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}/resume`
        );
        setResume(response.data.resume); // The normalized photoPath or URL for the resume
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };

    if (userId) {
      fetchResume();
    }
  }, [userId]);

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center justify-center">
      {resume ? (
        <div className="w-11/12 max-w-5xl bg-white shadow-lg rounded-lg p-8 text-center bg-gradient-to-b">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
            RESUME
          </h1>
          <h1 className="opacity-0"> f</h1>
          {/* If the resume is an image, render it on screen */}
          <div className="mt-4 mb-6">
            {resume.endsWith(".jpg") ||
            resume.endsWith(".png") ||
            resume.endsWith(".jpeg") ? (
              <div className="mb-6">
                <img
                  src={resume} // The normalized resume image URL
                  alt="Resume"
                  className="w-full max-w-md mx-auto h-full rounded-lg shadow-md"
                />
              </div>
            ) : (
              <div className="mb-6">
                <p className="text-gray-600">
                  No preview available for the resume.
                </p>
              </div>
            )}

            {/* Download Option */}
            <a
              href={resume}
              download
              target="_blank"
              className="inline-block bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Download Resume
            </a>
          </div>
        </div>
      ) : (
        <p className="text-gray-300 text-xl font-semibold">Loading resume...</p>
      )}
    </div>
  );
};

export default Resume;
