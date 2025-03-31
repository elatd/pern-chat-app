import { useEffect, useRef } from "react"

const useChatScroll = (dependency: any) => {
    const ref = useRef<HTMLDivElement>()

    useEffect(()=>{
        const element = ref.current
        if(element){
            element.scrollTo(0, element.scrollHeight)
        }
    }, [dependency])

    return ref
}

export default useChatScroll