import React, { useState } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/joy/Typography";
import UpdateIcon from "../Assets/Images/edit-icon.svg";
import { ProjectTask } from "../Components/TaskList";
import DatePicker from "../Components/DatePicker";

interface MyProps {
  task: ProjectTask;
  updateHandler: any;
  isUpdateSuccess: any;
}

function UpdateTask({ task, updateHandler, isUpdateSuccess }: MyProps) {
  const [open, setOpen] = useState(false);

  const [taskData, setTaskData] = useState<ProjectTask>({
    id: task.id,
    title: task.title,
    description: task.description,
    link: task.link,
    words: task.words,
    type: task.type,
    timeliness: task.timeliness,
    status: task.status,
    contractId: task.contractId,
    productionDeadline: task.productionDeadline,
    seoDeadline: task.seoDeadline,
    dateCreate: 0,
    dateUpdated: Date.now(),
    assignees: [],
    reporter: task.reporter,
  });

  const handleChange = (e: any) => {
    setTaskData((prevTaskData) => {
      return {
        ...prevTaskData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleUpdateTaskSubmit = async () => {
    console.log({ taskData, task });
    await fetch(
      `${process.env.REACT_APP_BASE_URL}/ProjectTasks/id/${task.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: taskData.title,
          description: taskData.description,
          link: taskData.link,
          status: taskData.status,
          type: taskData.type,
          words: taskData.words,
          timeliness: taskData.timeliness,
          contractId: taskData.contractId,
          productionDate: new Date(
            new Date(taskData.productionDeadline).setHours(17)
          ).toISOString(),
          seoDeadline: new Date(taskData.seoDeadline).toISOString(),
        }),
      }
    );
    isUpdateSuccess(true);
    await updateHandler();
    setOpen(false);
  };

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
              Update Task
            </Typography>
            <Typography
              id="basic-modal-dialog-description"
              textColor="text.tertiary"
            >
              Fill in the information of the Task.
            </Typography>
            <form>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    name="title"
                    value={taskData.title}
                    placeholder="Title"
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input
                    type="text"
                    name="description"
                    value={taskData.description}
                    placeholder="Description"
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
                    placeholder="Link"
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="md">
                  <FormLabel id="demo-select-small" sx={{ color: "black" }}>
                    Type
                  </FormLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    name="type"
                    value={taskData.type}
                    placeholder="Type"
                    label="Contract"
                    onChange={handleChange}
                    required
                    sx={{ borderRadius: "7px", color: "black" }}
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
                <Button onClick={handleUpdateTaskSubmit}>Submit</Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </div>
    </>
  );
}

export default UpdateTask;
