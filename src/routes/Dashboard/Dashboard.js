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

  doneHandler() {
    console.log('click')
}

  render() {

    const users = this.context.usersList;
    const posts = this.context.postList;
    const tasks = this.context.taskList;
    const userId = this.props.match.params.userId;
    const currentUser = users.filter(user => userId == user.id)
    const userPosts = posts.filter(post => userId == post.user_id);
    const currentTask = tasks.filter(task => task.task_id == currentUser[0].current_task)
    const userTasksDo = currentUser[0].do_tasks;
    const doTasks = tasks.filter(({task_id}) => userTasksDo.includes(task_id));
    const userTasksDone = currentUser[0].done_tasks;
    const doneTasks = tasks.filter(({task_id}) => userTasksDone.includes(task_id));

  const username = sessionStorage.getItem('username');
  console.log(username);

    return (
      <div className='dashboard'>
        <div className='dashboard-header'>
          <img className='profile-pic' src={currentUser[0].profile_pic}></img>
          <h3 className='welcome-headline'>
            Welcome, {username}! What is today's adventure?
          </h3>
        </div>
        

        <section className='current-task-section'>

          <div className='doing-section'>
              <TaskItem 
                currentTask={currentTask}
                doneHandler={this.doneHandler}
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
