import React from 'react'
import AddIcon from '../Assets/Images/plus-icon.svg'
import PageData from '../Data/PageData'

function Board() {
  return (
    <>
        {PageData.map((PageData => (
        <div className='shrink-0 w-72 h-700 bg-gray-200 shadow flex justify-start flex-col m-2 rounded-md relative'>
            <h4 className='text-stone-600 font-semibold p-2'>{PageData.title}</h4>
            <h4 className='text-xs mx-1.5 p-2 text-stone-600'>{PageData.description}</h4>
            <div className='bg-gray-200 flex justify-start items-center flex-row absolute bottom-0 left-0 p-2 w-full'>
                <img src={AddIcon} alt="add-item" className='w-4 cursor-pointer'/>
                <h4 className='text-stone-600 font-semibold text-xs cursor-pointer'>Add Item</h4>
            </div>
        </div>
        )))}
    </>
  )
}

export default Board