// import AxiosInstance from "@/lib/axios"; // Axios instance for API calls
// import { useState, useCallback } from "react";
// import { cn } from "@/lib/utils"; // optional utility for conditional classnames

// const DocumentUpload = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);

//   const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//     const droppedFile = e.dataTransfer.files?.[0];
//     if (droppedFile) setFile(droppedFile);
//   }, []);

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selected = e.target.files?.[0];
//     if (selected) setFile(selected);
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     setUploading(true);

//     try {
//       // 1. Ask backend for pre-signed URL
//       const { data } = await AxiosInstance.post("/s3/upload-url", {
//         fileName: file.name,
//         fileType: file.type,
//       });

//       const { uploadUrl, fileUrl } = data;

//       // 2. Upload directly to S3
//       await AxiosInstance.put(uploadUrl, file, {
//         headers: { "Content-Type": file.type },
//       });

//       // 3. Send message with file URL
//       await AxiosInstance.post("/api/message/send", {
//         body: "",
//         fileUrl,
//         fileName: file.name,
//         fileType: file.type,
//       });

//       alert("📄 Document shared successfully!");
//       setFile(null);
//     } catch (error) {
//       console.error("Upload error:", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto p-4">
//       <div
//         className={cn(
//           "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition",
//           isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
//         )}
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//       >
//         <input
//           type="file"
//           accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
//           onChange={handleFileChange}
//           className="hidden"
//           id="fileInput"
//         />
//         <label
//           htmlFor="fileInput"
//           className="block cursor-pointer text-sm text-gray-600"
//         >
//           {file ? (
//             <p>📎 {file.name}</p>
//           ) : (
//             <p>
//               Drag and drop a document here, or{" "}
//               <span className="text-blue-600 underline">click to browse</span>
//             </p>
//           )}
//         </label>
//       </div>

//       <div className="mt-4 text-center">
//         <button
//           disabled={!file || uploading}
//           onClick={handleUpload}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
//         >
//           {uploading ? "Uploading..." : "Send Document"}
//         </button>
//       </div>
//     </div>
//   );
// };

import AxiosInstance from "@/lib/axios"; // Your API instance
import axios from "axios"; // Native axios instance for raw PUT to S3
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import useConversation from "@/zustand/useConversation";

const DocumentUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { selectedConversation } = useConversation();
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setFile(droppedFile);
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      // 1. Ask backend for pre-signed upload URL
      const { data } = await AxiosInstance.post("/s3/upload-url", {
        fileName: file.name,
        fileType: file.type,
      });

      const { uploadUrl, fileUrl } = data;
      console.log("Upload URL:", uploadUrl);
      console.log("File URL:", fileUrl);
      // 2. Upload file directly to S3 using native axios (not AxiosInstance)
      const res = await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        // 🚫 prevent sending cookies or baseURL
        withCredentials: false,
      });
      console.log("S3 upload response:", res);
      // 3. Send file as a message in chat
      const res2 = await AxiosInstance.post(
        `/message/send/${selectedConversation?.id}`,
        {
          body: "", // or use an optional text input
          fileUrl,
          fileName: file.name,
          fileType: file.type,
        }
      );
      console.log("S4 upload response:", res2);
      alert("📄 Document shared successfully!");
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. See console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif,.webp,.mp4"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="block cursor-pointer text-sm text-gray-600"
        >
          {file ? (
            <p>📎 {file.name}</p>
          ) : (
            <p>
              Drag and drop a file here, or{" "}
              <span className="text-blue-600 underline">click to browse</span>
            </p>
          )}
        </label>
      </div>

      <div className="mt-4 text-center">
        <button
          disabled={!file || uploading}
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Send File"}
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;
