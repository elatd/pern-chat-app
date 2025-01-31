import { Router, Response, Request } from "express";
import { getMe, login, logout, signup } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

router.get("/test", (req: Request, res: Response) => {
  console.log("Reached ");
  res.send("auth");
});

router.get("/me", protectRoute, getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
