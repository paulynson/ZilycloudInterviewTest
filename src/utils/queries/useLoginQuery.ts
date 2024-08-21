import { useMutation } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/store/authSlice";

interface LoginPayload {
  username: string;
  password: string;
  device_name: string;
}

interface LoginResponse {
  token: string;
}

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : "https://zam.zilytst.com/api/v1";

const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await axios.post(`${API_BASE_URL}/login`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const useLoginMutation = () => {
  const dispatch = useDispatch();

  return useMutation<LoginResponse, Error, LoginPayload>(loginUser, {
    onSuccess: (data: any) => {
      dispatch(setToken(data?.data?.token));
      dispatch(setUser(data?.data?.user));
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });
};
