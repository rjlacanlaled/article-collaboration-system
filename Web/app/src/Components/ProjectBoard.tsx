import React, { useState } from 'react'
import Data from '../Data/Data';
import { AvatarGroup, Avatar } from '@mui/material';
import AddIcon from '../Assets/Images/plus-icon.svg'
import Board from './Board';
import DashboardPage from '../Pages/DashboardPage';

function ProjectBoard() {
 
  const [currentId, setCurrentId] = useState(Data.length)

  return (
    <DashboardPage>
      <div className='h-content w-full flex justify-start flex-row items-center overflow-x-scroll scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 scrollbar-thin scroll-smooth bg-white p-6 h-content drop-shadow rounded-md m-4'>
          {/* SECOND CONTAINER */}
        <div className='w-72 h-700 bg-gray-200 shadow flex justify-start flex-col m-2 rounded-md relative'>
          {/* START */}
          <h4 className='text-stone-600 font-semibold p-2'>Todo<label className='bg-gray-300 text-sm rounded-full px-2 ml-1'>{currentId}</label></h4>
          <h4 className='text-xs mx-1.5 p-2 text-stone-600'>This item hasn't been started</h4>
          <div className='mb-8 w-content h-full bg-gray-200 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 scrollbar-thin scroll-smooth'>
            {Data.map((Datas) => (
              <div className='container w-auto min-h-24 max-h-34 h-auto overflow-hidden border-2 hover:border-slate-500 bg-gray-100 text-slate-500 shadow rounded-md mx-2 my-1 p-1 relative flex justify-start items-center flex-wrap'>
                <div className='flex justify-center items-center flex-col'>
                  <h4 className='text-sm m-2 self-start'>{Datas.name}</h4>
                  <p className='text-xs mb-1 mx-1'>{Datas.description}</p>
                </div>
                <div className='p-2 absolute top-0 right-0'>
                  <AvatarGroup>
                    <Avatar alt="Remy Sharp" src={Datas.image} sx={{ width: 20, height: 20  }} />
                    <Avatar alt="Remy Sharp" src={Datas.image} sx={{ width: 20, height: 20  }} />
                    <Avatar alt="Remy Sharp" src={Datas.image} sx={{ width: 20, height: 20  }} />
                  </AvatarGroup>
                </div>
              </div>
            ))}
            {/* ENDPOINT */}
          </div>
          <div className='bg-gray-200 flex justify-start items-center flex-row absolute bottom-0 left-0 p-2 w-full'>
            <img src={AddIcon} alt="add-item" className='w-4 cursor-pointer'/>
            <h4 className='text-stone-600 font-semibold text-xs cursor-pointer'>Add Item</h4>
          </div>
        </div>
        <Board/>   
      </div>
    </DashboardPage>
  )
}

export default ProjectBoard