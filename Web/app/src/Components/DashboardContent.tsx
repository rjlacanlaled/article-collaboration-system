import React from 'react'
import { Chip } from '@mui/material'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function DashboardContent() {
  return (
    <>
    <div className="flex justify-start flex-col bg-white p-6 text-center h-1/3 drop-shadow rounded-md m-4">
        <div className="bg-white p-7 w-full overflow-y-scroll">
        <div className='flex justify-start items-center mx-4'>
            <h1 className="text-2xl text-left font-semibold mx-4">MEMBERS</h1>
            <PeopleAltIcon className='mr-2'/>
            <label className='lining-nums font-bold'>40</label>
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
                </tr>
            </thead>
            <tbody className='overflow-scroll'>
                <tr className=' hover:bg-blue-100'>
                    <td className="border px-4 py-3">1234</td>
                    <td className="border px-4 py-3">bryan</td>
                    <td className="border px-4 py-3">saguit</td>
                    <td className="border px-4 py-3">fakerbryan@yahoo.com</td>
                    <td className="border px-4 py-3">Admin</td>
                    <td className="border px-4 py-3"><Chip label="Approved" color="success" /></td>
                </tr>
                <tr className=' hover:bg-blue-100'>
                    <td className="border px-4 py-3">1235</td>
                    <td className="border px-4 py-3">bryan</td>
                    <td className="border px-4 py-3">saguit</td>
                    <td className="border px-4 py-3">fakerbryan@yahoo.com</td>
                    <td className="border px-4 py-3">Member</td>
                    <td className="border px-4 py-3"><Chip label="Approved" color="success" /></td>
                </tr>
                <tr className=' hover:bg-blue-100'>
                    <td className="border px-4 py-3">2346</td>
                    <td className="border px-4 py-3">bryan</td>
                    <td className="border px-4 py-3">saguit</td>
                    <td className="border px-4 py-3">fakerbryan@yahoo.com</td>
                    <td className="border px-4 py-3">Admin</td>
                    <td className="border px-4 py-3"><Chip label="Approved" color="success" /></td>
                </tr>
                <tr className=' hover:bg-blue-100'>
                    <td className="border px-4 py-3">2368</td>
                    <td className="border px-4 py-3">bryan</td>
                    <td className="border px-4 py-3">saguit</td>
                    <td className="border px-4 py-3">fakerbryan@yahoo.com</td>
                    <td className="border px-4 py-3">Member</td>
                    <td className="border px-4 py-3"><Chip label="Approved" color="success" /></td>
                </tr>
                <tr className=' hover:bg-blue-100'>
                    <td className="border px-4 py-3">3631</td>
                    <td className="border px-4 py-3">bryan</td>
                    <td className="border px-4 py-3">saguit</td>
                    <td className="border px-4 py-3">fakerbryan@yahoo.com</td>
                    <td className="border px-4 py-3">Member</td>
                    <td className="border px-4 py-3"><Chip label="Reject" color="error" /></td>
                </tr>
                <tr className=' hover:bg-blue-100'>
                    <td className="border px-4 py-3">76567</td>
                    <td className="border px-4 py-3">bryan</td>
                    <td className="border px-4 py-3">saguit</td>
                    <td className="border px-4 py-3">fakerbryan@yahoo.com</td>
                    <td className="border px-4 py-3">Admin</td>
                    <td className="border px-4 py-3"><Chip label="Reject" color="error" /></td>
                </tr>
                <tr className=' hover:bg-blue-100'>
                    <td className="border px-4 py-3">12378</td>
                    <td className="border px-4 py-3">bryan</td>
                    <td className="border px-4 py-3">saguit</td>
                    <td className="border px-4 py-3">fakerbryan@yahoo.com</td>
                    <td className="border px-4 py-3">Member</td>
                    <td className="border px-4 py-3"><Chip label="Reject" color="error" /></td>
                </tr>
                <tr className=' hover:bg-blue-100'>
                    <td className="border px-4 py-3">17342</td>
                    <td className="border px-4 py-3">bryan</td>
                    <td className="border px-4 py-3">saguit</td>
                    <td className="border px-4 py-3">fakerbryan@yahoo.com</td>
                    <td className="border px-4 py-3">Admin</td>
                    <td className="border px-4 py-3"><Chip label="Approved" color="success" /></td>
                </tr>
                <tr className=' hover:bg-blue-100'>
                    <td className="border px-4 py-3">7234</td>
                    <td className="border px-4 py-3">bryan</td>
                    <td className="border px-4 py-3">saguit</td>
                    <td className="border px-4 py-3">fakerbryan@yahoo.com</td>
                    <td className="border px-4 py-3">Admin</td>
                    <td className="border px-4 py-3"><Chip label="Reject" color="error" /></td>
                </tr>
                <tr className=' hover:bg-blue-100'>
                    <td className="border px-4 py-3">9232</td>
                    <td className="border px-4 py-3">bryan</td>
                    <td className="border px-4 py-3">saguit</td>
                    <td className="border px-4 py-3">fakerbryan@yahoo.com</td>
                    <td className="border px-4 py-3">Admin</td>
                    <td className="border px-4 py-3"><Chip label="Reject" color="error" /></td>
                </tr>
                <tr className=' hover:bg-blue-100'>
                    <td className="border px-4 py-3">84123</td>
                    <td className="border px-4 py-3">bryan</td>
                    <td className="border px-4 py-3">saguit</td>
                    <td className="border px-4 py-3">fakerbryan@yahoo.com</td>
                    <td className="border px-4 py-3">Admin</td>
                    <td className="border px-4 py-3"><Chip label="Approved" color="success" /></td>
                </tr>
                <tr className=' hover:bg-blue-100'>
                    <td className="border px-4 py-3">4571</td>
                    <td className="border px-4 py-3">Bryan</td>
                    <td className="border px-4 py-3">Saguit</td>
                    <td className="border px-4 py-3">fakerbryan@yahoo.com</td>
                    <td className="border px-4 py-3">Member</td>
                    <td className="border px-4 py-3"><Chip label="Reject" color="error" /></td>
                </tr>
                <tr className=' hover:bg-blue-100'>
                    <td className="border px-4 py-3">56234</td>
                    <td className="border px-4 py-3">Bryan</td>
                    <td className="border px-4 py-3">Saguit</td>
                    <td className="border px-4 py-3">fakerbryan@yahoo.com</td>
                    <td className="border px-4 py-3">Member</td>
                    <td className="border px-4 py-3">Active</td>
                </tr>
                <tr className=' hover:bg-blue-100'>
                    <td className="border px-4 py-3">5682</td>
                    <td className="border px-4 py-3">Rj</td>
                    <td className="border px-4 py-3">Lacanlale</td>
                    <td className="border px-4 py-3">Morty@yahoo.com</td>
                    <td className="border px-4 py-3">admin</td>
                    <td className="border px-4 py-3">Active</td>
                </tr>
            </tbody>
            </table>
        </div>    
      </div>
    </>
  )
}

export default DashboardContent