import React, { Component } from 'react';
import AppContext from '../../AppContext';
import UsersApiService from '../../services/users-api-service';
import './Task.css';

class Task extends Component {

    static contextType = AppContext;

 
     
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
            onClick={e => this.props.doHandler(e.target.id)}
            >
              Do now
          </button>
          <button 
            className='task-delete'
            id={this.props.id}
            onClick={e => this.props.deleteHandler(e.target.id)}
            >
              Delete
          </button>
            </section>
        </div>
    )
    }
};

export default Task;