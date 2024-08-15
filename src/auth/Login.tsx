import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../utils/queries/useLoginQuery";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { isMobile, isTablet, isBrowser } from "react-device-detect";
import { BiLoaderCircle } from "react-icons/bi";

// Validation Schema
const schema = yup.object().shape({
  username: yup
    .string()
    .email("Invalid email")
    .required("Username is required"),
  password: yup.string().required("Password is required"),
  device_name: yup.string().required("Device Name is required"),
});

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Check device type
  const getDeviceType = () => {
    if (isMobile) return "Mobile";
    if (isTablet) return "Tablet";
    if (isBrowser) return "Desktop";
    return "Unknown";
  };

  const deviceType = getDeviceType();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { mutate, isLoading, error } = useLoginMutation();

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("User logged in successfully", { duration: 3000 });
        navigate("/dashboard");
      },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="mb-8 text-2xl font-bold text-center text-purple-600">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register("username")}
              className="w-full p-2 border rounded-md"
              placeholder="Email"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full p-2 border rounded-md"
              placeholder="Password"
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("device_name")}
              className="w-full p-2 border rounded-md text-slate-600"
              placeholder="Device Name"
              value={deviceType}
              readOnly
            />

            {errors.device_name && (
              <p className="text-red-500">{errors.device_name.message}</p>
            )}
          </div>

          <button
            className="w-full p-2 text-white bg-purple-500 rounded-md hover:bg-purple-600"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center space-x-2 ">
                {" "}
                <span> Logging in</span>{" "}
                <BiLoaderCircle className="text-2xl text-white animate-spin" />
              </span>
            ) : (
              "Login"
            )}
          </button>
          {error && (
            <p className="mt-4 text-red-500">
              Login failed: {(error as any)?.response?.data?.message}
            </p>
          )}
        </form>
        <div className="my-5 text-center">
          <p className="text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-500 hover:text-purple-600 hover:font-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
