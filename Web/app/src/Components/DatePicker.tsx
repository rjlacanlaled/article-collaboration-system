import React, { useState } from 'react';

function DatePicker() {
  const [selectedDate, setSelectedDate] = useState('Deadline');

  function handleDateChange(event:any) {
    setSelectedDate(event.target.value);
  }

  return (
    <div>
        <div className="flex items-center">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
            />
          </div>
        </div>
    </div>
  );
}

export default DatePicker;