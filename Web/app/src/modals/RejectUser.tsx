import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

function RejectUser() {

  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="solid"
        color="danger"
        size="sm"
        className='h-6'
        onClick={() => setOpen(true)}
      >
        Reject
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
          size="lg"
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Reject User
          </Typography>
          <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
            Are you sure you want to reject this user?
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
                <Button color="danger" className='w-24' size='sm'>Reject</Button>
              </Stack>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default RejectUser