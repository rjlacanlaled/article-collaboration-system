import React, { useEffect, useState } from "react";
import { ProjectTask } from "./TaskList";
import { Link } from "react-router-dom";
import CheckIcon from "../Assets/Images/done-check.svg";
import DeleteComment from "../modals/DeleteComment";
import { UserDetailList } from "../Types/UserDetailList";
import { UserDetail } from "../Types/UserDetails";

interface MyProps {
  task: ProjectTask | null;
}

export type CommentDetails = {
  taskId: number;
  message: any;
  dateCreated: any;
  email: string;
  firstName: string;
  lastName: string;
  id: number;
};

export type CommentRaw = {
  id: number;
  dateCreated: Date;
  message: string;
  taskId: number;
  userId: string;
};

function TaskComment({ task }: MyProps) {
  const [userComment, setUserComment] = useState<UserDetailList[]>([]);
  const [commentData, setCommentData] = useState<CommentDetails[]>([]);
  const [comment, setComment] = useState({
    id: task?.id,
    taskId: task?.id || "",
    message: "",
    dateCreated: "",
  });

  const [user, setUser] = useState<UserDetail>(
    JSON.parse(localStorage.getItem("user")!)
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment((prevTaskData) => ({
      ...prevTaskData,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(comment.message);

  const getStatus = (status: any) => {
    switch (status) {
      case 0:
        return "bg-orange-500";
      case 1:
        return "bg-blue-500";
      case 2:
        return "bg-purple-500";
      case 3:
        return "bg-green-500";
      default:
        return "bg-green-500";
    }
  };

  const getStatusText = (status: any) => {
    switch (status) {
      case 0:
        return "To Do";
      case 1:
        return "In Progress";
      case 2:
        return "For Review";
      case 3:
        return "Completed";
      default:
        return (
          <div className="flex justify-center items-center">
            <div className="mr-1">Done</div>
            <img src={CheckIcon} alt="Done" className="w-4 h-4" />
          </div>
        );
    }
  };

  // GET COMMENTS
  const refreshData = async () => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:5143/api/v1/Comments/task/${comment.taskId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const commentsRaw: CommentRaw[] = await res.json();
      console.log({ commentsRaw });
      const populatedComments: CommentDetails[] = [];

      for (const commentRaw of commentsRaw) {
        console.log({ commentRaw });
        const res = await fetch(
          `http://localhost:5143/api/v1/UserData/email/${encodeURI(
            commentRaw.userId
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const populatedComment: UserDetail = await res.json();

        console.log({ populatedComment });

        populatedComments.push({
          taskId: commentRaw.taskId,
          message: commentRaw.message,
          dateCreated: commentRaw.dateCreated,
          email: populatedComment.user.email,
          firstName: populatedComment.user.firstName,
          lastName: populatedComment.user.lastName,
          id: commentRaw.id,
        });
      }

      console.log({ populatedComments });
      setCommentData(populatedComments);
    };

    fetchData();
  };

  useEffect(() => {
    refreshData();
    console.log({ user });
  }, []);

  // Handle Post Comment
  const handlePostCommentSubmit = async (e: any) => {
    e.preventDefault();
    await fetch("http://localhost:5143/api/v1/Comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        taskId: comment.taskId,
        message: comment.message,
        userId: user.user.email,
      }),
    });

    refreshData(); // Refresh the comment data after posting a comment
  };

  const getTimeDifference = (date: any) => {
    const currentDate = new Date();
    const commentDate = new Date(date);
    const timeDifference = Math.abs(
      currentDate.getTime() - commentDate.getTime()
    );

    const minuteInMillis = 60 * 1000;
    const hourInMillis = 60 * minuteInMillis;
    const dayInMillis = 24 * hourInMillis;
    const weekInMillis = 7 * dayInMillis;
    const monthInMillis = 30 * dayInMillis;

    if (timeDifference < minuteInMillis) {
      const seconds = Math.floor(timeDifference / 1000);
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    } else if (timeDifference < hourInMillis) {
      const minutes = Math.floor(timeDifference / minuteInMillis);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (timeDifference < dayInMillis) {
      const hours = Math.floor(timeDifference / hourInMillis);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (timeDifference < weekInMillis) {
      const days = Math.floor(timeDifference / dayInMillis);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (timeDifference < monthInMillis) {
      const weeks = Math.floor(timeDifference / weekInMillis);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else {
      const months = Math.floor(timeDifference / monthInMillis);
      return `${months} month${months > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div>
      <section className="bg-white p-2 h-fit">
        {/* comment section container */}
        <div className="h-fit p-4">
          <div className="flex justify-between items-center">
            <h1 className="mb-4 max-w-md lg:text-2xl font-bold text-slate-800">
              {task?.title}
            </h1>
            <p
              className={`${getStatus(
                task?.status
              )} rounded-lg p-1 px-2.5 mr-5 w-content text-center font-medium text-white`}
            >
              <button>{getStatusText(task?.status)}</button>
            </p>
          </div>
          <div className="mb-2">
            <label className="font-semibold text-zinc-800 tracking-wider">
              Description
            </label>
            <p className="text-slate-800">{task?.description}</p>
          </div>
          <div className="mb-2">
            <label className="font-semibold text-slate-800 text-sm mr-2 tracking-wide">
              Article Link:
            </label>
            {task?.link ? (
              <Link to={task.link} target="_blank">
                <button className="inline-flex items-center py-0.5 px-5 text-xs font-medium text-center text-white bg-purple-600 hover:bg-purple-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 tracking-wider">
                  Link
                </button>
              </Link>
            ) : (
              <button
                disabled
                className="inline-flex items-center py-0.5 px-5 text-xs font-medium text-center text-white bg-gray-400 rounded-lg tracking-wider"
              >
                Link
              </button>
            )}
          </div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-zinc-700">
              Discussion ({commentData.length})
            </h2>
          </div>
          {/* post comment section */}
          <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-gray-100 rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-100 dark:border-gray-700">
              <label htmlFor="comments" className="sr-only">
                Add a comment...
              </label>
              <textarea
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-gray-900 dark:placeholder-gray-900 dark:bg-gray-100"
                id="comments"
                name="message"
                value={comment.message}
                onChange={handleChange}
                placeholder="Add a comment..."
              />
            </div>
            <button
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900"
              onClick={handlePostCommentSubmit}
            >
              Post comment
            </button>
          </form>
          {/* all comments section */}
          {commentData
            .sort(
              (a: CommentDetails, b: CommentDetails) =>
                new Date(b.dateCreated).getTime() -
                new Date(a.dateCreated).getTime()
            )
            .map((comment: CommentDetails) => (
              <article
                className="p-6 mb-4 text-base bg-white rounded-lg dark:bg-gray-100 h-fit overflow-y-auto"
                key={comment.id}
              >
                <div>
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        <img
                          className="w-6 h-6 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                          alt="Michael Gough"
                        />
                      </p>
                      <p className="mr-3 font-semibold">
                        {comment.firstName + " " + comment.lastName}
                      </p>
                      <p className="text-sm text-zinc-500">
                        {getTimeDifference(comment.dateCreated)}
                      </p>
                    </div>
                  </footer>
                  <p className="text-zinc-700">{comment.message}</p>
                  <div className="flex justify-end items-center flex-row mt-4 space-x-2">
                    <DeleteComment
                      comment={comment}
                      updateHandler={refreshData}
                    />
                  </div>
                </div>
              </article>
            ))}
        </div>
      </section>
    </div>
  );
}

export default TaskComment;
