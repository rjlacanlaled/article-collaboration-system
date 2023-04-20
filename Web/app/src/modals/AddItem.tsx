import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DatePicker from '../Components/DatePicker';

function AddItem() {

  const [open, setOpen] = useState(false);

  const [taskData, setTaskData] = useState(
    {
      name: "",
      description: "",
      type: "",
      words: ""
    }
  )

  const handleChange = (e:any) => {
    setTaskData(prevTaskData => {
      return {
          ...prevTaskData,
          [e.target.name]: e.target.value
      }
    }) 
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
    <Button
      variant="plain"
      color="neutral"
      size="sm"
      startDecorator={<Add />}
      onClick={() => setOpen(true)}
    >
      Add Item
    </Button>
    <Modal open={open} onClose={() => setOpen(false)}>
       <ModalDialog
         aria-labelledby="basic-modal-dialog-title"
         aria-describedby="basic-modal-dialog-description"
         sx={{ maxWidth: 500 }}
         size="lg"
       >
         <Typography id="basic-modal-dialog-title" component="h2">
           Create new Task
         </Typography>
         <form onSubmit={handleSubmit}>
           <Stack spacing={2}>
             <FormControl>
               <FormLabel>Name</FormLabel>
               <Input
                  type="text"
                  name="name"
                  value={taskData.name}
                  onChange={handleChange}
                  autoFocus
               />
             </FormControl>
             <FormControl>
               <FormLabel>Description</FormLabel>
               <Input
                  type="text"
                  name="description"
                  value={taskData.description}
                  onChange={handleChange}
                  required
               />
             </FormControl>
             <FormControl sx={{ m: 1, minWidth: 120}} size="md">
                <FormLabel id="demo-select-small">Type</FormLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  type="text"
                  name="type"
                  value={taskData.type}
                  label="Age"
                  onChange={handleChange}
                  sx={{ borderRadius: '7px' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Blog">Blog</MenuItem>
                  <MenuItem value="Guest Post">Guest Post</MenuItem>
                </Select>
             </FormControl>
             <FormControl>
               <FormLabel>Words</FormLabel>
               <Input
                  type="text"
                  name="words"
                  value={taskData.words}
                  onChange={handleChange}
                  required
               />
             </FormControl>
              <FormControl>
                <FormLabel>Production Date</FormLabel>
                <DatePicker/>
              </FormControl>
              <FormControl>
                <FormLabel>SEO Deadline</FormLabel>
                <DatePicker/>
              </FormControl>
             <Button>Submit</Button>
           </Stack>
         </form>
       </ModalDialog>
      </Modal>
  </>
  );
}

export default AddItem