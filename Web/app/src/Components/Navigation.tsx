import React from 'react'
import { Link } from 'react-router-dom'
import NavLogo from '../Assets/Images/searchwork-logo.svg'
import UserIcon from '../Assets/Images/user-icon.svg'
import HomeIcon from "../Assets/Images/home-logo.svg"
import TaskIcon from "../Assets/Images/task-icon.svg"
import BoardIcon from "../Assets/Images/board.svg"

function Navigation() {
  return (
    <>
      <div className="flex items-center mb-6 px-4 py-6">
        <img src={NavLogo} alt="Logo" className="w-7 h-8 mr-2" />
        <span className="text-gray-400 font-bold text-base">SEARCH WORK</span>
      </div>
        <ul className='list-none text-l font-medium leading-relaxed tracking-wide'>
            <div className="flex justify-start items-center w-48 rounded-md py-2 px-4 text-gray-400 hover:text-white">
              <img src={HomeIcon} alt="user-icon" className="w-5 mr-3"/>
              <li>
                <Link to="/user"><a href="/">Dashboard</a></Link>
              </li>   
            </div> 
            <div className="flex justify-start items-center w-48 rounded-md py-2 px-4 text-gray-400 hover:text-white">
            <img src={UserIcon} alt="user-icon" className=" w-5 mr-3"/>
              <li>
                <Link to="/user"><a href="/">User</a></Link>
              </li>
            </div>
            <div className="flex justify-start items-center w-48 rounded-md py-2 px-4 text-gray-400 hover:text-white">
              <img src={BoardIcon} alt="user-icon" className=" w-5 mr-3"/>
              <li>
                <Link to="/board"><a href="/">Board</a></Link>
              </li>   
            </div>  
            <div className="flex justify-start items-center w-48 rounded-md py-2 px-4 text-gray-400 hover:text-white">
              <img src={TaskIcon} alt="user-icon" className=" w-5 mr-3"/>
              <li>
                <a href="/task">Task</a>
              </li>   
            </div>  
        </ul>
    </>
  )
}

export default Navigation