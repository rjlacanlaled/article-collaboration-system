import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import DeleteIcon from '../Assets/Images/delete-icon.svg'

function DeleteClient() {
  
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className='h-6'
        variant="solid"
        color="danger"
        size="sm"
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
            Delete Contract
          </Typography>
          <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
            Are you sure you want to delete this Contract?
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button color="neutral" className='w-24' size='sm'>Cancel</Button>
                <Button color="danger" className='w-24' size='sm'>Delete</Button>
              </Stack>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default DeleteClient