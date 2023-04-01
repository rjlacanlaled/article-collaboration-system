import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import UpdateIcon from '../Assets/Images/edit-icon.svg'

function UpdateClient() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className='mr-2'>
      <React.Fragment>
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
              Update Contract
            </Typography>
            <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
              Fill in the information of the contract.
            </Typography>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setOpen(false);
              }}
            >
              <Stack spacing={2}>
                <FormControl>
                    <FormLabel>Client</FormLabel>
                    <Input autoFocus required />
                </FormControl>
                <FormControl>
                    <FormLabel>SEO</FormLabel>
                    <Input autoFocus required />
                </FormControl>
                <FormControl>
                    <FormLabel>Contract Type</FormLabel>
                    <Input autoFocus required />
                </FormControl>
                <FormControl>
                    <FormLabel>Payment Plan</FormLabel>
                    <Input autoFocus required />
                </FormControl>
                <FormControl>
                    <FormLabel>Managed by</FormLabel>
                    <Input autoFocus required />
                </FormControl>
                <Button type="submit">Submit</Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    </div>
  );
}

export default UpdateClient