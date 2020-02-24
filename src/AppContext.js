import React, { Component } from 'react';
import TokenService from './services/token-service';
import { users, posts, tasks } from './dummystore';

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
    deleteTask: () => {},
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
});

export default AppContext;

export class ContextProvider extends Component {
  state = {
    usersList: users,
    postList: posts,
    taskList: tasks,
    error: null,
    isLoggedIn: false
  };

  setUsersList = usersList => {
    this.setState({ usersList });
  };

  setPostList = postList => {
    this.setState({ postList });
  };

  setTaskList = taskList => {
    this.setState({ taskList });
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
  };

  deletePost = postId => {
    const newPostList = this.state.postList.filter(
      post => post.post_id != postId
    );

    this.setPostList(newPostList);
  };

  deleteTask = taskId => {
    const newTaskList = this.state.taskList.filter(
      task => task.task_id != taskId
    );

    this.setTaskList(newTaskList);
  };

  updateTask = updatedTask => {
    const newTaskList = this.state.taskList.map(task =>
      task.task_id == updatedTask.task_id ? updatedTask : task
    );
    this.setState({
      taskList: [...newTaskList]
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
    this.setState({ currentUser });
    this.setCurrentTask(currentUser[0].current_task);
    this.setDoTasks(currentUser[0].do_tasks);
    this.setDoneTasks(currentUser[0].done_tasks);
    TokenService.saveUserObj(currentUser);
    //TokenService.saveUser(currentUser);
  };

  setCurrentTask = currentTask => {
    this.setState({ currentTask });
    console.log(this.state.currentTask)
  };

  setDoTasks = doTasks => {
    console.log(doTasks);
    this.setState({ doTasks });
    console.log(this.state.doTasks);
  };

  setDoneTasks = doneTasks => {
    this.setState({ doneTasks });
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
        deleteTask: this.deleteTask,
        updateTask: this.updateTask,
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
    };
    return (
      <AppContext.Provider value={contextValue}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
