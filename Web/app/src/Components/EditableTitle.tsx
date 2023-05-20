import { useState } from 'react';
import DotIcon from '@mui/icons-material/FiberManualRecord';
import { ProjectTask } from './TaskList';

type EditableTitleProps = {
  initialValue: string;
  task: ProjectTask[];
  columnId: any;
};

function EditableTitle({ initialValue, task, columnId}: EditableTitleProps) {
  const [title, setTitle] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (event:any) => {
    event.preventDefault();
    setIsEditing(false);
  };

  const handleChange = (event:any) => {
    setTitle(event.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSave(event);
    }
  };

  const getTitleColor = (status:any) => { 
    switch(status) {
      case "1":
        return 'bg-orange-500';
      case "2":
        return 'bg-blue-500';
      case "3":
        return 'bg-purple-500';
      case "4":
        return 'bg-green-500';
      default:
        return '';
    }
  }

  const getDotColor = (status:any) => {
    switch (status) {
      case "1":
        return '#ff8c00'; // Orange color
      case "2":
        return '#2196f3'; // Blue color
      case "3":
        return '#9c27b0'; // Purple color
      case "4":
        return '#4caf50'; // Green color
      default:
        return ''; 
    }
  };

  const getTextColor = (status:any) => {
    switch (status) {
      case "1":
        return 'text-orange-500'; // Orange color
      case "2":
        return 'text-blue-500'; // Blue color
      case "3":
        return 'text-purple-500'; // Purple color
      case "4":
        return 'text-green-500'; // Green color
      default:
        return ''; 
    }
  };

  console.log(columnId)

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSave}>
          <div className="relative">
            <input
              type="text"
              value={title}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="block w-full border border-gray-400 focus:border-slate-500 focus:ring-slate-500 outline-0 p-2 m-content rounded-lg focus-slate-500"
            />
            <button
              type="submit"
              className="absolute right-1 bottom-1 text-white bg-slate-200 hover:bg-slate-300 focus:outline-none font-medium rounded-md text-sm px-3 py-1.5 dark:bg-slate-600 dark:hover:bg-slate-500"
            >
              Done
            </button>
          </div>
        </form>
      ) : (
        <div>
          
          <div className='flex justify-center items-center p-2'>
            <div className='flex justify-center items-center'>
              <h1 
                className={`${getTitleColor(columnId)} text-xs rounded-full text-zinc-50 font-medium tracking-wider px-2 py-1 cursor-pointer`}
                onClick={handleEdit}
              >
                <DotIcon style={{ fontSize: 'small', color: getDotColor(columnId), marginRight: '0.2rem' }} />{title}
              </h1>
            </div>
            <h4 className={`${getTextColor(columnId)} text-sm ml-1`}>{task.length}</h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditableTitle