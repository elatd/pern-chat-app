import { useSocketContext } from '@/context/SocketContextProvider'
import useConversation from '@/zustand/useConversation'
import { useEffect } from 'react'

const useListenMessages = () => {
    const {socket} = useSocketContext()
    const {messages,setMessages} = useConversation()

    useEffect(()=>{
        socket?.on("newMessage",(message )=>{
            setMessages([...messages,message])
        })
    },[socket,messages,setMessages])

}

export default useListenMessages