import React, { useState } from 'react'
import AuthPage from '../Pages/AuthPage'


function ResetPassword() {

    const [passwordResetData, setPasswordResetData] = useState(
      {newpassword: "", reenterpassword: ""}
    )

    const handleSubmit = (e:any) => {
        e.preventDefault();
    
        if (passwordResetData.newpassword === passwordResetData.reenterpassword) {
          // Submit the form with the new password
        } else {
          alert('Passwords do not match!');
        }
    };

     const handleChange = (e:any) => {
        setPasswordResetData(prevPasswordData => {
          return {
            ...prevPasswordData,
            [e.target.name]: e.target.value
          }
        })
     }

     console.log(passwordResetData)
  return (
     <AuthPage>
        <div className="bg-white p-8 w-96  rounded-lg shadow-lg flex justify-center items-center flex-col">
            <h2 className="mb-6 font-bold text-3xl text-gray-800">Reset your password</h2>
            <p className="text-sm text-center w-11/12">Enter a new password below to change your password.</p>
            <form onSubmit={handleSubmit} className="mb-4 mt-6">
              <div className="mb-4 mt-2">
                <input className="shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500" 
                  value={passwordResetData.newpassword}
                  onChange={handleChange}
                  type="password" 
                  name="newpassword"
                  placeholder="New Password"
                  required
                />
              </div>
              <div className="mb-4 mt-6">
                <input className="shadow appearance-none border rounded-sm w-80 py-4 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500" 
                  value={passwordResetData.reenterpassword}
                  onChange={handleChange}
                  type="password"
                  name="reenterpassword" 
                  placeholder="Re-enter new password"
                  required
                />
              </div>
              <button 
                  className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white w-80 py-4 px-4 mb-4 mt-4 rounded-sm"
              >
               Reset Password
              </button>
            </form>
        </div>
     </AuthPage>
  )
}

export default ResetPassword