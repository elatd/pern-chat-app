import {ChangeEvent, ReactElement, useState} from "react";
import {Paperclip, Send} from "lucide-react";
import useSendMessage from "@/hooks/useSendMessage";

function MessageInput():ReactElement {
    const {loading, sendMessage}= useSendMessage()
    const [message, setMessage] = useState<string>("")

    const handleSubmit = async (e:ChangeEvent<HTMLFormElement>)=> {
        e.preventDefault();
        await sendMessage(message)
        setMessage("")

        // Reset textarea height to default after sending message
        const textarea = document.getElementById('message') as HTMLTextAreaElement;
        if (textarea) {
            textarea.style.height = "40px"; // Reset to minHeight value
        }
    }

    return (
        <form className={"'px-4 mb-3'"} onSubmit={handleSubmit}>
            <div className={"w-full relative p-2"}>
                {/* Dynamic Textarea Implementation:
                    - resize-none: Disables manual resizing
                    - rows={1}: Initial single row height
                    - minHeight: Sets base height of 40px
                    - maxHeight: Limits expansion to 120px (approximately 3 lines)
                    - overflowY: Enables scrolling when content exceeds maxHeight
                    - onInput: Automatically adjusts height based on content:
                        1. Resets height to recalculate
                        2. Sets new height based on content (scrollHeight)
                        3. Caps height at 120px using Math.min
                */}
                <textarea
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e as any);
                        }
                    }}
                    className="text-sm w-full block p-2 bg-background border border-primary rounded-lg pr-20  resize-none "
                    id="message"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    autoComplete="off"
                    rows={1} 
                    style={{
                        minHeight: "35px", 
                        maxHeight: "120px", 
                        overflowY: "auto"
                    }}
                    onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto"; // reset height, as when we delete the text, the height will be reduced, and we want to start from the beginning again
                        target.style.height = `${Math.min(target.scrollHeight, 120)}px`; // limit to 120px
                    }}
                />
                <div className="absolute right-4 md:right-4 inset-y-0  flex gap-2" >
                    <button disabled={loading} className="text-sm inset-y-0 cursor-pointer "><Paperclip/> </button>
                    <button type={"submit"} className={"text-sm cursor-pointer  "} disabled={loading}>  <Send className='w-6 h-6 text-primary' /> </button>
                </div>
            </div>
        </form>

    );
}

export default MessageInput;