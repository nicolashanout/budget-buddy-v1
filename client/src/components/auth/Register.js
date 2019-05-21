import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFromData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log("passwords don't match");
    } else {
      console.log(formData);
      const newUser = {
        name,
        email,
        password
      };
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const body = JSON.stringify(newUser);
        const res = await axios.post(
          '/api/users', //proxy in package.json
          body,
          config
        );

        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onChange = e => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <section id='register'>
        <h1>Register</h1>
        <p className='lead'>
          <i className='fas fa-user' />
          Create Account
        </p>
        <form onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={e => onChange(e)}
              required
            />
          </div>
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
          <div className='form-group'>
            <input
              type='password'
              placeholder='Verify Password'
              value={password2}
              onChange={e => onChange(e)}
              name='password2'
              minLength='6'
            />
          </div>
          <input type='submit' className='btn' value='Register' />
          <p className='lead'>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </form>
      </section>
    </Fragment>
  );
};

export default Register;
