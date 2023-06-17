import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import ExportIcon from '@mui/icons-material/FileDownloadOutlined';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CSVLink } from 'react-csv';

export type exportButton = {
  label: string
}

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

export default function ExportButton({label}:exportButton) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [taskCompleted, setTaskCompleted] = useState<ProjectTask[]>([])
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  useEffect (() => {
    const fetchData = async () => {
        const res = await fetch("http://localhost:5143/api/v1/ProjectTasks/done");
        const doneTask = await res.json();
        setTaskCompleted(doneTask)
    };
    fetchData();
  }, [])

  const columns = [
    { header: "ID", dataKey: "id" },
    { header: "Title", dataKey: "title" },
    { header: "Description", dataKey: "description" },
    { header: "Client", dataKey: "client" },
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
    const doc = new jsPDF()
    doc.text("Completed Task", 14, 10)

    const tableData = taskCompleted.map((task) => ({
      ...task,
      status: "Done", // Set "Done" as the status for all rows
    }));
  
    autoTable(doc, {
      head: [["ID", "Title", "Description", "Client", "Type", "Words", "Timeliness", "Status"]],
      columns: columns,
      body: tableData,
    });
    

    doc.save("TaskCompleted.pdf")
    handleClose()
  }

  // EXPORT CSV
    const tableData = taskCompleted.map((task) => ({
      ...task,
      status: "Done", // Set "Done" as the status for all rows
    }));
  
    const csvHeaders = [
      { label: "ID", key: "id" },
      { label: "Title", key: "title" },
      { label: "Description", key: "description" },
      { label: "Client", key: "client" },
      { label: "Type", key: "type" },
      { label: "Words", key: "words" },
      { label: "Timeliness", key: "timeliness" },
      { label: "Status", key: "status" },
    ];
  
    const csvData = [
      ...tableData.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        type: task.type,
        words: task.words,
        timeliness: task.timeliness,
        status: task.status,
      })),
    ];

  return (
    <div>
      <Button
        id="fade-button"
        variant="contained"
        startIcon={<ExportIcon/> }
        size="small"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {label}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <div className='m-2'>
          <div className='text-center w-full hover:bg-gray-100 p-2'>
            <label onClick={downloadPdf} className='cursor-pointer'>PDF</label>
          </div>
          <div className='text-center w-full hover:bg-gray-100 p-2'>
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