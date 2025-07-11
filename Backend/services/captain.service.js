import captainModel from "../models/captain.model.js";
export const createCaptain = async ({ fullname, email, password, phone, vehicle  }) => {
  if (!fullname || !email || !password) {
    throw new Error("all field are required");
  }
  try {
   
  const captain = captainModel.create({
    fullname,
    email,
    password,
    phone,
    vehicle: {
      name: vehicle.name,
      model: vehicle.model,
      number: vehicle.number,
    },
  });
  return captain;
} catch (error) {
    res.status(500).json({ message: error.message });
  }
};
