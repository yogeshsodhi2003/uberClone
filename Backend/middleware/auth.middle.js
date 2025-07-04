
import JWT from "jsonwebtoken";
import blackListToken from "../models/blacklisttoken.js";
import captianModel from "../models/captain.model.js ";
import userModel from "../models/user.model.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  const isBlacklisted = await blackListToken.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  try {
    const decoded = JWT.verify(token, process.env.JWT_KEY);
    const user = await userModel.findById(decoded.id);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export const authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  const isBlacklisted = await blackListToken.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  try {
    const decoded = JWT.verify(token, process.env.JWT_KEY);
    const captain = await captianModel.findById(decoded.id);
    req.captain = captain;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
