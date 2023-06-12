import React, { useState } from 'react'
import FormControl from "@mui/joy/FormControl";
import Button from "@mui/joy/Button";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

interface roleData {
  isAddRoleSuccess: any;
}

function AddRole({isAddRoleSuccess}: roleData) {
const [open, setOpen] = useState(false);

const [role, setRole] = useState({
    role: "",
})

const handleChange = (e: any) => {
    setRole((prevTaskData) => {
      return {
        ...prevTaskData,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <>
        <button onClick={() => setOpen(true)} className='tracking-wide py-3 px-4 text-black shadow-lg bg-gray-300 hover:bg-gray-400 rounded-lg font-semibold text-sm'>Add a Role</button>
        <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
          size="lg"
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Add a Role
          </Typography>
          <form>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={role.role}
                  onChange={handleChange}
                  autoFocus
                />
              </FormControl>
              <Button>Add</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default AddRole