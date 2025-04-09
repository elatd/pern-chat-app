// import {useAuthContext} from "@/context/AuthContext.tsx";
// import useConversation, { MessageType } from "@/zustand/useConversation.tsx";
// import {extractTime} from "@/util/extractDate.ts";

// type MessagePropsType  = {
//     key : string;
//     message : MessageType;
// }

// function Message({message}:MessagePropsType){
//     const {authUser} = useAuthContext();
//     const {selectedConversation} = useConversation();

//     const fromMe = message?.senderId === authUser?.id;
//     const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;

//     return (
//         <div className={`flex ${fromMe ? 'justify-end' : 'justify-start'} mb-4`}>
//             <div className={`flex ${fromMe ? 'flex-row-reverse' : 'flex-row'} items-end max-w-[75%]`}>
//                 <div className='flex-shrink-0 hidden md:block'>
//                     <img
//                         className='w-8 h-8 rounded-full object-cover mx-2'
//                         alt='Profile picture'
//                         src={img}
//                     />
//                 </div>
//                 <div className={`flex flex-col ${fromMe ? 'items-end' : 'items-start'}`}>
//                     <div className={`px-4 py-2 rounded-2xl ${fromMe ? 'bg-blue-500 rounded-br-none' : 'bg-gray-700 rounded-bl-none'} `}>
//                         {/* ${message.shouldShake ? 'animate-shake' : ''} */}
//                         <p className='text-white text-sm md:text-base break-words'>
//                             {message.body}
//                         </p>
//                     </div>
//                     <span className='text-gray-400 text-xs mt-1 px-2'>
//                         {extractTime(message.createdAt)}
//                     </span>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Message;

import { useAuthContext } from "@/context/AuthContext.tsx";
import useConversation, { MessageType } from "@/zustand/useConversation.tsx";
import { extractTime } from "@/util/extractDate.ts";
import { FileText, FileImage, Video } from "lucide-react";

type MessagePropsType = {
  key: string;
  message: MessageType;
};

function Message({ message }: MessagePropsType) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message?.senderId === authUser?.id;
  const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;

  const isImage = message.fileUrl && message.fileType?.startsWith("image/");
  const isVideo = message.fileUrl && message.fileType?.startsWith("video/");
  const isDocument =
    message.fileUrl && message.fileType?.startsWith("application/");

  return (
    <div className={`flex ${fromMe ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`flex ${
          fromMe ? "flex-row-reverse" : "flex-row"
        } items-end max-w-[75%]`}
      >
        <div className="flex-shrink-0 hidden md:block">
          <img
            className="w-8 h-8 rounded-full object-cover mx-2"
            alt="Profile picture"
            src={img}
          />
        </div>

        <div
          className={`flex flex-col ${fromMe ? "items-end" : "items-start"}`}
        >
          <div
            className={`px-4 py-2 rounded-2xl ${
              fromMe
                ? "bg-blue-500 rounded-br-none"
                : "bg-gray-700 rounded-bl-none"
            }`}
          >
            {/* Text message */}
            {message.body && (
              <p className="text-white text-sm md:text-base break-words">
                {message.body}
              </p>
            )}

            {/* Image */}
            {isImage && (
              <div className="mt-2">
                <img
                  src={message.fileUrl}
                  alt={message.fileName || "shared image"}
                  className="rounded-lg max-w-xs max-h-64 object-cover border border-white"
                />
              </div>
            )}

            {/* Video */}
            {isVideo && (
              <div className="mt-2">
                <video
                  controls
                  className="rounded-lg max-w-xs max-h-64 border border-white"
                >
                  <source src={message.fileUrl} type={message.fileType} />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {/* Document */}
            {isDocument && (
              <div className="mt-2 bg-white rounded-md px-3 py-2 flex items-center gap-2 text-black">
                <FileText className="w-4 h-4 text-blue-600" />
                <a
                  href={message.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium underline break-words max-w-[200px] truncate"
                >
                  {message.fileName || "Download Document"}
                </a>
              </div>
            )}
          </div>

          <span className="text-gray-400 text-xs mt-1 px-2">
            {extractTime(message.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Message;
