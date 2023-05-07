import React, { useState } from "react";
import AddIcon from "../Assets/Images/add-task.svg";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DatePicker from "./DatePicker";

function CreateTask() {
  const [open, setOpen] = useState(false);

  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    type: 1,
    words: 100,
  });

  const handleChange = (e: any) => {
    setTaskData((prevTaskData) => {
      return {
        ...prevTaskData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitCreateTask = async () => {
    await fetch("http://localhost:5143/api/v1/ProjectTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: taskData.name,
        description: taskData.description,
        status: 0,
        type: taskData.type,
        words: taskData.words,
        timeliness: 0,
        contractId: -1,
      }),
    });
  };

  return (
    <>
      <div>
        <p
          className="rounded-lg p-5 bg-white drop-shadow-md space-y-3 dark:hover:bg-slate-300 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center space-x-3">
            <img src={AddIcon} alt="add-task" className="h-6 w-6" />
            <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">
              New project
            </h3>
          </div>
          <p className="text-slate-500 group-hover:text-white text-sm">
            Create a new project from a variety of starting templates.
          </p>
        </p>
      </div>
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
              <FormControl sx={{ m: 1, minWidth: 120 }} size="md">
                <FormLabel id="demo-select-small">Type</FormLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  type="text"
                  name="type"
                  value={taskData.type}
                  label="Age"
                  onChange={handleChange}
                  sx={{ borderRadius: "7px" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={0}>Guest Post</MenuItem>
                  <MenuItem value={1}>Blog</MenuItem>
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
              <Button type="submit" onClick={onSubmitCreateTask}>
                Submit
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default CreateTask;
