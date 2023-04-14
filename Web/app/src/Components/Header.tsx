import React from 'react'
import NotificationDropdown from './NotificationDropdown';
import UserAvatar from './UserAvatar';

function Header() {

  return (
    <>
      <div className='flex justify-center flex-row items-center mr-20'>
        <NotificationDropdown />
        <UserAvatar />
      </div>
    </>
  )
}

export default Header