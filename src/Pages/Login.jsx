import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFirebase } from "../Context/Firebase";

export const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (firebase.user) {
      navigate("/");
    }
  }, [firebase.user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.login(userEmail, password);
      alert("Successfully Logged In");
      navigate("/");
    } catch (error) {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-transparent border p-6 rounded-lg shadow-md w-96">
        <h2 className="text-white text-2xl font-semibold mb-4 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full p-2 rounded bg-transparent border text-white outline-none"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-transparent border text-white outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full p-2 rounded bg-blue-600 text-white hover:bg-blue-500"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-400 mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400">
            Signup
          </Link>
        </p>
        <p className="text-center text-gray-400 mt-1">
          Login as{" "}
          <Link to="/admin/login" className="text-blue-400">
            Admin
          </Link>
        </p>
      </div>
    </div>
  );
};
