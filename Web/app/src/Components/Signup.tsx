import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as SignupIcon } from "../Assets/Images/signup-icon.svg"
import { ReactComponent as GoogleIcon } from "../Assets/Images/google-logo.svg"
import { ReactComponent as FacebookIcon } from "../Assets/Images/facebook-logo.svg"
import { ReactComponent as LinkedinIcon } from "../Assets/Images/linkedin-logo.svg"

function Signup() {
  return (
    <>
        <div className="bg-white p-8 w-96  rounded-lg shadow-lg flex justify-center items-center flex-col">
            <SignupIcon className="w-32 h-full mb-4"/>
            <h2 className="mb-6 font-bold text-3xl text-gray-800">Create your account</h2>
            <div className="mb-4">
                <input className="shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500" type="text" placeholder="Email address"/>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white w-80 py-4 px-4 rounded-sm">
                Continue
            </button>
            <h2 className="text-xs mt-4 text-gray-800">Already have an account?<Link to="/" className='ml-1 text-blue-500'>Log in</Link></h2>
            <div className="mt-5 grid grid-cols-3 items-center text-gray-400"> 
                <hr className="border-gray-400 w-24"/>
                    <p className='text-sm text-center text-gray-800'>OR</p>
                <hr className="border-gray-400 w-24"/>
            </div>
            <button className="bg-white text-gray-800 shadow appearance-none border py-4 px-4 w-80 rounded-sm mt-5 text-sm hover:bg-gray-100 transition duration-300 flex justify-start items-center"><GoogleIcon className="w-6 h-full mr-3"/> Continue With Google</button>
            <button className="bg-white text-gray-800 shadow appearance-none border py-4 px-4 w-80 rounded-sm mt-3 text-sm hover:bg-gray-100 transition duration-300 flex justify-start items-center"><FacebookIcon className="w-6 h-full mr-3"/>Continue With Facebook</button>
            <button className="bg-white text-gray-800 shadow appearance-none border py-4 px-4 w-80 rounded-sm mt-3 text-sm hover:bg-gray-100 transition duration-300 flex justify-start items-center"><LinkedinIcon className="w-6 h-full mr-3"/>Continue With LinkedIn</button>
        </div>
    </>
  )
}

export default Signup