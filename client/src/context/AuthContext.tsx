import axios from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type AuthUserType = {
  id: string;
  username: string;
  fullName: string;
  gender: string;
  profilePic: string;
  createdAt: Date;
};
interface AuthContextType {
  authUser: AuthUserType | null;
  setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: false,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/auth/me");

      const data = res.data;
      console.log(data);
      setAuthUser(data);
    } catch (error: AxiosError | unknown) {
      if (isAxiosError(error)) {
        console.log("Error fethcing User in context", error.message);
      } else {
        console.log("Error fethcing User in context", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
