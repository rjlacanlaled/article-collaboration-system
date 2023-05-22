import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Slide from '@mui/material/Slide';
import SelectUser from './SelectUser';
import { ProjectTask } from "./TaskList";

interface MyProps {
  task: ProjectTask | null;
}

export default function TaskAssigned({ task }: MyProps) {

    const [detailsExpand, setDetailsExpanded] = useState(true);

    const handleAccordionChange = () => {
      setDetailsExpanded(!detailsExpand);
    };

  return (
    <div className='p-2 w-full mt-7'>
      <Accordion expanded={detailsExpand} onChange={handleAccordionChange} TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Details</Typography>
        </AccordionSummary>
            <Slide direction="up" in={detailsExpand} mountOnEnter unmountOnExit>
            <div className='p-2 flex flex-col items-start h-content relative text-sm text-slate-800'>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>Assignee:</label>
                <div className='flex items-center ml-2'>
                  <SelectUser/>
                </div>    
              </div>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>Reporter:</label>
                <div className='flex items-center ml-2'>
                  <img 
                    className="mr-2 w-6 h-6 rounded-full"
                    src={''}
                    alt="Jese Leos" 
                  />
                  <p>{task?.id}</p>
                </div>
              </div>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>Type:</label>
                <p>{task?.type === 0 ? "Guest Post" : ""}</p>
                <p>{task?.type === 1 ? "Blog" : ""}</p>
              </div>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>Words:</label>
                <p>{task?.words}</p>
              </div>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>Timeliness:</label>
                  {task?.timeliness ? "Pending" : ""}
                  {task?.timeliness ? "Past EOD" : ""}
                  {task?.timeliness ? "On Time" : ""}
              </div>
              <div className='absolute bottom-0 right-0 p-3 text-xs text-gray-500'>
                <p>SEO Deadline: April 04, 2023</p>
                <p>Prod Date: April 03, 2023 Monday PM</p>
              </div>
            </div>
            </Slide>
      </Accordion>
      <Accordion expanded={detailsExpand} onChange={handleAccordionChange} TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Contract Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className='flex flex-col items-start h-content text-sm text-slate-800'>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>Client:</label>
                <div className='flex items-center ml-2'>
                    <SelectUser />
                </div>    
              </div>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>SEO:</label>
                <div className='flex items-center ml-2'>
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael Gough"
                  />
                  <p>JR</p>
                </div>    
              </div>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>Contract Type:</label>
                <p>6 months</p>
              </div>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>Payment Plan:</label>
                <div className='flex items-center ml-2'>
                  <p>2 Months</p>
                </div>
              </div>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>Payment Status:</label>
                <p className='bg-green-500 text-white rounded-lg px-3 py-0.5 text-center'>Paid</p>
              </div>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>Managed By:</label>
                <p>SearchWork</p>
              </div>
            </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}