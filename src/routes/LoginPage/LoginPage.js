import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className='LoginPage'>
      <h2>Login</h2>
      <LoginForm />
      <p>You don't have an account yet? Create your profile here:</p>
      <Link className='register-link' to='/register'>
        CREATE PROFILE
      </Link>
    </div>
  );
};

export default LoginPage;