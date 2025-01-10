import React, { useState, useEffect } from "react";
import axios from "axios";

const SocialLinks = ({ userId }) => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}/social-links`
        );
        setSocialLinks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching social links:", error);
        setError("Failed to load social links");
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, [userId]);

  const getLogo = (url) => {
    if (url.includes("github.com")) {
      return "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg";
    } else if (url.includes("linkedin.com")) {
      return "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png";
    } else if (url.includes("codeforces.com")) {
      return "https://codecalender.wordpress.com/wp-content/uploads/2015/10/codeforces.png?w=300&h=300&crop=1";
    } else if (url.includes("leetcode.com")) {
      return "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png";
    } else if (url.includes("facebook.com")) {
      return "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg";
    } else if (url.includes("hackerrank.com")) {
      return "https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png";
    } else if (url.includes("geeksforgeeks.org")) {
      return "https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg";
    } else if (url.includes("instagram.com")) {
      return "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png";
    } else {
      return "https://img.freepik.com/free-vector/twitter-app-new-logo-x-black-background_1017-45425.jpg";
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-400">Loading social links...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      <header className="py-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Your Social Links
        </h1>
        <p className="mt-2 text-gray-400">Click on a logo to visit the profile.</p>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {socialLinks.map((link, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-lg transition hover:-translate-y-1 hover:scale-[1.02] duration-300"
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <img
                  src={getLogo(link)}
                  alt="Social Logo"
                  className="w-20 h-20"
                  onError={(e) => {
                    e.target.src =
                      "https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg";
                  }}
                />
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SocialLinks;
