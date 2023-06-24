import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import ExportIcon from '@mui/icons-material/FileDownloadOutlined';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CSVLink } from 'react-csv';
import { UserDetailList } from "../Types/UserDetailList";

export type exportButton = {
  label: string
}

export default function ExportUserSummaryButton({label}:exportButton) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userData, setUserData] = useState<UserDetailList[]>([])
//   const [completedTaskData, setCompletedTaskData] = useState<ProjectTask[]>([])
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/UserData/users/approved`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const userSummary = await res.json();
      setUserData(userSummary);
    };
    fetchData();
  }, []);

const columns = [
    { header: "ID", dataKey: "id", width: 10 },
    { header: "First Name", dataKey: "firstName", width: 30 },
    { header: "Middle Name", dataKey: "middleName", width: 30 },
    { header: "Last Name", dataKey: "lastName", width: 30 },
    { header: "Email", dataKey: "email", width: 40 },
    { header: "Role", dataKey: "roles", width: 20 },
    { header: "Status", dataKey: "status", width: 20 }, // Updated column
    ...userData.map((user) => ({
      header: user.id,
      dataKey: user.id,
      width: 20, // Adjust the width as per your requirement
    })),
];
  

  // EXPORT PDF
  const downloadPdf = () => {
    const doc = new jsPDF({ orientation: "landscape" })
    doc.text("User Task Summary", 14, 10)

    const tableData = userData.map((user, index) => ({
      ...user,
      id: index + 1, 
      status: "Done", // Set "Done" as the status for all rows
    }));
  
    autoTable(doc, {
      head: [["ID", "First Name", "Middle Name", "Last Name", "Email", "Role", "In Progress", "Completed Task", "Past EOD", "Status"]],
      columns: columns,
      body: tableData,
    });
    

    doc.save("UserTaskSummary.pdf")
    handleClose()
  }
  

 // EXPORT CSV
const usersTableData = userData.map((user, index) => ({
    ...user,
    id: index + 1, // Increment the ID based on the array index
  }));
  
  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "First Name", key: "firstname" },
    { label: "Middle Name", key: "middlename" },
    { label: "Last Name", key: "lastname" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
    { label: "In Progress", key: "inprogress" },
    { label: "Completed Task", key: "completedtask" },
    { label: "Past EOD", key: "pasteod" },
  ];
  
  const csvData = [
    ...usersTableData.map((user) => ({
      id: user.id,
      firstname: user.firstName,
      middlename: user.middleName,
      lastname: user.lastName,
      email: user.email,
      role: user.roles,
    //   inprogress: user.inProgress,
    //   completedtask: user.completedTask,
    //   pasteod: user.pastEod,
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
              filename="UsersTaskSummary.csv"
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