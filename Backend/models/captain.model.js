import mongoose from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
const captainSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: [3, "fullname should be at least 3 characters"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "password should be at least 6 characters"],
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    minlength: [10, "phone number should be at least 10 characters"],
    maxlength: [10, "phone number should not exceed 10 characters"],
  },
  WebSocket: {
    type: String,
  },
  vehicle: {
    name: {
      type: String,
      required: true,
      minlength: [3, "name should be at least 3 characters"],
    },
    model: {
      type: String,
      required: true,
      minlength: [3, "model should be at least 3 characters"],
    },
    number: {
      type: String,
      required: true,
      minlength: [3, "number should be at least 3 characters"],
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = JWT.sign({ _id: this._id.toString() }, process.env.JWT_KEY, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model( "captain", captainSchema );



export default captainModel;