import { Router, Request, Response } from "express";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../controller/messages.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

router.get("/test", (req: Request, res: Response) => {
  console.log("Reached message");
  res.send("message");
});

router.get("/conversations", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
