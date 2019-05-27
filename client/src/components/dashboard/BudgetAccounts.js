import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount } from '../../actions/budget';

const BudgetAccounts = props => {
  const { budget_id, budget, deleteAccount } = props;

  useEffect(() => {}, [budget.accounts]);

  const onClick = (e, action, id) => {
    switch (action) {
      case 'delete':
        deleteAccount(budget_id, id);
        break;
      default:
        return;
    }
  };

  //find the budget
  const bud = budget.budgets.find(budget => {
    return budget._id === budget_id;
  });

  return (
    <Fragment>
      {bud.accounts.length > 0 ? (
        bud.accounts
          .map(account => {
            return (
              <div className='account' key={account._id}>
                <div className='account-heading'>
                  <h4>account</h4>
                  <div className='actions'>
                    <a
                      href='#!'
                      className='btn padding-s'
                      onClick={e => {
                        window.confirm('Not implemented');
                        console.log('Clicked Edit Account: ' + account._id);
                      }}
                    >
                      <i className='fas fa-edit' />
                    </a>

                    <a
                      href='#!'
                      className='btn btn-danger padding-s'
                      onClick={e => {
                        if (window.confirm('Delete Account?')) {
                          onClick(e, 'delete', account._id);
                        }
                      }}
                    >
                      <i className='fas fa-trash' />
                    </a>
                  </div>
                </div>
                <div className='account-details'>
                  <p>
                    <span className='account-lable'>Nickname: </span>
                    {account.nickname}
                  </p>
                  <p>
                    <span className='account-lable'>Type: </span>
                    {account.type}
                  </p>
                  <p>
                    <span className='account-lable'>Balance: $</span>
                    {account.balance}
                  </p>
                </div>
              </div>
            );
          })
          .sort()
      ) : (
        <p>No Accounts Available</p>
      )}
    </Fragment>
  );
};

BudgetAccounts.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  budget_id: PropTypes.string.isRequired,
  budget: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    budget: state.budget
  };
};

export default connect(
  mapStateToProps,
  { deleteAccount }
)(BudgetAccounts);
