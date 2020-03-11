import React, { Component } from 'react';
import AppContext from '../../AppContext';
import UsersApiService from '../../services/users-api-service';
import './AllTasks.css';

class AllTasks extends Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
          this.state = {
              temporaryList: []
          }};

    componentDidMount() {
        const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
        const doList = currentUser.do_tasks || [];
        const currentTask = currentUser.current_task;
        const tasksEx = [ ...doList, currentTask ];
        const temporaryList = this.context.taskList.filter(task => {
            return tasksEx.indexOf(task.task_id) == -1;
        });
        this.setTemporaryList(temporaryList);
       
    };

    setTemporaryList(temporaryList) {
        this.setState({ temporaryList });
    };

    deleteTask(id) {
        const newTemporaryList = this.state.temporaryList.filter(
            task => task.task_id != id
          );
      
          this.setState({ temporaryList: newTemporaryList });
    };

    handleAddTask(e) {
        const id = parseInt(e.id);
        const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
        const username = currentUser.username;
        const doTasks = currentUser.do_tasks || [];
        const newDoTasks = [ ...doTasks, id ];
        const updatedUser = { ...currentUser, do_tasks: newDoTasks };
        UsersApiService.updateUser(username, updatedUser)
          .then(this.context.updateCurrentUser(updatedUser))
          .then(console.log(this.context.currentUser))
          .then(this.deleteTask(id))
          .catch(this.context.setError);
    };
    

    render() {

        const allTasks = this.state.temporaryList.map(task => <li className='add-task-list-li' key={task.task_id}>
            {task.description}
            <button className='add-button' type='button' id={task.task_id} onClick={(e) => this.handleAddTask(e.target)}>Add</button></li>);
        const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
        const userId = currentUser.id;
        console.log(userId);

    return(

    <div className='all-tasks-list'>
        <ul>
            {allTasks}
        </ul>

        <button 
            className='to-dashboard-button'
            type='button'
            onClick={() => this.props.history.push(`/dashboard`)}>
            Dashboard
        </button>

    </div>

    )}

};

export default AllTasks;