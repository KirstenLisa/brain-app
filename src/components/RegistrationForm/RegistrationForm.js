import React from 'react';
import { withRouter } from 'react-router';
import config from '../../config';
import UsersApiService from '../../services/users-api-service';
import AppContext from '../../AppContext';
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
        profile_pic: { value: ''},
        error: null
      };
    }
  
    componentDidMount() {
      this.context.clearError();
      this.setState({ profile_pic: {value: '/images/alpaka_funny.jpg'}})
    }

    uploadFile = (file, signedRequest, url) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            document.getElementById('preview').value = url;
            this.setState({profile_pic: { value: url }});
          }
          else{
            alert('Could not upload file.');
          }
        }
      };
      xhr.send(file);
    }

    getSignedRequest = (file) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${config.API_ENDPOINT}/sign-s3?file-name=${file.name}&file-type=${file.type}`);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            const response = JSON.parse(xhr.responseText);
            this.uploadFile(file, response.signedRequest, response.url);
            this.setState({post_pic: { value: 'response.url' }});
          }
          else{
            alert('Could not get signed URL.');
          }
        }
      };
      xhr.send();
    }

    initUpload = () => {
      const files = document.getElementById('file-input-reg').files;
      const file = files[0];
      if(file == null){
        return alert('No file selected.');
      }
      this.getSignedRequest(file);
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
      if (password.length < 8) {
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

      const newUser = {
        fullname: fullname.value,
        username: username.value,
        password: password.value,
        profile_pic: this.state.profile_pic.value,
        email: email.value,
        current_task: 1,
        do_tasks: [],
        done_tasks: []
      }

      UsersApiService.postUser(newUser)
        .then(user => {
          fullname.value = '';
          username.value = '';
          password.value = '';
          email.value = '';
          this.props.history.push('/login');
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
  
      const fullNameError = this.validateFullName();
      const userNameError = this.validateUserName();
      const passwordError = this.validatePassword();
      const emailError = this.validateEmail();
  
      return (
        <section className='add-user-section'>
          <label for='file-input-reg' class='preview-label-reg'>Please add a profile pic</label>
          <div className='add-user-reg'>
        <input 
        type='file' 
        id='file-input-reg'
        onChange={this.initUpload}/>
        <img 
          id='preview'
          alt='preview' 
          src={this.state.profile_pic.value}
          value={this.state.profile_pic.value}></img>
          </div>
        <form className='registration-form' onSubmit={this.handleSubmit}>
          <div role='alert' className='registrationError'>
            {error && <p>{error.message}</p>}
          </div>
  
          <div className='fullname'>
            <label htmlFor='fullname'>Full name</label>
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
  
          <div className='username'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              className='registration_input'
              name='username'
              id='username'
              onChange={e => this.updateUsername(e.target.value)}
              aria-required='true'
              placeholder='Username'
            />
            <div className='registration_error'>
              {this.state.username.touched && (
                <ValidationError message={userNameError} id='userNameError' />
              )}
            </div>
          </div>
          <div className='email'>
            <label htmlFor='email'>Email</label>
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
            <label htmlFor='password'>Password</label>
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
        </section>
      );
    }
  }

export default withRouter(RegistrationForm);