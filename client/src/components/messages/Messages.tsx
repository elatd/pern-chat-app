import { useGetMessages } from "@/hooks/useGetMessages";
import { Skeleton } from "../ui/skeleton";
import Message from "./Message";

function Messages() {
  const { loading, messages } = useGetMessages();
  // useListenMessages();

  // const ref = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>;
  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.map((message) => <Message key={message.id} message={message} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
}

const MessageSkeleton = () => {
  return (
    <div className="flex gap-3 items-start mb-4">
      <Skeleton className="h-9 w-9 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};
export default Messages;
