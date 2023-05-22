import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardPage from "../Pages/DashboardPage";
import TaskAssigned from "./TaskAssigned";
import TaskComment from "./TaskComment";
import { ProjectTask } from "./TaskList";

function ViewTask() {
  const { id } = useParams();
  const [taskData, setTaskData] = useState<ProjectTask>();

  useEffect(() => {
    console.log("here");
    async function fetchTaskData() {
      const response = await fetch(
        `http://localhost:5143/api/v1/ProjectTasks/task/${id}`
      );
      const data = await response.json();
      setTaskData(data);
    }
    fetchTaskData();
  }, [id]);

  return (
    <DashboardPage>
      {taskData ? (
        <div className="bg-white h-700 drop-shadow rounded-md mx-auto w-full flex justify-center items-center">
          <div className="w-full h-full overflow-y-auto">
            <TaskComment task={taskData} />
          </div>
          <div className="bg-white w-full h-full flex justify-start flex-col items-center">
            <TaskAssigned task={taskData}/>
            <h2 className="absolute bottom-0 right-0 p-4 font-medium text-sm text-gray-500">
              Created March 28, 2023 at 2:49 PM
            </h2>
          </div>
        </div>
      ) : (
        <p>Loading task data...</p>
      )}
    </DashboardPage>
  );
}

export default ViewTask;
