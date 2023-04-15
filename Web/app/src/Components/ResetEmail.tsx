import React from 'react'
import AuthPage from '../Pages/AuthPage'
import EmailIcon from '../Assets/Images/mail-sent.svg'

function ResetEmail() {
  return (
    <AuthPage>
        <div className="bg-white p-8 w-96  rounded-lg shadow-lg flex justify-center items-center flex-col">
            <img src={EmailIcon} alt='reset-email-icon' className="w-32 h-full my-11"/>
            <h2 className="mb-6 font-bold text-3xl text-gray-800">Check Your Email</h2>
            <p className="text-sm text-center w-11/12">Please Check the email address fakerbryan@yahoo.com for instructions to reset your password</p>
            <button className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white w-80 py-4 px-4 mb-4 mt-6 rounded-sm">
            Resend Email
            </button>
        </div>
    </AuthPage>
  )
}

export default ResetEmail