import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Profile from '../Assets/Images/profile.jpg';
import { Link, useNavigate } from 'react-router-dom';

export type UserDetail = {
  id: any;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  roles: string[];
  date: any;
};

function UserAvatar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<UserDetail[]>([]);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutSubmit = () => {
    localStorage.clear();
    navigate("/")
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5143/api/v1/UserData/users/approved/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        const userData = await res.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Box sx={{ flexGrow: 0 }}>
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0 }}
          disableRipple
        >
          <Avatar alt="Remy Sharp" src={Profile} />
          {user.map((users) => (
            <label className="text-sm text-zinc-700 ml-2 cursor-pointer font-semibold tracking-wider">
              {users.firstName} {users.lastName}
            </label>
          ))}
        </IconButton>
        <Menu
          sx={{ mt: '45px' }}
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
          <Link to="/profile">
            <MenuItem>Profile</MenuItem>
          </Link>
          <Link to="/">
            <MenuItem onClick={handleLogoutSubmit}>Logout</MenuItem>
          </Link>
        </Menu>
      </Box>
    </div>
  );
}

export default UserAvatar;
