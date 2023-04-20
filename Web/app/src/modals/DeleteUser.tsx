import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import DeleteIcon from '../Assets/Images/delete-icon.svg'
import DataUser from '../Data/UserData.json'

function DeleteUser() {

  const [open, setOpen] = useState(false);

  const deleteUserById = (userId:number) => {
    const updatedUserList = DataUser.filter(user => user.id !== userId);
    console.log(updatedUserList); // You can save the updatedUserList to a state variable or update the original array as per your requirement.
  }

  return (
    <>
      <Button
        variant="solid"
        color="danger"
        size="sm"
        className='h-6'
        onClick={() => setOpen(true)}
      >
      <img src={DeleteIcon} alt="delete" className='h-4 w-4 mr-1.5'/>
        Delete
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
          size="lg"
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Delete User
          </Typography>
          <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
            Are you sure you want to delete this user?
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              deleteUserById(123); // Pass the ID of the user to delete
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button color="neutral" className='w-24' size='sm' onClick={() => setOpen(false)}>Cancel</Button>
                <Button color="danger" className='w-24' size='sm'>Delete</Button>
              </Stack>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default DeleteUser