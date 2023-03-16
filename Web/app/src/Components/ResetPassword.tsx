import React from 'react'
import ForgotIcon from "../Assets/Images/forgot-password.svg"
import { Link } from "react-router-dom"
import AuthPage from '../Pages/AuthPage'

function ResetPassword() {
  return (
  <AuthPage> 
      <div className="bg-white p-8 w-96  rounded-lg shadow-lg flex justify-center items-center flex-col">
        <img src={ForgotIcon} alt="Forgot-Icon" className="w-32 h-full my-11" />
        <h2 className="mb-6 font-bold text-3xl text-gray-800">Reset your password</h2>
        <p className="text-sm text-center w-11/12">Passwords are like underwear: you don’t let people see it, you should change it very often, and you shouldn’t share it with strangers.</p>
        <div className="mb-4 mt-6">
            <input className="shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500" type="text" placeholder="Email address"/>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white w-80 py-4 px-4 mb-4 rounded-sm">
            Continue
        </button>
        <div className="w-80 text-center mb-2">
          <Link to="/" className='text-blue-500 text-xs leading-normal tracking-wide'>Back to Home</Link>
        </div>
      </div>
    </AuthPage>  
  )
}

export default ResetPassword