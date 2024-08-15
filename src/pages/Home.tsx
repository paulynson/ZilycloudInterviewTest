import React from "react";
import { Link } from "react-router-dom";
import SimpleCarousel from "../components/CarouselComponent";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="mb-6 text-5xl font-bold">Welcome to Zily Cloud Test</h1>
        <p className="mb-12 text-lg">Please log in or register to continue</p>

        <div className="flex justify-center space-x-4">
          <Link to="/login">
            <button className="px-8 py-3 font-semibold text-blue-600 transition duration-300 bg-white rounded-full hover:bg-gray-100">
              Log In
            </button>
          </Link>
          <Link to="/register">
            <button className="px-8 py-3 font-semibold text-purple-600 transition duration-300 bg-white rounded-full hover:bg-gray-100">
              Register
            </button>
          </Link>
        </div>
      </div>
      <div className="my-8">
        <SimpleCarousel />
      </div>
    </div>
  );
};

export default Home;
