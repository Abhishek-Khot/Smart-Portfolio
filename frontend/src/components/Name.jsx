import React, { useEffect, useState } from "react";
import axios from "axios";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";

const Name = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) return; // Ensure userId is available before fetching
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}/profile`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="h-[90vh] w-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {user ? (
        <div className="flex items-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 border border-gray-700 rounded shadow-lg p-16 max-w-5xl w-full scale-125">
          {/* Left Side: Text Content */}
          <div className="flex-1 text-left">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Hi There!
            </h1>
            <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              I'M {user.name}
            </h2>
            <p className="text-3xl text-gray-400 mb-6">{user.email}</p>
            {user.expertises && user.expertises.length > 0 && (
              <div className="mt-8">
                <h3 className="text-4xl font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                  {/* Expertises: */}
                </h3>
                <motion.div
                  className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typewriter
                    options={{
                      strings: user.expertises, // Directly pass the array of expertises
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 50,
                    }}
                  />
                </motion.div>
              </div>
            )}
          </div>

          {/* Right Side: Profile Photo */}
          <div className="flex-shrink-0 ml-16">
            <img
              src={user.profilePhoto}
              alt={`${user.name}'s profile`}
              className="w-72 h-72 rounded-full border-8 border-blue-500 shadow-md"
            />
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-2xl">
          {userId
            ? "Loading user details..."
            : "Please select a user from the SearchBar."}
        </p>
      )}
    </div>
  );
};

export default Name;
