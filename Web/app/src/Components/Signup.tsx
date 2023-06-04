import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as SignupIcon } from "../Assets/Images/signup-icon.svg"
import { ReactComponent as GoogleIcon } from "../Assets/Images/google-logo.svg"
import { ReactComponent as FacebookIcon } from "../Assets/Images/facebook-logo.svg"
import { ReactComponent as LinkedinIcon } from "../Assets/Images/linkedin-logo.svg"
import AuthPage from '../Pages/AuthPage'

function Signup() {

  const [SignupFormData, setSignupFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e: any) => {
    setSignupFormData((prevSignupFormData) => {
      return {
        ...prevSignupFormData,
        [e.target.name]: e.target.value,
      }
    })
  }

  return (
    <AuthPage>
        <div className="bg-white p-8 w-96  rounded-lg shadow-lg flex justify-center items-center flex-col">
            <SignupIcon className="w-32 h-full mb-4"/>
            <h2 className="mb-6 font-bold text-3xl text-gray-800">Create your account</h2>
            <div className="mb-4">
                <input 
                className="shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500" 
                type="email" 
                name="email"
                value={SignupFormData.email}
                onChange={handleChange}
                placeholder="Email address"/>
            </div>
            <div className="mb-4">
                <input 
                className="shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500" 
                type="text" 
                name="username"
                value={SignupFormData.username}
                onChange={handleChange}
                placeholder="Username"/>
            </div>
            <div className="mb-4">
                <input 
                className="shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500" 
                type="password" 
                name="password"
                value={SignupFormData.password}
                onChange={handleChange}
                placeholder="Password"/>
            </div>
            <div className="mb-4">
                <input 
                className="shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500" 
                type="password" 
                name="confirmPassword"
                value={SignupFormData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"/>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white w-80 py-4 px-4 rounded-sm">
                Continue
            </button>
            <h2 className="text-xs mt-4 mb-5 text-gray-800">Already have an account?<Link to="/" className='ml-1 text-blue-500 hover:text-blue-600'>Log in</Link></h2>
        </div>
    </AuthPage>
  )
}

export default Signup