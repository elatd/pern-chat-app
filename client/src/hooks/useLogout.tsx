import { useAuthContext } from "@/context/AuthContext";
import axios from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";
import { useState } from "react";

const useLogout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/auth/logout");

      const data = res.data;
      console.log("User Logout: " + data);

      if (!res.status) throw new Error(data.error);

      setAuthUser(null);
    } catch (error: AxiosError | unknown) {
      if (isAxiosError(error))
        console.log("Error in logout hook", error?.response?.data);
      else console.log("Error in logout hook", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
