import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import {Textarea }from '@mui/joy';
import Typography from '@mui/joy/Typography';

function AddTask() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
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
            Create new project
          </Typography>
          <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
            Fill in the information of the project.
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
                    <Input autoFocus required />
                </FormControl>
                <FormControl>
                    <FormLabel>Client</FormLabel>
                    <Input autoFocus required />
                </FormControl>
                <FormControl>
                    <FormLabel>Type</FormLabel>
                    <Input autoFocus required />
                </FormControl>
                <FormControl>
                    <FormLabel>Words</FormLabel>
                    <Input autoFocus required />
                </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default AddTask