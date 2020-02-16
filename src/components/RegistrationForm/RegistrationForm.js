import React from 'react';
import { withRouter } from 'react-router';
import AppContext from '../../AppContext';
import TokenService from '../../services/token-service';
import ValidationError from '../ValidationError';
import './RegistrationForm.css';

class RegistrationForm extends React.Component {

    static contextType = AppContext;

    constructor(props) {
      super(props);
      this.state = {
        fullname: { value: '', touched: false },
        username: { value: '', touched: false },
        password: { value: '', touched: false },
        email: { value: '', touched: false },
        error: null
      };
    }
  
    componentDidMount() {
      this.context.clearError();
      // ALL API GOES HERE
    }
  
    updateFullname(fullname) {
      this.setState({ fullname: { value: fullname, touched: true } });
    }
  
    updateUsername(username) {
      this.setState({ username: { value: username, touched: true } });
    }
  
    updatePassword(password) {
      this.setState({ password: { value: password, touched: true } });
    }
  
    updateEmail(email) {
      this.setState({ email: { value: email, touched: true } });
    }
  
  
    validateFullName() {
      const fullName = this.state.fullname.value;
      if (fullName === undefined) {
        return 'Your full name is required';
      }
      if (fullName.length < 3) {
        return 'Full name must be at least 3 characters long';
      }
    }
  
    validateUserName() {
      const userName = this.state.username.value;
      if (userName === undefined) {
        return 'Username is required';
      }
      if (userName.length < 3) {
        return 'Username must be at least 3 characters long';
      }
    }
  
    validatePassword() {
      const password = this.state.password.value;
      if (password === undefined) {
        return 'password is required';
      }
      if (password.length < 9) {
        return 'Password must be at least 8 characters long';
      }
    }

    validateEmail() {
        const email = this.state.email.value;
        if (email === undefined) {
          return 'Email is required';
        }
        if (email.length < 9) {
          return 'No valid email-address';
        }
      }
  
   
  
    validateRegistrationForm() {
      if (this.validateFullName()) {
        this.setState({ fullname: { touched: true } });
      } else if (this.validateUserName()) {
        this.setState({ username: { touched: true } });
      } else if (this.validatePassword()) {
        this.setState({ password: { touched: true } });
      } else if (this.validateEmail()) {
        this.setState({ email: { touched: true } });
      }
    }
  
    handleSubmit = e => {
      e.preventDefault();
      this.setState({ error: null });
      const { fullname, username, password, email } = e.target;
  
      if (this.validateRegistrationForm()) {
        return null;
      }
     
        this.props.history.push('/login');
        
    };
  
    render() {
  
      const { error } = this.state;
  
      const fullNameError = this.validateFullName();
      const userNameError = this.validateUserName();
      const passwordError = this.validatePassword();
      const emailError = this.validateEmail();
  
      return (
        <form className='registration-form' onSubmit={this.handleSubmit}>
          <div role='alert' className='registrationError'>
            {error && <p>{error.message}</p>}
          </div>
  
          <div className='fullname'>
            <label htmlFor='RegistrationForm__full_name'>Full name</label>
            <input
              type='text'
              className='registration_input'
              name='fullname'
              id='fullname'
              onChange={e => this.updateFullname(e.target.value)}
              aria-required='true'
              placeholder='Full Name'
            />
            <div className='registration_error'>
              {this.state.fullname.touched && (
                <ValidationError message={fullNameError} id='fullNameError' />
              )}
            </div>
          </div>
  
          <div className='user_name'>
            <label htmlFor='RegistrationForm__user_name'>User name</label>
            <input
              type='text'
              className='registration_input'
              name='username'
              id='username'
              onChange={e => this.updateUsername(e.target.value)}
              aria-required='true'
              placeholder='User Name'
            />
            <div className='registration_error'>
              {this.state.username.touched && (
                <ValidationError message={userNameError} id='userNameError' />
              )}
            </div>
          </div>
          <div className='email'>
            <label htmlFor='RegistrationForm__email'>Email</label>
            <input
              className='registration_input'
              name='email'
              id='email'
              type='email'
              onChange={e => this.updateEmail(e.target.value)}
              aria-required='true'
              placeholder='hallo@dudeldei.com'
            />
            <div className='registration_error'>
              {this.state.email.touched && (
                <ValidationError message={emailError} id='emailError' />
              )}
            </div>
          </div>
         
          <div className='password'>
            <label htmlFor='RegistrationForm__password'>Password</label>
            <input
              className='registration_input'
              name='password'
              id='password'
              type='password'
              onChange={e => this.updatePassword(e.target.value)}
              aria-required='true'
              placeholder='Password'
            />
            <div className='registration_error'>
              {this.state.password.touched && (
                <ValidationError message={passwordError} id='passwordError' />
              )}
            </div>
          </div>
          <div className='registration-form-buttons'>
            <button type='submit' className='submitRegistration'>
              Register
            </button>
            <button
              type='button'
              className='cancelRegistration'
              onClick={() => this.props.history.push('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      );
    }
  }

export default withRouter(RegistrationForm);