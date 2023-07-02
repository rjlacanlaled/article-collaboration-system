import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DashboardPage from "../Pages/DashboardPage";
import EditableTitle from "./EditableTitle";
import ColumnMenu from "./BoardMenu";
import TaskItems from "./TaskItems";
import AddSwimLaneList from "../modals/AddItem";
import { ProjectTask } from "./TaskList";
import { UserLogin } from "../Types/UserLogin";
import { UserDetail } from "../Types/UserDetails";
import { MyToken } from "./Login";
import jwt_decode from "jwt-decode";
import { TabTitle } from "../utils/GeneralFunctions";

type Columns = {
  [key: string]: {
    title: string;
    items: ProjectTask[];
  };
};

const fetchUserDetail = async () => {
  const decodedToken = jwt_decode<MyToken>(localStorage.getItem("token")!);
  const userDetailReq = await fetch(
    `${process.env.REACT_APP_BASE_URL}/UserData/email/${encodeURIComponent(
      decodedToken.email
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")!}`,
      },
    }
  );

  const userDetail: UserDetail = await userDetailReq.json();

  return userDetail;
};

const onDragEnd = async (
  result: any,
  columns: Columns,
  setColumns: React.Dispatch<React.SetStateAction<Columns | null>>
) => {
  if (
    !result.destination ||
    result.destination.droppableId === result.source.droppableId
  )
    return;

  const updatedColumns = { ...columns };

  const sourceColumn = updatedColumns[result.source.droppableId];
  const destinationColumn = updatedColumns[result.destination.droppableId];

  const [removed] = sourceColumn.items.splice(result.source.index, 1);
  destinationColumn.items.splice(result.destination.index, 0, removed);

  const updatedTask = {
    ...removed,
    status: parseInt(result.destination.droppableId) - 1,
  };

  await fetch(
    `${process.env.REACT_APP_BASE_URL}/ProjectTasks/id/${updatedTask.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedTask),
    }
  );

  setColumns(updatedColumns);
};

function KanbanBoard({ userDetail, isSignedIn }: UserLogin) {
  const [columns, setColumns] = useState<Columns | null>(null);
  const [tasks, setTasks] = useState<ProjectTask[] | undefined | null>(null);
  const [user, setUser] = useState<UserDetail | null>(null);

  //Page Title
  TabTitle("Task Board - SearchWorks");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/ProjectTasks/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const resJson = await res.json();
      setTasks(resJson);

      const initialColumns: Columns = {
        1: {
          title: "To do",
          items: resJson.filter((task: ProjectTask) => task.status === 0),
        },
        2: {
          title: "In Progress",
          items: resJson.filter((task: ProjectTask) => task.status === 1),
        },
        3: {
          title: "For Review",
          items: resJson.filter((task: ProjectTask) => task.status === 2),
        },
        4: {
          title: "Completed",
          items: resJson.filter((task: ProjectTask) => task.status === 3),
        },
      };

      setColumns(initialColumns);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!userDetail) {
      const fetchUser = async () => {
        const userDetails = await fetchUserDetail();
        setUser(userDetails);
        console.log({ userDetails });
      };
      fetchUser();
    } else {
      setUser(user);
    }
  }, [userDetail]);

  return (
    <DashboardPage user={userDetail} isSignedIn={isSignedIn}>
      <div className="h-790 w-full flex justify-start flex-row items-center overflow-x-scroll scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 scrollbar-thin scroll-smooth bg-white p-6 h-content drop-shadow rounded-md m-4 mt-4 mb-0.5">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns!, setColumns)}
        >
          {columns &&
            Object.entries(columns).map(([columnId, column], index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="w-380 h-700 bg-gray-200 shadow flex justify-start flex-col m-2 rounded-md relative"
                    >
                      <div className="p-1.5 flex justify-between">
                        <EditableTitle
                          initialValue={column.title}
                          task={column.items}
                          columnId={columnId}
                        />
                        <ColumnMenu
                          columnId={columnId}
                          columnItems={column.items}
                          updateHandler={() => {
                            const fetchData = async () => {
                              const res = await fetch(
                                `${process.env.REACT_APP_BASE_URL}/ProjectTasks/all`,
                                {
                                  method: "GET",
                                  headers: {
                                    Authorization: `Bearer ${localStorage.getItem(
                                      "token"
                                    )}`,
                                  },
                                }
                              );
                              const resJson = await res.json();
                              setTasks(resJson);

                              const updatedColumns: Columns = {
                                ...columns,
                                [columnId]: {
                                  title: column.title,
                                  items: resJson.filter(
                                    (task: ProjectTask) =>
                                      task.status === parseInt(columnId) - 1
                                  ),
                                },
                              };

                              setColumns(updatedColumns);
                            };

                            fetchData();
                          }}
                        />
                      </div>
                      {/* BOARD ITEMS */}
                      <div className="mb-14 w-content h-full bg-gray-200 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 scrollbar-thin scroll-smooth">
                        {column.items.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={String(item.id)}
                            index={index}
                          >
                            {(provided) => (
                              <TaskItems
                                columnId={columnId}
                                title={item.title}
                                status={column.title}
                                description={item.description}
                                prodDate={item.dateCreate}
                                provided={provided}
                                image={""}
                                task={item}
                                createdAt={item.dateCreate}
                              />
                            )}
                          </Draggable>
                        ))}
                      </div>
                      {provided.placeholder}
                      <div className="flex justify-start items-center bg-gray-200 absolute bottom-0 left-0 p-2 w-full">
                        <AddSwimLaneList
                          updateHandler={() => {
                            const fetchData = async () => {
                              const res = await fetch(
                                `${process.env.REACT_APP_BASE_URL}/ProjectTasks/all`,
                                {
                                  method: "GET",
                                  headers: {
                                    Authorization: `Bearer ${localStorage.getItem(
                                      "token"
                                    )}`,
                                  },
                                }
                              );
                              const resJson = await res.json();
                              setTasks(resJson);

                              const updatedColumns: Columns = {
                                ...columns,
                                [columnId]: {
                                  title: column.title,
                                  items: resJson.filter(
                                    (task: ProjectTask) =>
                                      task.status === parseInt(columnId) - 1
                                  ),
                                },
                              };

                              setColumns(updatedColumns);
                            };

                            fetchData();
                          }}
                        />
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
        </DragDropContext>
      </div>
    </DashboardPage>
  );
}

export default KanbanBoard;
