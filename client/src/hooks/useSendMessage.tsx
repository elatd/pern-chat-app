import AxiosInstance from "@/lib/axios";
import useConversation from "@/zustand/useConversation";
import { useState } from "react";
import { toast } from "./use-toast";


const useSendMessage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message: string) => {
        if (!selectedConversation) return;
        setLoading(true);
        try {
            const res = await AxiosInstance.post(`/message/send/${selectedConversation?.id}`, {message})
            if (!res.status) throw new Error(res.data.error || "An error occurred");    
            setMessages([...messages, res.data.message]);
        }
        catch (error: any) {
            toast({description: error.message, variant: "destructive"})
        }finally {
            setLoading(false)
        }
    }

    return {sendMessage, loading}
}

export default useSendMessage