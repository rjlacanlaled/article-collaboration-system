import React, { useState } from 'react'
import { Chip } from '@mui/material'
import MemberLogo from '../Assets/Images/member-logo.svg'
import UserData from '../Data/UserData'
import DashboardPage from '../Pages/DashboardPage'

function DashboardContent() {

  const [member, setMember] = useState(UserData.length)

  return (
    <DashboardPage>
      <div className="flex justify-start flex-col w-full bg-white p-6 text-center h-content drop-shadow rounded-md m-4">
        <div className="bg-white p-7 w-full scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 scrollbar-thin scroll-smooth">
            <div className='flex justify-center flex-row text-left bg-white p-7 drop-shadow w-72'>
                <div className='flex justify-center flex-col mr-9'>
                    <h1 className="text-sm font-semibold mb-1">MEMBERS</h1>
                    <label className='lining-nums font-bold text-4xl'>{member}</label>
                </div>
                <img src={MemberLogo} alt="member-logo" className='w-20' />
            </div>
            <table className="table-auto border-collapse my-6 text-base w-full">
            <thead className="font-semibold">
                <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Last Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
                </tr>
            </thead>
            <tbody className='overflow-scroll'>
                { UserData.map((UserDatas) => (
                    <tr className='hover:bg-blue-100'>
                        <td className="border px-4 py-3">{UserDatas.id}</td>
                        <td className="border px-4 py-3">{UserDatas.firstname}</td>
                        <td className="border px-4 py-3">{UserDatas.lastname}</td>
                        <td className="border px-4 py-3">{UserDatas.email}</td>
                        <td className="border px-4 py-3">{UserDatas.role}</td>
                        <td className="border px-4 py-3"><Chip label="Approved" color="success"/></td>
                        <td className="border px-4 py-3">
                            <button className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 mr-2">
                                Update
                            </button>
                            <button className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}     
            </tbody>
            </table>
        </div>    
      </div>
    </DashboardPage>
  )
}

export default DashboardContent