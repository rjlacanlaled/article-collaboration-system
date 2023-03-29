import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';

function AddSwimLaneList() {
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
          Create new task
        </Typography>
        <form>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                autoFocus
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                required
              />
            </FormControl>
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  </React.Fragment>
  );
}

export default AddSwimLaneList