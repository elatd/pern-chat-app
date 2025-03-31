import { useAuthContext } from "@/context/AuthContext";
import useLogout from "@/hooks/useLogout";
import { LogOutIcon } from "lucide-react";

const LogoutButton = () => {
  const { logout } = useLogout();
  const { authUser } = useAuthContext();
  const handleLogout = () => {
    logout();
  };

  return (
    authUser && (
      <div className="w-[32px] h-[32px] md:left-4 md:bottom-4 text-red-500 bg-muted p-2 rounded-full shadow-md cursor-pointer flex items-center justify-center ">
        <button onClick={handleLogout} className=" w-[28px] h-[28px]">
          <LogOutIcon height={20} width={20} />
        </button>
      </div>
    )
  );
};

export default LogoutButton;
