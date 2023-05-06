import React, { useState} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskData from "../Data/TaskData.json";
import DashboardPage from "../Pages/DashboardPage";
import EditableTitle from "./EditableTitle";
import AddBoard from "./AddBoard";
import BoardMenu from "./BoardMenu";
import TaskItems from "./TaskItems";
import AddSwimLaneList from "../modals/AddItem";

type Columns = {
  [key: string]: {
    title: string;
    items: {
      id: number;
      title: string;
      userProfile: string;
      prod_date: string;
      description: string;
    }[];
  };
};

const columnsFromBackend: Columns = {
  1: {
    title: "To do",
    items: TaskData.map((task) => ({ ...task, status: "To do" })),
  },
  2: {
    title: "In Progress",
    items: [],
  },
  3: {
    title: "For Review",
    items: [],
  },
  4: {
    title: "Completed",
    items: [],
  },
};

const onDragEnd = (result: any, columns: any, setColumns: any) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function KanbanBoard() {

  const [columns, setColumns] = useState(columnsFromBackend);

  // ADD BOARD
  const addBoard = (newBoardTitle: string) => {
    const newColumnId = Object.keys(columns).length + 1;
    const newColumn = {
      id: newColumnId,
      title: newBoardTitle,
      items: [],
    };
    const updatedColumns = {
      ...columns,
      [newColumnId]: newColumn,
    };
    setColumns(updatedColumns);
  };

  // DELETE BOARD
  const deleteBoard = (boardId: number) => {
    const filteredColumns = Object.keys(columns)
      .filter((columnId) => parseInt(columnId) !== boardId)
      .reduce((obj: Columns, columnId) => {
        obj[columnId] = columns[columnId];
        return obj;
      }, {});
    setColumns(filteredColumns);
  };

  return (
    <DashboardPage>
      <div className="h-content w-full flex justify-start flex-row items-center overflow-x-scroll scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 scrollbar-thin scroll-smooth bg-white p-6 h-content drop-shadow rounded-md m-4">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="w-72 h-700 bg-gray-200 shadow flex justify-start flex-col m-2 rounded-md relative"
                      >
                        <div className="p-1.5 flex justify-between">
                          <EditableTitle initialValue={column.title} />
                          <BoardMenu
                            onDelete={() => deleteBoard(parseInt(columnId))}
                          />
                        </div>
                        <div className="mb-14 w-content h-full bg-gray-200 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 scrollbar-thin scroll-smooth">
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={String(item.id)}
                                index={index}
                              >
                                {(provided) => {
                                  return (
                                    <TaskItems
                                      name={item.title}
                                      status={column.title}
                                      description={item.description}
                                      image={item.userProfile}
                                      prodDate={item.prod_date}
                                      provided={provided}
                                    />
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                        </div>
                        {provided.placeholder}
                        <div className="flex justify-start items-center bg-gray-200 absolute bottom-0 left-0 p-2 w-full">
                          <AddSwimLaneList />
                        </div>
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
          <div className="self-start">
            <AddBoard onAddBoard={addBoard} initialValue={""} />
          </div>
        </DragDropContext>
      </div>
    </DashboardPage>
  );
}

export default KanbanBoard;
