import { body } from "express-validator";
import * as controller from "../controllers/captain.controller.js";
import {authCaptain} from "../middleware/auth.middle.js";
import { Router } from "express";

const router = Router();

router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("write fullname"),
    body("email").isEmail().withMessage("invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("write password"),
    body("phone").isLength({ min: 10 }).withMessage("write phone"),
  ],
  controller.registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("write password"),
  ],
  controller.loginCaptain
);

router.get("/profile", authCaptain, controller.getCaptainProfile);
router.post("/logout", authCaptain, controller.logoutCaptain);

export default router;
