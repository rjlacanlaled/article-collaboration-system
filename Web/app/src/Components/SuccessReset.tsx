import React from 'react'
import AuthPage from '../Pages/AuthPage'
import { Link } from 'react-router-dom'
import SuccessResetIcon from '../Assets/Images/success-reset-password.svg'

function SuccessReset() {

  return (
    <AuthPage>
        <div className="bg-white p-8 w-96 rounded-lg shadow-lg flex justify-center items-center flex-col">
            <img src={SuccessResetIcon} alt='success-reset-password' className="w-32 h-full mt-11 mb-8"/>
            <h2 className="mb-6 font-bold text-3xl text-zinc-700">Password Changed!</h2>
            <p className="text-sm text-center w-11/12 text-zinc-500 tracking-wider">Your password has been changed successfully.</p>
            <Link to="/">
                <button 
                  className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white w-80 py-4 px-4 mb-4 mt-6 rounded-sm"
                >
                  Done
                </button>
            </Link>
        </div>
    </AuthPage>
  )
}

export default SuccessReset