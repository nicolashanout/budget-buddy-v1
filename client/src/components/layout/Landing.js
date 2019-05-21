import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Budget Buddy</h1>
          <p className='lead'>
            Keep track of your expenses easily and conviniently!
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn'>
              Register
            </Link>
            <Link to='/login' className='btn'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
