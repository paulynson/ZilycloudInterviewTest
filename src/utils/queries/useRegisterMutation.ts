import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/store/authSlice";
import { serviceType } from "../baseUrl";

interface RegisterPayload {
  name: string;
  phone: string;
  email: string;
  device_type: string;
  last_ip: string;
  avatar: File;
  password: string;
  password_confirmation: string;
  locality_id: string;
}

interface RegisterResponse {
  token: string;
}

const base = axios.create({
  baseURL: serviceType,
});

const registerUser = async (formData: FormData): Promise<RegisterResponse> => {
  const { data } = await base.post(`/api/v1/register`, formData, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });
  return data;
};

export const useRegisterMutation = () => {
  const dispatch = useDispatch();

  return useMutation<RegisterResponse, AxiosError, FormData, RegisterPayload>(
    registerUser,
    {
      onSuccess: (data) => {
        dispatch(setToken(data.token));
        localStorage.setItem("token", data.token);
      },
      onError: (error) => {
        console.error("Registration failed", error);
        if (error.response) {
          console.error("Error Response:", error.response.data);
        }
      },
    }
  );
};
