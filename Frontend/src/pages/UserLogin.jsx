import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import { motion } from "motion/react";


const LoginPage = () => {

  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext);
  const {isAuth, setIsAuth} = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });
      const data = response.data.user;
      const token = response.data.token;
      localStorage.setItem("token", token);
      setUser(data);
      setIsAuth(true);
      navigate('/ride')
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <>
    <Navbar/>
    <main className="min-h-screen flex items-center justify-center bg-white text-gray-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-gray-100 p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8">
          Login to continue booking your ride
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button className="mt-4 bg-yellow-400 text-black font-semibold py-3 rounded-xl hover:bg-yellow-500 transition">
            Login
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/userregister"
            className="text-yellow-500 font-medium hover:underline"
          >
            Sign Up
          </a>
        </div>
      </motion.div>
    </main>
    </>
  );
};

export default LoginPage;
