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

//  generates a signed PUT URL for uploading a file to S3
export const generateUploadUrl = async (fileName: string, fileType: string) => {
  const safeFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const timestamp = Date.now();
  const fileKey = `uploads/${timestamp}-${safeFileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileKey,
    ContentType: fileType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

  const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

  return { uploadUrl, fileUrl, fileKey };
};

// generates a signed GET URL to view a file from a private bucket
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

// GET /s3/view-url?key=uploads/xyz.png → returns signed GET URL for viewing
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

router.get("/s3/view-url", async (req, res) => {
  const fileKey = req.query.key as string;
  if (!fileKey) return res.status(400).json({ error: "Missing 'key'" });

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileKey,
  });
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

  return res.json({ signedUrl });
});

export default router;
