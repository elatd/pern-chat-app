import { useState } from "react";
import { Menu, XIcon } from "lucide-react";
import { MessageContainer } from "@/components/messages/MessageContainer.tsx";
import Sidebar from "@/components/Sidebar/Sidebar";
import { motion } from "motion/react";

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full flex h-[80vh] md:max-w-screen-lg md:h-[550px] rounded-lg overflow-hidden bg-primary-foreground bg-clip-padding border-primary-background shadow-accent-background shadow-xl border-2 backdrop-filter backdrop-blur-lg bg-opacity-0"
      >
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        <div
          className={`
          ${showSidebar ? "fixed" : "hidden"} 
          md:relative md:block 
          z-50 bg-primary-foreground h-full
          left-0 top-1/2  -translate-y-1/2  p-2 md:p-0
          md:left-0 md:top-0 md:translate-x-0 md:translate-y-0
          rounded-none
          w-[80%] max-w-[300px] md:w-auto
          border-r-2
        `}
        >
          <Sidebar />
        </div>
        <MessageContainer />
      </motion.div>

      <button
        className="fixed top-2 left-2 md:top-4 md:left-4 p-2 bg-accent/60 rounded-full shadow-lg md:hidden transition duration-900 ease-in-out hover:bg-muted hover:shadow-md border border--primary-foreground hover:border hover:border-primary-background hover:cursor-pointer"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? (
          <XIcon className="w-6 h-6 md:w-8 md:h-8" />
        ) : (
          <Menu className="w-6 h-6 md:w-8 md:h-8" />
        )}
      </button>
    </>
  );
};

export default Home;
