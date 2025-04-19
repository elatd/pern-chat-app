import { useAuthContext } from "@/context/AuthContext";
import axios from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";
import { useState } from "react";
import { toast } from "./use-toast";

type SignupInput = {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
};

const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useAuthContext();
  const signup = async (inputs: SignupInput) => {
    try {
      setLoading(true);

      const res = await axios.post("/auth/signup", inputs);

      const data = res.data;

      if (!res.status) throw new Error(data.error);
      setAuthUser(data);
    } catch (error: AxiosError | unknown) {
      if (isAxiosError(error))
        console.log("Error in signup hook", error?.response?.data);
      else console.log("Error in signup hook", error);
      toast({
        title: "Faied to login",
        description: isAxiosError(error)
          ? error.response?.data?.error || "Something went wrong"
          : (error as Error).message || "Unexpected error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
