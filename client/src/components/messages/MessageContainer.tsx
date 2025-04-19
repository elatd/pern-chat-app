import useConversation from "@/zustand/useConversation.tsx";
import { useAuthContext } from "@/context/AuthContext.tsx";
import { MessageCircle } from "lucide-react";
import MessageInput from "@/components/messages/MessageInput.tsx";
import { ReactElement } from "react";
import Messages from "./Messages";
import LogoutButton from "../Sidebar/LogoutButton";
import { useSocketContext } from "@/context/SocketContextProvider";

export const MessageContainer = (): ReactElement => {
  const { selectedConversation } = useConversation();
  const { typingUser, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation?.id as string);

  return (
    <div className="w-full flex flex-col h-full relative">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-accent px-4 py-2 mb-2 flex items-center gap-4 overflow-hidden border-collapse rounded-r-md rounded-b-[0px] shadow-md">
            <>
              <div className="relative w-[32px] md:w-[36px] rounded-full">
                <img
                  src={selectedConversation.profilePic}
                  alt={`${selectedConversation.fullName}'s profile picture`}
                  className="rounded-full"
                />
                {isOnline && (
                  <span className="bg-green-500 h-2 w-2 rounded-full absolute bottom-0 right-0 border-2 border-white"></span>
                )}
              </div>

              <div className="flex flex-col flex-1">
                <div className="font-bold text-sm md:text-base">
                  {selectedConversation.fullName}
                  {typingUser && (
                    <span className="text-xs text-green-400 font-medium">
                      {" is typing..."}
                    </span>
                  )}
                </div>
              </div>
            </>
            <LogoutButton />
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className={"flex items-center justify-center w-full h-full"}>
      <div
        className={
          "px-4 text-center text-sm sm:text-lg md:text-xl text-primary front-semibold  flex flex-col items-center gap-2"
        }
      >
        <p>Welcome {authUser?.fullName}</p>
        <p>Select a chat to start converstaion.</p>
        <MessageCircle
          className={"className='text-3xl md:text-6xl text-center'"}
        ></MessageCircle>
      </div>
    </div>
  );
};
