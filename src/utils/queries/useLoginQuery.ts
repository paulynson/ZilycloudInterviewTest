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

const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await axios.post(
    `http://localhost:3000/api/login`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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
