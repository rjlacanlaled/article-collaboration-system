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
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DatePicker from '../Components/DatePicker';

function AddSwimLaneList() {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState('');

  const handleType = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

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
         <form>
           <Stack spacing={2}>
             <FormControl>
               <FormLabel>Name</FormLabel>
               <Input
                 autoFocus
               />
             </FormControl>
             <FormControl>
               <FormLabel>Description</FormLabel>
               <Input
                 required
               />
             </FormControl>
             <FormControl sx={{ m: 1, minWidth: 120}} size="md">
                <FormLabel id="demo-select-small">Type</FormLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={type}
                  label="Age"
                  onChange={handleType}
                  sx={{ borderRadius: '7px' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Blog</MenuItem>
                  <MenuItem value={20}>Guest Post</MenuItem>
                </Select>
             </FormControl>
             <FormControl>
               <FormLabel>Words</FormLabel>
               <Input
                 required
               />
             </FormControl>
              <FormControl>
                <FormLabel>Production Date</FormLabel>
                <DatePicker/>
              </FormControl>
              <FormControl>
                <FormLabel>SEO Deadline</FormLabel>
                <DatePicker/>
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