import React, { useState } from "react";
import axios from "axios";

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const fetchUserDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${id}`);
      setSelectedUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Search Section */}
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users by name"
        />
        <button onClick={handleSearch}>Search</button>

        {/* Users List */}
        <ul>
          {users.map((user) => (
            <li
              key={user._id}
              onClick={() => fetchUserDetails(user._id)}
              style={{ cursor: "pointer", margin: "10px 0" }}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      {/* User Details Section */}
      {selectedUser && (
        <div
          style={{ border: "1px solid #ccc", padding: "20px", width: "400px" }}
        >
          {/* Profile Photo */}
          {/* Profile Photo */}
          {selectedUser.profilePhoto ? (
            <img
              src={`http://localhost:5000/${selectedUser.profilePhoto}`}
              alt={`${selectedUser.name}'s Profile`}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          ) : (
            <p>Profile photo not available</p>
          )}
          <h2>{selectedUser.name}</h2>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>

          {/* Homepage Information */}
          {selectedUser.homepage && (
            <div>
              <h3>Homepage</h3>
              <p>
                <strong>Portfolio Name:</strong>{" "}
                {selectedUser.homepage.portfolioName || "N/A"}
              </p>
              <p>
                <strong>User Name:</strong>{" "}
                {selectedUser.homepage.userName || "N/A"}
              </p>
              <p>
                <strong>Expertise:</strong>{" "}
                {selectedUser.homepage.expertise.join(", ") || "N/A"}
              </p>
            </div>
          )}

          {/* About Section */}
          {selectedUser.about && (
            <div>
              <h3>About</h3>
              <p>
                <strong>Description:</strong>{" "}
                {selectedUser.about.description || "N/A"}
              </p>
              <p>
                <strong>Skillset:</strong>{" "}
                {selectedUser.about.skillset.join(", ") || "N/A"}
              </p>
              <p>
                <strong>Tools:</strong>{" "}
                {selectedUser.about.tools.join(", ") || "N/A"}
              </p>
            </div>
          )}

          {/* Projects */}
          {selectedUser.projects && selectedUser.projects.length > 0 && (
            <div>
              <h3>Projects</h3>
              {selectedUser.projects.map((project, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <p>
                    <strong>Name:</strong> {project.name}
                  </p>
                  <p>
                    <strong>Description:</strong> {project.description}
                  </p>
                  {project.photo && (
                    <img
                      src={`http://localhost:5000/${project.photo}`}
                      alt={project.name}
                      style={{
                        width: "100%",
                        maxHeight: "200px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <p>
                    <strong>GitHub:</strong>{" "}
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.githubLink}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* blogs*/}
          {selectedUser.blogs && selectedUser.blogs.length > 0 && (
            <div>
              <h3>Blogs</h3>
              {selectedUser.blogs.map((blog, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <p>
                    <strong>Topic:</strong> {blog.topic}
                  </p>
                  <p>
                    <strong>Technology:</strong> {blog.technology}
                  </p>
                  <p>
                    <strong>Title:</strong> {blog.title}
                  </p>
                  <p>
                    <strong>Description:</strong> {blog.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Resume */}
          {selectedUser.resume && selectedUser.resume.photoPath ? (
            <div>
              <h3>Resume</h3>
              <img
                src={`http://localhost:5000${selectedUser.resume.photoPath}`} // Dynamically use the photoPath field
                alt="Resume"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          ) : (
            <p>No resume photo uploaded.</p>
          )}

          {/* Social Links */}
          {selectedUser.socialLinks && selectedUser.socialLinks.length > 0 && (
            <div>
              <h3>Social Links</h3>
              <ul>
                {selectedUser.socialLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Contact Form */}
          <footer>
            <h3>Contact Us</h3>
            <form>
              <label htmlFor="name">Name:</label>
              <br />
              <input id="name" type="text" placeholder="Enter your name" />
              <br />
              <label htmlFor="companyName">Company Name:</label>
              <br />
              <input
                id="companyName"
                type="text"
                placeholder="Enter company name"
              />
              <br />
              <label htmlFor="description">Description:</label>
              <br />
              <textarea
                id="description"
                placeholder="Enter description"
                rows={3}
              ></textarea>
              <br />
              <label htmlFor="oaLink">OA Link:</label>
              <br />
              <input id="oaLink" type="text" placeholder="Enter OA link" />
              <br />
              <button type="submit">Submit</button>
            </form>
          </footer>
        </div>
      )}
    </div>
  );
};

export default SearchUsers;


// import React, { useState } from "react";
// import axios from "axios";
// import { FaUserCircle } from "react-icons/fa";

// const SearchUsers = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const handleSearch = async (term) => {
//     setSearchTerm(term);
//     try {
//       const response = await axios.get("http://localhost:5000/api/users", {
//         params: { name: term },
//       });
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const fetchUserDetails = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/users/${id}`);
//       setSelectedUser(response.data);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800">
//       {/* Header */}
//       <header className="flex items-center justify-between p-5 bg-blue-500 text-white shadow-md">
//         <h1 className="text-2xl font-bold">User Directory</h1>
//         <FaUserCircle
//           size={40}
//           className="cursor-pointer"
//           onClick={() => setSelectedUser(null)}
//         />
//       </header>

//       <main className="flex flex-col lg:flex-row gap-5 p-5">
//         {/* Left Column: Search and Results */}
//         <div className="flex-1 bg-white p-5 rounded-md shadow-md">
//           <div className="mb-5">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => handleSearch(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Search users by name"
//             />
//           </div>

//           {/* Matching Results */}
//           <ul>
//             {users.map((user) => (
//               <li
//                 key={user._id}
//                 className="p-3 border-b border-gray-300 cursor-pointer hover:bg-blue-100"
//                 onClick={() => fetchUserDetails(user._id)}
//               >
//                 {user.name}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Right Column: Selected User Details */}
//         {selectedUser && (
//           <div className="flex-1 bg-white p-5 rounded-md shadow-md">
//             {/* Profile Info */}
//             <div className="text-center mb-5">
//               {selectedUser.profilePhoto ? (
//                 <img
//                   src={`http://localhost:5000/${selectedUser.profilePhoto}`}
//                   alt={selectedUser.name}
//                   className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500"
//                 />
//               ) : (
//                 <FaUserCircle size={80} className="mx-auto text-gray-500" />
//               )}
//               <h2 className="text-xl font-bold mt-3">{selectedUser.name}</h2>
//               <p className="text-gray-600">{selectedUser.email}</p>
//             </div>

//             {/* Homepage Info */}
//             {selectedUser.homepage && (
//               <div className="mb-5">
//                 <h3 className="text-lg font-semibold">Homepage</h3>
//                 <p>Portfolio Name: {selectedUser.homepage.portfolioName}</p>
//                 <p>User Name: {selectedUser.homepage.userName}</p>
//                 <p>Expertise: {selectedUser.homepage.expertise.join(", ")}</p>
//               </div>
//             )}

//             {/* About Section */}
//             {selectedUser.about && (
//               <div className="mb-5">
//                 <h3 className="text-lg font-semibold">About</h3>
//                 <p>{selectedUser.about.description}</p>
//                 <p>Skills: {selectedUser.about.skillset.join(", ")}</p>
//                 <p>Tools: {selectedUser.about.tools.join(", ")}</p>
//               </div>
//             )}

//             {/* Projects */}
//             {selectedUser.projects && (
//               <div className="mb-5">
//                 <h3 className="text-lg font-semibold">Projects</h3>
//                 <div className="grid gap-4 sm:grid-cols-2">
//                   {selectedUser.projects.map((project, index) => (
//                     <div
//                       key={index}
//                       className="p-4 bg-gray-100 rounded-lg shadow-md"
//                     >
//                       <h4 className="font-bold">{project.name}</h4>
//                       <p className="text-sm">{project.description}</p>
//                       {project.photo && (
//                         <img
//                           src={`http://localhost:5000/${project.photo}`}
//                           alt={project.name}
//                           className="w-full h-32 object-cover mt-2 rounded-md"
//                         />
//                       )}
//                       <a
//                         href={project.githubLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-500"
//                       >
//                         GitHub
//                       </a>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Blogs */}
//             {selectedUser.blogs && (
//               <div className="mb-5">
//                 <h3 className="text-lg font-semibold">Blogs</h3>
//                 <div className="grid gap-4 sm:grid-cols-2">
//                   {selectedUser.blogs.map((blog, index) => (
//                     <div
//                       key={index}
//                       className="p-4 bg-gray-100 rounded-lg shadow-md"
//                     >
//                       <h4 className="font-bold">{blog.title}</h4>
//                       <p className="text-sm">{blog.description}</p>
//                       <p className="text-blue-500">{blog.topic}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Resume */}
//             {selectedUser.resume && selectedUser.resume.photoPath && (
//               <div className="mb-5">
//                 <h3 className="text-lg font-semibold">Resume</h3>
//                 <img
//                   src={`http://localhost:5000${selectedUser.resume.photoPath}`}
//                   alt="Resume"
//                   className="w-full h-auto rounded-md"
//                 />
//               </div>
//             )}

//             {/* Social Links */}
//             {selectedUser.socialLinks && (
//               <div className="mb-5">
//                 <h3 className="text-lg font-semibold">Social Links</h3>
//                 <ul className="list-disc list-inside">
//                   {selectedUser.socialLinks.map((link, index) => (
//                     <li key={index}>
//                       <a
//                         href={link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-500"
//                       >
//                         {link}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         )}
//       </main>

//       {/* Contact Form */}
//       <footer className="bg-white p-5 shadow-md">
//         <h3 className="text-lg font-bold mb-3">Contact Us</h3>
//         <form className="grid gap-3">
//           <input
//             type="text"
//             placeholder="Name"
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             type="text"
//             placeholder="Company Name"
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <textarea
//             placeholder="Description"
//             rows={3}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
//           >
//             Submit
//           </button>
//         </form>
//       </footer>
//     </div>
//   );
// };

// export default SearchUsers;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "tailwindcss/tailwind.css";

// const SearchUsers = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     if (searchTerm) {
//       fetchUsers(searchTerm);
//     } else {
//       setUsers([]);
//     }
//   }, [searchTerm]);

//   const fetchUsers = async (name) => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/users", {
//         params: { name },
//       });
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const fetchUserDetails = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/users/${id}`);
//       setSelectedUser(response.data);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col bg-gradient-to-b from-gray-100 to-blue-50">
//       {/* Navigation Bar */}
//       <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
//         <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-blue-600">SmartTrack</h1>
//           <ul className="flex gap-4">
//             <li>
//               <a href="#home" className="text-gray-700 hover:text-blue-600">
//                 Home
//               </a>
//             </li>
//             <li>
//               <a href="#about" className="text-gray-700 hover:text-blue-600">
//                 About
//               </a>
//             </li>
//             <li>
//               <a href="#projects" className="text-gray-700 hover:text-blue-600">
//                 Projects
//               </a>
//             </li>
//             <li>
//               <a href="#blogs" className="text-gray-700 hover:text-blue-600">
//                 Blogs
//               </a>
//             </li>
//             <li>
//               <a href="#resume" className="text-gray-700 hover:text-blue-600">
//                 Resume
//               </a>
//             </li>
//             <li>
//               <a href="#links" className="text-gray-700 hover:text-blue-600">
//                 Links
//               </a>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       {/* Search Section */}
//       <section
//         id="home"
//         className="flex flex-col items-center justify-center h-screen"
//       >
//         <div className="w-3/4 max-w-lg">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search users by name"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <ul className="mt-4 space-y-2">
//             {users.map((user) => (
//               <li
//                 key={user._id}
//                 onClick={() => fetchUserDetails(user._id)}
//                 className="cursor-pointer p-2 border-b border-gray-300 hover:bg-gray-100"
//               >
//                 {user.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </section>

//       {/* User Details Section */}
//       {selectedUser && (
//         <>
//           {/* About Section */}
//           <section
//             id="about"
//             className="h-screen flex flex-col items-center justify-center bg-gray-50"
//           >
//             <div className="w-3/4 max-w-xl bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 About {selectedUser.name}
//               </h2>
//               <p className="mt-4 text-gray-600">
//                 {selectedUser.about?.description || "No description available."}
//               </p>
//               <p className="mt-2 text-gray-600">
//                 <strong>Skills:</strong>{" "}
//                 {selectedUser.about?.skillset.join(", ") || "N/A"}
//               </p>
//               <p className="mt-2 text-gray-600">
//                 <strong>Tools:</strong>{" "}
//                 {selectedUser.about?.tools.join(", ") || "N/A"}
//               </p>
//             </div>
//           </section>

//           {/* Projects Section */}
//           <section
//             id="projects"
//             className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200"
//           >
//             <div className="w-3/4 max-w-5xl">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">
//                 Projects
//               </h2>
//               <div className="flex space-x-4 overflow-x-auto">
//                 {selectedUser.projects.map((project, index) => (
//                   <div
//                     key={index}
//                     className="flex-shrink-0 w-72 bg-white p-4 rounded-lg shadow-md border border-gray-200"
//                   >
//                     {project.photo && (
//                       <img
//                         src={`http://localhost:5000/${project.photo}`}
//                         alt={project.name}
//                         className="w-full h-40 object-cover rounded-md mb-4"
//                       />
//                     )}
//                     <h3 className="text-lg font-bold text-gray-800">
//                       {project.name}
//                     </h3>
//                     <p className="text-gray-600 mt-2">{project.description}</p>
//                     <a
//                       href={project.githubLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                     >
//                       GitHub Link
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* Blogs Section */}
//           <section
//             id="blogs"
//             className="h-screen flex items-center justify-center bg-gray-50"
//           >
//             <div className="w-3/4 max-w-5xl">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">Blogs</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {selectedUser.blogs.map((blog, index) => (
//                   <div
//                     key={index}
//                     className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
//                   >
//                     <h3 className="text-lg font-bold text-gray-800">
//                       {blog.title}
//                     </h3>
//                     <p className="text-gray-600 mt-2">
//                       <strong>Topic:</strong> {blog.topic}
//                     </p>
//                     <p className="text-gray-600 mt-2">
//                       <strong>Technology:</strong> {blog.technology}
//                     </p>
//                     <p className="text-gray-600 mt-2">{blog.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* Resume Section */}
//           <section
//             id="resume"
//             className="h-screen flex items-center justify-center bg-gradient-to-l from-blue-100 to-blue-200"
//           >
//             <div className="w-3/4 max-w-xl bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-2xl font-bold text-gray-800">Resume</h2>
//               {selectedUser.resume?.photoPath ? (
//                 <img
//                   src={`http://localhost:5000${selectedUser.resume.photoPath}`}
//                   alt="Resume"
//                   className="w-full h-auto mt-4 rounded-md"
//                 />
//               ) : (
//                 <p className="text-gray-600 mt-4">No resume uploaded.</p>
//               )}
//             </div>
//           </section>

//           {/* Links Section */}
//           <section
//             id="links"
//             className="h-screen flex items-center justify-center bg-gray-50"
//           >
//             <div className="w-3/4 max-w-xl">
//               <h2 className="text-2xl font-bold text-gray-800">Social Links</h2>
//               <ul className="mt-4 space-y-2">
//                 {selectedUser.socialLinks.map((link, index) => (
//                   <li key={index} className="flex items-center gap-4">
//                     <span className="text-gray-600">{link.platform}:</span>
//                     <a
//                       href={link.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 hover:underline"
//                     >
//                       {link.url}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </section>
//           {/* Contact Form */}
//           <footer className="bg-white p-5 shadow-md">
//             <h3 className="text-lg font-bold mb-3">Contact Us</h3>
//             <form className="grid gap-3">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <input
//                 type="text"
//                 placeholder="Company Name"
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <textarea
//                 placeholder="Description"
//                 rows={3}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <button
//                 type="submit"
//                 className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
//               >
//                 Submit
//               </button>
//             </form>
//           </footer>
//         </>
//       )}
//     </div>
//   );
// };

// export default SearchUsers;
// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import Projects from "./components/Projects";
// import Blogs from "./components/Blogs";
// import Resume from "./components/Resume";
// import SocialLinks from "./components/SocialLinks";
// import axios from "axios";

// const App = () => {
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [users, setUsers] = useState([]);

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/users", { params: { name: searchTerm } });
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   return (
//     <Router>
//       <Navbar />
//       <div className="mt-16">
//         {/* Search Bar */}
//         <div className="h-40 flex flex-col items-center justify-center bg-gray-100">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search users by name"
//             className="border rounded px-4 py-2 mb-4 w-1/2"
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
//           >
//             Search
//           </button>
//         </div>

//         {/* Render Search Results */}
//         <ul className="mt-6 w-1/2 mx-auto bg-white shadow-md rounded divide-y">
//           {users.map((user) => (
//             <li
//               key={user._id}
//               onClick={() => setSelectedUserId(user._id)}
//               className="p-4 hover:bg-gray-200 cursor-pointer"
//             >
//               {user.name}
//             </li>
//           ))}
//         </ul>

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About userId={selectedUserId} />} />
//           <Route path="/projects" element={<Projects userId={selectedUserId} />} />
//           <Route path="/blogs" element={<Blogs userId={selectedUserId} />} />
//           <Route path="/resume" element={<Resume userId={selectedUserId} />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/social-links" element={<SocialLinks />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
