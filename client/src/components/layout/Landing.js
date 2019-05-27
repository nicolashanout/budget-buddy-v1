import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

const Landing = props => {
  const { isAuthenticated } = props;
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  } else {
    return (
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>Budget Buddy</h1>
            <p className='lead'>
              Keep track of your expenses easily and conveniently!
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
  }
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};
export default connect(mapStateToProps)(Landing);
