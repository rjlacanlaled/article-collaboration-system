import React from 'react'

interface AuthPageProps {
    children: React.ReactNode;
  }

function AuthPage({children}: AuthPageProps) {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
        {children}
    </div>
  )
}

export default AuthPage