import React, { useState } from "react";
import LoginIcon from "../Assets/Images/login-logo.svg";
import { Link, useRoutes, useNavigate } from "react-router-dom";
import AuthPage from "../Pages/AuthPage";

export enum LoginTypes {
  Google,
  None,
}

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: any) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLogin = async () => {
    try {
      var res = await fetch(`  http://localhost:5143/api/v1/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      var result = await res.text();
      if (res.ok) {
        console.log("success");
      } else {
        console.log(result);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <AuthPage>
      <div className="bg-white p-8 w-96 rounded-lg shadow-lg flex justify-center items-center flex-col">
        <img src={LoginIcon} alt="Logo" className="w-32 h-32" />
        <h2 className="mb-6 font-bold text-2xl text-gray-800 text-center">
          Login to Your Account
        </h2>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500"
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
          />
        </div>
        <div className="mb-7">
          <input
            className="shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <Link to="/dashboard">
          <button
            className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white w-80 py-4 px-4 rounded-sm"
            onClick={handleLogin}
          >
            Login
          </button>
        </Link>
        <h2 className="text-xs mt-5 mb-5 text-gray-800">
          Don't Have an account?
          <Link to="/signup" className="ml-1 text-blue-500 hover:text-blue-600">
            Sign Up
          </Link>
        </h2>
        <div className="w-80 text-center">
          <Link
            to="/forgotpassword"
            className="text-blue-500 hover:text-blue-600 p-0.5 text-xs leading-normal tracking-wide"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </AuthPage>
  );
}

export default Login;
