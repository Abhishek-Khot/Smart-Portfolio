import React from "react";
import axios from "axios";

const Contact = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await axios.post("http://localhost:5000/api/users/contact", {
        name: formData.get("name"),
        companyName: formData.get("companyName"),
        description: formData.get("description"),
        oaLink: formData.get("oaLink"),
      });
      alert("Contact details submitted successfully!");
    } catch (error) {
      console.error("Error submitting contact details:", error);
    }
  };

  return (
    <div className="min-h-[90.8vh] flex items-center justify-center bg-white text-gray-900">
      <form className="w-full max-w-sm bg-white shadow-md rounded-md p-6 space-y-4 border-t-2 border-black-900">
        <h3 className="text-xl font-bold text-center text-purple-600">Contact</h3>
        <p className="text-sm text-gray-600 text-center">
          Send the OA link for this profile.
        </p>

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700">
            Name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full px-3 py-1.5 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-purple-500 text-gray-900"
            required
          />
        </div>

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium mb-1 text-gray-700">
            Company Name:
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            className="w-full px-3 py-1.5 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-purple-500 text-gray-900"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1 text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="w-full px-3 py-1.5 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-purple-500 text-gray-900"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="oaLink" className="block text-sm font-medium mb-1 text-gray-700">
            OA Link:
          </label>
          <input
            id="oaLink"
            name="oaLink"
            type="text"
            className="w-full px-3 py-1.5 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-purple-500 text-gray-900"
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;