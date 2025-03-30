import useConversation from "@/zustand/useConversation.tsx";
import { useAuthContext } from "@/context/AuthContext.tsx";
import { MessageCircle } from "lucide-react";
import MessageInput from "@/components/messages/MessageInput.tsx";
import { ReactElement } from "react";
import Messages from "./Messages";

export const MessageContainer = (): ReactElement => {
  const { selectedConversation } = useConversation();
  return (
    <div className="w-full flex flex-col h-full ">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-accent px-4 py-2 mb-2 overflow-hidden border-collapse rounded-r-md rounded-b-[0px]">
            <span className="label-text">To:</span>{" "}
            <span className="text-foreground font-medium">John Doe</span>
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
