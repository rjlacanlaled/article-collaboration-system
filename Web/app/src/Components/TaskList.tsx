import React, { useEffect, useState } from "react";
import DashboardPage from "../Pages/DashboardPage";
import DeleteTask from "../modals/DeleteTask";
import UpdateTask from "../modals/UpdateTask";
import { Link } from "react-router-dom";
import CreateTask from "./CreateTask";

export type Assignee = {
  userId: number;
  firstName: string;
  lastName: string;
  roleId: number;
  role: string;
};

export type ProjectTask = {
  id: number;
  title: string;
  description: string;
  status: number;
  type: number;
  words: number;
  timeliness: number;
  contractId: number;
  dateCreate: number;
  dateUpdated: number;
  assignees: Assignee[];
};

function TaskList() {
  const [tasks, setTasks] = useState<ProjectTask[] | undefined | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5143/api/v1/ProjectTasks/all");
      const tasks = await res.json();
      setTasks(tasks);
    };

    fetchData();
  }, []);

  const getStatus = (status:any) => { 
  switch(status) {
    case 0:
      return 'bg-orange-500';
    case 1:
      return 'bg-blue-500';
    case 2:
      return 'bg-purple-500';
    case 3:
      return 'bg-green-500';
    default:
      return '';
  }
}

const getStatusText = (status:any) => {
  switch(status) {
    case 0:
      return 'To Do';
    case 1:
      return 'In Progress';
    case 2:
      return 'For Review';
    case 3:
      return 'Completed';
    default:
      return '';
  }
}

  return (
    <DashboardPage>
      <div className="flex justify-start flex-col w-full bg-white p-6 text-center h-700 drop-shadow rounded-md m-4">
        <div className="flex justify-start flex-row items-center mb-8">
          <CreateTask />
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-md">
          <table className="w-full text-sm text-left dark:text-black">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800 text-white">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
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
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Words
                </th>
                <th scope="col" className="px-6 py-3">
                  Timeliness
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
              {tasks == null
                ? []
                : tasks.map((task) => (
                    <tr className="bg-white border-b dark:bg-white dark:border-gray-300 hover:bg-slate-300">
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="checkbox-table-search-1"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                      >
                        <Link to={`/viewtask/${task.id}`}>{task.title}</Link>
                      </th>
                      <th
                        scope="row"
                        className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                      >
                        <Link to={`/viewtask/${task.id}`}>
                          {task.description}
                        </Link>
                      </th>
                      <td className="px-6 py-4">
                        <p className={`${getStatus(task.status)} rounded-lg p-1 w-content text-center`}>
                          {getStatusText(task.status)}
                        </p>
                      </td>
                      <td className="px-6 py-4">{"client"}</td>
                      <td className="px-6 py-4">
                        {task.type === 0 ? "Guest Post" : ""}
                        {task.type === 1 ? "Blog" : ""}
                      </td>
                      <td className="px-6 py-4">{task.words}</td>
                      <td className="px-6 py-4">
                        {task.timeliness === 0 ? "Pending" : ""}
                        {task.timeliness === 1 ? "Past EOD" : ""}
                        {task.timeliness === 2 ? "On Time" : ""}
                      </td>
                      <td className="px-6 py-4">
                      {new Date(
                          task.dateCreate
                        ).toLocaleString()}
                      </td>
                      <td className="flex items-center px-6 py-4 space-x-3">
                        <UpdateTask task={task} />
                        <DeleteTask />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardPage>
  );
}

export default TaskList;
