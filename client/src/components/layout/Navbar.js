import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-money-bill-wave' />
          BudgetBuddy
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='login'>LogIn</Link>
        </li>
        <li>
          <Link to='register'>Register</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
