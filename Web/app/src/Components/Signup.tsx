import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as SignupIcon } from "../Assets/Images/signup-icon.svg";
import { ReactComponent as GoogleIcon } from "../Assets/Images/google-logo.svg";
import { ReactComponent as FacebookIcon } from "../Assets/Images/facebook-logo.svg";
import { ReactComponent as LinkedinIcon } from "../Assets/Images/linkedin-logo.svg";
import AuthPage from "../Pages/AuthPage";
import { json } from "stream/consumers";

export type SignupData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
};

function Signup() {
  const [signupFormData, setSignupFormData] = useState<SignupData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    middleName: null,
    lastName: "",
  });

  const handleChange = (e: any) => {
    setSignupFormData((prevSignupFormData) => {
      return {
        ...prevSignupFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSignup = async () => {
    var registrationDetails = {
      username: signupFormData.username,
      password: signupFormData.password,
      email: signupFormData.email,
      firstName: signupFormData.firstName,
      middleName: signupFormData.middleName,
      lastName: signupFormData.lastName,
    };

    try {
      var res = await fetch(`http://localhost:5143/api/v1/Auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationDetails),
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
      <div className="bg-white p-8 w-96  rounded-lg shadow-lg flex justify-center items-center flex-col">
        <SignupIcon className="w-32 h-full mb-4" />
        <h2 className="mb-6 font-bold text-3xl text-gray-800">
          Create your account
        </h2>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500"
            type="email"
            name="email"
            value={signupFormData.email}
            onChange={handleChange}
            placeholder="Email address"
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500"
            type="text"
            name="username"
            value={signupFormData.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500"
            type="password"
            name="password"
            value={signupFormData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500"
            type="password"
            name="confirmPassword"
            value={signupFormData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500"
            type="text"
            name="firstName"
            value={signupFormData.firstName}
            onChange={handleChange}
            placeholder="First name"
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500"
            type="text"
            name="middleName"
            value={signupFormData.middleName!}
            onChange={handleChange}
            placeholder="Middle name"
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500"
            type="text"
            name="lastName"
            value={signupFormData.lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white w-80 py-4 px-4 rounded-sm"
          onClick={handleSignup}
        >
          Sign up
        </button>
        <h2 className="text-xs mt-4 mb-5 text-gray-800">
          Already have an account?
          <Link to="/" className="ml-1 text-blue-500 hover:text-blue-600">
            Log in
          </Link>
        </h2>
      </div>
    </AuthPage>
  );
}

export default Signup;
