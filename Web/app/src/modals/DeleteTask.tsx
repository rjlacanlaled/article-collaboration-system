import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import DeleteIcon from "../Assets/Images/delete-icon.svg";
import { ProjectTask } from "../Components/TaskList";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface MyProps {
  task: ProjectTask;
  updateHandler: any;
}

export interface State extends SnackbarOrigin {
  open: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DeleteUser({ task, updateHandler }: MyProps) {
  const [open, setOpen] = useState(false);
  const [isDeleteSuccess, setDeleteSuccess] = useState(false);

  const handleDeleteTaskSubmit = async () => {
    try {
      await fetch(`http://localhost:5143/api/v1/ProjectTasks/id/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: task.id,
        }),
      });
      setDeleteSuccess(true);
      updateHandler();
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
  };

  const handleClose = () => {
    setDeleteSuccess(false);
  };

  return (
    <>
      <Button
        className="h-6"
        variant="solid"
        color="danger"
        size="sm"
        onClick={() => setOpen(true)}
      >
        <img src={DeleteIcon} alt="delete" className="h-4 w-4 mr-1.5" />
        Delete
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
          size="lg"
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Delete Task
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            textColor="text.tertiary"
          >
            Are you sure you want to delete this Task?
          </Typography>
          <form
            onSubmit={() => {
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                  color="neutral"
                  className="w-24"
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  className="w-24"
                  size="sm"
                  onClick={handleDeleteTaskSubmit}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
      {isDeleteSuccess && (
        <Snackbar
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={isDeleteSuccess}
          onClose={handleClose}
        >
          <Alert onClose={() => {}} severity="success">
            Successfully Deleted!
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default DeleteUser;
