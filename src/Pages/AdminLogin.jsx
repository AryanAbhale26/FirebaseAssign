import { useState } from "react";
import { useFirebase } from "../Context/Firebase";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.login(email, password);
      navigate("/admin/dashboard"); // Redirect to Admin Dashboard
    } catch (error) {
      alert("Invalid Admin Credentials!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-transparent border p-6 rounded-lg shadow-md w-96">
        <h2 className="text-white text-2xl font-semibold mb-4 text-center">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-transparent border text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-transparent border text-white"
            required
          />
          <button
            type="submit"
            className="w-full p-2 rounded bg-blue-600 text-white hover:bg-blue-500"
          >
            Login
          </button>
        </form>
        <div className="text-center py-2">
          If have a account{" "}
          <Link to="/login" className="text-blue-600">
            Login{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
