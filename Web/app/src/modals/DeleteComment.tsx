import React, { useState } from 'react'
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import { CommentDetails } from '../Components/TaskComment';

interface MyProps {
    comment: CommentDetails;
    updateHandler: any;
}

function DeleteComment({comment, updateHandler}: MyProps) {
const [open, setOpen] = useState(false);

//Handle Delete
const handleDeleteCommentSubmit = async () => {
  try {
  await fetch(`http://localhost:5143/api/v1/Comments/id/${comment.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      id: comment.id
    }),
  });
  updateHandler()
  } catch (error) {
  console.error(error);
  } finally {
  setOpen(false);
  }
};

return (
    <>
    <button
      className="text-sm text-zinc-700 font-bold hover:underline"
      onClick={() => setOpen(true)}
    >
      Delete
    </button>
    <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
          size="lg"
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Delete Comment
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            textColor="text.tertiary"
          >
            Are you sure you want to delete this comment?
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
                  onClick={handleDeleteCommentSubmit}
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

export default DeleteComment