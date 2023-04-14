import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/joy/Typography';
import UpdateIcon from '../Assets/Images/edit-icon.svg'

function UpdateTask() {

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [client, setClient] = useState('');
  const [taskType, setTaskType] = useState('');
  const [words, setWords] = useState('');

  const handleTitle = (event: SelectChangeEvent) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event: SelectChangeEvent) => {
    setDescription(event.target.value);
  };

  const handleClient = (event: SelectChangeEvent) => {
    setClient(event.target.value);
  };

  const handleTask = (event: SelectChangeEvent) => {
    setTaskType(event.target.value);
  };

  const handleWords = (event: SelectChangeEvent) => {
    setWords(event.target.value);
  };

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
                      value={title}
                      onChange={handleTitle}
                      autoFocus required 
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input 
                      value={description}
                      onChange={handleDescription}
                      autoFocus required 
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Client</FormLabel>
                    <Input 
                      value={client}
                      onChange={handleClient}
                      autoFocus required 
                    />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120}} size="md">
                  <FormLabel id="demo-select-small" sx={{color: 'black' }}>Type</FormLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={taskType}
                    label="Contract"
                    onChange={handleTask}
                    sx={{ borderRadius: '7px', color: 'black' }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={4}>Blog</MenuItem>
                    <MenuItem value={9}>Guest Post</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Words</FormLabel>
                    <Input 
                      value={words}
                      onChange={handleWords}
                      autoFocus 
                      required 
                    />
                </FormControl>
                <Button type="submit">Submit</Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </div>
    </>
  );
}

export default UpdateTask