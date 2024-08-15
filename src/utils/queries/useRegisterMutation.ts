import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/store/authSlice";

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

const registerUser = async (formData: FormData): Promise<RegisterResponse> => {
  const { data } = await axios.post(
    "https://zam.zilytst.com/api/v1/register",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
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
