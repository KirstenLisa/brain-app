import React from 'react';
import { withRouter } from 'react-router';
import AppContext from '../../AppContext';
import TokenService from '../../services/token-service';
import UsersApiService from '../../services/users-api-service';
import AuthApiService from '../../services/auth-api-service';
import ValidationError from '../ValidationError';
import './LoginForm.css';


class LoginForm extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
          username: { value: '', touched: false },
          password: { value: '', touched: false },
          error: null
        };
      }
    
    componentDidMount() {
        this.context.clearError();
        UsersApiService.getUsers()
        .then(this.context.setUsersList)
        .catch(this.context.setError);
      }
    
      updateUsername(username) {
        this.setState({ username: { value: username, touched: true } });
      }
    
      updatePassword(password) {
        this.setState({ password: { value: password, touched: true } });
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
    
      validateForm() {
        if (this.validateUserName()) {
          this.setState({ username: { touched: true } });
        } else if (this.validatePassword()) {
          this.setState({ password: { touched: true } });
        }
      }
    
      handleSubmit = e => {
        e.preventDefault();
        this.setState({ error: null });
    
        const { username, password } = e.target;
    
        const userName = username.value;
        const user = this.context.usersList.filter(user => user.username == userName);
        const userId = user[0].id;
    
        if (this.validateForm()) {
          return null;
        }
        if (
          this.validatePassword() ||
          this.validateUserName()
        ) {
          return null;
        }

        AuthApiService.postLogin({
          username: username.value,
          password: password.value
        })
          .then(res => {
            username.value = '';
            password.value = '';
            TokenService.saveAuthToken(res.authToken);
            UsersApiService.getUser(userName)
            .then(this.context.setCurrentUser(userName));
            TokenService.saveUsername(userName);
            this.props.history.push(`/dashboard/${userId}`);
            this.context.setLogin();
          })
          .catch(res => {
            this.setState({
            error: {
            message: res.error
          }
        });
      });
      };
    
      render() {
        const { error } = this.state;

        const userNameError = this.validateUserName();
        const passwordError = this.validatePassword();
    
        return (
          <form className='loginForm' onSubmit={this.handleSubmit}>
            <div role='alert' className='loginError'>
              {error && <p>{error.message}</p>}
            </div>
            <div className='username'>
              <label htmlFor='LoginForm__user_name'>User name</label>
              <input
                type='text'
                className='login_input'
                name='username'
                id='username'
                onChange={e => this.updateUsername(e.target.value)}
                aria-required='true'
                placeholder='User Name'
              />
              <div className='login_error'>
                {this.state.username.touched && (
                  <ValidationError message={userNameError} id='userNameError' />
                )}
              </div>
            </div>
    
            <div className='password'>
              <label htmlFor='LoginForm__password'>Password</label>
              <input
                className='login_input'
                name='password'
                id='password'
                type='password'
                onChange={e => this.updatePassword(e.target.value)}
                aria-required='true'
                placeholder='Password'
              />
              <div className='login_error'>
                {this.state.password.touched && (
                  <ValidationError message={passwordError} id='passwordError' />
                )}
              </div>
            </div>
    
            <div className='login-form-buttons'>
              <button type='submit' className='loginButton'>
                Login
              </button>
              <button
                type='button'
                className='cancelButton'
                onClick={() => this.props.history.push('/')}
              >
                Cancel
              </button>
            </div>
          </form>
        );
      }
    }
    
export default withRouter(LoginForm);
    


