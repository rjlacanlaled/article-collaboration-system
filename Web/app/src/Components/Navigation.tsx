import React from 'react'
import { Link } from 'react-router-dom'
import NavLogo from '../Assets/Images/searchwork-logo.svg'
import HomeIcon from '@mui/icons-material/HomeOutlined';
import TaskIcon from '@mui/icons-material/FormatListBulletedOutlined';
import ReportIcon from '@mui/icons-material/SummarizeOutlined';
import KanbanBoardIcon from '@mui/icons-material/ViewKanbanOutlined';
import UserIcon from '@mui/icons-material/PersonOutlineOutlined';
import ClientIcon from '@mui/icons-material/AccountBoxOutlined';

function Navigation() {
  return (
    <>
      <div className="flex items-center mb-6 px-4 py-6">
        <img src={NavLogo} alt="Logo" className="w-7 h-8 mr-2" />
        <span className="text-gray-400 font-bold text-base">SEARCH WORK</span>
      </div>
        <ul className='list-none text-l font-medium leading-relaxed tracking-wide'>
            <div className="flex justify-start items-center w-48 rounded-md py-2 px-4 text-gray-400 hover:text-white">
              <HomeIcon className='w-5 mr-3'/>
              <li>
                <Link to="/pending"><a href="/">Dashboard</a></Link>
              </li>   
            </div> 
            <div className="flex justify-start items-center w-48 rounded-md py-2 px-4 text-gray-400 hover:text-white">
            <UserIcon className='w-5 mr-3'/>
              <li>
                <Link to="/user"><a href="/">User</a></Link>
              </li>
            </div>
            <div className="flex justify-start items-center w-48 rounded-md py-2 px-4 text-gray-400 hover:text-white">
              <KanbanBoardIcon className='w-5 mr-3'/>
              <li>
                <Link to="/board"><a href="/">Board</a></Link>
              </li>   
            </div>  
            <div className="flex justify-start items-center w-48 rounded-md py-2 px-4 text-gray-400 hover:text-white">
              <TaskIcon className='w-5 mr-3'/>
              <li>
                <a href="/task">Task</a>
              </li>   
            </div>
            <div className="flex justify-start items-center w-48 rounded-md py-2 px-4 text-gray-400 hover:text-white">
              <ClientIcon className='w-5 mr-3'/>
              <li>
                <a href="/client">Client</a>
              </li>   
            </div>   
            <div className="flex justify-start items-center w-48 rounded-md py-2 px-4 text-gray-400 hover:text-white">
              <ReportIcon className='w-5 mr-3'/>
              <li>
                <a href="/">Report</a>
              </li>   
            </div>    
        </ul>
    </>
  )
}

export default Navigation