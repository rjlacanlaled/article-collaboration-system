import React from 'react'
import AddIcon from '../Assets/Images/add-task.svg'
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';


function CreateContract() {

  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState('');
  const [contract, setContract] = React.useState('');

  const handleContract = (event: SelectChangeEvent) => {
    setContract(event.target.value);
  };

  const handleType = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };


  return (
    <>
        <p className="rounded-lg p-5 bg-white drop-shadow-md space-y-3 dark:hover:bg-slate-300 cursor-pointer" onClick={() => setOpen(true)}>
          <div className="flex items-center space-x-3">
            <img src={AddIcon} alt="add-task" className='h-6 w-6'/>
            <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">Create Contract</h3>
          </div>
        </p>
       <Modal open={open} onClose={() => setOpen(false)}>
       <ModalDialog
         aria-labelledby="basic-modal-dialog-title"
         aria-describedby="basic-modal-dialog-description"
         sx={{ maxWidth: 500 }}
         size="lg"
       >
         <Typography id="basic-modal-dialog-title" component="h2">
           Create new Contract
         </Typography>
         <form>
           <Stack spacing={2}>
             <FormControl>
               <FormLabel>Client</FormLabel>
               <Input
                 autoFocus
               />
             </FormControl>
             <FormControl>
               <FormLabel>SEO</FormLabel>
               <Input
                 required
               />
             </FormControl>
             <FormControl sx={{ m: 1, minWidth: 120}} size="md">
                <FormLabel id="demo-select-small" sx={{color: 'black' }}>Contract</FormLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={contract}
                  label="Contract"
                  onChange={handleContract}
                  sx={{ borderRadius: '7px', color: 'black' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={4}>Open</MenuItem>
                  <MenuItem value={7}>6 Months</MenuItem>
                  <MenuItem value={5}>1 Year</MenuItem>
                </Select>
             </FormControl>
             <FormControl sx={{ m: 1, minWidth: 120}} size="md">
                <FormLabel id="demo-select-small" sx={{ color: 'black' }}>Payment</FormLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={type}
                  label="Payment"
                  onChange={handleType}
                  sx={{ borderRadius: '7px', }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={11}>Full Payment</MenuItem>
                  <MenuItem value={14}>2 Months Advance</MenuItem>
                </Select>
             </FormControl>
             <FormControl sx={{ m: 1, minWidth: 120}} size="md">
                <FormLabel id="demo-select-small" sx={{ color: 'black' }}>Managed</FormLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={type}
                  label="Managed"
                  onChange={handleType}
                  sx={{ borderRadius: '7px', }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>SearchWorks</MenuItem>
                  <MenuItem value={20}>Client</MenuItem>
                </Select>
             </FormControl>
             <Button type="submit">Submit</Button>
           </Stack>
         </form>
       </ModalDialog>
      </Modal>  
    </>
  )
}

export default CreateContract