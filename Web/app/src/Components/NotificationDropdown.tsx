import React, { useState } from 'react';
import NotificationData from '../Data/NotificationData';
import { Badge, IconButton, Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';


function NotificationDropdown() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <>  
      <div  className='mr-4'>
        <IconButton onClick={handleOpenMenu}>
          <Badge badgeContent={3} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu} sx={{mt: 2}}>
          {NotificationData.map((notifications) => ( 
            <MenuItem onClick={handleCloseMenu} sx={{px: 4}}>{notifications.message}</MenuItem>
          ))}
        </Menu>
      </div>
    </>
  );
}

export default NotificationDropdown