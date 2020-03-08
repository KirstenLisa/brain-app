import React from 'react';
import './TaskItem.css';

const TaskItem = (props) => { 

    return(
        <div className='task-item'>
          {props.currentTask == undefined && (<p>EWRTGZHJK</p>)}
          {props.currentTask[0] !== undefined &&
            (<div className='task-item'>
              <h4 className='task-item-headline'>
                {props.currentTask[0].description}
              </h4>
            <button
              type='submit'
              className='task-done'
              id={props.currentTask[0].task_id}
              onClick={e => props.doneHandler(e.target)}
            >
              Done
            </button>
        </div>)}
        </div>
    )
};

export default TaskItem;