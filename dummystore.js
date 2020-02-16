const users = [
    {
        "id": 1,
        "username": "fluffy_rabbit",
        "fullname": "Dings Bums",
        "email": "dingsbums@email.com",
        "password": "Password!123",
        "profile_pic": "",
        "user_posts": [1,2],
        "user_task_current": [1],
        "user_tasks": [2],
        "user_tasks_done": [3,4],

    },

]


const tasks = [
    {
        "task_id": 1,
        "description": "Jump Trampoline",
        "category": "Body",
        "status": "doing"
    },
    {
        "task_id": 2,
        "description": "Learn Korean Alphabet",
        "category": "Mind",
        "status": "do"
    },
    {
        "task_id": 3,
        "description": "Meditate",
        "category": "Soul",
        "status": "do"
    },
    {
        "task_id": 4,
        "description": "Sort all photos you have ever taken",
        "category": "Other",
        "status": "done"
    },
    {
        "task_id": 5,
        "description": "Adopt a Dog",
        "category": "Soul",
        "status": "doing"
    },
    {
        "task_id": 6,
        "description": "Plant a Tree",
        "category": "other",
        "status": "done"
    },
    {
        "task_id": 7,
        "description": "Sleep Outside",
        "category": "Body",
        "status": "do"
    },
    {
        "task_id": 8,
        "description": "See the Sunrise",
        "category": "Soul",
        "status": "do"
    },
    {
        "task_id": 9,
        "description": "See the Sunset",
        "category": "Soul",
        "status": "do"
    },
    {
        "task_id": 10,
        "description": "Take a Yoga Lesson",
        "category": "Body",
        "status": "do"
    },
    {
        "task_id": 11,
        "description": "Run a Marathon",
        "category": "Body",
        "status": "do"
    },
    {
        "task_id": 12,
        "description": "Bunjee Jumping",
        "category": "Body",
        "status": "do"
    },
    {
        "task_id": 13,
        "description": "Jump from a Cliff",
        "category": "Body",
        "status": "do"
    },
    {
        "task_id": 14,
        "description": "Nightswimming",
        "category": "Mind",
        "status": "do"
    },
    {
        "task_id": 15,
        "description": "Swim in the Sea/a Lake in Winter",
        "category": "Body",
        "status": "do"
    },
    {
        "task_id": 16,
        "description": "Bath in Champagne",
        "category": "Soul",
        "status": "do"
    },
    {
        "task_id": 17,
        "description": "See the Northern Lights",
        "category": "Other",
        "status": "do"
    },
    {
        "task_id": 18,
        "description": "Build a Treehouse",
        "category": "Other",
        "status": "do"
    },
]


const posts = [
    {
        "post_id": 1,
        "user_id": 1,
        "content": "content post",
        "post_pic": ""
    },
    {
        "post_id": 2,
        "user_id": 1,
        "content": "content post 2",
        "post_pic": ""
    },
]

export default {
    users,
    tasks,
    posts
};