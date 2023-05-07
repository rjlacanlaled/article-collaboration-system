import React from "react";
import { AvatarGroup, Avatar } from "@mui/material";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import TaskComment from "./TaskComment";
import TaskAssigned from "./TaskAssigned";
import { ProjectTask } from "./TaskList";

type ListItemProps = {
  name: string;
  description: string;
  status: string;
  image: string;
  prodDate: string;
  provided: any;
  task: ProjectTask | null;
};

function TaskItems({
  name,
  description,
  status,
  image,
  prodDate,
  provided,
  task,
}: ListItemProps) {
  const [open, setOpen] = React.useState("");

  return (
    <>
      <div
        className="container w-auto min-h-24 max-h-34 h-auto overflow-hidden border-2 hover:border-slate-500 bg-gray-100 text-slate-500 shadow rounded-md mx-2 my-1 p-1 relative flex justify-start items-center flex-wrap"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        onClick={() => setOpen("center")}
      >
        <div className="flex justify-center items-center flex-col">
          <h4 className="text-sm m-2 self-start">{name}</h4>
          <p className="text-xs mb-1 mx-1">{description}</p>
          <i className="text-xs my-2 mx-1 self-end">
            Production Date:{prodDate}
          </i>
        </div>
        <div className="p-2 absolute top-0 right-0">
          <AvatarGroup>
            <Avatar alt="Avatar 1" src={image} sx={{ width: 20, height: 20 }} />
            <Avatar alt="Avatar 1" src={image} sx={{ width: 20, height: 20 }} />
          </AvatarGroup>
        </div>
      </div>
      <Modal open={!!open} onClose={() => setOpen("")}>
        <ModalDialog
          aria-labelledby="layout-modal-title"
          aria-describedby="layout-modal-description"
        >
          <ModalClose />
          <div className="bg-black mx-auto sm:w-800 md:w-400 lg:w-1000 xl:w-1200 w-1500 h-700 flex justify-center items-center">
            <div className="w-full h-full overflow-y-auto">
              <TaskComment task={task} />
            </div>
            <div className="bg-white w-full h-full flex justify-start flex-col items-center">
              <TaskAssigned />
              <h2 className="absolute bottom-0 right-0 p-4 font-medium text-xs text-gray-500">
                Created March 28, 2023 at 2:49 PM
              </h2>
            </div>
          </div>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default TaskItems;
