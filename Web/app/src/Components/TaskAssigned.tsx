import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Slide from '@mui/material/Slide';
import TaskData from '../Data/TaskData.json';
import SelectUser from './SelectUser';

export default function TaskAssigned() {

    const [expanded, setExpanded] = useState(true);

    const handleAccordionChange = () => {
      setExpanded(!expanded);
    };

  return (
    <div className='p-2 w-full mt-7'>
      <Accordion expanded={expanded} onChange={handleAccordionChange} TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Details</Typography>
        </AccordionSummary>
         {TaskData.filter(task => task.id === 4).map((task) => ( 
            <Slide direction="up" in={expanded} mountOnEnter unmountOnExit>
            <div className='p-2 flex flex-col items-start h-content relative text-sm'>
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
                    src={task.userProfile}
                    alt="Jese Leos" 
                  />
                  <p>{task.reporter}</p>
                </div>
              </div>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>Type:</label>
                <p>{task.type}</p>
              </div>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>Words:</label>
                <p>{task.words}</p>
              </div>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>Timeliness:</label>
                  {task.timeliness.pending ? "Pending" : ""}
                  {task.timeliness.past_eod ? "Past EOD" : ""}
                  {task.timeliness.on_time ? "On Time" : ""}
              </div>
              <div className='absolute bottom-0 right-0 p-3 text-xs text-gray-500'>
                <p>SEO Deadline: April 04, 2023</p>
                <p>Prod Date: April 03, 2023 Monday PM</p>
              </div>
            </div>
            </Slide>
        ))}
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Contract Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className='flex flex-col items-start h-content text-sm'>
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
                <p className='bg-green-500 rounded-lg px-3 py-0.5 text-center'>Paid</p>
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