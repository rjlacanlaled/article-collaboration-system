import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import MenuItem from '@mui/material/MenuItem';
import UpdateIcon from '../Assets/Images/edit-icon.svg'
import Select, { SelectChangeEvent } from '@mui/material/Select';

function UpdateUser() {

  const [open, setOpen] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleUserRole = (e: SelectChangeEvent) => {
    setUserRole(e.target.value)
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
              Update User
            </Typography>
            <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
              Select the role of the user.
            </Typography>
            <form>
              <Stack spacing={2}>
              <FormControl sx={{ m: 1, minWidth: 120}} size="md">
                  <FormLabel sx={{color: 'black' }}>Role</FormLabel>
                  <Select
                    label="Role"
                    value={userRole}
                    onChange={handleUserRole}
                    sx={{ borderRadius: '7px', color: 'black' }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Member">Member</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Content Manager">Content Manager</MenuItem>
                    <MenuItem value="Content Writer">Content Writer</MenuItem>
                    <MenuItem value="SEO Manager">SEO Manager</MenuItem>
                    <MenuItem value="SEO Specialist">SEO Specialist</MenuItem>
                    <MenuItem value="Web Developer">Web Developer</MenuItem>
                    <MenuItem value="Client">Client</MenuItem>
                  </Select>
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

export default UpdateUser