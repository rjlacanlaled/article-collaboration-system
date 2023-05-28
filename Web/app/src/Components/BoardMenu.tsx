import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface MyComponentProps {
    onDelete?: () => void;
    columnId: any;
    columnItems: any;
}

const BoardMenu = ({ onDelete, columnId, columnItems}: MyComponentProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    type: 1,
    words: 0,
  });


  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    onDelete?.();
    handleClose();
  };

  const handleCreateTaskSubmit = async () => {
    const response = await fetch("http://localhost:5143/api/v1/ProjectTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: taskData.name,
        description: taskData.description,
        status: 0,
        type: taskData.type,
        words: taskData.words,
        timeliness: 0,
        contractId: -1,
      }),
    });
  
    if (response.ok) {
      const columnId = await response.json();
      if (columnId === 4) {
        // Redirect to completed report page
        window.location.href = "http://localhost:3000/report";
      } else {
        // Task is not completed
      }
    }
    console.log(response)
    handleClose(); // Call handleClose to close the menu
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

        { columnId === "4" ? (
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: '20ch',
              },
            }}
          >
            <MenuItem onClick={handleDeleteClick}>
              <p className='text-sm text-slate-500 '> Delete </p>
            </MenuItem>
            <MenuItem >
               <p className='text-sm text-slate-500' onClick={handleCreateTaskSubmit}>Clear ({columnItems.length}) Done Issue</p> 
            </MenuItem>
          </Menu>
        ) : (     
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: '20ch',
              },
            }}
          >
            <MenuItem onClick={handleDeleteClick}>
              <p className='text-sm text-slate-500'> Delete </p>
            </MenuItem>
          </Menu>
        )}

    </div>
  );
}

export default BoardMenu