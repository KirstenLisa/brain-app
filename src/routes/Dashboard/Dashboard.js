import React, { Component } from 'react';
import AppContext from '../../AppContext';
import TaskList from '../TaskList/TaskList';
import PostList from '../PostList/PostList';
import PostItem from '../../components/PostItem/PostItem';
import AddPost from '../AddPost/AddPost';
import TaskItem from '../../components/TaskItem/TaskItem';
import './Dashboard.css';

class Dashboard extends Component {

  static contextType = AppContext;

  componentDidMount() {
   
   //API USERSLIST
   //API POSTLIST
   //API TASKLIST
  }

  doHandler = (id) => {

    const doTasks = this.context.doTasks;
    const currentTask = this.context.currentTask;
    console.log(doTasks, currentTask, id);
    const newTask = doTasks.filter(task => task == id);
    console.log(newTask);
    this.context.addDoTask(currentTask);
    this.context.setCurrentTask(newTask);
    this.context.deleteDoTask(id);
    console.log(this.context.doTasks);
    
}


  render() {

    const posts = this.context.postList;
    const tasks = this.context.taskList;
    //const users = this.context.usersList;
    const userId = this.props.match.params.userId;
    const userPosts = posts.filter(post => userId == post.user_id);
    const currentTaskId = this.context.currentTask;
    //const currentUser = users.filter(user => userId == user.id);
    const currentTask = tasks.filter(task => task.task_id == currentTaskId);
    const userTasksDo = this.context.doTasks;
    const doTasks = tasks.filter(({task_id}) => userTasksDo.includes(task_id));
    const userTasksDone = this.context.doneTasks;
    const doneTasks = tasks.filter(({task_id}) => userTasksDone.includes(task_id));
    
    const username = sessionStorage.getItem('username');

    return (
      <div className='dashboard'>
        <div className='dashboard-header'>
          <img className='profile-pic' src={this.context.currentUser.profile_pic}></img>
          <h3 className='welcome-headline'>
            Welcome, {username}! What is today's adventure?
          </h3>
        </div>
        

        <section className='current-task-section'>

          <div className='doing-section'>
              <TaskItem 
                currentTask={currentTask}
                />
          </div>
        </section>

        <section className='post-section'>
          <h2 className='post-headline'>POSTS</h2>

          <div className='post-item'>
              <PostItem 
              currentPost={userPosts[0]}
              />
              </div>

          <div className='post-list'>
              <PostList 
              postList={userPosts.slice(1)}
              />
            </div>

          <div className='add-post'>
            <AddPost />
              </div> 

        </section>

        <section className='do-task-section'>
          <h2 className='dashboard-headline'>TO DO</h2>
          <TaskList 
          tasks={doTasks}
          doHandler={this.doHandler}
          />
        </section>

        <section className='done-task-section'>
          <h2 className='dashboard-headline'>DONE</h2>
          <TaskList 
          tasks={doneTasks}
          doHandler={this.doHandler}
          />
        </section>
      </div>
    );
  }
}

export default Dashboard;
