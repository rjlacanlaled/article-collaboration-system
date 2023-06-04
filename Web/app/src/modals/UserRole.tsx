import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import MenuItem from "@mui/material/MenuItem";
import UpdateIcon from "../Assets/Images/edit-icon.svg";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { UserDetail } from "../Components/AdminDashboard";

export type Role = {
  id: number;
  name: string;
};

interface MyUserRoleProps {
  user: UserDetail;
  updateHandler: any;
}

function UserRole({ user, updateHandler }: MyUserRoleProps) {
  const [open, setOpen] = useState(false);
  const [userRoles, setUserRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<number>(0);

  const handleUserRole = (e: SelectChangeEvent) => {
    setSelectedRole(parseInt(e.target.value));
  };

  const handleUserRoleSubmit = async () => {
    await fetch("http://localhost:5143/api/v1/UserRoles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        roleId: selectedRole,
      }),
    });
    await updateHandler();
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5143/api/v1/Roles/all");
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
          Select a role to proceed
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ maxWidth: 500 }}
            size="lg"
          >
            <Typography id="basic-modal-dialog-title" component="h2">
              User Role
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
                    type="text"
                    label="Role"
                    value={selectedRole.toString()}
                    onChange={handleUserRole}
                    required
                    sx={{ borderRadius: "7px", color: "black" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {userRoles.map((r) => (
                      <MenuItem value={r.id}>{r.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                  color="success"
                  className="w-full"
                  size="lg"
                  onClick={handleUserRoleSubmit}
                >
                  Approve
                </Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </div>
    </>
  );
}

export default UserRole;
