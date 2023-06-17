import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import UserRole from "./UserRole";
import { UserDetail } from "../Types/UserDetails";

interface MyProps {
  user: UserDetail;
  updateHandler: any;
}

function ApproveUser({ user, updateHandler }: MyProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="solid"
        color="success"
        size="sm"
        className="h-6"
        onClick={() => setOpen(true)}
      >
        Approve
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
          size="lg"
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Approve User
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            textColor="text.tertiary"
          >
            Are you sure you want to approve this user?
          </Typography>
          <form
            onSubmit={() => {
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="center" spacing={2}>
                <Button
                  color="neutral"
                  className="w-24"
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <UserRole user={user} updateHandler={updateHandler} />
              </Stack>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default ApproveUser;
