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

const BoardMenu = ({ onDelete, columnId, columnItems }: MyComponentProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
               <p className='text-sm text-slate-500'>Clear ({columnItems.length}) Done Issue</p> 
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