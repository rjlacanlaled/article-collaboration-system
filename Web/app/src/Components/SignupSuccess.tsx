import React from 'react'
import SuccessIcon from "../Assets/Images/signup-success.svg"
import AuthPage from '../Pages/AuthPage'

function SignupSuccess() {
  return (
    <AuthPage> 
      <div className="bg-white w-4/12 p-8 h-5/6 rounded-lg shadow-lg flex items-center justify-center flex-col">
        <img src={SuccessIcon} alt="success-logo" className="w-64 h-64 my-6" />
        <h1 className="text-blue-500 text-3xl font-bold leading-relaxed text-center my-4">SUCCESS</h1>
        <p className="text-lg leading-relaxed text-center w-3/4 ">Thank you for signing up! Your account is currently being reviewed and you will receive an email confirmation once it has been approved.</p>
        <button className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white w-80 py-4 px-4 rounded-lg my-10">Continue</button>
      </div>
    </AuthPage>
  )
}

export default SignupSuccess