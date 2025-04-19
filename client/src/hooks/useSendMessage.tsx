import AxiosInstance from "@/lib/axios";
import useConversation from "@/zustand/useConversation";
import { useState } from "react";
import { toast } from "./use-toast";

export interface SendMessageProps {
  message?: string;
  uploadedFileUrl?: string;
  uploadedFileName?: string;
  uploadedFileType?: string;
  fileKey?: string; // used for signed GETs
}

const useSendMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async ({
    message,
    uploadedFileUrl,
    uploadedFileName,
    uploadedFileType,
    fileKey,
  }: SendMessageProps) => {
    if (!selectedConversation) return;
    setLoading(true);
    try {
      const res = await AxiosInstance.post(
        `/message/send/${selectedConversation?.id}`,
        {
          message,
          fileUrl: uploadedFileUrl || null,
          fileName: uploadedFileName || null,
          fileType: uploadedFileType || null,
          fileKey: fileKey || null,
        }
      );
      if (!res.status) throw new Error(res.data.error || "An error occurred");
      setMessages([...messages, res.data.message]);
    } catch (error: any) {
      toast({ description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
