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
import jwt_decode from "jwt-decode";
import { MyToken } from "../Components/Login";

interface MyProps {
  updateHandler: any;
  isNewTaskSuccess: any;
}

type ItemResult = {
  id: string;
};

function CreateTask({ updateHandler, isNewTaskSuccess }: MyProps) {
  const [open, setOpen] = useState(false);

  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    link: "",
    type: 1,
    words: 0,
    productionDate: "",
    seoDeadline: "",
  });

  const handleChange = (e: any) => {
    setTaskData((prevTaskData) => {
      return {
        ...prevTaskData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleCreateTaskSubmit = async (e:any) => {
    console.log({ taskData });
    e.preventDefault()

    const productionDateTime = new Date(taskData.productionDate);
    productionDateTime.setHours(17, 0, 0);
    
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
        productionDate: productionDateTime.toISOString(),
        seoDeadline: new Date(taskData.seoDeadline).toISOString(),
      }),
    });

    const result: ItemResult = await res.json();
    const user = jwt_decode<MyToken>(localStorage.getItem("token")!);

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

    isNewTaskSuccess(true);
    await updateHandler();
    setOpen(false);
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
            <h3 className="text-zinc-800 group-hover:text-white text-sm font-semibold tracking-wider">
              New Task
            </h3>
          </div>
          <p className="text-zinc-600 group-hover:text-white text-sm tracking-wide">
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
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={taskData.name}
                  onChange={handleChange}
                  autoFocus
                  required
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
                  required
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
                <div className="flex items-center">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    </div>
                    <input
                      type="date"
                      name="productionDate"
                      value={taskData?.productionDate.toString()}
                      onChange={handleChange}
                      className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                      required
                    />
                  </div>
                </div>
              </FormControl>
              <FormControl>
                <FormLabel>SEO Deadline</FormLabel>
                <div className="flex items-center">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    </div>
                    <input
                      type="date"
                      name="seoDeadline"
                      value={taskData?.seoDeadline.toString()}
                      onChange={handleChange}
                      className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                      required
                    />
                  </div>
                </div>
              </FormControl>
              <Button onClick={handleCreateTaskSubmit}>Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default CreateTask;
