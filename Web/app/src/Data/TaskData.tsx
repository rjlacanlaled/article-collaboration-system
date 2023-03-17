import React from 'react'

interface Task {
    id: number,
    title: string,
    status: string,
    client: string,
    created_at: string,
    type: string,
    words: number,
    action: string
  }

const TaskData: Task[] = [
    {
        id: 1,
        title: 'The importance of Mindfulness in Daily Life',
        status: 'todo',
        client: 'Search-Work',
        created_at: 'Friday, March 17, 2023 (GMT+8)',
        type: 'blog',
        words: 800,
        action: ''
    },
    {
        id: 2,
        title: 'Navigating the New Normal: Adapting to Remote Work and Online Learning in the Post-Pandemic World',
        status: 'todo',
        client: 'Search-Work',
        created_at: 'Friday, March 17, 2023 (GMT+8)',
        type: 'blog',
        words: 800,
        action: ''
    },
    {
        id: 3,
        title: 'The Ethics of Genetic Editing: Balancing the Potential and Risks of CRISPR Technology',
        status: 'todo',
        client: 'Search-Work',
        created_at: 'Friday, March 17, 2023 (GMT+8)',
        type: 'blog',
        words: 800,
        action: ''
    },
    {
        id: 4,
        title: 'Exploring the Role of Artificial Intelligence in the Future of Healthcare',
        status: 'todo',
        client: 'AAB',
        created_at: 'Friday, March 17, 2023 (GMT+8)',
        type: 'blog',
        words: 800,
        action: ''
    },
    {
        id: 5,
        title: 'The Benefits and Drawbacks of Social Media for Personal and Professional Use',
        status: 'todo',
        client: 'ADA',
        created_at: 'Friday, March 17, 2023 (GMT+8)',
        type: 'blog',
        words: 800,
        action: ''
    },
    {
        id: 6,
        title: 'Breaking the Stigma: Navigating Mental Health in the Workplace',
        status: 'todo',
        client: 'TeddySwap',
        created_at: 'Friday, March 17, 2023 (GMT+8)',
        type: 'blog',
        words: 800,
        action: ''
    },
]

export default TaskData