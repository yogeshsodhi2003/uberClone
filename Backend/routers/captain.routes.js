import { body } from "express-validator";
import * as controller from "../controllers/captain.controller.js";
import { authCaptain } from "../middleware/auth.middle.js";
import { Router } from "express";

const router = Router();

router.post("/register", controller.registerCaptain);

router.post("/login", controller.loginCaptain);

router.get("/profile", authCaptain, controller.getCaptainProfile);
router.post("/logout", authCaptain, controller.logoutCaptain);

export default router;
