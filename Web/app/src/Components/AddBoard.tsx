import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Tooltip } from '@mui/material';
import Zoom from '@mui/material/Zoom';

type Props = {
    onAddBoard: (title: string) => void;
    initialValue: string;
  };

export const AddBoard: React.FC<Props> = ({ onAddBoard, initialValue }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newBoardTitle, setNewBoardTitle] = useState(initialValue);
  
    const handleAddBoard = () => {
        onAddBoard(newBoardTitle);
        setNewBoardTitle(initialValue);
        setIsEditing(false);
    };

    const handleChange = (event:any) => {
        setNewBoardTitle(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          handleAddBoard();
        }
      };
    
    const handleBlur = () => {
      setIsEditing(false);
    };

  return (
    <div>
      {isEditing ? (
        <div className="flex flex-row">
          <div className="relative w-64">
            <input
              type="text"
              value={newBoardTitle}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              className="block mt-3.5 w-full border border-gray-400 focus:border-slate-500 focus:ring-slate-500 outline-0 p-2 m-content rounded-lg focus-slate-500"
            />
            <button
              type="submit"
              onClick={handleAddBoard}
              className="absolute right-1 bottom-1 text-white bg-slate-200 hover:bg-slate-300 focus:outline-none font-medium rounded-md text-sm px-3 py-1.5 dark:bg-slate-600 dark:hover:bg-slate-500"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <Tooltip title="Create New Board" arrow placement="top" TransitionComponent={Zoom}>
          <AddIcon onClick={() => setIsEditing(true)} className="mt-2 rounded-md hover:bg-gray-200 cursor-pointer" />
        </Tooltip>
      )}
    </div>
  )
}


export default AddBoard