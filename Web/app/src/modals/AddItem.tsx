import React, { useState } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/joy/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DatePicker from "../Components/DatePicker";
import jwt_decode from "jwt-decode";
import { MyToken } from "../Components/Login";

interface myProps {
  updateHandler: any;
}

type ItemResult = {
  id: string;
};

function AddItem({ updateHandler }: myProps) {
  const [open, setOpen] = useState(false);

  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    link: "",
    type: "",
    words: "",
  });

  const handleChange = (e: any) => {
    setTaskData((prevTaskData) => {
      return {
        ...prevTaskData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleCreateTaskSubmit = async () => {
    var res = await fetch(`${process.env.REACT_APP_BASE_URL}/ProjectTasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: taskData.name,
        description: taskData.description,
        link: taskData.link,
        status: 0,
        type: taskData.type,
        words: taskData.words,
        timeliness: 0,
        contractId: -1,
      }),
    });

    const result: ItemResult = await res.json();
    console.log({ result });

    const user = jwt_decode<MyToken>(localStorage.getItem("token")!);

    console.log({ user });

    await fetch(`${process.env.REACT_APP_BASE_URL}/ProjectTaskAssignees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        projectTaskId: result.id,
        userEmail: user.email,
        roleName: "Reporter",
      }),
    });
    await updateHandler();
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="plain"
        color="neutral"
        size="sm"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        Add Item
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
          size="lg"
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Create new Task
          </Typography>
          <form>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={taskData.name}
                  onChange={handleChange}
                  autoFocus
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  name="description"
                  value={taskData.description}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Link</FormLabel>
                <Input
                  type="text"
                  name="link"
                  value={taskData.link}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="md">
                <FormLabel id="demo-select-small">Type</FormLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  type="text"
                  name="type"
                  value={taskData.type}
                  label="Type"
                  onChange={handleChange}
                  sx={{ borderRadius: "7px" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={0}>Blog</MenuItem>
                  <MenuItem value={1}>Guest Post</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Words</FormLabel>
                <Input
                  type="text"
                  name="words"
                  value={taskData.words}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Production Date</FormLabel>
                <DatePicker />
              </FormControl>
              <FormControl>
                <FormLabel>SEO Deadline</FormLabel>
                <DatePicker />
              </FormControl>
              <Button onClick={handleCreateTaskSubmit}>Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default AddItem;
