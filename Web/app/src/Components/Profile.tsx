import React  from 'react'
import UserData from '../Data/UserData.json'
import DashboardPage from '../Pages/DashboardPage'
import { Avatar } from '@mui/material'


function Profile() {

  const filteredUserData = UserData.filter((user) => user.id === 1);

  return (
    <DashboardPage>
        <div className="bg-gray-100">
        {filteredUserData.map((user) => (
        <div className="max-w-7xl mx-auto pb-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow rounded-lg divide-gray-200">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <div className='flex justify-start items-center w-content mt-4'>
                <Avatar src="/broken-image.jpg" sx={{ width: 60, height: 60, borderRadius: ['15px', '50px', '30px', '5px'],}}/>
                <h2 className='text-sm text-gray-900 ml-2'>{}</h2>
            </div>
          </div>
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Update your personal information and settings.</p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">First Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.firstname}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.lastname}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Birthday</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.birthday}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.phonenumber}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Timezone</dt>
                    <dd className="mt-1 text-sm text-gray-900">Eastern Standard Time</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        ))}
        </div>
    </DashboardPage>
  )
}

export default Profile