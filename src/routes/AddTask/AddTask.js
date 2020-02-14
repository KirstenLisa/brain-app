import React, { useState } from 'react';
import './AddTask.css';


const AddTask = () => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
  
    const taskSubmitHandler = event => {
      event.preventDefault();
      props.onAddTask({ title: enteredTitle, description: enteredDescription });
    };
  
    return (
      <section className="add-task-form">
          <form onSubmit={taskSubmitHandler}>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={enteredTitle}
                onChange={event => {
                  setEnteredTitle(event.target.value);
                }}
              />
            </div>
            <div className="form-control">
              <label htmlFor="description">What are you going to do?</label>
              <input
                type="text"
                id="description"
                value={enteredDescription}
                onChange={event => {
                  setEnteredDescription(event.target.value);
                }}
              />
            </div>
            <div className="ingredient-form__actions">
              <button type="submit">Add Task</button>
            </div>
          </form>
      </section>
    );
            }
  
  export default AddTask;
  