import config from '../config';

const TasksApiService = {
  getTasks() {
    return fetch(`${config.API_ENDPOINT}/tasks`, {
      headers: {
        'content-type': 'application/json'
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getTask(taskId) {
    return fetch(`${config.API_ENDPOINT}/tasks/${taskId}`, {
      headers: {
        'content-type': 'application/json'
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  postTask(newTask) {
    return fetch(`${config.API_ENDPOINT}/tasks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newTask)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default TasksApiService;