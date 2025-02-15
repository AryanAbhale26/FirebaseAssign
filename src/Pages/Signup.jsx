import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../Firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFirebase } from "../Context/Firebase";
const auth = getAuth(app);
const Signup = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    if (firebase.user) {
      navigate("/");
    }
  }, [firebase.user, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userEmail);
    console.log(password);
    try {
      await firebase.signUp(userEmail, password); // ✅ Correct function name
      alert("Successfully created Account");
      setPassword("");
      setUserEmail("");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use. Please use a different email or login.");
      } else {
        alert("Something went wrong: " + error.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center min-h-screen w-full flex-col bg-gray-900"
    >
      <div className="login border border-solid flex flex-col gap-2 w-[50vh] p-5 rounded-lg shadow-lg">
        <p className="text-center text-xl font-semibold">Signup</p>

        <input
          value={userEmail}
          type="email"
          placeholder="Enter the email"
          className="border p-3 outline-none rounded-lg"
          required
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <div className="pass border flex items-center p-3 rounded-lg">
          <input
            value={password}
            type={showPassword ? "password" : "text"}
            className="w-full outline-none"
            required
            minLength={6}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button className="bg-blue-500 text-white rounded-lg p-3 mt-2 hover:bg-blue-600">
          Submit
        </button>

        <div className="footer p-2 text-center">
          <span>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 underline">
              Login
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
};

export default Signup;
