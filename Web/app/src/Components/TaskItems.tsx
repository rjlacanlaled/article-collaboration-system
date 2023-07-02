import React, { useState, useEffect } from "react";
import { AvatarGroup, Avatar } from "@mui/material";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import TaskComment, { CommentDetails } from "./TaskComment";
import TaskAssigned from "./TaskAssigned";
import MessageIcon from '../Assets/Images/message-icon.svg'
import { ProjectTask } from "./TaskList";

type ListItemProps = {
  columnId: any;
  status: string;
  title: string;
  description: string;
  image: string;
  prodDate: number;
  createdAt: number,
  provided: any;
  task: ProjectTask;
};

export type commenDetails = {
  id: number;
  taskId: number;
  message: any;
  dateCreated: any;
}

function TaskItems({
  columnId,
  createdAt,
  title,
  description,
  prodDate,
  provided,
  task,
}: ListItemProps) {
  const [open, setOpen] = React.useState("");
  const [commentData, setCommentData] = useState<CommentDetails[]>([]);
  const [comment, setComment] = useState({
    id: task?.id,
    taskId: task?.id || "",
    message: "",
    dateCreated: "",
  });

  const [avatarCount, setAvatarCount] = useState({
    [task.id]: task.assignees.length, // get assignee avatar length per task id
  });

  useEffect(() => {
    console.log({ task });
  }, [task]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/Comments/task/${comment.taskId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const comments = await res.json();
      setCommentData(comments);
    };

    fetchData();
  };

  return (
    <>
      <div
        className="container w-auto min-h-24 max-h-34 h-auto overflow-hidden border hover:border-slate-500 hover:bg-slate-200 transition duration-300 ease-in-out bg-gray-100 text-slate-500 shadow rounded-md mx-2 my-1 p-1 flex justify-start items-center flex-wrap relative"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        onClick={() => setOpen("center")}
      >
        <div className="flex justify-center items-center flex-col tracking-wide w-full relative">
          <h4 className="text-sm font-semibold m-2 self-start max-w-195 tracking-wide">{title}</h4>
          <p className="text-xs mb-1 mx-1 p-1.5 self-start">{description}</p>
          <i className="text-xs my-1.5 mx-1 self-end tracking-wide">
            Production Date:{new Date(task.productionDeadline).toLocaleDateString()}
          </i>
          {/* MESSAGE ICON */}
          <img src={MessageIcon} alt="message-icon" className="absolute bottom-0 left-0 w-4 ml-2 mb-1" />
          <h4 className="absolute bottom-0 left-6 ml-0.5 mb-1 text-xs">{commentData.length}</h4>
        </div>

        <div className="p-2 absolute top-0 right-0">
          <AvatarGroup max={5}>
            {Array.from(Array(avatarCount[task.id] || 0).keys()).map((index) => (
              <Avatar
                key={index}
                alt={`Avatar ${index + 1}`}
                src={""}
                sx={{ width: 20, height: 20 }}
              />
            ))}
          </AvatarGroup>
        </div>
      </div>
      <Modal open={!!open} onClose={() => setOpen("")}>
        <ModalDialog
          aria-labelledby="layout-modal-title"
          aria-describedby="layout-modal-description"
        >
          <ModalClose />
          <div className="bg-white mx-auto sm:w-800 md:w-400 lg:w-1000 xl:w-1200 w-1500 h-700 flex justify-center items-center">
            <div className="w-full h-full overflow-y-auto">
              <TaskComment task={task} />
            </div>
            <div className="bg-white w-full h-full flex justify-start flex-col items-center">
              <TaskAssigned columnId={columnId} task={task} />
              <h2 className="absolute bottom-0 right-0 p-4 font-medium text-xs text-zinc-700 tracking-widest">
                Task Created: {new Date(createdAt).toDateString() + " at " + new Date(createdAt).toLocaleTimeString()}
              </h2>
            </div>
          </div>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default TaskItems;
