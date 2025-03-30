import AxiosInstance from '@/lib/axios'
import  { AxiosError, isAxiosError } from 'axios'
import  { useEffect, useState } from 'react'
import { toast } from './use-toast'

const useGetConversations = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [conversations, setConversations] = useState<ConversationType[]>([])
    const getConversations = async()=>{
        setIsLoading(true)
        try {
            const res = await AxiosInstance.get('/message/conversations')
            const data = await res.data.users
            console.log(res)
            setConversations(data)
            setIsLoading(false)
        } catch (error: AxiosError | unknown) {
            if(isAxiosError(error)){
                console.log("Error while getting conversations",error.response?.data)
                toast({
                    title: "Error occured while getting conversations",
                    description: error.response?.data as string,
                })
            } else {
                console.log("Error while getting conversations",error)
                toast({
                    title: "Error occured while getting conversations",
                    description: error as string,
                })
            }
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getConversations()
    },[])

    return {
        conversations,
        isLoading
    }
}

export default useGetConversations;