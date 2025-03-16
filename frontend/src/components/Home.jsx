import React from "react";
import axios from "axios";
import { FaTrophy } from "react-icons/fa";

const Home = ({ users, onSelectUser }) => {
  const handleReputationUpdate = async (userId) => {
    console.log(userId);
    try {
      const response = await axios.post(`http://localhost:5000/api/users/${userId}/reputation`);
      console.log("Reputation updated:", response.data);
    } catch (error) {
      console.error("Error increasing reputation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white p-6 text-gray-900">
      <h1 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Select a User
      </h1>

      {users.length > 0 ? (
        <ul className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg divide-y divide-gray-200">
          {users.map((user) => (
            <li
              key={user._id}
              onClick={() => {
                handleReputationUpdate(user._id);
                onSelectUser(user._id);
              }}
              className="flex items-center justify-between p-4 hover:bg-gray-100 cursor-pointer transition-all duration-200"
            >
              <div>
                <p className="font-bold text-lg">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaTrophy className="text-yellow-500" />
                <span className="text-sm font-medium">{user.reputation}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600 mt-10">
          No users found. Use the search bar above to find users.
        </p>
      )}
    </div>
  );
};

export default Home;