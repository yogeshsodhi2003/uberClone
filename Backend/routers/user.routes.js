import { authUser } from "../middleware/auth.middle.js";
import { Router } from "express";
import * as usercontroller from "../controllers/user.controller.js";

const router = Router();

router.post("/register", usercontroller.registerUser);

router.post("/login", usercontroller.loginUser);

router.get("/profile", authUser, usercontroller.getUserProfile);

router.post("/logout", authUser, usercontroller.logoutUser);

export default router;
