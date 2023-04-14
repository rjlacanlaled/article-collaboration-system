import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import UpdateIcon from '../Assets/Images/edit-icon.svg'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function UpdateContract() {
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState('');
  const [seo, setSeo] = useState('');
  const [payment, setPayment] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [contract, setContract] = useState('');
  const [manage, setManage] = useState('')

  const HandleClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClient(event.target.value)
  }

  const handleSeo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeo(event.target.value)
  }

  const handleContract = (event: SelectChangeEvent) => {
    setContract(event.target.value);
  };

  const handlePayment = (event: SelectChangeEvent) => {
    setPayment(event.target.value);
  };

  const handlePaymentStatus = (event: SelectChangeEvent) => {
    setPaymentStatus(event.target.value);
  };

  const handleManage = (event: SelectChangeEvent) => {
    setManage(event.target.value);
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
                <Input
                  autoFocus
                  value={client}
                  onChange={HandleClient}
                />
              </FormControl>
              <FormControl>
                <FormLabel>SEO</FormLabel>
                <Input
                  required
                  value={seo}
                  onChange={handleSeo}
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
                   value={payment}
                   label="Payment"
                   onChange={handlePayment}
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
                 <FormLabel id="demo-select-small" sx={{ color: 'black' }}>Payment Status</FormLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={paymentStatus}
                    label="Payment"
                    onChange={handlePaymentStatus}
                    sx={{ borderRadius: '7px', }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Paid</MenuItem>
                    <MenuItem value={0}>Not Paid</MenuItem>
                  </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120}} size="md">
                 <FormLabel id="demo-select-small" sx={{ color: 'black' }}>Managed</FormLabel>
                 <Select
                   labelId="demo-select-small"
                   id="demo-select-small"
                   value={manage}
                   label="Managed"
                   onChange={handleManage}
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
      </div>
    </>
  );
}

export default UpdateContract