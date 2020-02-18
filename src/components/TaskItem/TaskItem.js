import React from 'react';
import './TaskItem.css';

const TaskItem = (props) => { 

    return(
        <div className='task-item'>
            <h4 className='task-item-headline'>
                {props.currentTask[0].description}
            </h4>
          <button 
            className='task-done'
            onClick={props.doneHandler}
            >
              Done
          </button>
        </div>
    )
};

export default TaskItem;