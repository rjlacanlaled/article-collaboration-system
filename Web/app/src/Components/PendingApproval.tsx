import React from 'react'
import PendingIcon from '../Assets/Images/pending-approval.svg'
import AuthPage from '../Pages/AuthPage'
import { Link } from 'react-router-dom'

function PendingApproval() {
  return (
    <AuthPage> 
      <div className="bg-white w-4/5 p-8 h-5/6 rounded-lg shadow-lg flex items-center justify-center flex-col">
        <img src={PendingIcon} alt="success-logo" className="w-32 my-3" />
        <h1 className="text-zinc-700 text-3xl font-bold leading-relaxed text-center my-4 tracking-wider">Admin approval pending!</h1>
        <p className="text-base leading-relaxed text-center w-3/4 text-zinc-500 tracking-wider">Just a little more patience, and soon you'll be granted access to a world of possibilities.</p>
        <Link to={`/`}>
          <button className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white w-80 py-4 px-4 rounded-lg my-10 tracking-wider">Continue</button>
        </Link>
      </div>
    </AuthPage>
  )
}

export default PendingApproval