// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const Blogs = ({ userId }) => {
// //   const [blogs, setBlogs] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchBlogs = async () => {
// //       try {
// //         if (!userId) return; // Ensure userId is available before fetching

// //         setLoading(true);
// //         setError(null); // Reset error

// //         const response = await axios.get(`http://localhost:5000/api/users/${userId}/blogs`);
// //         setBlogs(response.data);
// //       } catch (error) {
// //         console.error("Error fetching blogs:", error);
// //         setError("Error fetching blogs.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchBlogs();
// //   }, [userId]);

// //   return (
// //     <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-200">
// //       <h1 className="text-4xl font-bold mb-6">Blogs</h1>
// //       {loading ? (
// //         <p>Loading blogs...</p>
// //       ) : error ? (
// //         <p className="text-red-500">{error}</p>
// //       ) : blogs.length > 0 ? (
// //         <div className="w-3/4 bg-white shadow-lg rounded p-6">
// //           {blogs.map((blog, index) => (
// //             <div key={index} className="mb-4">
// //               <h3 className="text-2xl font-bold">{blog.title}</h3>
// //               <p><strong>Topic:</strong> {blog.topic}</p>
// //               <p><strong>Technology:</strong> {blog.technology}</p>
// //               <p>{blog.description}</p>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         <p>No blogs available for this user.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default Blogs;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Blogs = ({ userId }) => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         if (!userId) return; // Ensure userId is available before fetching

//         setLoading(true);
//         setError(null); // Reset error

//         const response = await axios.get(`http://localhost:5000/api/users/${userId}/blogs`);
//         setBlogs(response.data);
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//         setError("Error fetching blogs.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, [userId]);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Header Section */}
//       <header className="bg-gray-800 py-8">
//         <div className="max-w-7xl mx-auto text-center">
//           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
//             Bits-Of-C0de
//           </h1>
//           <p className="text-xl md:text-2xl mt-4">
//             <span className="text-indigo-400">Explore</span>{" "}
//             <span className="text-blue-400">Learn</span>{" "}
//             <span className="text-pink-400">Build</span> 🚀
//           </p>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
//             Blogs
//           </h2> */}
//           {loading ? (
//             <p className="text-center text-gray-400">Loading blogs...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : blogs.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {blogs.map((blog, index) => (
//                 <div
//                   key={index}
//                   className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6"
//                 >
//                   <span className="inline-block px-3 py-1 text-sm font-medium text-gray-900 bg-indigo-300 rounded-full">
//                     {blog.topic}
//                   </span>
//                   <h3 className="mt-4 text-2xl font-bold text-white">
//                     {blog.title}
//                   </h3>
//                   <p className="mt-2 text-gray-400">{blog.description}</p>
//                   <div className="flex justify-between items-center mt-4">
//                     <a
//                       href="#"
//                       className="text-indigo-400 hover:underline font-semibold"
//                     >
//                       Learn More →
//                     </a>
//                     <span className="text-gray-400 text-sm">
//                       {blog.technology}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-gray-400">
//               No blogs available for this user.
//             </p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Blogs;
{/* <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white text-gray-900"> */}


import React, { useEffect, useState } from "react";
import axios from "axios";

const Blogs = ({ userId }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDescription, setActiveDescription] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (!userId) return;

        setLoading(true);
        setError(null);

        const response = await axios.get(`http://localhost:5000/api/users/${userId}/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Error fetching blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [userId]);

  const handleLearnMore = (description) => {
    setActiveDescription(description);
  };

  const closeAlert = () => {
    setActiveDescription(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white text-gray-900">
      {/* Header Section */}
      <header className=" py-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-green-800 ">
            Bits-Of-C0de
          </h1>
          <p className="text-xl md:text-2xl mt-4 text-gray-700">
            <span className="text-blue-900 font-bold">Explore</span>{" "}
            <span className="text-purple-900 font-bold">Learn</span>{" "}
            <span className="text-yellow-900 font-bold">Build</span> 🚀
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
            Blogs
          </h2> */}
          {loading ? (
            <p className="text-center text-gray-500">Loading blogs...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-red-400 via-yellow-500 to-purple-500 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
                >
                  <span className="inline-block px-3 py-1 text-sm font-medium text-gray-800 bg-white rounded-full shadow">
                    {blog.topic}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-gray-800">
                    {blog.title}
                  </h3>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => handleLearnMore(blog.description)}
                      className="text-blue-700 font-semibold underline hover:no-underline"
                    >
                      Learn More →
                    </button>
                    <span className="text-black text-sm font-bold">
                      {blog.technology}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No blogs available for this user.
            </p>
          )}
        </div>
      </main>

      {/* Alert Section */}
      {activeDescription && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 bg-gradient-to-b ">
          <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-yellow-100 text-gray-800 p-6 rounded-lg shadow-lg max-w-lg transform scale-95 animate-popup">
            <h3 className="text-xl font-bold mb-4">Blog Description</h3>
            <p className="text-gray-700">{activeDescription}</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeAlert}
                className="bg-gray-800 text-white hover:bg-gray-700 px-4 py-2 rounded text-sm font-semibold shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
