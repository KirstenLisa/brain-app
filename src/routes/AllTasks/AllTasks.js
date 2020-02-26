import React, { Component } from 'react';
import AppContext from '../../AppContext';
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
        console.log(currentUser);
        const doList = currentUser[0].do_tasks;
        console.log(doList);
        const currentTask = currentUser[0].current_task;
        console.log(currentTask);
        const tasksEx = doList.concat(currentTask);
        console.log(tasksEx);
        const temporaryList = this.context.taskList.filter(task => {
            return tasksEx.indexOf(task.task_id) == -1;
        });
        this.setTemporaryList(temporaryList);
       
    };

    setTemporaryList(temporaryList) {
        console.log(temporaryList);
        this.setState({ temporaryList });
    };

    deleteTask(id) {
        const newTemporaryList = this.state.temporaryList.filter(
            task => task.task_id != id
          );
      
          this.setState({ temporaryList: newTemporaryList });
    };

    handleAddTask(e) {
        console.log(e);
        const id = parseInt(e.id);
        this.context.addDoTask(id);
        this.deleteTask(id);
    };
    

    render() {

        const allTasks = this.state.temporaryList.map(task => <li className='add-task-list-li' key={task.task_id}>
            {task.description}
            <button className='add-button' type='button' id={task.task_id} onClick={(e) => this.handleAddTask(e.target)}>Add</button></li>);
        const { userId } = this.props.match.params;

    return(

    <div className='all-tasks-list'>
        <ul>
            {allTasks}
        </ul>

        <button 
            className='to-dashboard-button'
            type='button'
            onClick={() => this.props.history.push(`/dashboard/${userId}`)}>
            Dashboard
        </button>

    </div>

    )}

};

export default AllTasks;