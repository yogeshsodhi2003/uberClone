import captainModel from "../models/captain.model.js";
export const createCaptain = async ({ fullname, email, password, phone }) => {
  if (!fullname || !email || !password) {
    throw new Error("all field are required");
  }
  const captain = captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });
  await captain.save();
  return captain;
};
