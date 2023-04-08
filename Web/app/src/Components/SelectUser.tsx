import * as React from 'react';
import { Avatar } from '@mui/material';

export default function SelectUser() {
  const [user, setUser] = React.useState('');

  const handleChange = (event: any) => {
    setUser(event.target.value);
  };


  return (
    <div>
        <div className="m-1 w-min">
          <select
            value={user}
            onChange={handleChange}
            className="h-8 w-40 py-1.5 px-3 bg-transparent border border-none rounded-sm focus:border-blue-500 cursor-pointer"
          >
            <option value="" disabled className='hover-bg-white'>
              Unassigned
            </option>
            <option value={10}>
              <span className="flex items-center">
                <Avatar src="/broken-image.jpg" />
                <span className="ml-2">Option 1</span>
              </span>
            </option>
            <option value={20}>
              <span className="flex items-center">
                <Avatar>H</Avatar>
                <span className="ml-2">Option 2</span>
              </span>
            </option>
            <option value={30}>
              <span className="flex items-center">
                <Avatar>H</Avatar>
                <span className="ml-2">Option 3</span>
              </span>
            </option>
          </select>
        </div>
    </div>
  );
}