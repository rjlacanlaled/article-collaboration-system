import React from 'react'
import WaveLogo from '../Assets/Images/wave4.svg'

interface AuthPageProps {
    children: React.ReactNode;
  }

function AuthPage({children}: AuthPageProps) {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center overflow-hidden">
        <div className='z-10 flex justify-center items-center w-fit h-fit'>{children}</div>
        <img src={WaveLogo} alt="wave" className="absolute bottom-0"/>
    </div>
  )
}

export default AuthPage