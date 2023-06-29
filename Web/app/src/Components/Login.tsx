import React, { useEffect, useState } from "react";
import LoginIcon from "../Assets/Images/login-logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthPage from "../Pages/AuthPage";
import visibleIcon from "../Assets/Images/visible.svg";
import notVisibleIcon from "../Assets/Images/notvisible.svg";
import { UserDetail } from "../Types/UserDetails";
import jwt_decode from "jwt-decode";
import { TabTitle } from '../utils/GeneralFunctions';

export type Role = {
  id: number;
  name: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export interface MyToken {
  email: string;
  exp: number;
}

export type LoginProps = {
  onLoginSuccess: (isSignedIn: boolean) => void;
  onFetchUserDetails: (userDetail: UserDetail) => void;
};

function Login({ onLoginSuccess, onFetchUserDetails }: LoginProps) {
  const [passswordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginData>>({});
  const [loginFormData, setLoginFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  //Page Title
  TabTitle('Login - SearchWorks')

  // Handle change
  const handleChange = (e: any) => {
    setLoginFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  // Validation
  const validateLogin = () => {
    const { email, password } = loginFormData;
    const errors: Partial<LoginData> = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // Valid Email Validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  //ToggleVisiblePassword
  const handleTogglePassword = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  // Handle Login
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const isValid = validateLogin();

    if (isValid) {
      try {
        const token = localStorage.getItem("token");

        var res = await fetch(`${process.env.REACT_APP_BASE_URL}/Auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(loginFormData),
        });
        var result = await res.text();

        if (res.ok) {
          // fetch user details
          localStorage.setItem("token", result);
          const decodedToken = jwt_decode<MyToken>(result);
          console.log({ decodedToken });
          var userDetailReq = await fetch(
            `${process.env.REACT_APP_BASE_URL}/UserData/email/${encodeURIComponent(
              decodedToken.email
            )}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${result}`,
              },
            }
          );

          var userDetail: UserDetail = await userDetailReq.json();
          localStorage.setItem("user", JSON.stringify(userDetail));
          console.log({ userDetail });

          onFetchUserDetails(userDetail);
          onLoginSuccess(true);

          switch (true) {
            case userDetail.roles[0] === "Admin":
              navigate("/pending");
              break;
            case userDetail.roles[0] === "Client":
              navigate("/clientmain");
              break;
            case userDetail.roles[0] === "Unassigned":
              navigate("/pendingapproval");
              break;
            default:
              navigate("/kanbanboard");
          }
        } else if (res.status === 401) {
          navigate("/signup");
        } else {
          console.log(result);
          setErrorMessage("The password you’ve entered is incorrect.");
        }
      } catch (err: any) {
        console.log(err.message);
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <AuthPage>
        <div className="bg-white p-8 w-92 rounded-lg shadow-lg flex justify-center items-center flex-col">
          <img src={LoginIcon} alt="Logo" className="w-40 h-32" />
          <h2 className="mb-6 font-bold text-2xl text-zinc-700 text-center">
            Login to Your Account
          </h2>
          <form>
            <div className="mb-4">
              {errors.email && ( //Email Validation
                <p className="text-red-500 text-xs mb-1">{errors.email}</p>
              )}
              <input
                className={`shadow appearance-none border rounded-sm w-80 py-3 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:placeholder-gray-400 hover:border-sky-300 ${
                  errors.email ? "border-red-500 bg-red-100" : ""
                }`}
                name="email"
                type="text"
                value={loginFormData.email}
                onChange={handleChange}
                placeholder="Email address"
              />
            </div>
            {errors.password && ( //Password Validation
              <p className="text-red-500 text-xs mb-1">{errors.password}</p>
            )}
            <div className="mb-7 relative">
              {passswordVisible ? (
                <img
                  src={visibleIcon}
                  alt="hide"
                  className="absolute inset-y-3 right-3 w-5 cursor-pointer"
                  onClick={handleTogglePassword}
                />
              ) : (
                <img
                  src={notVisibleIcon}
                  alt="hide"
                  className="absolute inset-y-3 right-3 w-5 cursor-pointer"
                  onClick={handleTogglePassword}
                />
              )}
              <input
                className={`shadow appearance-none border rounded-sm w-80 py-3 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:placeholder-gray-400 hover:border-sky-300 ${
                  errors.password ? "border-red-500 bg-red-100" : ""
                }`}
                type={passswordVisible ? "text" : "password"}
                name="password"
                value={loginFormData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              {errorMessage && (
                <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
              )}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white w-80 py-4 px-4 rounded-sm tracking-wider"
              onClick={handleLogin}
              type="submit"
            >
              Login
            </button>
            <h2 className="text-xs mt-5 mb-5 text-zinc-500 text-center tracking-wider">
              Don't Have an account?
              <Link
                to="/signup"
                className="ml-1 text-blue-500 hover:text-blue-600 hover:underline hover:underline-offset-2"
              >
                Sign Up
              </Link>
            </h2>
          </form>
        </div>
      </AuthPage>
    </>
  );
}

export default Login;
