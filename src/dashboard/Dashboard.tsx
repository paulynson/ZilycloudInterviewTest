import React from "react";
import { useUserProfile } from "../utils/queries/userProfile";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/store/authSlice";

import { BiLoaderCircle } from "react-icons/bi";

const Dashboard: React.FC = () => {
  const { data, error, isLoading } = useUserProfile();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="w-[100dvw] h-[100dvh] flex items-center justify-center">
        <span>
          <BiLoaderCircle className="text-4xl text-purple-500 animate-spin" />
        </span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute right-3 top-4">
        <button
          className="w-full p-3 text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="submit"
          disabled={isLoading}
          onClick={handleLogout}
        >
          {isLoading ? "Logout..." : "Logout"}
        </button>
      </div>
      <div className="my-6">
        <h3 className="font-bold">
          Welcome <span className="text-purple-500">{data?.data?.name}</span>
        </h3>
      </div>
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center text-purple-600">
          User Profile
        </h2>
        <div className="mb-4">
          <img
            src={data?.data?.avatar}
            alt="User Avatar"
            className="w-32 h-32 mx-auto mb-4 rounded-full"
          />
          <p>
            <strong>Name:</strong> {data?.data?.name}
          </p>
          <p>
            <strong>Email:</strong> {data?.data?.email}
          </p>
          <p>
            <strong>Phone:</strong> {data?.data?.phone}
          </p>
          <p className="capitalize">
            <strong>Roles:</strong> {data?.data?.roles.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
