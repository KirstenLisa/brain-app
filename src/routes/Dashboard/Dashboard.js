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
      .then(this.getPosts)
      .catch(this.setError);
 }

 getPosts = () => {
  this.setState({ postList:JSON.parse(sessionStorage.getItem('postsObj'))})
 }


  doneHandler = (e) => {
    const taskId = parseInt(e.id);
    const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
    const username = currentUser.username;
    const doTasks = currentUser.do_tasks;
    const randomNum = doTasks[Math.floor(Math.random() * doTasks.length)];
    const newCurrentTask = randomNum;
    const newDoTasks = doTasks.filter(task => task != randomNum);
    const newDoneTasks = [ ...currentUser.done_tasks, taskId ];
    const updatedUser = {
      id: currentUser.id,
      username: currentUser.username,
      fullname: currentUser.fullname,
      email: currentUser.email,
      profile_pic: currentUser.profile_pic,
      current_task: newCurrentTask,
      do_tasks: newDoTasks,
      done_tasks: newDoneTasks
    }
    UsersApiService.updateUser(username, updatedUser)
        .then(this.context.updateCurrentUser(updatedUser))
        .catch(this.setError);
  }

renderCurrentTask() {
  const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
  const currentTaskId = currentUser.current_task;
  const tasks = JSON.parse(sessionStorage.getItem('tasksObj'));
  const currentTask = tasks.filter(task => task.task_id == currentTaskId);

  return(
    <div className='doing-section'>
              <TaskItem 
                currentTask={currentTask}
                doneHandler={this.doneHandler}
                />
          </div>
  )
}

  renderPostSection() {
    const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
    const userId = currentUser.id;
    const posts = this.state.postList;
    const userPosts = posts.filter(post => userId == post.user_id);
    if(userPosts.length > 0) {
      return(
    
        <div className='post-section-items'>
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
          </div>
       ) } else {
        return(
          <div>
            <p>Post something you did!</p>
          </div>
        )
       }
  }

  renderNoPosts = () => {
    return( 
      <section>
        <p>No posts yet</p>
      </section>
    );
  }

  renderDoTasksSection() {
    const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
    const tasks = JSON.parse(sessionStorage.getItem('tasksObj'));
    const userTasksDo = currentUser.do_tasks;
    const doTasks = tasks.filter(({task_id}) => userTasksDo.includes(task_id))
    return(
      <section className='do-task-section'>
          <h2 className='dashboard-headline'>TO DO</h2>
          <TaskList 
          tasks={doTasks}
          />
        </section>
    )
  }

  renderDoneTasksSection() {
    const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
    const tasks = JSON.parse(sessionStorage.getItem('tasksObj'));
    const userTasksDone = currentUser.done_tasks;
    const doneTasks = tasks.filter(({task_id}) => userTasksDone.includes(task_id));

    return(
      <section className='done-task-section'>
          <h2 className='dashboard-headline'>DONE</h2>
          <TaskList 
          tasks={doneTasks}
          />
        </section>
    )
  }

  renderNoDoTasks = () => {
    return( 
      <section>
        <p>What's your bucket list?</p>
        <div className='add-task-buttons'>
            <button className='add-task-button'>
              <Link to={`/newtask`}>
              Add Task
              </Link>
            </button>
            <button className='add-task-list-button'>
              <Link to={`/tasklist`}>
              Task List
              </Link>
            </button>
          </div>
      </section>
    );
  }


  renderNoDoneTasks = () => {
    return( 
      <section>
        <p>No tasks done yet</p>
      </section>
    );
  }

  render() {
    const posts = this.state.postList;
    const tasks = JSON.parse(sessionStorage.getItem('tasksObj'));
    const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
    const userTasksDo = currentUser.do_tasks;
    const userTasksDone = currentUser.done_tasks;
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
        {tasks != null && this.renderCurrentTask()
        }
        
          <div className='add-task-buttons'>
            <button className='add-task-button'>
              <Link to={`/newtask`}>
              Add Task
              </Link>
            </button>
            <button className='add-task-list-button'>
              <Link to={`/tasklist`}>
              Task List
              </Link>
            </button>
          </div>
        </section>

    

         {userTasksDo != null && tasks != null
         ? this.renderDoTasksSection()
         : this.renderNoDoTasks()}

      
        <section className='post-section'>
          <h2 className='post-headline'>WHAT'S UP?</h2>
          {posts.length > 0
          ? this.renderPostSection()
          : this.renderNoPosts()}

        <div className='add-post'>
            <AddPost 
            getPosts={this.getPosts}/>
              </div> 
         </section>

        {userTasksDone != null && tasks != null
        ? this.renderDoneTasksSection()
        : this.renderNoDoneTasks()
        }

      </div>   
    );
  }
}

export default Dashboard;
