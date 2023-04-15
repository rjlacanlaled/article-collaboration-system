import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/joy/Typography';
import UpdateIcon from '../Assets/Images/edit-icon.svg'

function UpdateTask() {

  const [open, setOpen] = useState(false);

  const [taskData, setTaskData] = useState (
    {
      title: "",
      description: "",
      client: "",
      words: "",
      type: ""
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

  const handleSubmit = (e:any) => {
    e.preventDefault();
  }

  return (
    <>
      <div className='mr-2'>
        <Button
          variant="solid"
          color="primary"
          size='sm'
          onClick={() => setOpen(true)}
        >
        <img src={UpdateIcon} alt="update" className='h-4 w-4 mr-1.5'/>
          Update
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ maxWidth: 500 }}
            size="lg"
          >
            <Typography id="basic-modal-dialog-title" component="h2">
              Update Task
            </Typography>
            <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
              Fill in the information of the Task.
            </Typography>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setOpen(false);
              }}
            >
              <Stack spacing={2}>
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input 
                      type="text"
                      name="title"
                      value={taskData.title}
                      onChange={handleChange}
                      autoFocus required 
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input 
                      type="text"
                      name="description"
                      value={taskData.description}
                      onChange={handleChange}
                      autoFocus required 
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Client</FormLabel>
                    <Input
                      type="text"
                      name="client" 
                      value={taskData.client}
                      onChange={handleChange}
                      autoFocus required 
                    />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120}} size="md">
                  <FormLabel id="demo-select-small" sx={{color: 'black' }}>Type</FormLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    name="type"
                    value={taskData.type}
                    label="Contract"
                    onChange={handleChange}
                    sx={{ borderRadius: '7px', color: 'black' }}
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
                      autoFocus required 
                    />
                </FormControl>
                <Button onSubmit={handleSubmit}>Submit</Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </div>
    </>
  );
}

export default UpdateTask