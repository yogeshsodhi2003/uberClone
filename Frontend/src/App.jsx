import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import { UserProvider } from "./context/UserContext";
import { DriverProvider } from "./context/DriverContext";
import Layout from "./components/Layout";
import Ride from "./pages/Ride";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import DriverRegister from "./pages/DriverRegister";
import DriverLogin from "./pages/DriverLogin";
import DriverHome from "./pages/DriverHome";
function App() {
  return (
    <UserProvider>
      <DriverProvider>
        <Routes>
          <Route element={<Layout />} />
          <Route path="/" element={<Home />} />
          <Route path="/ride" element={<Ride />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/userregister" element={<UserRegister />} />
          <Route path="/driverregister" element={<DriverRegister />} />
          <Route path="/driverlogin" element={<DriverLogin />} />
          <Route path="/driverhome" element={<DriverHome />} />
        </Routes>
      </DriverProvider>
    </UserProvider>
  );
}

export default App;
