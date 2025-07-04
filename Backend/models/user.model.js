import mongoose from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, "fullname should be at least 3 characters"],
    maxlength: [20, "fullname should not exceed 20 characters"],

  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: [6, "password should be at least 6 characters"],
  },
  email: {
    type: String,
    required: true,
    select: false,
  },
  WebSocket: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = JWT.sign({ _id: this._id }, process.env.JWT_KEY, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

export default userModel; // Exporting the userModel for use in other files
