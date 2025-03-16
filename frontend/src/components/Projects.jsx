import React, { useEffect, useState } from "react";
import axios from "axios";

const Projects = ({ userId }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!userId) return;

        setLoading(true);
        setError(null);

        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}/projects`
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Error fetching projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userId]);

  const [showLinks, setShowLinks] = useState(
    projects.reduce((acc, project) => {
      acc[project._id] = false;
      return acc;
    }, {})
  );

  const handlePurchaseClick = (projectId) => {
    setShowLinks((prevState) => ({
      ...prevState,
      [projectId]: true,
    }));
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-gradient-to-b from-white via-gray-50 to-white text-gray-900 py-10 overflow-auto scrollbar-hide">
      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
        My Recent <strong className="text-purple-400">Works</strong>
      </h1>
      <p className="text-lg text-gray-600 mb-12">
        Here are a few projects I've worked on recently.
      </p>

      {loading ? (
        <p className="text-gray-600 text-lg">Loading projects...</p>
      ) : error ? (
        <p className="text-red-500 text-lg">{error}</p>
      ) : projects.length > 0 ? (
        <div className="flex flex-col items-center w-full space-y-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md w-[90vw] p-6"
            >
              {/* Project Image */}
              {project.photo && (
                <img
                  src={`http://localhost:5000/${project.photo}`}
                  alt={project.name}
                  className="w-full md:w-1/3 h-48 object-cover rounded mb-4 md:mb-0"
                />
              )}

              {/* Project Details */}
              <div className="flex flex-col items-start md:ml-6 w-full">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4">
                  {project.name}
                </h3>
                <p className="text-gray-600 mb-4 text-left">
                  {project.description}
                </p>
                {!showLinks[project._id] ? (
                  <button
                    onClick={() => handlePurchaseClick(project._id)}
                    className="bg-gradient-to-r from-teal-400 via-blue-500 to-green-400 text-white py-2 px-4 rounded-lg hover:shadow-md hover:scale-102 transition-transform duration-200"
                  >
                    Purchase
                  </button>
                ) : (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-teal-400 via-blue-500 to-green-400 text-white py-2 px-4 rounded-lg hover:shadow-md hover:scale-102 transition-transform duration-200"
                  >
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-lg">
          No projects available for this user.
        </p>
      )}
    </div>
  );
};

export default Projects;