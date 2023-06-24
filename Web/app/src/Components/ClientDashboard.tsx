import React, { useState } from "react";
import DashboardPage from "../Pages/DashboardPage";
import LinkButton from "./LinkButton";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import FeedbackComment from "./FeedbackComment";
import { Assignee, ProjectTask } from "./TaskList";
import { UserLogin } from "../Types/UserLogin";

export type ProjectAssigneeDetails = {
  projectTask: ProjectTask;
  projectTaskAssignee: Assignee;
};

function ClientDashboard({ userDetail, isSignedIn }: UserLogin) {
  const [open, setOpen] = React.useState("");
  const [projectDetails, setProjectDetails] = useState<
    ProjectAssigneeDetails[] | null
  >(null);

  return (
    <DashboardPage user={userDetail} isSignedIn={isSignedIn}>
      <div className="flex justify-start flex-col w-full bg-white p-6 text-center h-700 drop-shadow rounded-md m-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-md">
          <h2 className="text-lg font-bold text-gray-800 m-2 py-1">{`Article's Status`}</h2>
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
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {projectDetails?.map((TaskDatas) => (
                <tr
                  className="bg-white border-b dark:bg-white dark:border-gray-300 hover:bg-slate-300 cursor-pointer"
                  onClick={() => setOpen("center")}
                >
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
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {TaskDatas.projectTask.title}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {TaskDatas.projectTask.description}
                  </th>
                  <td className="px-6 py-4">
                    <p className="bg-orange-500 rounded-lg p-1 w-content text-center">
                      {TaskDatas.projectTask.status}
                    </p>
                  </td>
                  <td className="px-6 py-4">{TaskDatas.projectTask.type}</td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <LinkButton label="Link" articlelink={"google.com"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal open={!!open} onClose={() => setOpen("")}>
        <ModalDialog
          aria-labelledby="layout-modal-title"
          aria-describedby="layout-modal-description"
        >
          <ModalClose />
          <div className="bg-white mx-auto sm:w-800 md:w-400 lg:w-1000 xl:w-1200 w-1500 h-700 flex justify-center flex-col items-center">
            <h1 className="mb-4 text-lg lg:text-2xl font-bold text-gray-900 dark:text-black m-2">
              Write A Feedback
            </h1>
            <div className="w-full h-full overflow-y-auto">
              <FeedbackComment />
            </div>
          </div>
        </ModalDialog>
      </Modal>
    </DashboardPage>
  );
}

export default ClientDashboard;
