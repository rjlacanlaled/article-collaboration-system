import React, { useEffect, useState } from "react";
import ExportButton from "./ExportCompletedTaskButton";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "../Assets/Images/done-check.svg";
import { ProjectTask } from "./TaskList";
import { UserDetailList } from "../Types/UserDetailList";

export type Props = {
  data: UserDetailList[];
};

function CompletedArticle({ data }: Props) {
  const [doneTask, setDoneTask] = useState<ProjectTask[]>([]);
  const [filteredDoneTask, setFilteredDoneTask] = useState<ProjectTask[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const [page, setPage] = useState(1);
  const tasksPerPage = 5;

  const handleChange = (e: any, p: number) => {
    setPage(p);
  };

  const handleDatePickerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/ProjectTasks/done`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const doneTask = await res.json();
      console.log({ doneTask });
      setDoneTask(doneTask);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      const selectedMonthParts = selectedMonth.split("-");
      const selectedYear = parseInt(selectedMonthParts[0]);
      const selectedMonthValue = parseInt(selectedMonthParts[1]);

      const filteredTasks = doneTask.filter((task) => {
        const taskDate = new Date(task.dateUpdated);
        const taskMonth = taskDate.getMonth() + 1; // Months are zero-based

        return (
          taskMonth === selectedMonthValue &&
          taskDate.getFullYear() === selectedYear
        );
      });

      setFilteredDoneTask(filteredTasks);
    } else {
      setFilteredDoneTask(doneTask);
    }
    setPage(1);
  }, [selectedMonth, doneTask]);

  const startIndex = (page - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const DoneTasks = filteredDoneTask.slice(startIndex, endIndex);

  return (
    <>
      <h1 className="place-self-start text-2xl tracking-wider text-zinc-800 font-semibold uppercase">
        Report Summary
      </h1>
      <div className="flex justify-start flex-col w-full h-fit bg-white p-6 text-center drop-shadow rounded-md m-4">
        <h2 className="text-gray-900 lining-nums font-bold uppercase tracking-wider">
          Completed Task
        </h2>
        <div className="bg-white flex justify-end items-center">
          <input
            className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5"
            type="month"
            name="DatePicker"
            value={selectedMonth}
            onChange={handleDatePickerChange}
            placeholder="Select date"
          />
        </div>
        <div className="w-full h-400 overflow-x-auto">
          <table className="table-auto border-collapse my-6 text-base w-full">
            <thead className="font-semibold bg-gray-800 text-white text-sm uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Reporter</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Words</th>
                <th className="px-4 py-3">Timeliness</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="overflow-scroll text-sm text-zinc-700 tracking-wide">
              {DoneTasks.map((task) => (
                <tr key={task.id}>
                  <td className="border px-4 py-3">{task.title}</td>
                  <td className="border px-4 py-3">{task.description}</td>
                  <td className="border px-4 py-3">
                    {
                      task.assignees.find((x) => x.roleId === "Reporter")
                        ?.userId
                    }
                  </td>
                  <td className="border px-4 py-3">
                    {task.type === 0 ? "Guest Post" : ""}
                    {task.type === 1 ? "Blog" : ""}
                  </td>
                  <td className="border px-4 py-3">{task.words}</td>
                  <td className="border px-4 py-3">
                  {task.status !== 4
                    ? "Pending"
                    : task.dateUpdated <= task.productionDeadline
                    ? "On time"
                    : "Past EOD"}
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
        <div className="place-self-center mb-5">
          <Stack spacing={20}>
            <Pagination
              count={Math.ceil(filteredDoneTask.length / tasksPerPage)}
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
        <ExportButton label="export all" data={data} />
      </div>
    </>
  );
}

export default CompletedArticle;
