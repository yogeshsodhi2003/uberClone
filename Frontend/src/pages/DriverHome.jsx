import React, { useState, useContext } from "react";
import { Bell, Car, LogOut, User } from "lucide-react";
import { DriverContext } from "../context/DriverContext";

const DriverHome = () => {
  const drivertest = useContext(DriverContext);
  console.log("loged in driver", drivertest);
  const driver = {
    fullname: "Ashu Yadav",
    email: "ashu@example.com",
    phone: "9876543210",
    vehicle: {
      name: "Hyundai",
      model: "i20",
      number: "HR26DK1234",
    },
    online: true,
  };

  const notifications = [
    {
      id: 1,
      pickup: "Sector 17, Chandigarh",
      drop: "Elante Mall",
      time: "Just now",
    },
    {
      id: 2,
      pickup: "PGI Hospital",
      drop: "ISBT 43",
      time: "10 mins ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Driver Dashboard</h1>
        <button className="flex items-center gap-2 text-red-500 hover:underline">
          <LogOut size={18} />
          Logout
        </button>
      </header>

      {/* Driver Info */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center gap-4 mb-4">
            <User
              className="text-yellow-500 bg-yellow-100 p-2 rounded-full"
              size={40}
            />
            <div>
              <h2 className="text-lg font-semibold">{driver.fullname}</h2>
              <p className="text-sm text-gray-500">{driver.email}</p>
              <p className="text-sm text-gray-500">{driver.phone}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span
              className={`text-sm px-3 py-1 rounded-full ${
                driver.online
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {driver.online ? "Online" : "Offline"}
            </span>
            <button className="text-xs text-yellow-500 font-medium hover:underline">
              Toggle Status
            </button>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="bg-white p-6 rounded-xl shadow flex items-start gap-4">
          <Car
            className="text-yellow-500 bg-yellow-100 p-2 rounded-full"
            size={40}
          />
          <div>
            <h3 className="text-lg font-semibold">Vehicle Details</h3>
            <p className="text-sm text-gray-500">
              {driver.vehicle.name} - {driver.vehicle.model}
            </p>
            <p className="text-sm font-medium">{driver.vehicle.number}</p>
          </div>
        </div>

        {/* Stats (Optional: you can hook it to DB later) */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              ✅ Completed Rides: <strong>124</strong>
            </li>
            <li>
              💰 Total Earnings: <strong>₹18,750</strong>
            </li>
            <li>
              ⭐ Rating: <strong>4.8</strong>
            </li>
          </ul>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
            <Bell className="text-yellow-500" />
            Ride Requests
          </h2>
          <span className="text-sm text-gray-500">
            {notifications.length} new
          </span>
        </div>
        {notifications.length === 0 ? (
          <p className="text-gray-500">No new ride requests.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((req) => (
              <li
                key={req.id}
                className="p-4 bg-gray-100 rounded-xl flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    Pickup: <span className="text-gray-700">{req.pickup}</span>
                  </p>
                  <p className="font-medium">
                    Drop: <span className="text-gray-700">{req.drop}</span>
                  </p>
                  <p className="text-sm text-gray-400">🕒 {req.time}</p>
                </div>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-xl hover:bg-yellow-500 transition text-sm font-semibold">
                  Accept
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DriverHome;
