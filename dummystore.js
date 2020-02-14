const users = [
    {
        "id": 1,
        "username": "fluffy_rabbit",
        "fullname": "Dings Bums",
        "email": "dingsbums@email.com",
        "password": "Password!123",
        "profile_pic": "",
        "user_posts": [1,2],
        "user_tasks": [1,2],
        "user_tasks_done": [3,4],

    },

]


const tasks = [
    {
        "task_id": 1,
        "title": "title 1",
        "description": "description 1",
        "category": "Body"
    },
    {
        "task_id": 2,
        "title": "title 2",
        "description": "description 2",
        "category": "Mind"
    },
    {
        "task_id": 3,
        "title": "title 3",
        "description": "description 3",
        "category": "Soul"
    },
    {
        "task_id": 4,
        "title": "title 4",
        "description": "description 4",
        "category": "Other"
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