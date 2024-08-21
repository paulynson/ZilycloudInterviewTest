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

const fetchUserProfile = async (token: string): Promise<UserProfile> => {
  const { data } = await axios.get(
    `https://zam.zilytst.com/api/v1/authenticated/profile`,
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
