import React, { Component } from 'react';
import TokenService from './services/token-service';
import UsersApiService from './services/users-api-service';
import TasksApiService from './services/tasks-api-service';

const AppContext = React.createContext({
    usersList: [],
    postList: [],
    taskList: [],
    currentUser: [],
    doTasks: [],
    setUsersList: () => {},
    setPostList: () => {},
    setTaskList: () => {},
    setDoTasks: () => {},
    addUser: () => {},
    addPost: () => {},
    addTask: () => {},
    deletePost: () => {},
    updatePost: () => {},
    setLogin: () => {},
    clearError: () => {},
    error: null,
    isLoggedIn: false,
    setCurrentUser: () => {},
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
    doTasks: [],
    error: null,
    isLoggedIn: false
  };

  componentDidMount() {
    TasksApiService.getTasks()
      .then(this.setTaskList)
     .catch(this.setError);
  }

  setUsersList = usersList => {
    this.setState({ usersList });
  };

  setPostList = postList => {
    TokenService.savePostsObj(postList);
    this.setState({ postList });
  };

  setTaskList = taskList => {
    this.setState({ taskList });
    TokenService.saveTasksObj(taskList);
  };

  setDoTasks = () => {
    const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
     this.setState({ doTasks: currentUser.do_tasks});
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
    const currentUser = JSON.parse(sessionStorage.getItem('userObj'));
    const username = currentUser.username;
    const doTasks = currentUser.do_tasks || [];
    const newDoTasks = [ ...doTasks, newTask.task_id ];
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

  updatePost = updatedPost => {
    const newPostList = this.state.postList.map(post =>
      post.post_id == updatedPost.post_id ? updatedPost : post
    );
    this.setState({
      postList: [...newPostList]
    });
  };

  setLogin = () => {
    this.state.isLoggedIn
      ? this.setState({ isLoggedIn: false })
      : this.setState({ isLoggedIn: true });
  };

  setCurrentUser = username => {
    const currentUser = this.state.usersList.filter(user => user.username == username);
    this.setState({ currentUser: currentUser[0] });
    TokenService.saveUserObj(currentUser[0]);
  };

  updateCurrentUser = (updatedUser) => {
    this.setState({ currentUser: updatedUser});
    TokenService.saveUserObj(updatedUser);
   };

  render() {
    const contextValue = {
        usersList: this.state.usersList,
        postList: this.state.postList,
        taskList: this.state.taskList,
        doTasks: this.state.doTasks,
        currentUser: this.state.currentUser,
        setUsersList: this.setUsersList,
        setPostList: this.setPostList,
        setTaskList: this.setTaskList,
        addUser: this.addUser,
        addPost: this.addPost,
        addTask: this.addTask,
        deletePost: this.deletePost,
        updatePost: this.updatePost,
        error: this.state.error,
        setError: this.setError,
        clearError: this.clearError,
        isLoggedIn: this.state.isLoggedIn,
        setLogin: this.setLogin,
        setCurrentUser: this.setCurrentUser,
        updateCurrentUser: this.updateCurrentUser,
        setDoTasks: this.setDoTasks
    };
    return (
      <AppContext.Provider value={contextValue}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
