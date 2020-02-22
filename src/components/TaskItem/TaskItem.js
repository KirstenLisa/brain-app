import React from 'react';
import './TaskItem.css';

const TaskItem = (props) => { 

  console.log(props.currentTask);

    return(
        <div className='task-item'>
            <h4 className='task-item-headline'>
                {props.currentTask[0].description}
            </h4>
          <button 
            className='task-done'
            >
              Done
          </button>
        </div>
    )
};

export default TaskItem;