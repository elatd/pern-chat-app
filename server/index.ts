import { json, Request, Response } from "express";
import { app, io, server } from "./socket/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import s3Routes from "./routes/s3.route.js";
import path from "path";
import express from "express";

dotenv.config();
const PORT: string | 3000 = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(json()); // parsing application/json
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5173", "https://pern-chat-app-osj7.onrender.com/"], // Allow only requests from this origin
  methods: "GET,POST,PUT,DELETE,PATCH ", // Allow only these methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow only these headers
  preflightContinue: false, // Ignore preflight requests
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/s3", s3Routes);

if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is our chat application.");
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// @TODO : Setup server for deployment
