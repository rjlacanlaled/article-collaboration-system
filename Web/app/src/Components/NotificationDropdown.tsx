import React, { useState } from 'react';
import NotificationData from '../Data/NotificationData';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

function NotificationDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [notifications, setNotifications] = useState(NotificationData);
  
  function handleDropdownClick() {
    setIsDropdownOpen(!isDropdownOpen);
  }
  
  function handleNotificationClick(notificationId: number) {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  }
  
  return (
    <>  
        <Badge badgeContent={5} color="primary" className='mr-5 cursor-pointer relative'>
          <MailIcon color="action" onClick={handleDropdownClick} />
        </Badge>

        <div className={`${isDropdownOpen ? 'block' : 'hidden'} absolute right-0 top-20 mr-4 w-80 bg-white rounded-lg shadow-lg z-10`}>
            <div className="p-4 border-b border-gray-300">
              <h3 className="text-lg font-medium">Notifications</h3>
            </div>
            <ul>
            {notifications.map(notification => (
                <li key={notification.id} className="p-4 hover:bg-gray-100 cursor-pointer" onClick={() => handleNotificationClick(notification.id)}>
                <p className="text-gray-700">{notification.message}</p>
                </li>
            ))}
            </ul>
            {notifications.length === 0 && (
            <div className="p-4 text-gray-600">
                <p>No notifications</p>
            </div>
            )}
        </div>
    </>
  );
}

export default NotificationDropdown