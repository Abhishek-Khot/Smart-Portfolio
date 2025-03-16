import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        params: { name: searchTerm },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Search for Users
      </h1>
      <div className="flex flex-col items-center w-full max-w-lg">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter a name to search"
          className="border-2 border-gray-300 rounded-lg px-4 py-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700 transition-all"
        >
          Search
        </button>
      </div>

      {/* Scrollable container for results */}
      <ul className="mt-8 w-full max-w-lg bg-white shadow-lg rounded-lg divide-y divide-gray-200 max-h-72 overflow-y-auto">
        {users.length === 0 ? (
          <li className="p-4 text-center text-gray-500">No users found</li>
        ) : (
          users.map((user) => (
            <li
              key={user._id}
              onClick={() => onSelectUser(user._id)}
              className="p-4 hover:bg-gray-100 cursor-pointer text-gray-800"
            >
              {user.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SearchBar;