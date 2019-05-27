import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createBudget } from '../../actions/budget';

import PropTypes from 'prop-types';

const CreateBudget = props => {
  const { createBudget, history } = props;

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const { name, description } = formData;

  const onSubmit = async e => {
    e.preventDefault();
    createBudget(formData, history);
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <section id='create-budget'>
        <h1>Create Budget</h1>

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
            <textarea
              placeholder='Description'
              name='description'
              value={description}
              onChange={e => onChange(e)}
            />
          </div>
          <input type='submit' className='btn' value='Create' />
        </form>
      </section>
    </Fragment>
  );
};

CreateBudget.propTypes = {
  createBudget: PropTypes.func.isRequired
};

export default connect(
  null,
  { createBudget }
)(withRouter(CreateBudget));
