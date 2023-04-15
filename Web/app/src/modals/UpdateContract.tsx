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
import Select from '@mui/material/Select';

function UpdateContract() {
  const [open, setOpen] = useState(false);

  const [contractData, setContractData] = useState(
    {
      client: "",
      seo: "",
      payment: "",
      paymentStatus: "",
      contract: "",
      manage: ""
    }
  )

  const handleChange = (e: any) => {
    setContractData(prevContractData => {
      return {
        ...prevContractData,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = (e:any) => {
    e.preventDefault();
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
                  type="text"
                  name="client"
                  value={contractData.client}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </FormControl>
              <FormControl>
                <FormLabel>SEO</FormLabel>
                <Input
                  type="text"
                  name="seo"
                  value={contractData.seo}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120}} size="md">
                 <FormLabel id="demo-select-small" sx={{color: 'black' }}>Contract</FormLabel>
                 <Select
                   labelId="demo-select-small"
                   id="demo-select-small"
                   type="text"
                   name="contract"
                   value={contractData.contract}
                   label="Contract"
                   onChange={handleChange}
                   sx={{ borderRadius: '7px', color: 'black' }}
                 >
                   <MenuItem value="">
                     <em>None</em>
                   </MenuItem>
                   <MenuItem value="Open">Open</MenuItem>
                   <MenuItem value="6 Months">6 Months</MenuItem>
                   <MenuItem value="1 Year">1 Year</MenuItem>
                 </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120}} size="md">
                 <FormLabel id="demo-select-small" sx={{ color: 'black' }}>Payment</FormLabel>
                 <Select
                   labelId="demo-select-small"
                   id="demo-select-small"
                   type="text"
                   name="payment"
                   value={contractData.payment}
                   label="Payment"
                   onChange={handleChange}
                   sx={{ borderRadius: '7px', }}
                 >
                   <MenuItem value="">
                     <em>None</em>
                   </MenuItem>
                   <MenuItem value="Full Payment">Full Payment</MenuItem>
                   <MenuItem value="2 Months Advance">2 Months Advance</MenuItem>
                 </Select>
              </FormControl>
                 <FormControl sx={{ m: 1, minWidth: 120}} size="md">
                 <FormLabel id="demo-select-small" sx={{ color: 'black' }}>Payment Status</FormLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    type="text"
                    name="paymentStatus"
                    value={contractData.paymentStatus}
                    label="Payment"
                    onChange={handleChange}
                    sx={{ borderRadius: '7px', }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Paid">Paid</MenuItem>
                    <MenuItem value="Not Paid">Not Paid</MenuItem>
                  </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120}} size="md">
                 <FormLabel id="demo-select-small" sx={{ color: 'black' }}>Managed</FormLabel>
                 <Select
                   labelId="demo-select-small"
                   id="demo-select-small"
                   type="text"
                   name="manage"
                   value={contractData.manage}
                   label="Managed"
                   onChange={handleChange}
                   sx={{ borderRadius: '7px', }}
                 >
                   <MenuItem value="">
                     <em>None</em>
                   </MenuItem>
                   <MenuItem value="SearchWorks">SearchWorks</MenuItem>
                   <MenuItem value="Client">Client</MenuItem>
                 </Select>
              </FormControl>
              <Button onSubmit={handleSubmit}>Submit</Button>
            </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </div>
    </>
  );
}

export default UpdateContract