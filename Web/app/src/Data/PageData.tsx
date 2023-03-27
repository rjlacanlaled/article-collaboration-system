import React from 'react'

interface Board {
    id: number;
    title: string;
    items: never[];
  }

const PageData: Board[] = [
    {
        id: 1,
        title: 'To Do',
        items: [],
    },
    {
        id: 2,
        title: 'In Progress',
        items: [],
    },
    {
        id: 3,
        title: 'For Review',
        items: [],
    },
    {
        id: 3,
        title: 'Done',
        items: [],
    },
]

export default PageData