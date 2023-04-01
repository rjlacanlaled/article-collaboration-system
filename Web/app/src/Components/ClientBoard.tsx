import React from 'react'
import DashboardPage from '../Pages/DashboardPage'
import ClientData from '../Data/ClientData'
import UpdateClient from '../modals/UpdateClient'
import DeleteClient from '../modals/DeleteClient'
import CreateContract from './CreateContract'

function ClientBoard() {
  return (
    <DashboardPage>
        <div className="flex justify-start flex-col w-full bg-white p-6 text-center h-700 drop-shadow rounded-md m-4">
            <div className='flex justify-start flex-row items-center mb-8 w-64'> 
                <CreateContract />
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
                              Client
                          </th>
                          <th scope="col" className="px-6 py-3">
                              SEO
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Contract Type
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Payment Plan
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Payment Status
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Managed By
                          </th>
                          <th scope="col" className="px-6 py-3">
                              CreatedAt
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Action
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {ClientData.map((client) => (
                        <tr className="bg-white border-b dark:bg-white dark:border-gray-300 hover:bg-slate-300">
                          <td className="w-4 p-4">
                              <div className="flex items-center">
                                  <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                  <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                              </div>
                          </td>
                            <th scope="row" className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                {client.client}
                            </th>
                            <th scope="row" className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                {client.seo}
                            </th>
                            <th scope="row" className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                {client.contractType}
                            </th>
                            <th scope="row" className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                {client.paymentPlan}
                            </th>
                            <td className="px-6 py-4">
                            <p className='bg-green-500 rounded-lg p-1 w-20 text-center'>{client.paymentStatus}</p>
                            </td>
                            <td className="px-6 py-4">
                                {client.managedBy}
                            </td>
                            <td className="px-6 py-4">
                                {client.createdAt}
                            </td>
                            <td className="flex items-center px-6 py-4 space-x-3">
                              <UpdateClient />
                              <DeleteClient/>
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

export default ClientBoard