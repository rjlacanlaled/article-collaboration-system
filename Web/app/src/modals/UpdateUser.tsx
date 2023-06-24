import React, { useState, useEffect } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import MenuItem from "@mui/material/MenuItem";
import UpdateIcon from "../Assets/Images/edit-icon.svg";
import Select from "@mui/material/Select";
import { UserDetailList } from "../Types/UserDetailList";

// export type Role = {
//   id: number;
//   name: string;
// };

interface MyUserRoleProps {
  user: UserDetailList;
  updateHandler: any;
}

function UpdateUser({ user, updateHandler }: MyUserRoleProps) {
  const [open, setOpen] = useState(false);
  const [userRoles, setUserRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState<number>(0);

  const handleUserRole = (e: any) => {
    setSelectedRole((e.target.value));
  };

  //UPDATE USER ROLES BY EMAIL
  const handleUserRoleSubmit = async () => {
    console.log({ user });
    await fetch(`${process.env.REACT_APP_BASE_URL}/UserData/role/update/email/${user.email}/role/${selectedRole}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        userEmail: user.email,
        roleId: user.roles,
      }),
     
    });
    console.log(selectedRole)
    await updateHandler();
    setOpen(false);
  };

  //GET ALL USER ROLES
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/Setup/roles/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
      const roles = await res.json();
      setUserRoles(roles);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="mr-2">
        <Button
          variant="solid"
          color="primary"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <img src={UpdateIcon} alt="update" className="h-4 w-4 mr-1.5" />
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
              Update User
            </Typography>
            <Typography
              id="basic-modal-dialog-description"
              textColor="text.tertiary"
            >
              Select the role of the user.
            </Typography>
            <form>
              <Stack spacing={2}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="md">
                  <FormLabel sx={{ color: "black" }}>Role</FormLabel>
                  <Select
                    label="Role"
                    value={selectedRole}
                    onChange={handleUserRole}
                    sx={{ borderRadius: "7px", color: "black" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {userRoles.map((r) => (
                      <MenuItem key={r} value={r}>{r}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button onClick={handleUserRoleSubmit}>Submit</Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </div>
    </>
  );
}

export default UpdateUser;
