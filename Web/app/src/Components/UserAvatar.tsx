import React from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Profile from '../Assets/Images/profile.jpg'
import { Link } from 'react-router-dom';

function UserAvatar() {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

  return (
    <div>
      <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} disableRipple>
            <Avatar alt="Remy Sharp" src={Profile}/>
            <label className='text-sm text-zinc-700 ml-2 cursor-pointer font-semibold tracking-wider'>Bryan Saguit</label>
          </IconButton>
        <Menu
          sx={{ mt: '45px'}}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <Link to={`/profile`}>
            <MenuItem>Profile</MenuItem> 
          </Link>
          <Link to={`/`}>
            <MenuItem>Logout</MenuItem>
          </Link>
        </Menu>
      </Box>
    </div>
  )
}

export default UserAvatar