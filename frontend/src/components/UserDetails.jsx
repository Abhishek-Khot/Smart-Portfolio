import React from "react";

const UserDetails = ({ user }) => {
  if (!user) return null;

  return (
    <div className="w-3/4 bg-white shadow-lg rounded p-6">
      <img
        src={`http://localhost:5000/${user.profilePhoto}`}
        alt={`${user.name}'s Profile`}
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-2xl font-bold text-center mb-4">{user.name}</h2>
      <p className="text-center mb-4"><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default UserDetails;