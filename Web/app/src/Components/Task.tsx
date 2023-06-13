import React from "react";
import { AvatarGroup, Avatar } from "@mui/material";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import TaskComment from "./TaskComment";
import TaskAssigned from "./TaskAssigned";

type TaskProps = {
    task: any,
    title: any,
    description: string,
    prodDate: string,
    index: any
    provided: any;
    type: any;
    Words: any;
    timeliness: any;
}

function Task({task, title, description, prodDate, provided}: TaskProps) {
    
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
              <h4 className="text-sm m-2 self-start">{title}</h4>
              <p className="text-xs mb-1 mx-1">{description}</p>
              <i className="text-xs my-2 mx-1 self-end">
                Production Date: {prodDate}
              </i>
            </div>
            <div className="p-2 absolute top-0 right-0">
              <AvatarGroup>
                <Avatar alt="Avatar 1" src={"https://joesch.moe/api/v1/random?key="} sx={{ width: 20, height: 20 }} />
                <Avatar alt="Avatar 1" src={"https://joesch.moe/api/v1/random?key="} sx={{ width: 20, height: 20 }} />
                <Avatar alt="Avatar 1" src={"https://joesch.moe/api/v1/random?key="} sx={{ width: 20, height: 20 }} />
              </AvatarGroup>
            </div>
            <Modal open={!!open} onClose={() => setOpen("")}>
                <ModalDialog
                aria-labelledby="layout-modal-title"
                aria-describedby="layout-modal-description"
            >
                  <ModalClose />
                  <div className="bg-black mx-auto sm:w-800 md:w-400 lg:w-1000 xl:w-1200 w-1500 h-700 flex justify-center items-center">
                    <div className="w-full h-full overflow-y-auto">
                      <TaskComment task={task.status} />
                    </div>
                    <div className="bg-white w-full h-full flex justify-start flex-col items-center">
                      <TaskAssigned task={task.status}/>
                      <h2 className="absolute bottom-0 right-0 p-4 font-medium text-xs text-gray-500">
                          {task=task.status}
                      </h2>
                    </div>
                  </div>
                </ModalDialog>
            </Modal>
        </div>      
    </>
  )
}

export default Task