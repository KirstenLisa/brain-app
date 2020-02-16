import React from 'react';
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
            <p>Username: </p>
            <p>Password: </p>
          </li>
        </ul>
        <p>
          How the app works
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
