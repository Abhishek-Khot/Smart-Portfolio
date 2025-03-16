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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header Section */}
      <header className="py-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-green-600">
            Bits-Of-C0de
          </h1>
          <p className="text-xl md:text-2xl mt-4 text-gray-600">
            <span className="text-blue-600 font-bold">Explore</span>{" "}
            <span className="text-purple-600 font-bold">Learn</span>{" "}
            <span className="text-yellow-600 font-bold">Build</span> 🚀
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-center text-gray-500">Loading blogs...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-red-100 via-yellow-100 to-purple-100 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
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
                      className="text-blue-600 font-semibold underline hover:no-underline"
                    >
                      Learn More →
                    </button>
                    <span className="text-gray-700 text-sm font-bold">
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-lg transform scale-95 animate-popup">
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