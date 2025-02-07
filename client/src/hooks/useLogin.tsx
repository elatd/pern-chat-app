import { useAuthContext } from "@/context/AuthContext";
import axios from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";
import { useState } from "react";

type LoginInput = {
  username: string;
  password: string;
};

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useAuthContext();
  const login = async (inputs: LoginInput) => {
    try {
      setLoading(true);

      const res = await axios.post("/auth/login", inputs);

      const data = res.data;
      console.log("User LOGIN : " + data);

      if (!res.status) throw new Error(data.error);
      setAuthUser(data);

    } catch (error: AxiosError | unknown) {
      if (isAxiosError(error))
        console.log("Error in login hook", error?.response?.data);
      else console.log("Error in login hook", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
