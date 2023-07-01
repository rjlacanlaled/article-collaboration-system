import React, { useEffect, useState } from "react";
import DashboardPage from "../Pages/DashboardPage";
import DeleteTask from "../modals/DeleteTask";
import UpdateTask from "../modals/UpdateTask";
import { Link } from "react-router-dom";
import CreateTask from "./CreateTask";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import CheckIcon from "../Assets/Images/done-check.svg";
import { UserLogin } from "../Types/UserLogin";
import { TabTitle } from "../utils/GeneralFunctions";

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
  link: any;
  status: number;
  type: number;
  words: number;
  timeliness: number;
  contractId: number;
  dateCreate: number;
  dateUpdated: number;
  productionDeadline: number;
  seoDeadline: number;
  assignees: Assignee[];
  reporter: string;
};

export interface State extends SnackbarOrigin {
  open: boolean;
}

function TaskList({ userDetail, isSignedIn }: UserLogin) {
  const [tasks, setTasks] = useState<ProjectTask[] | undefined | null>(null);
  const [isDeleteSuccess, setDeleteSuccess] = useState(false);
  const [isUpdateSuccess, setUpdateSuccess] = useState(false);
  const [isNewTaskSuccess, setNewTaskSuccess] = useState(false);

  //Page Title
  TabTitle("Task List - SearchWorks");

  // handle delete close
  const handleNewTaskClose = () => {
    setNewTaskSuccess((prevState) => !prevState);
  };

  // handle delete close
  const handleDeleteClose = () => {
    setDeleteSuccess((prevState) => !prevState);
  };

  // handle Update close
  const handleUpdateClose = () => {
    setUpdateSuccess((prevState) => !prevState);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/ProjectTasks/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const tasks = await res.json();
      setTasks(tasks);
    };

    fetchData();
  };

  const getStatus = (status: any) => {
    switch (status) {
      case 0:
        return "bg-orange-500";
      case 1:
        return "bg-blue-500";
      case 2:
        return "bg-purple-500";
      case 3:
        return "bg-green-500";
      default:
        return "bg-green-500";
    }
  };

  const getStatusText = (status: any) => {
    switch (status) {
      case 0:
        return "To Do";
      case 1:
        return "In Progress";
      case 2:
        return "For Review";
      case 3:
        return "Completed";
      default:
        return (
          <div className="flex justify-center items-center">
            <div className="mr-1">Done</div>
            <img src={CheckIcon} alt="Done" className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <DashboardPage user={userDetail} isSignedIn={isSignedIn}>
      <div className="flex justify-start flex-col w-full bg-white p-6 text-center h-790 drop-shadow rounded-md mx-4 mt-4">
        <div className="flex justify-start flex-row items-center mb-8">
          <CreateTask
            updateHandler={refreshData}
            isNewTaskSuccess={setNewTaskSuccess}
          />
        </div>
        <div className="overflow-x-auto shadow-md sm:rounded-md">
          <table className="w-full text-sm text-left dark:text-black">
            <thead className="sticky top-0 z-20 text-xs uppercase bg-gray-50 dark:bg-gray-800 text-white tracking-wider">
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
                  Link
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
                : [...tasks].reverse().map((task) => (
                    <tr
                      key={task.id} // Add key prop with a unique identifier
                      className="bg-white border-b dark:bg-white dark:border-gray-300 hover:bg-slate-300 tracking-wide"
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id={`checkbox-table-search-${task.id}`} // Use a unique identifier for each checkbox
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor={`checkbox-table-search-${task.id}`} // Use a unique identifier for each label
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-normal dark:text-black"
                      >
                        <Link to={`/viewtask/${task.id}`}>{task.title}</Link>
                      </th>
                      <th
                        scope="row"
                        className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-normal dark:text-black"
                      >
                        <Link to={`/viewtask/${task.id}`}>
                          {task.description}
                        </Link>
                      </th>
                      <th
                        scope="row"
                        className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-normal dark:text-black"
                      >
                        {task?.link ? (
                          <Link to={task.link} target="_blank">
                            <button className="inline-flex items-center py-0.5 px-5 text-xs font-medium text-center text-white bg-purple-600 hover:bg-purple-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 tracking-wider">
                              Link
                            </button>
                          </Link>
                        ) : (
                          <button
                            disabled
                            className="inline-flex items-center py-0.5 px-5 text-xs font-medium text-center text-white bg-gray-400 rounded-lg tracking-wider"
                          >
                            Link
                          </button>
                        )}
                      </th>
                      <td className="px-6.5 py-4">
                        <p
                          className={`${getStatus(
                            task.status
                          )} rounded-lg py-1 w-24 text-center text-zinc-50`}
                        >
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
                        {new Date(task.dateCreate).toLocaleDateString() +
                          " at " +
                          new Date(task.dateCreate).toLocaleTimeString()}
                      </td>
                      <td className="flex items-center px-6 py-4 space-x-3">
                        <UpdateTask
                          task={task}
                          updateHandler={refreshData}
                          isUpdateSuccess={setUpdateSuccess}
                        />
                        <DeleteTask
                          task={task}
                          updateHandler={refreshData}
                          isDeleteSuccess={setDeleteSuccess}
                        />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* NEW TASK NOTIFICATION */}
      {isNewTaskSuccess && (
        <Snackbar
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={isNewTaskSuccess}
          onClose={handleNewTaskClose}
        >
          <Alert onClose={handleNewTaskClose} severity="success">
            Task Successfully Created!
          </Alert>
        </Snackbar>
      )}
      {/* DELETE NOTIFICATION */}
      {isDeleteSuccess && (
        <Snackbar
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={isDeleteSuccess}
          onClose={handleDeleteClose}
        >
          <Alert onClose={handleDeleteClose} severity="success">
            Task Successfully Deleted!
          </Alert>
        </Snackbar>
      )}
      {/* UPDATE NOTIFICATION */}
      {isUpdateSuccess && (
        <Snackbar
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={isUpdateSuccess}
          onClose={handleUpdateClose}
        >
          <Alert onClose={handleUpdateClose} severity="success">
            Task Successfully Updated!
          </Alert>
        </Snackbar>
      )}
    </DashboardPage>
  );
}

export default TaskList;
