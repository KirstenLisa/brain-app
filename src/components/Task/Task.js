import React, { Component } from 'react';
import AppContext from '../../AppContext';
import './Task.css';
import { tasks } from '../../dummystore';

class Task extends Component {

    static contextType = AppContext;
     
    render() {

    return(
        <div className='task-item'>
            <h4 className='task-item-headline'>
                {this.props.description}
            </h4>
          <button 
            className='task-done'
            id={this.props.id}
            onClick={e => this.props.doHandler(e.target.id)}
            >
              Do now
          </button>
          <button 
            className='task-done'
            id={this.props.id}
            //onClick={e => this.props.deleteHandler(e.target.id)}
            >
              Delete
          </button>
        </div>
    )
    }
};

export default Task;