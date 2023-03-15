import React, { useState } from 'react'
import { Avatar } from '@mui/material';
import Profile from '../Assets/Images/profile.jpg'
import NotificationDropdown from './NotificationDropdown';

function Header() {

  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <div className='flex justify-center flex-row items-center'>
        <NotificationDropdown />
        <Avatar
          onClick={()=>setShowProfile(prevState=>!prevState)}
          alt="Profile"
          src={Profile}
          sx={{ width: 46, height: 46 }}
          className='mr-2 shadow-xl border-2 border-slate-500 cursor-pointer relative'
        />
        <h2 className='mr-16 cursor-pointer'>Bryan Saguit</h2>
        {
          showProfile && 
          <div className='bg-white p-4 w-52 shadow-lg absolute right-0 top-20 mr-4 rounded-md'>
            <ul className='p-2 text-md cursor-pointer'>
              <li className='rounded hover:bg-blue-100 p-2'>Profile</li>
              <li className='rounded hover:bg-blue-100 p-2'>Settings</li>
              <li className='rounded hover:bg-blue-100 p-2'>Log out</li>
            </ul>
          </div>
        }
      </div>
    </>
  )
}

export default Header