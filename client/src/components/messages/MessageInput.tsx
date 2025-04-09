// import { ChangeEvent, ReactElement, useState, useRef } from "react";
// import debounce from "lodash/debounce";
// import { Paperclip, Send } from "lucide-react";
// import useSendMessage, { SendMessageProps } from "@/hooks/useSendMessage";
// import { useAuthContext } from "@/context/AuthContext";
// import { useSocketContext } from "@/context/SocketContextProvider";
// import DocumentUploadButton from "../DocumentUploadButton";
// import Modal from "../Modal";

// const MessageInput = (): ReactElement => {
//   const { authUser } = useAuthContext();
//   const { socket } = useSocketContext();
//   const { loading, sendMessage } = useSendMessage();
//   const [message, setMessage] = useState<SendMessageProps | null>(null);
//   const [showDocUploadModal, setShowDocUploadModal] = useState<boolean>(false);

//   const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     await sendMessage({ message });
//     setMessage(null);

//     // reset textarea height to default after sending message
//     const textarea = document.getElementById("message") as HTMLTextAreaElement;
//     if (textarea) {
//       textarea.style.height = "40px"; // Reset to minHeight value
//     }
//   };

//   const emitTyping = useRef(
//     debounce((userId: string | undefined) => {
//       socket?.emit("typing", userId);
//     }, 300)
//   ).current;

//   return (
//     <form className={"'px-4 mb-3'"} onSubmit={handleSubmit}>
//       <div className={"w-full relative p-2"}>
//         {/*
//             Dynamic Textarea Implementation:
//             - resize-none: Disables manual resizing
//             - rows={1}: Initial single row height
//             - minHeight: Sets base height of 40px
//             - maxHeight: Limits expansion to 120px (approximately 3 lines)
//             - overflowY: Enables scrolling when content exceeds maxHeight
//             - onInput: Automatically adjusts height based on content:
//                 1. Resets height to recalculate
//                 2. Sets new height based on content (scrollHeight)
//                 3. Caps height at 120px using Math.min
//         */}
//         <textarea
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               handleSubmit(e as any);
//             }
//           }}
//           className="text-sm w-full block p-2 bg-background border border-primary rounded-lg pr-20  resize-none "
//           id="message"
//           placeholder="Type a message..."
//           value={message?.message || ""}
//           onChange={(e) => {
//             setMessage((prev) => ({ ...prev, message: e.target.value }));
//             emitTyping(authUser?.id);
//           }}
//           autoComplete="off"
//           rows={1}
//           style={{
//             minHeight: "35px",
//             maxHeight: "120px",
//             overflowY: "auto",
//           }}
//           onInput={(e) => {
//             const target = e.target as HTMLTextAreaElement;
//             target.style.height = "auto"; // reset height, as when we delete the text, the height will be reduced, and we want to start from the beginning again
//             target.style.height = `${Math.min(target.scrollHeight, 120)}px`; // limit to 120px
//           }}
//         />
//         <div className="absolute right-4 md:right-4 inset-y-0  flex gap-2">
//           <button
//             disabled={loading}
//             className="text-sm inset-y-0 cursor-pointer "
//             onClick={(e) => {
//               e.preventDefault();
//               setShowDocUploadModal(true);
//             }}
//           >
//             <Paperclip />{" "}
//           </button>
//           {showDocUploadModal && (
//             <Modal
//               open={showDocUploadModal}
//               onClose={() => setShowDocUploadModal(false)}
//             >
//               <DocumentUploadButton />
//             </Modal>
//           )}
//           <button
//             type={"submit"}
//             className={"text-sm cursor-pointer  "}
//             disabled={loading}
//           >
//             {" "}
//             <Send className="w-6 h-6 text-primary" />{" "}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

import {
  FormEvent,
  KeyboardEvent,
  ReactElement,
  useRef,
  useState,
} from "react";
import debounce from "lodash/debounce";
import { Paperclip, Send } from "lucide-react";
import useSendMessage from "@/hooks/useSendMessage";
import { useAuthContext } from "@/context/AuthContext";
import { useSocketContext } from "@/context/SocketContextProvider";
import DocumentUploadButton from "../DocumentUploadButton";
import Modal from "../Modal";

const MessageInput = (): ReactElement => {
  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();
  const { loading, sendMessage } = useSendMessage();
  const [messageText, setMessageText] = useState<string>("");
  const [showDocUploadModal, setShowDocUploadModal] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const trimmed = messageText.trim();
    if (!trimmed) return;

    await sendMessage({ message: trimmed });
    setMessageText("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "35px";
    }
  };

  const emitTyping = useRef(
    debounce((userId: string | undefined) => {
      if (userId) socket?.emit("typing", userId);
    }, 300)
  ).current;

  return (
    <form className="px-4 mb-3" onSubmit={handleSubmit}>
      <div className="w-full relative p-2">
        <textarea
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          className="text-sm w-full block p-2 bg-background border border-primary rounded-lg pr-20 resize-none"
          id="message"
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => {
            setMessageText(e.target.value);
            emitTyping(authUser?.id);
          }}
          autoComplete="off"
          rows={1}
          style={{
            minHeight: "35px",
            maxHeight: "120px",
            overflowY: "auto",
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto"; // Reset first
            target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
          }}
        />

        <div className="absolute right-4 inset-y-0 flex gap-2 items-center">
          {/* 📎 Document Upload */}
          <button
            type="button"
            disabled={loading}
            onClick={() => setShowDocUploadModal(true)}
            className="text-sm cursor-pointer"
          >
            <Paperclip />
          </button>

          {/* 📤 Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="text-sm cursor-pointer"
          >
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              <Send className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* 📄 Document Upload Modal */}
      {showDocUploadModal && (
        <Modal
          open={showDocUploadModal}
          onClose={() => setShowDocUploadModal(false)}
        >
          <DocumentUploadButton />
        </Modal>
      )}
    </form>
  );
};

export default MessageInput;
