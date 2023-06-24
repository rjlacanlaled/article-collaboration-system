import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as SignupIcon } from "../Assets/Images/signup-icon.svg";
import visibleIcon from '../Assets/Images/visible.svg'
import notVisibleIcon from '../Assets/Images/notvisible.svg'
import AuthPage from "../Pages/AuthPage";
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';

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
  const [tooltip, setTooltip] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [errors, setErrors] = useState<Partial<SignupData>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [signupFormData, setSignupFormData] = useState<SignupData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    middleName: "",
    lastName: "",
  });
  const Navigate = useNavigate();

  // Handle Change
  const handleChange = (e: any) => {
    setSignupFormData((prevSignupFormData) => {
      return {
        ...prevSignupFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleTooltipOpen = () => {
    setTooltip(prevState => !prevState)
  }

  const handleTooltipClose = () => {
    setTimeout(() => {
      setTooltip(prevState => !prevState)
    },2000)
  }

  // Validation
  const validateSignup = () => {
    const { email, username, password, confirmPassword, firstName, lastName } =
      signupFormData;
    const errors: Partial<SignupData> = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email address";
    }

    if (!username) {
      errors.username = "Username is required";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[A-Z])/.test(password)) {
      errors.password = "Password must contain at least one UPPERCASE letter";
    } else if (!/(?=.*[\W_])/.test(password)) {
      errors.password = "Password must contain at least one special character: @!#$*?&";
    }

    if(!confirmPassword) {
      errors.confirmPassword = "Password is required";
    } 

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!firstName) {
      errors.firstName = "First name is required";
    }

    if (!lastName) {
      errors.lastName = "Last name is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  // Valid Email Validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  //ToggleVisiblePassword
  const handleTogglePassword = () => {
    setPasswordVisible((prevState) => !prevState);
  }

  // Handle click outside to close tooltip
  useEffect(() => {
    const handleClickOutside = (e:any) => {
      if (
        e.target.closest(".tooltip") === null &&
        e.target.name !== "password"
      ) {
        setTooltip(false);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
  
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Handle Signup
  const handleSignup = async (e:any) => {
    e.preventDefault();
    const isValid = validateSignup();

    if (isValid) {
      var registrationDetails = {
        username: signupFormData.username,
        password: signupFormData.password,
        email: signupFormData.email,
        firstName: signupFormData.firstName,
        middleName: signupFormData.middleName,
        lastName: signupFormData.lastName,
      };

      try {
        var res = await fetch(`${process.env.REACT_APP_BASE_URL}/Auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationDetails),
        });
        var result = await res.text();
        if (res.ok) {
          console.log("success"); 
          Navigate("/success")
        } else {
          console.log(result);
          setErrorMessage("Email Address or Username might already exist. Please try another one.")
        }
      } catch (err: any) {
        console.log(err.message);
      }
    }
  };

  return (
    <AuthPage>
      <div className="bg-white p-8 w-fit rounded-lg shadow-lg flex justify-center items-center flex-col">
        <SignupIcon className="w-32 h-full mb-4" />
        <h2 className="mb-6 font-bold text-3xl text-zinc-700">
          Create your account
        </h2>
      <form>
        {errors.firstName && ( //First Name Validation
          <p className="text-red-500 text-xs mb-1">{errors.firstName}</p>
        )}
        <div className="flex justify-center items-center">
          <div className="mb-5 mr-1.5">
            <input
              className={`shadow appearance-none border rounded-sm w-80 py-3 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:placeholder-gray-400 hover:border-sky-300 ${
                errors.firstName ? "border-red-500 bg-red-100" : ""
              }`}
              type="text"
              name="firstName"
              value={signupFormData.firstName}
              onChange={handleChange}
              placeholder="First name"
            />
          </div>
          <div className="mb-5 ml-1.5">
            <input
              className="shadow appearance-none border rounded-sm w-80 py-3 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:placeholder-gray-400 hover:border-sky-300"
              type="text"
              name="middleName"
              value={signupFormData.middleName!}
              onChange={handleChange}
              placeholder="Middle name"
            />
          </div>
        </div>
        {errors.lastName && ( //Last Name Validation
          <p className="text-red-500 text-xs mb-1">{errors.lastName}</p>
        )}
        <div className="mb-5">
          <input
            className={`shadow appearance-none border rounded-sm w-full py-3 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:placeholder-gray-400 hover:border-sky-300 ${
              errors.lastName ? "border-red-500 bg-red-100" : ""
            }`}
            type="text"
            name="lastName"
            value={signupFormData.lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
        </div>
        {errors.email && ( //Email Validation
          <p className="text-red-500 text-xs mb-1">{errors.email}</p>
        )}
        <div className="mb-5">
          <input
            className={`shadow appearance-none border rounded-sm w-full py-3 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:placeholder-gray-400 hover:border-sky-300 ${
              errors.email ? "border-red-500 bg-red-100" : ""
            }`}
            name="email"
            value={signupFormData.email}
            onChange={handleChange}
            placeholder="Email address"
          />
        </div>
        <div className="mb-5">
          {errors.username && ( //Username Validation
            <p className="text-red-500 text-xs mb-1">{errors.username}</p>
          )}
          <input
            className={`shadow appearance-none border rounded-sm w-full py-3 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:placeholder-gray-400 hover:border-sky-300 ${
              errors.username ? "border-red-500 bg-red-100" : ""
            }`}
            type="text"
            name="username"
            value={signupFormData.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>
        <div className="mb-5 relative">
          {errors.password && ( //Password Validation
            <p className="text-red-500 text-xs mb-1">{errors.password}</p>
          )}
          <Tooltip 
            title="Your password must be more than 6 characters long, should contain at-least 1 UPPERCASE and special character @!#$?&" 
            placement="bottom-start"
            PopperProps={{ 
            disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={tooltip}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            TransitionComponent={Zoom}
            arrow
          >
          <input
            className={`shadow appearance-none border rounded-sm w-full py-3 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:placeholder-gray-400 hover:border-sky-300 ${
              errors.password ? "border-red-500 bg-red-100" : ""
            }`}
            type="password"
            name="password"
            value={signupFormData.password}
            onChange={handleChange}
            onClick={handleTooltipOpen}
            placeholder="Password"
          />
          </Tooltip>
        </div>
        {errors.confirmPassword && ( //Confirm Password Validation
          <p className="text-red-500 text-xs mb-1">{errors.confirmPassword}</p>
        )}
        <div className="mb-5 relative">
          { passwordVisible ? <img src={visibleIcon} alt="hide" className="absolute inset-y-3 right-3 w-5 cursor-pointer" onClick={handleTogglePassword}/> : <img src={notVisibleIcon} alt="hide" className="absolute inset-y-3 right-3 w-5 cursor-pointer" onClick={handleTogglePassword}/>}
          <input
            className={`shadow appearance-none border rounded-sm w-full py-3 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:placeholder-gray-400 hover:border-sky-300 ${
              errors.confirmPassword ? "border-red-500 bg-red-100" : ""
            }`}
            type={passwordVisible ? "text" : "password"}
            name="confirmPassword"
            value={signupFormData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          {errorMessage && (
            <p className="text-red-500 text-xs mt-2 ml-0.5">{errorMessage}</p>
          )}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 self-center transition duration-300 text-white w-full py-4 px-4 rounded-sm tracking-wider"
          onClick={handleSignup}
        >
          Sign up
        </button>
        <h2 className="text-xs mt-4 mb-5 text-center text-zinc-500 tracking-wider">
          Already have an account?
          <Link to="/" className="ml-1 text-blue-500 hover:text-blue-600 underline:none hover:underline">
            Log in
          </Link>
        </h2>
      </form> 
      </div>
    </AuthPage>
  );
}

export default Signup;
