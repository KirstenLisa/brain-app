import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

  render() {

    const posts = this.context.postList;
    const tasks = this.context.taskList;
    const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
    const userId = this.props.match.params.userId;
    const userPosts = posts.filter(post => userId == post.user_id);
    const currentTaskId = this.context.currentTask;
    const currentTask = tasks.filter(task => task.task_id == currentTaskId);
    const userTasksDo = this.context.doTasks;
    const doTasks = tasks.filter(({task_id}) => userTasksDo.includes(task_id));
    console.log(doTasks);
    const userTasksDone = this.context.doneTasks;
    const doneTasks = tasks.filter(({task_id}) => userTasksDone.includes(task_id));
    
    const username = sessionStorage.getItem('username');

    return (
      <div className='dashboard'>
        <div className='dashboard-header'>
          <img className='profile-pic' src={currentUser[0].profile_pic}></img>
          <h3 className='welcome-headline'>
            Welcome, {username}! What is today's adventure?
          </h3>
        </div>
        

        <section className='current-task-section'>

          <div className='add-task-buttons'>
            <button className='add-task-button'>
              <Link to={`/newtask/${userId}`}>
              Add Task
              </Link>
            </button>
            <button className='add-task-list-button'>
              <Link to={`/tasklist/${userId}`}>
              Add Task From List
              </Link>
            </button>
          </div>

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
              userId={userId}
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
          />
        </section>

        <section className='done-task-section'>
          <h2 className='dashboard-headline'>DONE</h2>
          <TaskList 
          tasks={doneTasks}
          />
        </section>
      </div>
    );
  }
}

export default Dashboard;
