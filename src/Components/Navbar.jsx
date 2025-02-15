import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await firebase.logout();
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed flex flex-col p-5">
      <h1 className="text-xl font-bold mb-5">Dashboard</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:bg-gray-700 p-3 rounded">
          Home
        </Link>
        <Link to="/query" className="hover:bg-gray-700 p-3 rounded">
          Raise Queries
        </Link>
      </nav>

      <div className="mt-auto">
        {firebase.user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 w-full py-2 rounded flex items-center justify-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 w-full py-2 rounded flex items-center justify-center"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
