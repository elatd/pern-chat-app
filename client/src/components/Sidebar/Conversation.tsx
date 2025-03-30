import useConversation from '@/zustand/useConversation'

interface ConversationProps {
    conversation: ConversationType
}
const Conversation = ({conversation} : ConversationProps) => {
    const {selectedConversation, setSelectedConversation} = useConversation()
    const isSelected = selectedConversation?.id === conversation.id

    const isOnline = false;
    return (
        <div 
            className={`flex gap-2 items-center rounded-md p-2 cursor-pointer border-b-2 ${isSelected && "bg-foreground text-accent shadow-md "}`}
            onClick={()=>setSelectedConversation(conversation)}
        >
            <div className='relative w-8 md:w-12 rounded-full'>
                <img src={conversation.profilePic} alt={`${conversation.fullName}'s`} className="rounded-full" />
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