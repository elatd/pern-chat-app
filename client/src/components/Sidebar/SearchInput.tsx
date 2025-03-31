import { toast } from '@/hooks/use-toast';
import useGetConversations from '@/hooks/useGetConversations';
import useConversation from '@/zustand/useConversation';
import { SearchIcon } from 'lucide-react';
import  { useState } from 'react'

const SearchInput = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const {setSelectedConversation} = useConversation()
    const {conversations} = useGetConversations()

    const handleSearch = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(!searchInput) return
        if(searchInput.length < 3) {
            return toast({
                title: "Search term must be at least 3 characters long",
                description: "Please try again.",
                variant: "default",
            })
        }

        const foundConversation = conversations.find(conversation => conversation.fullName.toLowerCase().includes(searchInput.toLowerCase()))

        if(foundConversation) {
            setSelectedConversation(foundConversation)
            setSearchInput("")
        } else {
            toast({
                title: "No conversation found",
                description: "Please try again.",
                variant: "default",
            })
        }
    }

    return (
        <div className="group  p-1 rounded-md bg-secondary border border-1 shadow-md border-black group-focus-within:border-black transition">
            <form onClick={handleSearch} className='flex items-center gap-2'>
                <input
                    className="rounded-md border-0 p-1 bg-secondary caret-gray-700 focus:outline-none"
                    autoFocus
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                />
                <button type='submit'  className='cursor-pointer'>
                    <SearchIcon />
                </button>
            </form>
        </div>
    )
}

export default SearchInput