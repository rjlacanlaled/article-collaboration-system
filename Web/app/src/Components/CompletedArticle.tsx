import React from 'react'
import ExportButton from './ExportButton'
import TaskData from '../Data/TaskData.json'
import TaskTotalStatus from '../Data/TaskTotalStatus.json'
import DatePickerViews from './DatePickerViews'
import ReportTaskStatus from './ReportTaskStatus' 

function CompletedArticle() {
  return (
    <>  
        {TaskTotalStatus.map((Task) => (
          <ReportTaskStatus
            openTask={Task.openTask}
            completedTask={Task.completedTask}
            pastEod={Task.past_eod}
          />
        ))}
        <div className="flex justify-start flex-col w-full h-fit bg-white p-6 text-center drop-shadow rounded-md m-4">
            <h2 className='text-gray-900 lining-nums font-bold'> Task Completed</h2>
            <div className="bg-white flex justify-between items-center">
                <DatePickerViews />
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-slate-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-slate-500 dark:text-slate-700 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
                </div>
            </div>
            <table className="table-auto border-collapse my-6 text-base w-full">
            <thead className="font-semibold bg-gray-800 text-white text-sm uppercase">
                <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">client</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Words</th>
                <th className="px-4 py-3">Timeliness</th>
                <th className="px-4 py-3">Export</th>
                </tr>
            </thead>
            <tbody className='overflow-scroll text-sm'>
                { TaskData.map((TaskDatas) => (
                    <tr>
                        <td className="border px-4 py-3">{TaskDatas.id}</td>
                        <td className="border px-4 py-3">{TaskDatas.title}</td>
                        <td className="border px-4 py-3">{TaskDatas.description}</td>
                        <td className="border px-4 py-3">{TaskDatas.client}</td>
                        <td className="border px-4 py-3">{TaskDatas.type}</td>
                        <td className="border px-4 py-3">{TaskDatas.words}</td>
                        <td className="border px-4 py-3">{TaskDatas.timeliness ? "Pending" : "On-Time"}</td>
                        <td className="border px-4 py-3 items-center">
                                <ExportButton />
                        </td>
                    </tr>
                ))}     
            </tbody>
            </table>
        </div>
    </>
  )
}

export default CompletedArticle