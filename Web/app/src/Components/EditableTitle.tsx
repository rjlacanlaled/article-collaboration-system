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

  return (
    <div>
        <div>
          <div className='flex justify-center items-center p-2'>
            <div className='flex justify-center items-center'>
              <h1 
                className={`${getTitleColor(columnId)} text-xs rounded-full text-zinc-50 font-medium tracking-wider px-2 py-1`}
              >
                <DotIcon style={{ fontSize: 'small', color: getDotColor(columnId), marginRight: '0.2rem' }} />{title}
              </h1>
            </div>
            <h4 className={`${getTextColor(columnId)} text-sm ml-1`}>{task.length}</h4>
          </div>
        </div>
    </div>
  );
}

export default EditableTitle