import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DriverContext } from "../context/DriverContext";
import axios from "axios";

const DriverLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {driver , setDriver} = useContext(DriverContext)
  const {isAuth,  setIsAuth} = useContext(DriverContext)  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/captain/login", {
        email,
        password,
      });
      console.log("✅ Login successful", res.data);
      const token = res.data.token
      localStorage.setItem('token', token)
      setIsAuth(true)
      setDriver(res.data.captain)
      navigate("/driverhome")
      // save token or redirect here
    } catch (err) {
      console.error(
        "❌ Login failed:",
        console.log(err)
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Driver Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black font-semibold py-3 rounded-xl hover:bg-yellow-500 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-yellow-500 font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default DriverLogin;
