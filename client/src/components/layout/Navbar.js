import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = props => {
  const { auth, logout } = props;
  const { isAuthenticated, loading } = auth;

  const authLinks = (
    <ul>
      <li>
        <Link to='dashboard'>Dashboard</Link>
      </li>
      <li>
        <a href='#!' onClick={logout}>
          <i className='fas fa-sign-out-alt' />
          Logout
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='login'>LogIn</Link>
      </li>
      <li>
        <Link to='register'>Register</Link>
      </li>
    </ul>
  );

  return (
    <div className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-money-bill-wave' />
          <span className='hide-md'> BudgetBuddy</span>
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
