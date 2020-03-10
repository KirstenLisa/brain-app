import React, { Component } from 'react';
import AppContext from '../../AppContext';
import UsersApiService from '../../services/users-api-service';
import './Task.css';

class Task extends Component {

    static contextType = AppContext;

    deleteHandler = (taskId) => {
      const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
      const username = currentUser.username;
      const doTasks = currentUser.do_tasks;
      const newDoTasks = doTasks.filter(task => task != taskId);
      const updatedUser = { ...currentUser, do_tasks: newDoTasks };
      UsersApiService.updateUser(username, updatedUser)
        .then(this.context.updateCurrentUser(updatedUser))
        .catch(this.context.setError);
    };

    doHandler = (id) => {
      const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
      const username = currentUser.username;
      const currentTaskId = currentUser.current_task;
      console.log(this.context.doTasks);
      const doTasks = [ ...currentUser.do_tasks, currentTaskId ];
      const newTask = doTasks.filter(task => task == id);
      const newCurrentTask = parseInt(newTask);
      const newDoTasks = doTasks.filter(task => task != id);
      const updatedUser = {...currentUser, do_tasks: newDoTasks, current_task: newCurrentTask};
      UsersApiService.updateUser(username, updatedUser)
        .then(this.context.updateCurrentUser(updatedUser))
        .catch(this.context.setError);  
  }
     
    render() {

    return(
        <div className='task-list-item'>
            <h4 className='task-list-item-headline'>
                {this.props.description}
            </h4>
            <section className='task-button-section'>
            <button 
            className='task-do'
            id={this.props.id}
            onClick={e => this.doHandler(e.target.id)}
            >
              Do now
          </button>
          <button 
            className='task-delete'
            id={this.props.id}
            onClick={e => this.deleteHandler(e.target.id)}
            >
              Delete
          </button>
            </section>
        </div>
    )
    }
};

export default Task;