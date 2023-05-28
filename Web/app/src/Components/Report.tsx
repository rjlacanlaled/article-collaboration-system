import React, {useState} from 'react'
import DashboardPage from '../Pages/DashboardPage'
import UserData from '../Data/UserData.json'
import ExportButton from './ExportButton';
import TimeFrame from './DatePickerViews';
import ArticleTable from './CompletedArticle';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Report() {

    const [page, setPage] = useState(1)

    const UserPerPage = 5
    const totalPages = Math.ceil(UserData.length / UserPerPage);

    const startIndex = (page - 1) * UserPerPage;
    const endIndex = startIndex + UserPerPage;
    const displayedUsers = UserData.slice(startIndex, endIndex);

    const handleChange = (e: any, p: number) => {
        console.log(page)
        setPage(p)
    }

  return (
    <DashboardPage>
        <ArticleTable/>    
        <div className="flex justify-start flex-col w-full bg-white p-6 text-center h-650 drop-shadow rounded-md m-4">
            <h2 className='text-gray-900 lining-nums font-bold'> USERS TASK SUMMARY</h2>
            <div className="bg-white flex justify-between items-center">
                <TimeFrame />
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-slate-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-slate-500 dark:text-slate-700 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
                </div>
            </div>
            <div className='w-full h-400'>
                <table className="table-auto border-collapse my-6 text-base w-full">
                <thead className="font-semibold bg-gray-800 text-white text-sm uppercase">
                    <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">First Name</th>
                    <th className="px-4 py-3">Last Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">In Progress</th>
                    <th className="px-4 py-3">Completed Task</th>
                    <th className="px-4 py-3">Past EOD</th>
                    <th className="px-4 py-3">Export</th>
                    </tr>
                </thead>
                <tbody className='overflow-scroll text-sm'>
                    { displayedUsers.map((UserDatas) => (
                        <tr key={UserDatas.id}>
                            <td className="border px-4 py-3">{UserDatas.id}</td>
                            <td className="border px-4 py-3">{UserDatas.firstname}</td>
                            <td className="border px-4 py-3">{UserDatas.lastname}</td>
                            <td className="border px-4 py-3">{UserDatas.email}</td>
                            <td className="border px-4 py-3">{UserDatas.role}</td>
                            <td className="border px-4 py-3">{UserDatas.inProgress}</td>
                            <td className="border px-4 py-3">{UserDatas.completed}</td>
                            <td className="border px-4 py-3">{UserDatas.pastEod}</td>
                            <td className="border px-4 py-3 items-center">
                                <ExportButton label="export"/>
                            </td>
                        </tr>
                    ))}     
                </tbody>
                </table>
            </div>
            <div className='place-self-center mb-5'>
                <Stack spacing={2}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChange}
                        renderItem={(item) => (
                    <PaginationItem
                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}
                     />
                    )}
                  />
                </Stack>
            </div>
            <ExportButton label="export all"/>         
        </div>
    </DashboardPage>
  )
}

export default Report