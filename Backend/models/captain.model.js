import mongoose from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "firstname should be at least 3 characters"],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, "lastname should be at least 3 characters"],
    },
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

captainSchema.methods.genetrateAuthToken = function () {
  const token = JWT.sign({ _id: this._id.toString() }, process.env.JWT_KEY, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model( "captain", captainSchema );



export default captainModel;