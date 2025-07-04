import userModel from "../models/user.model.js";
export const createUser = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  try {
    const user = userModel.create({
      username,
      email,
      password,
    });

    return user;
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};
