import { useQuery } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface UserProfile {
  data: {
    avatar: string;
    buyer_id: string;
    name: string;
    email: string;
    phone: string;
    roles: string[];
  };
}

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : "https://zam.zilytst.com/api/v1";

const fetchUserProfile = async (token: string): Promise<UserProfile> => {
  const { data } = await axios.get(
    `${API_BASE_URL}/authenticated/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const useUserProfile = () => {
  const token = useSelector((state: RootState) => state?.auth.token);

  return useQuery<UserProfile, Error>(
    "userProfile",
    () => fetchUserProfile(token as string),
    {
      enabled: !!token,
    }
  );
};
