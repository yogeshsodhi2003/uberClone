import React from "react";

import { motion } from "motion/react";

const LoginPage = () => {
  return (
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

        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email
            </label>
            <input
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
          <a href="#" className="text-yellow-500 font-medium hover:underline">
            Sign Up
          </a>
        </div>
      </motion.div>
    </main>
  );
};

export default LoginPage;
