import { useSocketContext } from "@/context/SocketContextProvider";
import useConversation from "@/zustand/useConversation";
import { useEffect } from "react";
import { toast } from "./use-toast";
import { useAuthContext } from "@/context/AuthContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();
  const { authUser, isLoading } = useAuthContext();

  useEffect(() => {
    const audio = new Audio("/notification.mp3");

    socket?.on("newMessage", (msg) => {
      setMessages([...messages, msg]);
      const isFromMe = msg.senderId === authUser?.id;
      const isActiveChat = msg.senderId === selectedConversation?.id;

      if (isFromMe) return;

      if (!isActiveChat) {
        toast({
          title: "New message",
          description: `From ${selectedConversation?.fullName}`,
        });

        // web push notification
        if (
          Notification.permission === "granted" &&
          msg.senderId === selectedConversation?.id
        ) {
          new Notification("New message", {
            body: `you have new messages from ${selectedConversation?.fullName}`,
            icon: "/notif.svg",
          });
        }

        audio.play().catch((e) => {
          // if browser prevents autoplay
          console.warn("Sound not played:", e);
        });
      }
    });
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
