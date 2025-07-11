import captainModel from "../models/captain.model.js";
import * as captainService from "../services/captain.service.js";
import blackListToken from "../models/blacklisttoken.js";
import userModel from "../models/user.model.js";

export const registerCaptain = async (req, res, next) => {
  const { formData } = req.body;
  const existingCaptain = await captainModel.findOne({ email: formData.email });
  const existingPhone = await captainModel.findOne({ phone: formData.phone });
  if (existingCaptain || existingPhone) {
    res
      .status(400)
      .json({ message: "Captain already exists with this email or phone no." });
    return;
  }
  try {
    const hashpassword = await captainModel.hashPassword(formData.password);
    const captain = await captainService.createCaptain({
      fullname: formData.fullname,
      email: formData.email,
      password: hashpassword,
      phone: formData.phone,
      vehicle: {
        name: formData.vehicle.name,
        model: formData.vehicle.model,
        number: formData.vehicle.number,
      },
    });
    console.log("captain is creating");
    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  export const loginCaptain = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const captain = await captainModel.findOne({ email });
      if (!captain ) {
        return res.status(401).json({ message: "invalid credentials" });
      }
      const token = captain.generateAuthToken();
      // Set cookie with token
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });
      console.log("captain is login");
      res.status(200).json({ token, captain });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
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
