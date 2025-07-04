import React from "react";

import { motion } from "framer-motion";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/register", {
        username: username,
        email: email,
        password: password,
      });
      console.log(response);
    } catch (error) {
      console.log("error in register", error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-gray-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-gray-100 p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
        <p className="text-center text-gray-500 mb-8">
          Register to start booking rides with ease
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="fullname" className="block mb-2 font-semibold">
              Full Name
            </label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              id="fullname"
              type="text"
              placeholder="Enter your full name"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-semibold">
              Password
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="password"
              type="password"
              placeholder="Create a password"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button className="mt-4 bg-yellow-400 text-black font-semibold py-3 rounded-xl hover:bg-yellow-500 transition">
            Register
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/userlogin" className="text-yellow-500 font-medium hover:underline">
            Login
          </a>
        </div>
      </motion.div>
    </main>
  );
};

export default RegisterPage;
