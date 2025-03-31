import { MessageContainer } from "@/components/messages/MessageContainer.tsx";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useState } from "react";
import { Cross, CrossIcon, Menu, MenuIcon, XIcon } from "lucide-react";

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div className="w-full flex h-[80vh] md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-primary-foreground bg-clip-padding border-primary-foreground shadow-accent-background shadow-xl border-2 backdrop-filter backdrop-blur-lg bg-opacity-0">
        {/* Backdrop overlay */}
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}
        {/* Sidebar modal */}
        <div className={`
          ${showSidebar ? 'fixed' : 'hidden'} 
          md:relative md:block 
          z-50 bg-primary-foreground h-[80vh]
          left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          md:left-0 md:top-0 md:translate-x-0 md:translate-y-0
          rounded-lg md:rounded-none
          w-[80%] max-w-[300px] md:w-auto
        `}>
          <Sidebar />
        </div>
        <MessageContainer />
      </div>

      <button
        className="fixed top-4 left-4 p-2 bg-muted rounded-full shadow-lg md:hidden"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? 
        <XIcon className="w-8 h-8" />
        :
        <Menu className="w-8 h-8" />
        }
      </button>
    </>
  );
};

export default Home;
