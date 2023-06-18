import React, { useState } from "react";
import NotificationData from "../Data/NotificationData";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MissedDeadlineIcon from "@mui/icons-material/WarningAmberRounded";
import TaskAssignedIcon from "@mui/icons-material/TaskAltRounded";
import ReminderIcon from "@mui/icons-material/NotificationsNoneRounded";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";

function NotificationDropdown() {
  const [notification, setNotification] = useState(NotificationData.length);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="mr-4">
        <IconButton onClick={handleOpenMenu}>
          <Badge badgeContent={notification} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          sx={{ mt: 2, height: 865 }}
        >
          {NotificationData.map((notifications) => (
            <div
              className="w-500 border-1 rounded-md m-1.5 flex flex-col hover:bg-gray-100 cursor-pointer relative"
              onClick={handleCloseMenu}
            >
              <Tooltip title="Delete Notification" placement="top" arrow>
                <CloseIcon
                  onClick={handleCloseMenu}
                  className="self-end m-1.5 hover:bg-gray-200 absolute top-0 right-0"
                  sx={{ fontSize: 18 }}
                />
              </Tooltip>
              <div className="flex justify-start items-center py-2">
                <p className="self-start ml-7 mr-0.5 text-sm">
                  {notifications.title}
                </p>
                <MissedDeadlineIcon sx={{ fontSize: 20, color: "red" }} />
                <TaskAssignedIcon sx={{ fontSize: 20, color: "orange" }} />
                <ReminderIcon sx={{ fontSize: 20, color: "blue" }} />
              </div>
              <h2 className="w-fit p-2 mx-5 font-bold">
                {notifications.message}
              </h2>
              <p className="self-end px-1.5 py-2 mr-2 text-xs text-gray-600">
                {notifications.posted}
              </p>
            </div>
          ))}
        </Menu>
      </div>
    </>
  );
}

export default NotificationDropdown;
