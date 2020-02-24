import React, { Component } from 'react';
import AppContext from '../../AppContext';
import './Task.css';
import { tasks } from '../../dummystore';

class Task extends Component {

    static contextType = AppContext;

    deleteHandler = (id) => {
      console.log(id);
      this.context.deleteDoTask(id);
    };

    doHandler = (id) => {
      console.log(id);
      const doTasks = this.context.doTasks;
      const currentTask = this.context.currentTask;
      console.log(doTasks, currentTask, id);
      const newTask = doTasks.filter(task => task == id);
      console.log(newTask);
      this.context.addDoTask(currentTask);
      this.context.setCurrentTask(newTask);
      this.context.deleteDoTask(id);
      console.log(this.context.doTasks);  
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