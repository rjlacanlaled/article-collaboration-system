import React from 'react'
import SuccessIcon from "../Assets/Images/signup-success.svg"
import AuthPage from '../Pages/AuthPage'
import { Link } from 'react-router-dom'

function SignupSuccess() {
  return (
    <AuthPage> 
      <div className="bg-white w-2/4 p-8 h-5/6 rounded-lg shadow-lg flex items-center justify-center flex-col">
        <img src={SuccessIcon} alt="success-logo" className="w-32 my-6" />
        <h1 className="text-zinc-700 text-3xl font-bold leading-relaxed text-center my-4 tracking-wider">You're all signed up!</h1>
        <p className="text-base leading-relaxed text-center w-3/4 text-zinc-500 tracking-wider">Thank you for signing up! Your account is currently being reviewed and you will receive an email confirmation once it has been approved.</p>
        <Link to={`/`}>
          <button className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white w-80 py-4 px-4 rounded-lg my-10 tracking-wider">Continue</button>
        </Link>
      </div>
    </AuthPage>
  )
}

export default SignupSuccess