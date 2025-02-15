import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { Login } from "./pages/Login";
import Signup from "./Pages/Signup";
import Lists from "./Pages/Lists";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminRoute from "./Components/AdminRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        <Route path="/query" element={<Lists />} />
        {/* //For admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
