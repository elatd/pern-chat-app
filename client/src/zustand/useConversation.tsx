import {create } from 'zustand';

type ConversationType = {
    id: string,
    name: string,
}

type MessageType = {
id: string,
body: string,
senderId: string,
}

interface useConversationState {
    selectedConversation: ConversationType[]| null,
    setSelectedConversation: (conversation: ConversationType[]| null) => void,
    messages : MessageType[],
    setMessages : (messages: MessageType[]) => void,
}

const useConversation = create<useConversationState>((set)=>({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation : conversation }),
    messages : [],
    setMessages : (messages) => set({messages}),
}))

export default  useConversation;