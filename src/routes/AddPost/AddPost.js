import React, { Component } from 'react';
import AppContext from '../../AppContext';
import './AddPost.css';


class AddTask extends Component {

    static contextType = AppContext;


    render() {


    function postSubmitHandler() {

        console.log('submit post');
        
    }
    
    return (
      <section className="add-task-form">
          <form onSubmit={postSubmitHandler}>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={this.state.value}
              />
            </div>
            <div className="form-control">
              <label htmlFor="description">What are you going to do?</label>
              <input
                type="text"
                id="description"
                value={this.state.value}
              />
            </div>
            <div className="ingredient-form__actions">
              <button type="submit">Add Task</button>
            </div>
          </form>
      </section>
    );
            }
        }
  
  export default AddTask;
  