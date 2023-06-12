import React from 'react'
import OverdueIcon from '@mui/icons-material/AssignmentLateOutlined';
import CompletedIcon from '@mui/icons-material/FactCheckOutlined';
import OpenIcon from '@mui/icons-material/ListAltOutlined';

function ReportTaskStatus(props: any) {
  return (
    <>
        <div className='w-full flex justify-start items-center'>
            <div className="bg-white w-64 h-24 drop-shadow rounded-md m-2 p-3">
                <OpenIcon />
                <div className="flex flex-row justify-center items-center">
                  <h2 className="mr-2 tracking-wider font-bold text-zinc-800">Open Tasks</h2>
                  <p className="lining-nums font-bold text-sm text-black bg-gray-300 rounded-full px-3">{props.openTask}</p>
                </div>
            </div>
            <div className="bg-white w-64 h-24 drop-shadow rounded-md m-2 p-3">
                <CompletedIcon />
                <div className="flex flex-row justify-center items-center">
                  <h2 className="mr-2 tracking-wider font-bold text-zinc-800">Completed Task</h2>
                  <p className="lining-nums font-bold text-sm text-white bg-green-600 rounded-full px-3">{props.completedTask}</p>
                </div>
            </div>
            <div className="bg-white w-64 h-24 drop-shadow rounded-md m-2 p-3">
                <OverdueIcon />
                <div className="flex flex-row justify-center items-center">
                  <h2 className="mr-2 tracking-wider font-bold text-zinc-800">Past EOD</h2>
                  <p className="lining-nums font-bold text-sm text-white bg-red-600 rounded-full px-3">{props.pastEod}</p>
                </div>
            </div>
        </div> 
    </>
  )
}

export default ReportTaskStatus