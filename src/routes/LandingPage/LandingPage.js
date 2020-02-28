import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className='landing-page'>
      <h1 className='landingpage-headline'>
        Welcome to brain app
      </h1>
      <div className='app-explanation'>

        <h3>Test Users</h3>
        <ul className='testUserList'>
          <li className='testUsers'>
            <p>Username 1: fluffy_rabbit</p>
            <p>Username 2: Dulli</p>
            <p>Password: Any 8 characters, no backend authentication yet</p>
          </li>
        </ul>
        <p>
          Train your brain muscles by doing everyday something new. Choose from a list of tasks or create your own individual bucket list. But keep it simple: Choose only tasks that you can do in ONE DAY.
        </p>
        <p>Pictures cannot be uploaded yet</p>
        <p className='call-to-action'>Yal-la! <Link className='yalla-login' to='./login'>Let's do this</Link></p>
      </div>
    </div>
  );
};

export default LandingPage;
