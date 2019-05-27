import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBudgets } from '../../actions/budget';

import Loading from '../layout/Loading';
import BudgetList from './BudgetList';
import BudgetDetails from './BudgetDetails';

const Dashboard = props => {
  const { getBudgets, auth, budget } = props;

  useEffect(() => {
    getBudgets();
  }, [getBudgets]);

  if (budget.loading || auth.loading || !auth.user) {
    return <Loading />;
  } else {
    return (
      <Fragment>
        <section id='dashboard'>
          <h1>Dashboard</h1>
          <p>Welcome {auth.user.name}</p>
          {budget.budgets.length !== 0 ? (
            <Fragment>
              <div className='inner-dashboard'>
                <div className='budget-list'>
                  <div className='heading'>
                    <h4>budgets</h4>
                    <Link to='/create-budget' className='add-budget btn'>
                      <i className='fas fa-plus' />
                      <span className='hide-md'> New</span>
                    </Link>
                  </div>
                  <BudgetList budgets={budget.budgets} />
                </div>
                <div className='budget-details'>
                  <div className='heading'>
                    <h4>Details</h4>
                  </div>
                  <div className='h-line' />
                  <BudgetDetails />
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <Link to='/create-budget' className='add-budget btn'>
                Create Your First Budget
              </Link>
            </Fragment>
          )}
        </section>
      </Fragment>
    );
  }
};

Dashboard.propTypes = {
  getBudgets: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  budget: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    budget: state.budget
  };
};

export default connect(
  mapStateToProps,
  { getBudgets }
)(Dashboard);
