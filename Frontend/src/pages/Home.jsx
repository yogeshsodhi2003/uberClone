import React from "react";
import { motion } from "motion/react";
import { MapPin, Car, PhoneCall } from "lucide-react";

const Home = () => {
  return (
    <main className="min-h-screen  p-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center py-24">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Get There, Fast & Safe
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-2xl  mb-10 max-w-2xl"
        >
          Your reliable ride is just a tap away. Book your ride, track it live, and reach your destination with comfort and speed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <button className="bg-yellow-400 text-black text-lg px-6 py-3 rounded-full shadow-xl hover:bg-yellow-500">
            Book a Ride
          </button>
          <button variant="outline" className=" border-white text-lg px-6 py-3 rounded-full hover:bg-white hover:text-black">
            Become a Driver
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
            <MapPin className="w-10 h-10 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Live Location</h3>
            <p className="text-gray-400">Track your ride in real-time and never lose sight of your destination.</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
            <Car className="w-10 h-10 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Rides</h3>
            <p className="text-gray-400">We connect you with the nearest drivers to minimize wait time.</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
            <PhoneCall className="w-10 h-10 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-400">We’ve got your back. Any issue, anytime – we’re here to help.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
