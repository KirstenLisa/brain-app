import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../AppContext';
import TokenService from '../../services/token-service';
import {Hyph} from '../../utils/utils';
import  brainLogo from '../../images/brain-weights.png';
import './Header.css';


export default class Header extends Component {

  static contextType = AppContext;


  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
  }


  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    this.context.setLogin()
    TokenService.clearUsername()
    TokenService.clearUserObj()
    TokenService.clearTasksObj()
    }
  
    renderLogoutLink() {
      return (
        
        <div className='Header__logged-in'>
          <Link
            onClick={this.handleLogoutClick}
            to='/'>
              <button className='logout-button'>
              Logout
              </button>
          </Link>
        </div>
      )
    }
  
    renderLoginLink() {
      return (
        <div className='Header__not-logged-in'>
          
            <Link
              className='login-link'
              to='/login'>
              Sign in
            </Link>

            <Hyph/>
        
        <Link
          className='registration-link'
          to='/register'>
          Create your profile
        </Link>
    
        </div>
      )
    }

    renderHomeLink() {
      return (
      <h1>
      <Link className='main-link' to='/'>
       NEW APP
      </Link>
    </h1>
      )}

    renderDashboardLink(userId) {
      return (
      <h1>
          <Link className='main-link' to={`/dashboard/${userId}`}>
            NEW APP
          </Link>
        </h1>
      )}
  

  render() {
    const username = sessionStorage.getItem('username')
    console.log(this.state.loggedIn)
    return (
      <nav className='Header'>
        <img className='logo' src={brainLogo} alt='school-logo'/> 
    
        {username
          ? this.renderDashboardLink()
          : this.renderHomeLink()}
        
      {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>

    )
  }
}

