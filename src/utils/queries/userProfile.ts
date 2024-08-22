import { useQuery } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { serviceType } from "../baseUrl";

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

const base = axios.create({
  baseURL: serviceType,
});

const fetchUserProfile = async (token: string): Promise<UserProfile> => {
  const { data } = await base.get(`/api/v1/authenticated/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });
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
