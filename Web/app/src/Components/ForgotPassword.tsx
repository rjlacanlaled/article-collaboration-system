import React, { useState } from 'react'
import ForgotIcon from "../Assets/Images/forgot-password.svg"
import { Link } from "react-router-dom"
import AuthPage from '../Pages/AuthPage'

export type resetData = {
  email: string;
}

function ForgotPassword() {
  const [errors, setErrors] = useState<Partial<resetData>>({});
  const [emailData, setEmailData] = useState<resetData>({email: ""})

  const handleChange = (e:any) => {
    setEmailData((prevState ) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  //Validation
  const validateReset = () => {
    const { email } = emailData;
    const errors: Partial<resetData> = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email address";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const handleResetPasswordSubmit = (e:any) => {
    e.preventDefault()
    const isValid = validateReset()

    if(isValid) {
      console.log("success reset")
    } else {
      console.log("Error")
    }
  }

  return (
  <AuthPage> 
      <div className="bg-white p-8 w-96  rounded-lg shadow-lg flex justify-center items-center flex-col">
        <img src={ForgotIcon} alt="Forgot-Icon" className="w-32 h-full my-11" />
        <h2 className="mb-6 font-bold text-3xl text-zinc-700">Reset your password</h2>
        <p className="text-sm text-zinc-500 text-center w-11/12 tracking-wider">Please enter the email address you'd like your password reset information sent to</p>
        <div className="mb-4 mt-6">
            {errors.email && ( //Password Validation
            <p className="text-red-500 text-xs mb-1">{errors.email}</p>
            )}
            <input className={`shadow appearance-none border rounded-sm w-80 py-3 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:placeholder-gray-400 hover:border-sky-300 ${
                errors.email ? "border-red-500 bg-red-100" : ""
              }`}
              type="email"
              name="email" 
              value={emailData.email}
              onChange={handleChange}
              placeholder="Email address"
            />
        </div>
        <button 
          className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white w-80 py-4 px-4 mb-4 rounded-sm tracking-wider"
          onClick={handleResetPasswordSubmit}
          >
            Continue
        </button>
        <div className="w-80 text-center mb-2">
          <Link to="/" className='text-blue-500 text-xs leading-normal tracking-wide underline:none hover:underline'>Back to Home</Link>
        </div>
      </div>
    </AuthPage>  
  )
}

export default ForgotPassword