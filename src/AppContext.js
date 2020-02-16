import React, { Component } from 'react';
import TokenService from './services/token-service';

const AppContext = React.createContext({
    usersList: [],
    postList: [],
    taskList: [],
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
    setCurrentUser: () => {}
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
    this.setPostList([...this.state.postList, newPost]);
  };

  addTask = newTask => {
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

  setCurrentUser = currentUser => {
    this.setState({ currentUser });
    TokenService.saveUser(currentUser);
  };

  render() {
    const contextValue = {
        usersList: this.state.usersList,
        postList: this.state.postList,
        taskList: this.state.taskList,
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
        setCurrentUser: this.setCurrentUser
    };
    return (
      <AppContext.Provider value={contextValue}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
