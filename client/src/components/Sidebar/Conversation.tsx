import { useSocketContext } from '@/context/SocketContextProvider'
import useConversation from '@/zustand/useConversation'

interface ConversationProps {
    conversation: ConversationType
}

const Conversation = ({conversation} : ConversationProps) => {
    const {onlineUsers} = useSocketContext()
    const {selectedConversation, setSelectedConversation} = useConversation()
    const isSelected = selectedConversation?.id === conversation.id

    const isOnline = onlineUsers.includes(conversation.id)

    return (
        <div 
            className={`flex gap-2 items-center rounded-md p-2 cursor-pointer border-b-2 ${isSelected && "bg-foreground text-accent shadow-md "}`}
            onClick={()=>setSelectedConversation(conversation)}
        >
            <div className='relative w-[32px] md:w-[36px] rounded-full'>
                <img src={conversation.profilePic} alt={`${conversation.fullName}'s`} className="rounded-full " />
                {isOnline && (
                    <span className="bg-green-500 h-2 w-2 rounded-full absolute bottom-0 right-0 border-2 border-white"></span>
                )}
            </div>

            <div className='flex flex-col flex-1'>
                <div className='font-bold text-sm md:text-base'>{conversation.fullName}</div>
            </div>
        </div>
    )
}

export default Conversation