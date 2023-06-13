import React, { useState } from "react";
import { ProjectTask } from "./TaskList";
import { Link } from 'react-router-dom';
import CheckIcon from '../Assets/Images/done-check.svg'

interface MyProps {
  task: ProjectTask | null;
}

function TaskComment({ task }: MyProps) {
  const [comment, setComment] = useState("");

  const handleComment = (event: any) => {
    setComment(event.target.value);
  };

  
  const getStatus = (status:any) => { 
    switch(status) {
      case 0:
        return 'bg-orange-500';
      case 1:
        return 'bg-blue-500';
      case 2:
        return 'bg-purple-500';
      case 3:
        return 'bg-green-500';
      default:
        return 'bg-green-500';
    }
  }
  
  const getStatusText = (status:any) => {
    switch(status) {
      case 0:
        return 'To Do';
      case 1:
        return 'In Progress';
      case 2:
        return 'For Review';
      case 3:
        return 'Completed';
      default:
        return (
          <div className="flex justify-center items-center">
            <div className="mr-1">Done</div>
          <img src={CheckIcon} alt="Done" className="w-4 h-4" />
          </div>
        )
    }
  }

  return (
    <div>
      <section className="bg-white p-2 h-fit">
        {/* comment section container */}
        <div className="h-fit p-4">
          <div className="flex justify-between items-center">
            <h1 className="mb-4 max-w-md lg:text-2xl font-bold text-slate-800">
              {task?.title}
            </h1>
            <p className={`${getStatus(task?.status)} rounded-lg p-1 px-2.5 mr-5 w-content text-center font-medium text-white`}>
              <button>{getStatusText(task?.status)}</button>
            </p>
          </div>
          <div className="mb-2">
            <label className="font-semibold text-zinc-800 tracking-wider">Description</label>
            <p className="text-slate-800">{task?.description}</p>
          </div>
          <div className="mb-2">
            <label className="font-semibold text-slate-800 text-sm mr-2 tracking-wide">Article Link:</label>
            <Link to={task?.link} target="_blank">
              <button className="inline-flex items-center py-0.5 px-5 text-xs font-medium text-center text-white bg-purple-600 hover:bg-purple-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 tracking-wider">
                Link
              </button>
            </Link>
          </div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-zinc-700">
              Discussion (1)
            </h2>
          </div>
          {/* post comment section */}
          <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-gray-100 rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-100 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Add a comment...
              </label>
              <textarea
                id="comment"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-gray-900 dark:placeholder-gray-900 dark:bg-gray-100"
                value={comment}
                onChange={handleComment}
                placeholder="Add a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900"
            >
              Post comment
            </button>
          </form>
          {/* all comments section */}
          <article className="p-6 mb-4 text-base bg-white rounded-lg dark:bg-gray-100 h-fit overflow-y-auto">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img
                    className="w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael Gough"
                  />
                </p>
                <p className="mr-3 font-semibold">bryansaguit</p>
                <p className="text-sm text-zinc-500">
                  1 Hour Ago.
                </p>
              </div>
            </footer>
            <p className="text-zinc-700">
              Very straight-to-point article. Really worth time reading. Thank
              you! But tools are just the instruments for the UX designers. 
            </p>
            <div className="flex justify-end items-center flex-row mt-4 space-x-2">
              <button
                type="button"
                className="text-sm text-zinc-700 font-bold hover:underline"
              >
                Delete
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default TaskComment;
