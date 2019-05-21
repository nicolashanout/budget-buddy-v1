import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFromData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onSubmit = async e => {
    e.preventDefault();
  };

  const onChange = e => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <section id='login'>
        <h1>Login</h1>
        <p className='lead'>
          <i className='fas fa-user' />
          Sign Into Your Account
        </p>
        <form onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={e => onChange(e)}
              minLength='6'
            />
          </div>
          <input type='submit' className='btn' value='Login' />
          <p className='lead'>
            Don't have an account? <Link to='/register'>Register</Link>
          </p>
        </form>
      </section>
    </Fragment>
  );
};

export default Login;
