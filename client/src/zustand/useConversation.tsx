import { create } from "zustand";

export type MessageType = {
  id: string;
  senderId: string;
  body?: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  fileKey?: string; // ✅ used for signed GETs
  createdAt: string;
};

interface useConversationState {
  selectedConversation: ConversationType | null;
  messages: MessageType[];
  setSelectedConversation: (conversation: ConversationType | null) => void;
  setMessages: (messages: MessageType[]) => void;
}

const useConversation = create<useConversationState>((set) => ({
  selectedConversation: null,
  messages: [],
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
