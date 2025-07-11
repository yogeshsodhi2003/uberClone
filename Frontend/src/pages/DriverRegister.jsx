import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DriverContext } from "../context/DriverContext";
import axios from "axios";

const DriverRegister = () => {
  const navigate = useNavigate();
  const { driver, setDriver } = useContext(DriverContext);
   const {isAuth,  setIsAuth} = useContext(DriverContext)  
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    vehicle: {
      name: "",
      model: "",
      number: "",
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("vehicle.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        vehicle: {
          ...formData.vehicle,
          [field]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/captain/register", {
        formData,
      });
      console.log("✅ Login successful", res.data);
      const token = res.data.token;
      localStorage.setItem("token", token);
      setIsAuth(true);
      setDriver(res.data.driver);
      navigate("/driverhome");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-100 p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Driver Registration
        </h2>

        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          className="input"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="input"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="input"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="vehicle.name"
          placeholder="Vehicle Name"
          className="input"
          value={formData.vehicle.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="vehicle.model"
          placeholder="Model Number"
          className="input"
          value={formData.vehicle.model}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="vehicle.number"
          placeholder="Model Number"
          className="input"
          value={formData.vehicle.number}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition"
        >
          Register as Driver
        </button>
      </form>
    </div>
  );
};

export default DriverRegister;
