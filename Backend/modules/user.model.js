const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
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

module.exports = userModel;
