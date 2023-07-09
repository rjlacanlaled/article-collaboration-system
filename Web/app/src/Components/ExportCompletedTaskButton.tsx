import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import ExportIcon from "@mui/icons-material/FileDownloadOutlined";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import { UserDetailList } from "../Types/UserDetailList";
import { ProjectTask } from "./TaskList";

export type exportButton = {
  label: string;
  data: UserDetailList[];
};

export default function ExportCompletedTaskButton({
  label,
  data,
}: exportButton) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [taskCompleted, setTaskCompleted] = useState<ProjectTask[]>([]);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/ProjectTasks/done`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const doneTask = await res.json();
      setTaskCompleted(doneTask);
    };
    fetchData();
  }, []);

  const columns = [
    { header: "Title", dataKey: "title" },
    { header: "Description", dataKey: "description" },
    { header: "Reporter", dataKey: "reporter" },
    { header: "Type", dataKey: "type" },
    { header: "Words", dataKey: "words" },
    { header: "Timeliness", dataKey: "timeliness" },
    { header: "Status", dataKey: "status" }, // Updated column
    ...taskCompleted.map((task) => ({
      header: task.title,
      dataKey: task.title,
    })),
  ];

  // EXPORT PDF
  const downloadPdf = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.text("Completed Task", 14, 10);

    const tableData = taskCompleted.map((task) => ({
      ...task,
      status: "Done", // Set "Done" as the status for all rows
    }));

    autoTable(doc, {
      head: [
        [
          "Title",
          "Description",
          "Reporter",
          "Type",
          "Words",
          "Timeliness",
          "Status",
        ],
      ],
      columns: columns,
      body: data,
    });

    doc.save("TaskCompleted.pdf");
    handleClose();
  };

  // EXPORT CSV
  const tableData = taskCompleted.map((task) => ({
    ...task,
    status: "Done", // Set "Done" as the status for all rows
  }));

  const csvHeaders = [
    { label: "Title", key: "title" },
    { label: "Description", key: "description" },
    { label: "Reporter", key: "reporter" },
    { label: "Type", key: "type" },
    { label: "Words", key: "words" },
    { label: "Timeliness", key: "timeliness" },
    { label: "Status", key: "status" },
  ];

  const csvData = [
    ...tableData.map((task) => ({
      title: task.title,
      description: task.description,
      type: task.type === 0 ? "Guest Post" : "Blog",
      words: task.words,
      timeliness:
        task.status !== "Done"
          ? "Pending"
          : task.status === "Done" &&
            task.dateUpdated <= task.productionDeadline
          ? "On time"
          : " Past EOD",
      status: task.status,
      reporter: task.assignees.find((x) => x.roleId === "Reporter")?.userId,
    })),
  ];

  return (
    <div>
      <Button
        id="fade-button"
        variant="contained"
        startIcon={<ExportIcon />}
        size="small"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {label}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <div className="m-2">
          <div className="text-center w-full hover:bg-gray-100 p-2">
            <label onClick={downloadPdf} className="cursor-pointer">
              PDF
            </label>
          </div>
          <div className="text-center w-full hover:bg-gray-100 p-2">
            <CSVLink
              data={csvData}
              headers={csvHeaders}
              filename="TaskCompleted.csv"
              target="_blank"
            >
              CSV
            </CSVLink>
          </div>
        </div>
      </Menu>
    </div>
  );
}
