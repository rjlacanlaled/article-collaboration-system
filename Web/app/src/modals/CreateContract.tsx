import React, { useState } from 'react'
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
import Select from '@mui/material/Select';


function CreateContract() {

  const [open, setOpen] = useState(false);
  const [contractData, setContractData] = useState(
    {
      client: "",
      seo: "",
      contract: "",
      payment: "",
      paymentStatus: "",
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
        <div className="rounded-lg p-5 bg-white drop-shadow-md space-y-3 dark:hover:bg-slate-300 cursor-pointer" onClick={() => setOpen(true)}>
          <div className="flex items-center space-x-3">
            <img src={AddIcon} alt="add-task" className='h-6 w-6'/>
            <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">Create Contract</h3>
          </div>
        </div>
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
                  type="text"
                  name="client"
                  value={contractData.client}
                  onChange={handleChange}
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
                  <MenuItem value="2 months Advance">2 Months Advance</MenuItem>
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
                    label="PaymentStatus"
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
                  <MenuItem value="Client ">Client</MenuItem>
                </Select>
             </FormControl>
             <Button onSubmit={handleSubmit}>Submit</Button>
           </Stack>
         </form>
       </ModalDialog>
      </Modal>  
    </>
  )
}

export default CreateContract