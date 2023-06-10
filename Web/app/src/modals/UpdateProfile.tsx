import React, { useState } from 'react'
import FormControl from "@mui/joy/FormControl";
import Button from "@mui/joy/Button";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

interface profileData {
  isUpdateProfileSuccess: any;
}

function UpdateProfile({isUpdateProfileSuccess}: profileData) {
const [open, setOpen] = useState(false);

const [profileData, setProfileData] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
})

const handleChange = (e: any) => {
    setProfileData((prevTaskData) => {
      return {
        ...prevTaskData,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <>
        <div className='bg-white w-fit self-end drop-shadow rounded-lg text-sm hover:bg-gray-100 duration-200'>
            <button onClick={() => setOpen(true)} className='tracking-wide py-2 px-2 text-zinc-700 hover:bg-zinc-100 rounded-lg'>Edit Profile</button>
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
          size="lg"
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Update Your Profile
          </Typography>
          <form>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={profileData.firstname}
                  onChange={handleChange}
                  autoFocus
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="description"
                  value={profileData.lastname}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Middle Name</FormLabel>
                <Input
                  type="text"
                  name="description"
                  value={profileData.middlename}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <Button>Update</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default UpdateProfile