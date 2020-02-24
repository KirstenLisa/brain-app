import React, { Component } from 'react';
import AppContext from '../../AppContext';
import ValidationError from '../../components/ValidationError';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';
import config from '../../config';
import './AddTask.css';


class AddTask extends Component {

  static contextType = AppContext;
    
    constructor(props) {
      super(props);
        this.state = {
          description: {
            value: '',
            touched: false
              },
          category: {
            value: '',
            touched: false
              },
            error: null
              }}
    
    
        updateDescription(description) {
            this.setState({description: {value: description, touched: true}});
        }
    
    
        updateCategory(category) {
            this.setState({category: {value: category, touched: true}});  
            }
          
    
        validateDescription() {
            const description = this.state.description.value.trim();
            if (description.length === 0) {
              return 'Description is required';
            } else if (description.length < 3) {
              return 'Description must be at least 3 characters long';
            }
          }
    
          validateSelection() {
              const selectedCategory = this.state.category.value;
              console.log('selectedCategory:' + selectedCategory);
              if(selectedCategory === "None" || selectedCategory === '') {
                return 'Category is required';
              }
          }
    
         validateForm() {
           if(this.validateDescription()) {
            this.setState({ description: { touched: true } });
           } else if(this.validateSelection()) {
             this.setState({ category: { touched: true } });
         }
         }
    
         getUnique = (arr, comp) => {
          const unique = arr
            .map(e => e[comp])
      
            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)
      
            // eliminate the dead keys & store unique objects
            .filter(e => arr[e])
            .map(e => arr[e]);
      
          return unique;
        };
        
    
          handleSubmit(e) {
            e.preventDefault();
            if (this.validateForm()) {
              return null;
            }   
            if (
              this.validateDescription() ||
              this.validateSelection()
            ) {
              return null;
            }

            const { userId } = this.props.match.params
            const {description, category } = e.target
            
    
            const newTask = {
                task_id: new Date().getUTCMilliseconds(),
                description: description.value,
                category: category.value 
            }

            console.log(newTask)
            this.context.addTask(newTask);
            this.context.addDoTask(newTask.task_id);
    
            this.props.history.push(`/dashboard/${userId}`); 
            
          } 
    
        render() {
    
            const {error} = this.state;
    
            const categoriesUnique = this.getUnique(this.context.taskList, 'category');
            const categories = categoriesUnique.map(
            (category, i) => <option value={category.category} key={i} id={i}>{category.category}</option>
          );
            console.log(categories);
    
            const descriptionError = this.validateDescription();
            const categoryError = this.validateSelection();
    
            return(
                <form className="addTaskForm" onSubmit={e => this.handleSubmit(e)}>
                    <div className='addTask_error' role='alert'>
                    {error && <p>{error.message}</p>}
                    </div>
                    <h2>Create a new task</h2>
                    
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="registration_control"
                            name="description"
                            id="description"
                            onChange={e => this.updateDescription(e.target.value)}
                            aria-required="true" 
                            aria-describedby="nameError"/>
                        {this.state.description.touched && (
                        <ValidationError message={descriptionError} id="nameError" />)}
                    </div>
    
                    <div className="category-select">
                        <label htmlFor="cateory">Select a category:</label>
                        <select
                        name="category"
                        onChange={e => this.updateCategory(e.target.value)}
                        aria-required="true" 
                        aria-describedby="categoryError">
                        <option value={"None"}>Select one...</option>
                        {categories}
                        </select>
                        {this.state.category.touched && (
                        <ValidationError message={categoryError} id="categoryError"/>)}
                    </div>
    
                    <div className="task_button_group">
                        <button type='button' onClick={() => this.props.history.push('/dashboard/1')}>
                            Cancel
                        </button>
               
                        <button
                            type="submit"
                            className="save_button">
                                Save
                        </button>
                    </div>
    
                </form>
            )
        }
    }
    
    AddTask.propTypes = {
        taskList: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
        }))
      };
  
  export default AddTask;
  