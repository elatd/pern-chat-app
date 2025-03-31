import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast.ts";
import useConversation from "@/zustand/useConversation.tsx";
import AxiosInstance from "@/lib/axios";

export const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { toast } = useToast();

  const getMessages = async () => {
    if (!selectedConversation) return;
    setLoading(true);
    setMessages([]);
    try {
      const res = await AxiosInstance.get(
        `/message/${selectedConversation?.id}`
      );
      const data = await res.data.messages;
      if (!res.status) throw new Error(data.error || "An error occurred");
      setMessages(data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, [selectedConversation, setMessages]);

  return { messages, loading };
};
