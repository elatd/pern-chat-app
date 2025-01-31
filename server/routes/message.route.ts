import { Router, Request, Response } from "express";
import { conversations } from "../controller/messages.controller.js";

const router = Router();

router.get("/test", (req: Request, res: Response) => {
  console.log("Reached message");
  res.send("message");
});

router.get("/conversations", conversations);
export default router;
