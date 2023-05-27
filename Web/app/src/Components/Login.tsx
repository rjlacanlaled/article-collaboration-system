import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { ReactComponent as GoogleIcon} from "../Assets/Images/google-logo.svg"
import { ReactComponent as FacebookIcon} from "../Assets/Images/facebook-logo.svg"
import { ReactComponent as LinkedinIcon} from "../Assets/Images/linkedin-logo.svg"
import AuthPage from '../Pages/AuthPage'

function Login() {

    const [formData, setFormData] = useState(
        {email:"", password: ""}
    )

    const handleChange = (e: any) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }

  return (
    <AuthPage>
        <div className="bg-white p-8 w-96 rounded-lg shadow-lg flex justify-center items-center flex-col">
            <h2 className="mb-6 font-bold text-3xl text-gray-800">Welcome Back</h2>
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
            <div className="mb-4">
                <input 
                    className="shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500" 
                    name="password"
                    type="password" 
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
            </div>
            <div className="mb-4">
                <select name="cars" form="userType" placeholder="Select User Type" className='shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 cursor-pointer'>
                    <option selected>Select user type</option>
                    <option value="Admin">Admin</option>
                    <option value="Member">Member</option>
                </select>
            </div>
            <Link to="/dashboard">
            <button className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white w-80 py-4 px-4 rounded-sm">
                Continue
            </button>
            </Link>
            <h2 className="text-xs mt-4 text-gray-800">Don't Have an account?<Link to="/signup" className='ml-1 text-blue-500'>Sign Up</Link></h2>
            <div className="mt-5 grid grid-cols-3 items-center text-gray-400"> 
                <hr className="border-gray-400 w-24"/>
                    <p className='text-sm text-center text-gray-800'>OR</p>
                <hr className="border-gray-400 w-24"/>
            </div>
            <button className="bg-white text-gray-800 shadow appearance-none border py-4 px-4 w-80 rounded-sm mt-5 text-sm hover:bg-gray-100 transition duration-300 flex justify-start items-center"><GoogleIcon className="w-6 h-full mr-3"/> Continue With Google</button>
            <button className="bg-white text-gray-800 shadow appearance-none border py-4 px-4 w-80 rounded-sm mt-3 text-sm hover:bg-gray-100 transition duration-300 flex justify-start items-center"><FacebookIcon className="w-6 h-full mr-3"/>Continue With Facebook</button>
            <button className="bg-white text-gray-800 shadow appearance-none border py-4 px-4 w-80 rounded-sm mt-3 text-sm hover:bg-gray-100 transition duration-300 flex justify-start items-center"><LinkedinIcon className="w-6 h-full mr-3"/>Continue With LinkedIn</button>
            <div className="mt-4 w-80 text-center">
                <Link to="/forgotpassword" className='text-blue-500 text-xs leading-normal tracking-wide'>Forgot Password?</Link>
            </div>
        </div>
    </AuthPage>
  )
}

export default Login