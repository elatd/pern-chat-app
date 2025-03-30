import { useAuthContext } from "@/context/AuthContext";
import {MessageContainer} from "@/components/messages/MessageContainer.tsx";
import Sidebar from "@/components/Sidebar/Sidebar";

const Home = () => {
  const {  } = useAuthContext();
  return (
    <div className="w-full flex h-[80vh] md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-primary-foreground bg-clip-padding border-primary-foreground shadow-accent-background shadow-xl border-2 backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer/>
    </div>
  );
};

export default Home;
