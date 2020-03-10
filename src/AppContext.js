import React, { Component } from 'react';
import TokenService from './services/token-service';
import UsersApiService from './services/users-api-service';
import TasksApiService from './services/tasks-api-service';

const AppContext = React.createContext({
    usersList: [],
    postList: [],
    taskList: [],
    currentUser: [],
    currentTask: [],
    doTasks: [],
    doneTasks: [],
    setUsersList: () => {},
    setPostList: () => {},
    setTaskList: () => {},
    addUser: () => {},
    addPost: () => {},
    addTask: () => {},
    deletePost: () => {},
    updatePost: () => {},
    deleteDoneTask: () => {},
    setLogin: () => {},
    clearError: () => {},
    error: null,
    isLoggedIn: false,
    setCurrentUser: () => {},
    setCurrentTask: () => {},
    setDoTasks: () => {},
    setDoneTasks: () => {},
    addDoTask: () => {},
    addDoneTask: () => {},
    deleteDoTask: () => {},
    deleteCurrentTask: () => {},
    updateCurrentUser: () => {}
});

export default AppContext;

export class ContextProvider extends Component {
  state = {
    usersList: [],
    postList: [],
    taskList: [],
    error: null,
    isLoggedIn: false
  };

  componentDidMount() {
    TasksApiService.getTasks()
      .then(this.setTaskList)
     .catch(this.setError);
    // PostsApiService.getPosts()
    //   .then(this.setPostList)
    //   .catch(this.setError);
  }

  setUsersList = usersList => {
    this.setState({ usersList });
  };

  setPostList = postList => {
    this.setState({ postList});
    TokenService.savePostsObj(postList);
  };

  setTaskList = taskList => {
    this.setState({ taskList });
    TokenService.saveTasksObj(taskList);
  };

  setError = error => {
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  addUser = newUser => {
    this.setUsersList([...this.state.usersList, newUser]);
  };

  addPost = newPost => {
    console.log('inside context');
    this.setPostList([...this.state.postList, newPost]);
    console.log(this.state.postList)
  };
 
  addTask = newTask => {
    console.log(newTask);
    this.setTaskList([...this.state.taskList, newTask]);
    const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
    const username = currentUser.username;
    const doTasks = currentUser.do_tasks;
    const newDoTasks = [ ...doTasks, newTask.task_id ];
    console.log(newDoTasks);
    const updatedUser = { ...currentUser, do_tasks: newDoTasks };
    this.updateCurrentUser(updatedUser);
    UsersApiService.updateUser(username, updatedUser)
      .catch(this.state.setError); 
  };

  deletePost = postId => {
    const newPostList = this.state.postList.filter(
      post => post.post_id != postId
    );

    this.setPostList(newPostList);
  };

  deleteDoneTask = taskId => {
    const newDoneTaskList = this.state.done_tasks.filter(
      task => task.task_id != taskId
    );
    this.setDoneTasks(newDoneTaskList);
  };

  updatePost = updatedPost => {
    const newPostList = this.state.postList.map(post =>
      post.post_id == updatedPost.post_id ? updatedPost : post
    );
    this.setState({
      postList: [...newPostList]
    });
  };

  setLogin = () => {
    console.log('set login');
    this.state.isLoggedIn
      ? this.setState({ isLoggedIn: false })
      : this.setState({ isLoggedIn: true });
  };


  addDoTask = newTask => {
    console.log(newTask);
    const newDoTasks = [...this.state.doTasks, newTask];
    console.log(newDoTasks);
    this.setDoTasks([...this.state.doTasks, newTask]);
  };


  addDoneTask = newTask => {
    this.setDoneTasks([...this.state.doneTasks, newTask]);
  };

  deleteDoTask = id => {
    console.log('delete task');
    const newDoTaskList = this.state.doTasks.filter(
      task => task != id
    );
    this.setDoTasks(newDoTaskList);
  }

  setCurrentUser = username => {
    const currentUser = this.state.usersList.filter(user => user.username == username);
    console.log(currentUser[0].current_task);
    this.setState({ currentUser: currentUser[0] });
    console.log(this.state.currentUser);
    this.setCurrentTask(currentUser[0].current_task);
    this.setDoTasks(currentUser[0].do_tasks);
    this.setDoneTasks(currentUser[0].done_tasks);
    TokenService.saveUserObj(currentUser[0]);
    //TokenService.saveUser(currentUser);
  };

  setCurrentTask = currentTask => {
    this.setState({ currentTask });
  };

  deleteCurrentTask = () => {
    const doTasks = this.state.doTasks;
    const randomNum = doTasks[Math.floor(Math.random() * doTasks.length)];
    console.log(randomNum);
    const newDoTasks = doTasks.filter(task => task !== randomNum);
    this.setState({ currentTask: randomNum });
    this.setState({ doTasks: newDoTasks });
  };

  setDoTasks = doTasks => {
    console.log(doTasks);
    this.setState({ doTasks });
  };

  setDoneTasks = doneTasks => {
    this.setState({ doneTasks });
    console.log(this.state.doneTasks);
  };

  updateCurrentUser = (updatedUser) => {
    console.log('update user');
    this.setState({ currentUser: updatedUser});
    console.log(this.state.currentUser);
    this.setCurrentTask(updatedUser.current_task);
    this.setDoTasks(updatedUser.do_tasks);
    this.setDoneTasks(updatedUser.done_tasks);
    TokenService.saveUserObj(updatedUser);
   };

  render() {
    const contextValue = {
        usersList: this.state.usersList,
        postList: this.state.postList,
        taskList: this.state.taskList,
        currentUser: this.state.currentUser,
        currentTask: this.state.currentTask,
        doTasks: this.state.doTasks,
        doneTasks: this.state.doneTasks,
        setUsersList: this.setUsersList,
        setPostList: this.setPostList,
        setTaskList: this.setTaskList,
        addUser: this.addUser,
        addPost: this.addPost,
        addTask: this.addTask,
        deletePost: this.deletePost,
        deleteDoneTask: this.deleteDoneTask,
        updatePost: this.updatePost,
        error: this.state.error,
        setError: this.setError,
        clearError: this.clearError,
        isLoggedIn: this.state.isLoggedIn,
        setLogin: this.setLogin,
        setCurrentUser: this.setCurrentUser,
        setCurrentTask: this.setCurrentTask,
        setDoTasks: this.setDoTasks,
        setDoneTasks: this.setDoneTasks,
        addDoTask: this.addDoTask,
        addDoneTask: this.addDoneTask,
        deleteDoTask: this.deleteDoTask,
        deleteCurrentTask: this.deleteCurrentTask,
        updateCurrentUser: this.updateCurrentUser
    };
    return (
      <AppContext.Provider value={contextValue}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
