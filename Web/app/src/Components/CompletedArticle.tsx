import React, { useEffect, useState } from 'react'
import ExportButton from './ExportCompletedTaskButton'
import DatePickerViews from './DatePickerViews'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '../Assets/Images/done-check.svg' 

export type ProjectTask = {
    id: number;
    title: string;
    description: string;
    link: any;
    status: number;
    type: number;
    words: number;
    timeliness: number;
    contractId: number;
    dateCreate: number;
    dateUpdated: number;
    productionDate: number;
    seoDeadline: number;
  };

function CompletedArticle() {
    const [doneTask, setDoneTask] = useState<ProjectTask[]>([])
    const [page, setPage] = useState(1)

    const tasksPerPage = 5
    const totalPages = Math.ceil(doneTask?.length / tasksPerPage);

    const startIndex = (page - 1) * tasksPerPage;
    const endIndex = startIndex + tasksPerPage;
    const DoneTasks = doneTask?.slice(startIndex, endIndex);

    const handleChange = (e: any, p: number) => {
        setPage(p)
    }

    useEffect (() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:5143/api/v1/ProjectTasks/done", {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            const doneTask = await res.json();
            setDoneTask(doneTask)
        };
        fetchData();
    }, [])

  return (
    <>  
        <h1 className='place-self-start text-2xl tracking-wider text-zinc-800 font-semibold uppercase'>Report Summary</h1>
        <div className="flex justify-start flex-col w-full h-fit bg-white p-6 text-center drop-shadow rounded-md m-4">
            <h2 className='text-gray-900 lining-nums font-bold uppercase tracking-wider'>Completed Task</h2>
            <div className="bg-white flex justify-between items-center">
                <DatePickerViews />
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-slate-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-slate-500 dark:text-slate-700 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Task"/>
                </div>
            </div>
            <div className='w-full h-400 overflow-x-auto'>
                <table className="table-auto border-collapse my-6 text-base w-full">
                <thead className="font-semibold bg-gray-800 text-white text-sm uppercase tracking-wider">
                    <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">client</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Words</th>
                    <th className="px-4 py-3">Timeliness</th>
                    <th className="px-4 py-3">Status</th>
                    </tr>
                </thead>
                <tbody className='overflow-scroll text-sm text-zinc-700 tracking-wide'>
                    { DoneTasks?.map((TaskDatas) => (
                        <tr key={TaskDatas.id}>
                            <td className="border px-4 py-3">{TaskDatas.title}</td>
                            <td className="border px-4 py-3">{TaskDatas.description}</td>
                            <td className="border px-4 py-3">client</td>
                            <td className="border px-4 py-3">
                                {TaskDatas.type === 0 ? "Guest Post" : ""}
                                {TaskDatas.type === 1 ? "Blog" : ""}
                            </td>
                            <td className="border px-4 py-3">{TaskDatas.words}</td>
                            <td className="border px-4 py-3">
                                {TaskDatas.timeliness === 0 ? "Pending" : ""}
                                {TaskDatas.timeliness === 1 ? "Past EOD" : ""}
                                {TaskDatas.timeliness === 2 ? "On Time" : ""}
                            </td>
                            <td className="border px-4 py-3 items-center">
                                <div className="flex justify-center items-center bg-green-500 py-2 px-1 rounded-md w-full">
                                    <div className="mr-1 text-white">Done</div>
                                    <img src={CheckIcon} alt="Done" className="w-4 h-4" />
                                </div>
                            </td>
                        </tr>
                    ))}     
                </tbody>
                </table>
            </div>
            <div className='place-self-center mb-5'>
                <Stack spacing={20}>
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
                <ExportButton label="export all" />
        </div>
    </>
  )
}

export default CompletedArticle