import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/userregister';
function App() {
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userlogin" element={<UserLogin />}/>
        <Route path="/userregister" element={<UserRegister />} /> 
      </Routes>
  
  )
}

export default App