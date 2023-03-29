import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Slide from '@mui/material/Slide';
import TaskData from '../Data/TaskData';

export default function TaskAssigned() {

    const [expanded, setExpanded] = React.useState(true);

    const handleAccordionChange = () => {
      setExpanded(!expanded);
    };

  return (
    <div className='p-2 w-full mt-10'>
      <Accordion expanded={expanded} onChange={handleAccordionChange} TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Details</Typography>
        </AccordionSummary>
         {TaskData.filter(task => task.id === 6).map((task) => ( 
            <Slide direction="up" in={expanded} mountOnEnter unmountOnExit>
            <div className='p-2 flex flex-col items-start h-550'>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>Assignee:</label>
                <div className='flex items-center ml-2'>
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael Gough"
                  />
                  <p>{task.assignee}</p>
                </div>    
              </div>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>Reporter:</label>
                <div className='flex items-center ml-2'>
                  <img 
                    className="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="Jese Leos" 
                  />
                  <p>{task.reporter}</p>
                </div>
              </div>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>Client:</label>
                <p>{task.client}</p>
              </div>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>Type:</label>
                <p>{task.type}</p>
              </div>
              <div className='flex items-center'>
                <label className='p-2 ml-2 font-semibold'>Words:</label>
                <p>{task.words}</p>
              </div>
            </div>
            </Slide>
        ))}
      </Accordion>
    </div>
  );
}