import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import { UserProvider } from "./context/UserContext";
import Layout from "./components/Layout";
import Ride from "./pages/Ride";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
function App() {
  return (
    <UserProvider>
      <Routes>
        <Route element={<Layout/>}/>
        <Route path="/" element={<Home />} />
         <Route path="/ride" element={<Ride />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/userregister" element={<UserRegister />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
