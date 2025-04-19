import { useEffect, useState } from "react";
import AxiosInstance from "@/lib/axios";

const useSignedUrl = (fileKey: string | undefined) => {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    const getSignedUrl = async () => {
      if (!fileKey) return;
      try {
        const { data } = await AxiosInstance.get("/s3/view-url", {
          params: { key: fileKey },
        });
        setSignedUrl(data.signedUrl);
      } catch (err) {
        console.error("Failed to fetch signed URL", err);
      }
    };

    getSignedUrl();
  }, [fileKey]);

  return signedUrl;
};

export default useSignedUrl;
