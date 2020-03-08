import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../AppContext';
import UsersApiService from '../../services/users-api-service';
import PostsApiService from '../../services/posts-api-service';
import TaskList from '../TaskList/TaskList';
import PostList from '../PostList/PostList';
import PostItem from '../../components/PostItem/PostItem';
import AddPost from '../AddPost/AddPost';
import TaskItem from '../../components/TaskItem/TaskItem';
import './Dashboard.css';

class Dashboard extends Component {

  static contextType = AppContext;

  state = {
    postList: []
  }

  componentDidMount() {
    PostsApiService.getPosts()
      .then(this.context.setPostList)
      .catch(this.setError);
    this.setState({ postList: JSON.parse(sessionStorage.getItem('postsObj'))})
 }

  doneHandler = (e) => {
    const taskId = parseInt(e.id);
    const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
    const username = currentUser.username;
    const doTasks = currentUser.do_tasks;
    const randomNum = doTasks[Math.floor(Math.random() * doTasks.length)];
    const newCurrentTask = randomNum;
    const newDoneTasks = [ ...currentUser.done_tasks, taskId ];
    const updatedUser = {
      id: currentUser.id,
      username: currentUser.username,
      fullname: currentUser.fullname,
      email: currentUser.email,
      profile_pic: currentUser.profile_pic,
      current_task: newCurrentTask,
      doTasks: currentUser.done_tasks,
      doneTasks: newDoneTasks
    }
    UsersApiService.updateUser(username, updatedUser)
        .then(this.context.updateCurrentUser(updatedUser))
        .catch(this.setError);
  }

  renderPostSection = () => {
    const userId = this.props.match.params.userId;
    const posts = JSON.parse(sessionStorage.getItem('postsObj'));
    console.log(posts);
    const userPosts = posts.filter(post => userId == post.user_id);
    return(
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

        </section>)
  }

  render() {
    console.log('render dashboard');
    // const posts = this.context.postList;
    // const tasks = this.context.taskList;
    const tasks = JSON.parse(sessionStorage.getItem('tasksObj'));
    const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
    const userId = this.props.match.params.userId;
    const currentTaskId = currentUser.current_task;
    const currentTask = tasks.filter(task => task.task_id == currentTaskId);
    const userTasksDo = currentUser.do_tasks;
    const doTasks = tasks.filter(({task_id}) => userTasksDo.includes(task_id));
    const userTasksDone = currentUser.done_tasks;
    const doneTasks = tasks.filter(({task_id}) => userTasksDone.includes(task_id));
    const username = sessionStorage.getItem('username');

    return (
      <div className='dashboard'>
        <div className='dashboard-header'>
          <img className='profile-pic' alt='profile-pic' src={currentUser.profile_pic}></img>
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
          <div className='add-task-buttons'>
            <button className='add-task-button'>
              <Link to={`/newtask/${userId}`}>
              Add Task
              </Link>
            </button>
            <button className='add-task-list-button'>
              <Link to={`/tasklist/${userId}`}>
              Task List
              </Link>
            </button>
          </div>
        </section>

        {this.state.postList && this.renderPostSection}

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
