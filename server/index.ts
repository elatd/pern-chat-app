import express, { json, Request, Response } from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(json()); // parsing application/json
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is our chat application.");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

// @TODO :Add web socket.io
// @TODO : Setup server for deployment
