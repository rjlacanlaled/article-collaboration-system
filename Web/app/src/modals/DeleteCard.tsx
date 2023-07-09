import React, { useState } from 'react'
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import DeleteTaskCardIcon from "../Assets/Images/delete-taskcard.svg";
import Button from "@mui/joy/Button";
import { ProjectTask } from "../Components/TaskList";

interface MyProps {
    task: ProjectTask;
    updateHandler: any;
  }

function DeleteCard({ task, updateHandler}: MyProps) {

    const [open, setOpen] = useState(false);

    const handleDeleteTaskSubmit = async () => {
        try {
          await fetch(`${process.env.REACT_APP_BASE_URL}/ProjectTasks/id/${task.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              id: task.id,
            }),
          });
        updateHandler()
        window.location.reload();
        } catch (error) {
          console.error(error);
        } finally {
          setOpen(false);
        }
      };

  return (
    <>
        
      <img src={DeleteTaskCardIcon} alt="delete" className="h-6 w-6" onClick={() => setOpen(true)}/>
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
    </>
  )
}

export default DeleteCard