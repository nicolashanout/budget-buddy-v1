import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';

const BudgetLog = props => {
  const { budget_id, budget } = props;

  console.log(budget);
  return (
    <Fragment>
      {budget.budgets
        .find(budget => {
          return budget._id === budget_id;
        })
        .log.map(str => {
          return (
            <Fragment key={uuid.v1()}>
              <div className='h-line' />
              <p className='log-entry'>
                <span className='bullet'>&bull;</span> {str}
              </p>
            </Fragment>
          );
        })
        .sort()
        .reverse()}
    </Fragment>
  );
};

BudgetLog.propTypes = {
  budget_id: PropTypes.string.isRequired,
  budget: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    budget: state.budget
  };
};

export default connect(mapStateToProps)(BudgetLog);
