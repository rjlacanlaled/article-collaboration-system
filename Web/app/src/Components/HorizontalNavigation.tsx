import React from 'react'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar } from '@mui/material';
import Profile from '../Assets/Images/profile.jpg'

function HorizontalNavigation() {
  return (
    <>
      <Badge badgeContent={5} color="primary" className='mr-5 cursor-pointer'>
        <MailIcon color="action" />
      </Badge>
      <Avatar
        alt="Remy Sharp"
        src={Profile}
        sx={{ width: 46, height: 46 }}
        className='mr-2 shadow-xl border-2 border-gray-800 cursor-pointer'
       />
       <h2 className='mr-16 cursor-pointer'>Bryan Saguit</h2>
    </>
  )
}

export default HorizontalNavigation