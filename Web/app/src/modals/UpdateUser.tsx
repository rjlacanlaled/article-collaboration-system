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
  const [user, setUser] = useState('');

  const handleUser = (event: SelectChangeEvent) => {
    setUser(event.target.value)
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
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setOpen(false);
              }}
            >
              <Stack spacing={2}>
              <FormControl sx={{ m: 1, minWidth: 120}} size="md">
                  <FormLabel id="demo-select-small" sx={{color: 'black' }}>Role</FormLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={user}
                    label="Contract"
                    onChange={handleUser}
                    sx={{ borderRadius: '7px', color: 'black' }}
                  >
                    <MenuItem value="3">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={8}>Member</MenuItem>
                    <MenuItem value={5}>Admin</MenuItem>
                    <MenuItem value={14}>Content Manager</MenuItem>
                    <MenuItem value={15}>Content Writer</MenuItem>
                    <MenuItem value={10}>SEO Manager</MenuItem>
                    <MenuItem value={13}>SEO Specialist</MenuItem>
                    <MenuItem value={12}>Web Developer</MenuItem>
                    <MenuItem value={7}>Client</MenuItem>
                  </Select>
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

export default UpdateUser