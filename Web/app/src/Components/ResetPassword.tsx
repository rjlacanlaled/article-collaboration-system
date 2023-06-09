import React, { useState, useEffect } from 'react'
import visibleIcon from '../Assets/Images/visible.svg'
import notVisibleIcon from '../Assets/Images/notvisible.svg'
import AuthPage from '../Pages/AuthPage'
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';

export type ResetPasswordData = {
  newpassword: string;
  reenterpassword: string;
}

function ResetPassword() {
    const [tooltip, setTooltip] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [errors, setErrors] = useState<Partial<ResetPasswordData>>({});
    const [passwordResetData, setPasswordResetData] = useState<ResetPasswordData>(
      {newpassword: "", reenterpassword: ""}
    )

    // Handle Reset Password Submit
    const handleResetPasswordSubmit = (e:any) => {
        e.preventDefault();
    
        if(!errors){
          console.log("success")
        } else {
          validationResetPassword()
          console.log("error")
        }
    };

    // Handle Change
    const handleChange = (e:any) => {
        setPasswordResetData(prevPasswordData => {
          return {
            ...prevPasswordData,
            [e.target.name]: e.target.value
          }
        })
     }

    const handleTooltipOpen = () => {
      setTooltip(prevState => !prevState)
    }

    const handleTooltipClose = () => {
      setTimeout(() => {
        setTooltip(prevState => !prevState)
      },2000)
    }

      //ToggleVisiblePassword
    const handleTogglePassword = () => {
      setPasswordVisible((prevState) => !prevState);
    }

    // Handle click outside to close tooltip
    useEffect(() => {
      const handleClickOutside = (e:any) => {
        if (
          e.target.closest(".tooltip") === null &&
          e.target.name !== "newpassword"
        ) {
          setTooltip(false);
        }
      };
    
      document.addEventListener("click", handleClickOutside);
    
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

     // Handle Validation
    const validationResetPassword = () => {
      const { newpassword, reenterpassword} = passwordResetData
      const errors: Partial<ResetPasswordData> = {}

      if(!newpassword) {
        errors.newpassword = "Password is required"
        errors.reenterpassword = "Password is required"
      } else if (newpassword.length < 6) {
        errors.newpassword = "Password must be at least 6 characters";
      } else if (!/(?=.*[A-Z])/.test(newpassword)) {
        errors.newpassword = "Password must contain at least one UPPERCASE letter";
      } else if (!/(?=.*[\W_])/.test(newpassword)) {
        errors.newpassword = "Password must contain at least one special character: @!#$*?&";
      }

      if(newpassword !== reenterpassword) {
        errors.newpassword = "Password do not match"
      }

      setErrors(errors);

      return Object.keys(errors).length === 0;
    }

  return (
     <AuthPage>
        <div className="bg-white p-8 w-96  rounded-lg shadow-lg flex justify-center items-center flex-col">
            <h2 className="mb-6 font-bold text-3xl text-zinc-700">Reset your password</h2>
            <p className="text-sm text-center w-11/12 text-zinc-500 tracking-wider">Enter a new password below to change your password.</p>
            <form className="mb-4 mt-6">
              {errors.newpassword && ( //reenter Password Validation
                <p className="text-red-500 text-xs mb-1">{errors.newpassword}</p>
              )}
              <div className="mb-4 relative">
                <Tooltip 
                  title="Your password must be more than 6 characters long, should contain at-least 1 UPPERCASE and special character @!#$?&" 
                  placement="bottom-start"
                  PopperProps={{ 
                  disablePortal: true,
                  }}
                  onClose={handleTooltipClose}
                  open={tooltip}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  TransitionComponent={Zoom}
                  arrow
                >
                  <input 
                    className={`shadow appearance-none border rounded-sm w-full py-3 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:placeholder-gray-400 hover:border-sky-300 ${
                    errors.newpassword ? "border-red-500 bg-red-100" : ""
                    }`}
                    value={passwordResetData.newpassword}
                    onChange={handleChange}
                    onClick={handleTooltipOpen}
                    type="password" 
                    name="newpassword"
                    placeholder="New Password"
                  />
                </Tooltip>
              </div>
              {errors.reenterpassword && ( //reenter Password Validation
                <p className="text-red-500 text-xs mb-1">{errors.reenterpassword}</p>
              )}
              <div className="mb-4 relative">
                { passwordVisible ? <img src={visibleIcon} alt="hide" className="absolute inset-y-3 right-3 w-5 cursor-pointer" onClick={handleTogglePassword}/> : <img src={notVisibleIcon} alt="hide" className="absolute inset-y-3 right-3 w-5 cursor-pointer" onClick={handleTogglePassword}/>}
                <input 
                  className={`shadow appearance-none border rounded-sm w-full py-3 px-3 text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:placeholder-gray-400 hover:border-sky-300 ${
                  errors.reenterpassword ? "border-red-500 bg-red-100" : ""
                  }`}
                  value={passwordResetData.reenterpassword}
                  onChange={handleChange}
                  type={passwordVisible ? "text" : "password"}
                  name="reenterpassword" 
                  placeholder="Re-enter new password"
                />
              </div>
              <button 
                className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white w-80 py-4 px-4 mb-4 mt-4 rounded-sm tracking-wider"
                onClick={handleResetPasswordSubmit}
              >
               Reset Password
              </button>
            </form>
        </div>
     </AuthPage>
  )
}

export default ResetPassword