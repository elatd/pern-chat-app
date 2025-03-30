import {useEffect, useState} from "react";
import {useToast} from "@/hooks/use-toast.ts";
import useConversation from "@/zustand/useConversation.tsx";
import AxiosInstance from "@/lib/axios";

export const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const { toast } = useToast()
    
    const getMessages = async () => {
        if (!selectedConversation) return;
        setLoading(true);
        setMessages([]);
        try {
            console.log("HIT fetch messages",selectedConversation?.id)
            const res = await AxiosInstance.get(`/message/${selectedConversation?.id}`);
            console.log("HIT fetch messages DATA",res)
            const data = await res.data.messages;
            if (!res.status) throw new Error(data.error || "An error occurred");
            setMessages(data);
        } catch (error: any) {
            toast({
                title: "Error occurred",
                description: error.message,
            })
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMessages();
    }, [selectedConversation, setMessages]);

    return { messages, loading };
};