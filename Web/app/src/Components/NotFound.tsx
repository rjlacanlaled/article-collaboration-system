import React from 'react'
import { Link } from 'react-router-dom'
import NotFoundLogo from '../Assets/Images/404.svg'

function NotFound() {
  return (
    <div className='bg-blue-100 h-screen flex items-center justify-center flex-col'>
    <img src={NotFoundLogo} alt="404" className='w-80 h-80' />
      <div className="flex justify-center items-center flex-col p-2">  
        <h1 className='text-5xl text-blue-500 mb-5 font-bold tracking-wider'>Page Not Found!</h1>
        <p className='text-zinc-500 text-base md:text-lg tracking-wider
        '>Sorry, the page you are looking for does not exist. How you got here is a mystery. 
        </p>
        <p className="text-zinc-500 text-base md:text-lg tracking-wider">
        But you can click the button below to go back to the homepage.
        </p>
      </div>
      <Link to={`/kanbanboard`}>
          <button className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white w-48 py-3.5 px-3 rounded-md mt-8 tracking-wider">Return Home</button>
      </Link>
    </div>
  )
}

export default NotFound