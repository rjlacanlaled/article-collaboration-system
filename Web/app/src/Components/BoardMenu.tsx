import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ProjectTask } from "./TaskList";

interface MyComponentProps {
  onDelete?: () => void;
  columnId: any;
  columnItems: ProjectTask[];
  updateHandler: any;
}

const BoardMenu = ({ onDelete, columnId, columnItems, updateHandler }: MyComponentProps) => {
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

  const onClearDone = async () => {
    const ids = columnItems.map((x) => x.id);
    console.log({ ids });
    await fetch(`${process.env.REACT_APP_BASE_URL}/ProjectTasks/done`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(ids),
    });
    await updateHandler();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      {columnId === "4" ? (
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              width: "20ch",
            },
          }}
        >
          <MenuItem>
            <p className="text-sm text-slate-500" onClick={onClearDone}>
              Clear ({columnItems.length}) Done Issue
            </p>
          </MenuItem>
        </Menu>
      ) : (
        ""
      )}
    </div>
  );
};

export default BoardMenu;
