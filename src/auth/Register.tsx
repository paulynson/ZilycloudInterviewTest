import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterMutation } from "../utils/queries/useRegisterMutation";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import { toast } from "sonner";
import { isMobile, isTablet, isBrowser } from "react-device-detect";
import { Link, useNavigate } from "react-router-dom";
import { BiLoaderCircle } from "react-icons/bi";

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  device_type: yup.string().required("Device type is required"),
  last_ip: yup.string().required("Last IP is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Password confirmation is required"),
  locality_id: yup.string().required("Locality is required"),
  avatar: yup.mixed().required("Avatar is required"),
});

const Register: React.FC = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Check device type
  const getDeviceType = () => {
    if (isMobile) return "Mobile";
    if (isTablet) return "Tablet";
    if (isBrowser) return "Desktop";
    return "Unknown";
  };

  const deviceType = getDeviceType();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading, error } = useRegisterMutation();

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("device_type", data.device_type);
    formData.append("last_ip", data.last_ip);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    formData.append("locality_id", data.locality_id);
    formData.append("avatar", data.avatar[0]);

    mutate(formData, {
      onSuccess: () => {
        toast.success("Buyer account created successfully.", {
          duration: 3000,
        });
        navigate("/login");
      },
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        toast.error("File size should not exceed 1MB.");
        e.target.value = "";
        return;
      }
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="relative w-full max-w-sm p-8 bg-white rounded-lg shadow-xl lg:max-w-md">
        <h2 className="mb-6 text-3xl font-bold text-center text-purple-500">
          Register
        </h2>
        <div>
          <Link
            to="/"
            title="Go to Home Page"
            className="absolute p-3 bg-white rounded-full shadow-md hover:bg-purple-100 group -right-3 -top-3"
          >
            <FaHome className="text-lg group-hover:text-purple-500" />
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name")}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Full Name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            {...register("phone")}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Phone Number"
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}

          <input
            {...register("email")}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Email Address"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            {...register("device_type")}
            className="w-full p-3 mb-4 border rounded-lg text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Device Type"
            value={deviceType}
            readOnly
          />
          {errors.device_type && (
            <p className="text-red-500">{errors.device_type.message}</p>
          )}

          <input
            {...register("last_ip")}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Last IP"
          />
          {errors.last_ip && (
            <p className="text-red-500">{errors.last_ip.message}</p>
          )}

          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Password"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute pt-1 text-gray-600 cursor-pointer top-3 right-4"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password_confirmation")}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm Password"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute pt-1 text-gray-600 cursor-pointer top-3 right-4"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password_confirmation && (
            <p className="text-red-500">
              {errors.password_confirmation.message}
            </p>
          )}

          <input
            {...register("locality_id")}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Locality ID"
          />
          {errors.locality_id && (
            <p className="text-red-500">{errors.locality_id.message}</p>
          )}

          <input
            type="file"
            accept=".png, .jpeg, .jpg"
            {...register("avatar")}
            className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={handleAvatarChange}
          />
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-32 h-32 mx-auto mb-4 rounded-full"
            />
          )}
          {errors.avatar && (
            <p className="text-red-500">{errors.avatar.message}</p>
          )}

          <button
            className="w-full p-3 text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center space-x-2 ">
                {" "}
                <span> Registering</span>{" "}
                <BiLoaderCircle className="text-2xl text-white animate-spin" />
              </span>
            ) : (
              "Register"
            )}
          </button>
          {error && (
            <p className="my-4 text-center text-red-500">
              Registration failed:{" "}
              {(error as any)?.response?.data?.message ||
                "Something went wrong"}
            </p>
          )}
        </form>
        <div className="my-5 text-center">
          <p className="text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-500 hover:text-purple-600 hover:font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
