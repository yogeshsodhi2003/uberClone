import captainModel from "../models/captain.model.js";
import * as captainService from "../services/captain.service.js";
import { validationResult } from "express-validator";
import blackListToken from "../models/blacklisttoken.js";

export const registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, phone } = req.body;
  const hashpassword = captainModel.hashpassword(password);
  const captain = await captainService.createCaptain({
    fullname,
    email,
    hashpassword,
    phone,
  });
  const token = captain.generateAuthToken();
  res.status(201).json({ token, captain });
};

export const loginCaptain = async (req, res, next) => {
  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email });
  if (!captain || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "invalid credentials" });
  }
  const token = captain.generateAuthToken();
  res.status(200).json({ token, captain });
};

export const getCaptainProfile = async (req, res, next) => {
  res.status(200).json(req.captain);
};

export const logoutCaptain = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blackListToken.create({ token });
  res.status(200).json({ message: "Logout Successfully" });
};
