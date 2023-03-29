import React from 'react'
import DashboardPage from '../Pages/DashboardPage'
import AddIcon from '../Assets/Images/add-task.svg'
import TaskData from '../Data/TaskData'
import DeleteTask from '../modals/DeleteTask'
import UpdateTask from '../modals/UpdateTask'
import { Link } from 'react-router-dom'

function TaskList() {
  return (
    <DashboardPage>
        <div className="flex justify-start flex-col w-full bg-white p-6 text-center h-700 drop-shadow rounded-md m-4">
            <div className='flex justify-start flex-row items-center mb-8'> 
              <a href="/" className="rounded-lg p-5 bg-white drop-shadow-md space-y-3 dark:hover:bg-slate-300">
                <div className="flex items-center space-x-3">
                  <img src={AddIcon} alt="add-task" className='h-6 w-6'/>
                  <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">New project</h3>
                </div>
                <p className="text-slate-500 group-hover:text-white text-sm">Create a new project from a variety of starting templates.</p>
              </a>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-md">
              <table className="w-full text-sm text-left dark:text-black">
                  <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800 text-white">
                      <tr>
                          <th scope="col" className="p-4">
                              <div className="flex items-center">
                                  <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                  <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                              </div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Article
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Description
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Status
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Client
                          </th>
                          <th scope="col" className="px-6 py-3">
                              CreatedAt
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Type
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Words
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Action
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {TaskData.map((TaskDatas) => (
                        <tr className="bg-white border-b dark:bg-white dark:border-gray-300 hover:bg-slate-300">
                          <td className="w-4 p-4">
                              <div className="flex items-center">
                                  <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                  <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                              </div>
                          </td>
                            <th scope="row" className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                             <Link to={`/viewtask/${TaskDatas.id}`}>{TaskDatas.title}</Link>
                            </th>
                            <th scope="row" className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                             <Link to={`/viewtask/${TaskDatas.id}`}>{TaskDatas.description}</Link>
                            </th>
                            <td className="px-6 py-4">
                                <p className='bg-orange-500 rounded-lg p-1 w-content text-center'>{TaskDatas.status}</p>
                            </td>
                            <td className="px-6 py-4">
                                {TaskDatas.client}
                            </td>
                            <td className="px-6 py-4">
                                {TaskDatas.created_at}
                            </td>
                            <td className="px-6 py-4">
                                {TaskDatas.type}
                            </td>
                            <td className="px-6 py-4">
                                {TaskDatas.words}
                            </td>
                            <td className="flex items-center px-6 py-4 space-x-3">
                              <UpdateTask />
                              <DeleteTask/>
                            </td>
                        </tr>
                      ))}
                  </tbody>
              </table>
          </div>
        </div>
    </DashboardPage>
  )
}

export default TaskList