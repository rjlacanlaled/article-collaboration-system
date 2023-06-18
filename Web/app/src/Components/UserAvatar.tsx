import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Profile from "../Assets/Images/profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../Types/UserLogin";
import { UserDetail } from "../Types/UserDetails";

function UserAvatar({ userDetail, isSignedIn }: UserLogin) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDetail>(
    JSON.parse(localStorage.getItem("user")!)
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutSubmit = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <Box sx={{ flexGrow: 0 }}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} disableRipple>
          <Avatar alt="Remy Sharp" src={Profile} />
          <label className="text-sm ml-3 text-zinc-700 cursor-pointer tracking-wider capitalize">
            {user.user.firstName + " " + user.user.lastName}
          </label>
        </IconButton>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
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
