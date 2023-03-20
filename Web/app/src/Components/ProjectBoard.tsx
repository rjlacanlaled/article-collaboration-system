import React, { useState } from 'react'
import Data from '../Data/Data';
import { AvatarGroup, Avatar } from '@mui/material';
import AddIcon from '../Assets/Images/plus-icon.svg'
import Board from './Board';
import DashboardPage from '../Pages/DashboardPage';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const columnsFromBackend = {
  1: {
    name: "To do",
    items: Data
  },
  2: {
    name: "In Progress",
    items: []
  },
  3: {
    name: "For Review",
    items: []
  },
  4: {
    name: "Completed",
    items: []
  }
};


const onDragEnd = (result:any, columns:any, setColumns:any) => {
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
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
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
        items: copiedItems
      }
    });
  }
};


function ProjectBoard() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [items, setItems] = useState(Data)

  return (
    <DashboardPage>
      <div className='h-content w-full flex justify-start flex-row items-center overflow-x-scroll scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 scrollbar-thin scroll-smooth bg-white p-6 h-content drop-shadow rounded-md m-4'>
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
               <div style={{   display: "flex",   flexDirection: "column",  alignItems: "center"}} key={columnId}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div {...provided.droppableProps} ref={provided.innerRef} className='w-72 h-700 bg-gray-200 shadow flex justify-start flex-col m-2 rounded-md relative'>
                          <h4 className='text-stone-600 font-semibold p-2'>{column.name}</h4>
                          <div className='mb-8 w-content h-full bg-gray-200 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 scrollbar-thin scroll-smooth'>
                          {column.items.map((item, index) => {
                            return (
                              <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                                {(provided, snapshot) => {
                                  return (
                                      <div className='container w-auto min-h-24 max-h-34 h-auto overflow-hidden border-2 hover:border-slate-500 bg-gray-100 text-slate-500 shadow rounded-md mx-2 my-1 p-1 relative flex justify-start items-center flex-wrap'                                     ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        <div className='flex justify-center items-center flex-col'>
                                          <h4 className='text-sm m-2 self-start'>{item.name}</h4>
                                          <p className='text-xs mb-1 mx-1'>{item.description}</p>
                                        </div>
                                        <div className='p-2 absolute top-0 right-0'>
                                          <AvatarGroup>
                                            <Avatar alt="Remy Sharp" src={item.image} sx={{ width: 20, height: 20  }} />
                                            <Avatar alt="Remy Sharp" src={item.image} sx={{ width: 20, height: 20  }} />
                                            <Avatar alt="Remy Sharp" src={item.image} sx={{ width: 20, height: 20  }} />
                                          </AvatarGroup>
                                        </div>
                                      </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          </div>
                          {provided.placeholder}  
                          <div className='bg-gray-200 flex justify-start items-center flex-row absolute bottom-0 left-0 p-2 w-full'>
                            <img src={AddIcon} alt="add-item" className='w-4 cursor-pointer'/>
                            <h4 className='text-stone-600 font-semibold text-xs cursor-pointer'>Add Item</h4>
                          </div>
                        </div>
                      );
                    }}
                  </Droppable>
               </div>
             );
          })}
        </DragDropContext>
      </div>
    </DashboardPage>
  )
}

export default ProjectBoard