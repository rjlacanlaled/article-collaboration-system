import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardPage from "../Pages/DashboardPage";
import TaskAssigned from "./TaskAssigned";
import TaskComment from "./TaskComment";
import { ProjectTask } from "./TaskList";
import { UserLogin } from "../Types/UserLogin";

function ViewTask({ userDetail, isSignedIn }: UserLogin) {
  const { id } = useParams();
  const [taskData, setTaskData] = useState<ProjectTask>();

  useEffect(() => {
    async function fetchTaskData() {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/ProjectTasks/task/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }
      );
      const data = await response.json();
      setTaskData(data);
    }
    fetchTaskData();
  }, [id]);

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
        <>
        </>
      )}
    </DashboardPage>
  );
}

export default ViewTask;
