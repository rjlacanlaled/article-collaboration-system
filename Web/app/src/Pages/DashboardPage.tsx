import React from 'react'
import HorizontalNavigation from '../Components/HorizontalNavigation'
import Navigation from '../Components/Navigation'
import DashboardContent from '../Components/DashboardContent'
import ProjectBoard from '../Components/ProjectBoard'


function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-y-auto">
      <div className="flex flex-col justify-start items-center w-64 h-screen bg-gray-800 border-r drop-shadow">
        <Navigation />
      </div>
      <div className="flex flex-col w-screen h-screen bg-gray-100 overflow-y-auto">  
        <div className="w-full h-20 shrink-0 bg-white flex justify-end items-center flex-row drop-shadow">
          <HorizontalNavigation/>
        </div>
         {/* DASHBOARD CONTENT */}
        <div className="h-fit w-full bg-gray-100 flex justify-start items-center flex-col p-6">
          <ProjectBoard/>
          <DashboardContent />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage