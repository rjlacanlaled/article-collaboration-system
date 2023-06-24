import React, { useState } from 'react'
import FormControl from "@mui/joy/FormControl";
import Button from "@mui/joy/Button";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { UserDetail } from '../Types/UserDetails';

interface profileData {
  user: UserDetail;
  isUpdateProfileSuccess: any;
  updateHandler: any;
}

function UpdateProfile({user, isUpdateProfileSuccess, updateHandler}: profileData) {
const [open, setOpen] = useState(false);

const [profileData, setProfileData] = useState({
  firstname: user.user.firstName,
  lastname: user.user.lastName,
  middlename: user.user.middleName,
})

const handleChange = (e: any) => {
    setProfileData((prevProfileData) => {
      return {
        ...prevProfileData,
        [e.target.name]: e.target.value,
      };
    });
  };

const updateProfileSubmit = async () => {
  await fetch(`${process.env.REACT_APP_BASE_URL}/UserData/details/update/email/${user.user.email}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      firstName: profileData.firstname,
      lastName: profileData.lastname,
      middleName: profileData.middlename,
    }),
  });
  setOpen(false);
  // await updateHandler()
  console.log("success")
  window.location.reload()
  // setProfileData(true)
  // isUpdateProfileSuccess(true)
}

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
                  name="firstname"
                  value={profileData?.firstname}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastname"
                  value={profileData?.lastname}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Middle Name</FormLabel>
                <Input
                  type="text"
                  name="middlename"
                  value={profileData?.middlename}
                  onChange={handleChange}
                />
              </FormControl>
              <Button onClick={updateProfileSubmit}>Update</Button>
            </Stack>
          </form> 
        </ModalDialog>
      </Modal>
    </>
  )
}

export default UpdateProfile