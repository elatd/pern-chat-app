import useGetConversations from "@/hooks/useGetConversations"
import Conversation from "./Conversation"


const Conversations = () => {
    const {conversations, isLoading} = useGetConversations()
    return (
        <div className='py-2 flex flex-col gap-2 overflow-auto'>
            {isLoading ? "Loading..." : ""}
            {conversations.map((conversation)=> (<Conversation conversation={conversation} />))}
        </div>
    )
}

export default Conversations