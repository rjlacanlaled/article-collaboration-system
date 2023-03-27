import React, {useState} from 'react'
import EditableTitle from '../Components/EditableTitle';
import AddProject from '../modals/AddTask'
import AddBoard from '../Components/AddBoard'
import BoardMenu from './BoardMenu';

function Board() {

  const [pageData, setPageData] = useState([
    { id: 1, title: 'To Do' },
    { id: 2, title: 'In Progress' },
    { id: 3, title: 'For Review' },
    { id: 4, title: 'Completed' },
    // ...
  ]);

  const addBoard = (newBoardTitle: string) => {
    const newBoard = { id: pageData.length + 1, title: newBoardTitle};
    setPageData([...pageData, newBoard]);
  };

  const deleteBoard = (boardId: number) => {
    const boardIndex = pageData.findIndex(board => board.id === boardId);
    if (boardIndex !== -1) {
      const newPageData = [...pageData];
      newPageData.splice(boardIndex, 1);
      setPageData(newPageData);
    }
  }

  return (
    <div className='flex justify-start flex-row'>
        {pageData.map((datas) => (
        <div className='shrink-0 w-72 h-700 bg-gray-200 shadow flex justify-start flex-col m-2 p-2 rounded-md relative'>
            <div className='flex justify-between'>
            <EditableTitle initialValue={datas.title}/>
            <BoardMenu onDelete={() => deleteBoard(datas.id)} />
            </div>
            <div className='flex justify-start items-center bg-gray-200 absolute bottom-0 left-0 p-2 w-full'>
              <AddProject/>
            </div>
        </div>
        ))}
          <AddBoard 
            onAddBoard={addBoard} 
            initialValue={''} 
          />
    </div>
  )
}

export default Board

