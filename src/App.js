import React, { Component } from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import { Route, Link } from 'react-router-dom'
//import PrivateRoute from './utils/PrivateRoute';
//import PublicOnlyRoute from './utils/PublicOnlyRoute';
import Header from './components/Header/Header';
import LandingPage from './routes/LandingPage/LandingPage';
import LoginPage from './routes/LoginPage/LoginPage';
import RegistrationPage from './routes/RegistrationPage/RegistrationPage';
import Dashboard from './routes/Dashboard/Dashboard';
import TaskList from './routes/TaskList/TaskList';
import PostPage from './components/PostPage/PostPage';
import AddPost from './routes/AddPost/AddPost';
import AddTask from './routes/AddTask/AddTask';
import AppContext from './AppContext';
import './App.css'


class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    
  return (
    <>
    <GoogleFontLoader
    fonts={[
      {
        font: 'Ubuntu',
        weights: [400, '400i'],
      },
      {
        font: 'Candal',
        weight: [400, '400i'],
      }
    ]}
  />
   <header className='App__header'>
          <Header />
        </header>
        <main className='App__main'>
          {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
          <Route
              exact
              path={'/'}
              component={LandingPage}
            />
            <Route
              exact
              path={'/login'}
              component={LoginPage}
            />
            <Route
              exact
              path={'/register'}
              component={RegistrationPage}
            />
            <Route
              exact
              path={'/dashboard/:userId'}
              component={Dashboard}
              />

            <Route
              exact
              path={'/tasklist'}
              component={TaskList}
              />

            <Route
              exact
              path={'/posts/:postId'}
              component={PostPage}
              />
            
            <Route
              exact
              path={'/addPost/:userId/'}
              component={AddPost}
              />

            <Route
              exact
              path={'/addTask'}
              component={AddTask}
              />
        
        </main>
  </>
    )
  }
}

export default App;