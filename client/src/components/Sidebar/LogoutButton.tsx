import { useAuthContext } from "@/context/AuthContext"
import useLogout from "@/hooks/useLogout"
import { LogOutIcon } from "lucide-react"

const LogoutButton = () => {
    const {logout} = useLogout()
    const {authUser} = useAuthContext()
    const handleLogout = () => {
        logout()
    }

    return (
        authUser &&
        <div className="w-[32] left-4 bottom-4 text-red-500 bg-muted p-2 rounded-full shadow-md cursor-pointer flex items-center justify-center">
            <button onClick={handleLogout}>
                <LogOutIcon /> 
            </button>
        </div>
    )
}

export default LogoutButton