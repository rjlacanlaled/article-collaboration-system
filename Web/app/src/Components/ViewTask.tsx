import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardPage from "../Pages/DashboardPage";
import TaskAssigned from "./TaskAssigned";
import TaskComment from "./TaskComment";
import { Assignee, ProjectTask } from "./TaskList";
import { UserLogin } from "../Types/UserLogin";
import { ContractDetails } from "../modals/CreateContract";

function ViewTask({ userDetail, isSignedIn }: UserLogin) {
  const { id } = useParams();
  const [taskData, setTaskData] = useState<ProjectTask>();
  const [contractDetails, setContractDetails] =
    useState<ContractDetails | null>(null);

  useEffect(() => {
    async function fetchTaskData() {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/ProjectTasks/task/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setTaskData({
        ...data,
        productionDeadline: data.productionDate,
      });
      console.log({ data });
    }
    fetchTaskData();
  }, [id]);

  // useEffect(() => {
  //   const fetchContractDetails = async (email: string) => {
  //     const contractDetailsReq = await fetch(
  //       `${
  //         process.env.REACT_APP_BASE_URL
  //       }/Contracts/contract/email/${encodeURI(email)}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     const actualContractDetails = await contractDetailsReq.json();
  //     setContractDetails(actualContractDetails);
  //     console.log({ actualContractDetails });
  //   }

  //   const client = taskData?.assignees.find(x => x.role === "Client");

  //   if (client) {
  //     fetchContractDetails(client.userId);
  //   }
  // }, [taskData])

  return (
    <DashboardPage user={userDetail} isSignedIn={isSignedIn}>
      {taskData ? (
        <div className="bg-white h-790 drop-shadow rounded-md mx-auto w-full flex justify-center items-center">
          <div className="w-full h-full overflow-y-auto">
            <TaskComment task={taskData} />
          </div>
          <div className="bg-white w-full h-full flex justify-start flex-col items-center">
            <TaskAssigned columnId={taskData} task={taskData} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </DashboardPage>
  );
}

export default ViewTask;
