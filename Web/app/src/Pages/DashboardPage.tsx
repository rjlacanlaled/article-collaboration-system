import React from 'react'
import HorizontalNavigation from '../Components/HorizontalNavigation'
import Navigation from '../Components/Navigation'
import DashboardContent from '../Components/DashboardContent'

function DashboardPage() {
  return (
    <div className="flex h-full bg-gray-100">
      <div className="flex flex-col items-center w-64 bg-gray-800 border-r drop-shadow">
        <Navigation />
      </div>
    <div className="flex flex-col h-full w-full bg-gray-100">  
      <div className="w-full h-20 bg-white flex justify-end items-center flex-row drop-shadow">
        <HorizontalNavigation/>
      </div>
      <div className="flex-1 bg-gray-100 flex justify-start flex-col p-6 text-center">
        <DashboardContent />
        <DashboardContent />
      </div>
    </div>
    </div>
  )
}

export default DashboardPage