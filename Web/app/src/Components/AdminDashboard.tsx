import React from 'react'
import DashboardPage from '../Pages/DashboardPage'
import UserData from '../Data/UserData.json'
import ApproveUser from '../modals/ApproveUser'
import RejectUser from '../modals/RejectUser'

function AdminDashboard() {

  return (
    <DashboardPage>
        <div className="flex justify-start flex-col w-full bg-white p-6 text-center h-700 drop-shadow rounded-md m-4">
        <div className='flex justify-center flex-col items-center bg-white p-7 drop-shadow w-72 h-16 rounded-md'>
            <div className='flex justify-center items-center'>
                <h1 className="text-sm font-semibold mr-1">Pending Approvals</h1>
                <label className='lining-nums font-bold text-sm bg-gray-300 rounded-full px-3'>{UserData.length}</label>
            </div>
        </div>
        <div className="bg-white p-7 w-full scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 scrollbar-thin scroll-smooth">
            <div className="bg-white flex justify-end items-center">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-slate-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-slate-500 dark:text-slate-700 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
                </div>
            </div>
            <table className="table-auto border-collapse my-6 text-base w-full">
            <thead className="font-semibold bg-gray-800 text-white text-sm uppercase">
                <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Last Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Registration Date</th>
                <th className="px-4 py-3">Action</th>
                </tr>
            </thead>
            <tbody className='overflow-scroll text-sm'>
                { UserData.map((UserDatas) => (
                    <tr className='hover:bg-slate-300'>
                        <td className="border px-4 py-3">{UserDatas.id}</td>
                        <td className="border px-4 py-3">{UserDatas.firstname}</td>
                        <td className="border px-4 py-3">{UserDatas.lastname}</td>
                        <td className="border px-4 py-3">{UserDatas.email}</td>
                        <td className="border px-4 py-3">{UserDatas.role}</td>
                        <td className="border px-4 py-3">Sunday, March 19, 2023</td>
                        <td className="border px-4 py-3 items-center space-x-3">
                            <ApproveUser/>
                            <RejectUser/>
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

export default AdminDashboard