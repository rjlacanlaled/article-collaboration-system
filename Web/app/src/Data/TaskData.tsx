import React from 'react'

interface TaskTimeliness {
    pending: boolean,
    past_eod: boolean,
    on_time: boolean
  }

interface Task {
    id: number,
    assignee: string,
    reporter: string,
    title: string,
    description: string,
    image: string,
    status: string,
    client: string,
    created_at: string,
    type: string,
    words: number,
    timeliness: TaskTimeliness,
    action: string
  }

const TaskData: Task[] = [
    {
        id: 1,
        assignee: 'Bryan Saguit',
        reporter: 'shane futol',
        title: 'Task 1',
        description: 'The importance of Mindfulness in Daily Life',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        status: 'todo',
        client: 'Search-Work',
        created_at: 'Friday, March 17, 2023',
        type: 'blog',
        words: 800,
        timeliness: {
            pending: true,
            past_eod: false,
            on_time: false
          },
        action: ''
    },
    {
        id: 2,
        assignee: 'Bryan Saguit',
        reporter: 'Edcel',
        title: 'Task 2',
        description: 'Navigating the New Normal: Adapting to Remote Work and Online Learning in the Post-Pandemic World',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        status: 'todo',
        client: 'Search-Work',
        created_at: 'Friday, March 17, 2023',
        type: 'blog',
        words: 800,
        timeliness: {
            pending: true,
            past_eod: false,
            on_time: false
          },
        action: ''
    },
    {
        id: 3,
        assignee: 'Bryan Saguit',
        reporter: 'Edmon',
        title: 'Task 3',
        description: 'The Ethics of Genetic Editing: Balancing the Potential and Risks of CRISPR Technology',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        status: 'todo',
        client: "Eco-Friendly Co.",
        created_at: 'Friday, March 17, 2023',
        type: 'blog',
        words: 800,
        timeliness: {
            pending: true,
            past_eod: false,
            on_time: false
          },
        action: ''
    },
    {
        id: 4,
        assignee: 'Bryan Saguit',
        reporter: 'Volt',
        title: 'Task 4',
        description: 'Exploring the Role of Artificial Intelligence in the Future of Healthcare',
        image: 'https://randomuser.me/api/portraits/women/4.jpg',
        status: 'todo',
        client: "Bakeshop Inc.",
        created_at: 'Friday, March 17, 2023',
        type: 'blog',
        words: 800,
        timeliness: {
            pending: true,
            past_eod: false,
            on_time: false
          },
        action: ''
    },
    {
        id: 5,
        assignee: 'Bryan Saguit',
        reporter: 'Rj Lacanlale',
        title: 'Task 5',
        description: 'The Benefits and Drawbacks of Social Media for Personal and Professional Use',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        status: 'todo',
        client: 'ADA',
        created_at: 'Friday, March 17, 2023',
        type: 'blog',
        words: 800,
        timeliness: {
            pending: true,
            past_eod: false,
            on_time: false
          },
        action: ''
    },
    {
        id: 6,
        assignee: 'Bryan Saguit',
        reporter: 'Glen',
        title: 'Task 6',
        description: 'Breaking the Stigma: Navigating Mental Health in the Workplace',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        status: 'todo',
        client: 'TeddySwap',
        created_at: 'Friday, March 17, 2023',
        type: 'blog',
        words: 800,
        timeliness: {
            pending: true,
            past_eod: false,
            on_time: false
          },
        action: ''
    },
]

export default TaskData