import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import Blogs from "./components/Blogs";
import Resume from "./components/Resume";
import SocialLinks from "./components/SocialLinks";
import Name from "./components/Name";
import PortfolioLandingPage from "./components/PortfolioLandingPage";
import axios from "axios";

const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users as searchTerm changes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (searchTerm.trim()) {
          // Only search if searchTerm is not empty
          const response = await axios.get("http://localhost:5000/api/users", {
            params: { name: searchTerm },
          });
          setUsers(response.data);
        } else {
          setUsers([]); // Clear results when searchTerm is empty
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    // Add a small delay to prevent too many requests (debouncing)
    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(delayDebounce); // Cleanup debounce timer
  }, [searchTerm]);

  return (
    <Router>
      <Navbar />
      <div className="mt-16">
        <Routes>
          {/* Combine Home with Search Bar and User List */}
          <Route
            path="/"
            element={
              <>
                {/* Search Bar */}
                {/* Search Bar */}
                <div className="h-40 flex flex-col items-center justify-center bg-white-900 shadow-md">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search users by name"
                    className="border-2 border-gray-300 rounded-full px-6 py-3 w-3/4 md:w-1/2 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 text-gray-700 shadow-sm transition-all duration-200"
                  />
                </div>

                {/* Display Users */}
                {/* <div className="bg-white py-6">
              {users.length > 0 ? (
                <ul className="w-1/2 mx-auto border rounded-lg shadow-lg divide-y divide-gray-200 max-h-72 overflow-y-auto">
                  {users.map((user) => (
                    <li
                      key={user.id}
                      className="p-4 cursor-pointer hover:bg-gray-100 text-gray-800"
                      onClick={() => setSelectedUserId(user.id)}
                    >
                      {user.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center mt-4 text-gray-500">
                  {searchTerm
                    ? "No users found."
                    : "Search users to see results."}
                </p>
              )}
            </div> */}

                {/* Home Component */}
                <Home users={users} onSelectUser={setSelectedUserId} />
              </>
            }
          />
          <Route path="/home" element={<PortfolioLandingPage />} />
          <Route path="/about" element={<About userId={selectedUserId} />} />
          <Route path="/profile" element={<Name userId={selectedUserId} />} />
          <Route
            path="/projects"
            element={<Projects userId={selectedUserId} />}
          />
          <Route path="/blogs" element={<Blogs userId={selectedUserId} />} />
          <Route path="/resume" element={<Resume userId={selectedUserId} />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/social-links"
            element={<SocialLinks userId={selectedUserId} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
