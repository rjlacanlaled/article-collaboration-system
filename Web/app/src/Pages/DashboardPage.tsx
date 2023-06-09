import React from 'react'
import Header from '../Components/Header'
import Navigation from '../Components/Navigation'

interface DashboardPageProps {
  children: React.ReactNode;
}

const DashboardPage = ({children}: DashboardPageProps) => {
  return (
    <div className="flex h-screen bg-gray-100 overflow-y-auto">
      <div className="flex flex-col justify-start items-center w-64 h-screen bg-gray-800 border-r drop-shadow">
        <Navigation />
      </div>
      <div className="flex flex-col w-screen h-screen bg-gray-100 overflow-y-auto">  
        <div className="sticky top-0 w-full h-20 shrink-0 bg-white flex justify-end items-center flex-row drop-shadow z-10">
          <Header />
        </div> 
         {/* DASHBOARD CONTENT */}
        <div className="w-full h-fit bg-gray-100 flex justify-start items-center flex-col p-6 z-0">
            {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage