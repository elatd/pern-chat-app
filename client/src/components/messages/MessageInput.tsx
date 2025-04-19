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
import DocumentUploadButtonModal from "../DocumentUploadModal";
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
      <div className="w-full p-2 relative">
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
          <DocumentUploadButtonModal onClose={setShowDocUploadModal} />
        </Modal>
      )}
    </form>
  );
};

export default MessageInput;
