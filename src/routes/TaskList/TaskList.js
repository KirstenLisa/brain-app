import React, { Component } from 'react';
import AppContext from '../../AppContext';
import UsersApiService from '../../services/users-api-service';
import Task from '../../components/Task/Task';
import uuid from 'uuid/v4';
import './TaskList.css';

class TaskList extends Component {

  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      userTasks: []
    };
  }

   componentDidMount () {
     console.log(this.props.tasks)
     this.setState({userTasks: this.props.tasks})
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

handleCategory = (e, array) => {
  e.preventDefault();
  const category = e.target.value;
  const filteredTasks = array.filter(item => item.category == category);
  this.setState({userTasks: filteredTasks});
  console.log(this.state.userTasks);
};

deleteHandler = (taskId) => {
  console.log(taskId);
  const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
  const username = currentUser.username;
  const doTasks = currentUser.do_tasks;
  const newDoTasks = doTasks.filter(task => task != taskId);
  const updatedUser = { ...currentUser, do_tasks: newDoTasks };
  UsersApiService.updateUser(username, updatedUser)
    .then(this.context.updateCurrentUser(updatedUser))
    .catch(this.context.setError);
  this.setState({userTasks: newDoTasks});
};

doHandler = (id) => {
  console.log(id);
  const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
  const username = currentUser.username;
  const currentTaskId = currentUser.current_task;
  console.log(this.context.doTasks);
  const doTasks = [ ...currentUser.do_tasks, currentTaskId ];
  const newTask = doTasks.filter(task => task == id);
  const newCurrentTask = parseInt(newTask);
  const newDoTasks = doTasks.filter(task => task != id);
  const newUserTasks = this.props.tasks.filter(({task_id}) => newDoTasks.includes(task_id))
  console.log(newUserTasks);
  const updatedUser = {...currentUser, do_tasks: newDoTasks, current_task: newCurrentTask};
  UsersApiService.updateUser(username, updatedUser)
    .then(this.context.updateCurrentUser(updatedUser))
    .catch(this.context.setError);  
  this.setState({userTasks: newUserTasks});
  
}

    render() {
      const tasks = this.props.tasks;
      const tasklist = this.state.userTasks.map((task, i) => (<li key={i} id={task.task_id}>
        <Task 
          description={task.description}
          id={task.task_id}
          doHandler={this.doHandler}
          deleteHandler={this.deleteHandler}
            />
            </li>))
      const categoriesUnique = this.getUnique(this.props.tasks, 'category');
      const categories = categoriesUnique.map((category, i) => 
          (<button 
            className={category.category}
            id={uuid()}
            value={category.category}
            onClick={e => this.handleCategory(e, tasks)}>
            {category.category}
       </button>))

  return (
    <section className="task-section">
      <div className='category-list'>
        <ul className='category-links'>
         {categories}
        </ul>
      </div>

      <div className='task-list'>
      {tasklist}
      </div>

    
    </section>
  );
};
}

export default TaskList;