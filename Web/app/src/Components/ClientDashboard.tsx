import React, { useEffect, useState } from "react";
import DashboardPage from "../Pages/DashboardPage";
import LinkButton from "./LinkButton";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import FeedbackComment from "./FeedbackComment";
import { Assignee, ProjectTask } from "./TaskList";
import { UserLogin } from "../Types/UserLogin";
import CheckIcon from "../Assets/Images/done-check.svg";

export type ProjectAssigneeDetails = {
  projectTask: ProjectTask;
  projectTaskAssignee: Assignee;
};

function ClientDashboard({ userDetail, isSignedIn }: UserLogin) {
  const [tasks, setTasks] = useState<ProjectAssigneeDetails[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/ProjectTasks/user/${encodeURI(
          userDetail.user.email
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const projectTasks: ProjectAssigneeDetails[] = await res.json();
      setTasks(projectTasks);
      console.log({ projectTasks });
    };
    fetchData();
  }, []);

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
      <div className="flex justify-start flex-col w-full bg-white p-6 text-center h-700 drop-shadow rounded-md m-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-md">
          <h2 className="text-lg font-bold text-gray-800 m-2 py-1">{`Article's Status`}</h2>
          <table className="w-full text-sm text-left text-black">
            <thead className="text-xs uppercase bg-gray-800 text-white">
              <tr>
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
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task) => (
                <tr
                  className="bg-white border-b dark:bg-white dark:border-gray-300 hover:bg-slate-300"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {task.projectTask.title}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {task.projectTask.description}
                  </th>
                  <td className="px-6 py-4">
                    <p
                      className={`${getStatus(
                        task.projectTask.status
                      )} rounded-lg py-1 w-24 text-center text-zinc-50`}
                      >
                        {getStatusText(task.projectTask.status)}
                      </p>
                  </td>
                  <td className="px-6 py-4">
                    {task.projectTask.type === 0 && "Guest Post"}
                    {task.projectTask.type === 1 && "Blog"}
                  </td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <LinkButton
                      label="Link"
                      articlelink={task.projectTask.link}
                    />
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

export default ClientDashboard;
