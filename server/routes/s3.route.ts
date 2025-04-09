// import express from "express";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// import dotenv from "dotenv";

// dotenv.config();

// const router = express.Router();

// const s3Client = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

// export const generateUploadUrl = async (fileName: string, fileType: string) => {
//   // 🧼 Sanitize filename to avoid URL or signature issues
//   const safeFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
//   const fileKey = `uploads/${Date.now()}-${safeFileName}`;

//   const command = new PutObjectCommand({
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: fileKey,
//     ContentType: fileType,
//     ACL: "public-read", // Or "private" if you plan to use signed GET URLs
//   });

//   const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

//   const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

//   console.log({
//     safeFileName,
//     fileKey,
//     fileUrl,
//     signedUrl,
//   });

//   return { uploadUrl: signedUrl, fileUrl };
// };

// router.post("/upload-url", async (req, res) => {
//   console.log("Received request to generate upload URL");
//   const { fileName, fileType } = req.body;
//   console.log("File Name: ", fileName);
//   if (!fileName || !fileType) {
//     return res.status(400).json({ error: "Missing fileName or fileType" });
//   }

//   const { uploadUrl, fileUrl } = await generateUploadUrl(fileName, fileType);
//   res.status(200).json({ uploadUrl, fileUrl });
// });

// export default router;

import express from "express";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// 🔹 Generates a signed PUT URL for uploading a file
export const generateUploadUrl = async (fileName: string, fileType: string) => {
  const safeFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const timestamp = Date.now();
  const fileKey = `uploads/${timestamp}-${safeFileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileKey,
    ContentType: fileType,
    // ACL removed — not supported on buckets with ACLs disabled
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

  const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

  return { uploadUrl, fileUrl, fileKey };
};

// 🔹 Generates a signed GET URL to view a file from a private bucket
export const generateViewUrl = async (fileKey: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileKey,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  return signedUrl;
};

// 🔸 POST /s3/upload-url → returns signed PUT URL + file URL
router.post("/upload-url", async (req, res) => {
  const { fileName, fileType } = req.body;

  if (!fileName || !fileType) {
    return res.status(400).json({ error: "Missing fileName or fileType" });
  }

  try {
    const { uploadUrl, fileUrl, fileKey } = await generateUploadUrl(
      fileName,
      fileType
    );
    res.status(200).json({ uploadUrl, fileUrl, fileKey });
  } catch (error) {
    console.error("Error generating upload URL:", error);
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
});

// 🔸 GET /s3/view-url?key=uploads/xyz.png → returns signed GET URL for viewing
router.get("/view-url", async (req, res) => {
  const fileKey = req.query.key as string;

  if (!fileKey) {
    return res.status(400).json({ error: "Missing 'key' query parameter" });
  }

  try {
    const signedViewUrl = await generateViewUrl(fileKey);
    res.status(200).json({ signedUrl: signedViewUrl });
  } catch (error) {
    console.error("Error generating view URL:", error);
    res.status(500).json({ error: "Failed to generate view URL" });
  }
});

export default router;
