import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BudgetAccounts from './BudgetAccounts';
import BudgetTransactions from './BudgetTransactions';
import BudgetLog from './BudgetLog';

import { addAccount, addTransaction } from '../../actions/budget';

const BudgetDetails = props => {
  const { budget, addAccount, addTransaction } = props;

  const [selectedBudget, setSelectecBudget] = useState({
    budgetDetails: null
  });

  const [expandedSections, setExpandedSections] = useState({
    addAccount: false,
    addTransaction: false
  });

  const [newAccount, setNewAccount] = useState({
    nickname: '',
    type: 'cash',
    balance: 0
  });

  const [newTransaction, setNewTransaction] = useState({
    name: '',
    account: '',
    transactionType: '',
    ammount: 0,
    description: ''
  });

  const onChange = (e, data, setter) => {
    setter({ ...data, [e.target.name]: e.target.value });
  };

  const getActiveBudget = () => {
    budget.budgets.forEach(bud => {
      if (bud._id === budget.selected) {
        setSelectecBudget({
          budgetDetails: bud
        });
      }
    });
  };

  const onSubmitNewAccount = e => {
    e.preventDefault();
    addAccount(selectedBudget.budgetDetails._id, newAccount);
    setNewAccount({
      nickname: '',
      type: 'cash',
      balance: 0
    });
    expandSection('addAccount');
  };

  const onSubmitNewTransaction = e => {
    e.preventDefault();
    if (newTransaction.transactionType === 'expense') {
      newTransaction.ammount *= -1;
    }
    addTransaction(selectedBudget.budgetDetails._id, newTransaction);
    setNewTransaction({
      name: '',
      account: '',
      transactionType: '',
      ammount: 0,
      description: ''
    });
    expandSection('addTransaction');
  };

  const expandSection = section => {
    switch (section) {
      case 'addAccount':
        setExpandedSections({
          ...expandedSections,
          addAccount: !expandedSections.addAccount
        });
        break;

      case 'addTransaction':
        setExpandedSections({
          ...expandedSections,
          addTransaction: !expandedSections.addTransaction
        });
        break;

      default:
        return;
    }
  };

  useEffect(() => {
    getActiveBudget();
  }, [budget.selected]);

  return (
    <Fragment>
      {selectedBudget.budgetDetails ? (
        <Fragment>
          <div className='detail-group'>
            <p>
              <span className='detail-lable'>Budget Name: </span>
              {selectedBudget.budgetDetails.name}
            </p>

            <p className='collapsed'>
              <span className='detail-lable'>Budget Description: </span>
              {selectedBudget.budgetDetails.description ? (
                selectedBudget.budgetDetails.description
              ) : (
                <Link to='/'>Add A Description</Link>
              )}
            </p>
          </div>

          <div className='detail-group'>
            <div className='detail-heading'>
              <h2 className='detail-lable'>Accounts</h2>

              <a
                href='#!'
                className='btn'
                onClick={e => {
                  expandSection('addAccount');
                }}
              >
                <i
                  className={
                    expandedSections.addAccount ? 'fas fa-minus' : 'fas fa-plus'
                  }
                >
                  <span className='hide-sm'> Add Account</span>
                </i>
              </a>
            </div>
            {expandedSections.addAccount ? (
              <Fragment>
                <form
                  className='add-account-form'
                  onSubmit={e => {
                    onSubmitNewAccount(e);
                  }}
                >
                  <fieldset>
                    <legend>New Account</legend>
                    <div className='form-group'>
                      <label htmlFor='nickname'>Account Nickname: </label>
                      <input
                        name='nickname'
                        type='text'
                        placeholder='eg. chase savings account'
                        value={newAccount.nickname}
                        onChange={e => {
                          onChange(e, newAccount, setNewAccount);
                        }}
                      />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='type'>Account Type: </label>
                      <select
                        name='type'
                        value={newAccount.type}
                        onChange={e => {
                          onChange(e, newAccount, setNewAccount);
                        }}
                      >
                        <option value='cash'>Cash</option>
                        <option value='debit_account'>Debit Account</option>
                        <option value='credit_account'>Credit Account</option>
                      </select>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='balance'>Starting Balance: </label>
                      $
                      <input
                        name='balance'
                        type='number'
                        placeholder='starting balance'
                        value={newAccount.balance}
                        onChange={e => {
                          onChange(e, newAccount, setNewAccount);
                        }}
                        min='0'
                        step='.01'
                      />
                    </div>
                    <input className='btn' type='submit' value='Save' />
                  </fieldset>
                </form>
              </Fragment>
            ) : (
              <Fragment />
            )}
            <BudgetAccounts budget_id={selectedBudget.budgetDetails._id} />
          </div>

          <div className='detail-group'>
            <div className='detail-heading'>
              <h2 className='detail-lable'>Transactions</h2>

              <a
                href='#!'
                className='btn'
                onClick={e => {
                  expandSection('addTransaction');
                }}
              >
                <i
                  className={
                    expandedSections.addTransaction
                      ? 'fas fa-minus'
                      : 'fas fa-plus'
                  }
                >
                  <span className='hide-sm'> Add Transaction</span>
                </i>
              </a>
            </div>
            {expandedSections.addTransaction ? (
              <Fragment>
                <form
                  className='add-transaction-form'
                  onSubmit={e => {
                    onSubmitNewTransaction(e);
                  }}
                >
                  <fieldset>
                    <legend>New Transaction</legend>
                    <div className='form-group'>
                      <label htmlFor='name'>name: </label>
                      <input
                        name='name'
                        type='text'
                        placeholder='eg. bought eggs'
                        value={newTransaction.name}
                        onChange={e => {
                          onChange(e, newTransaction, setNewTransaction);
                        }}
                      />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='account'>Account: </label>
                      <select
                        name='account'
                        value={newTransaction.account}
                        onChange={e => {
                          onChange(e, newTransaction, setNewTransaction);
                        }}
                      >
                        <option value='' disabled>
                          Select Account
                        </option>
                        {selectedBudget.budgetDetails.accounts.map(account => {
                          return (
                            <option key={account._id} value={account._id}>
                              {account.nickname}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className='form-group'>
                      <label htmlFor='type'>Type: </label>
                      <select
                        name='transactionType'
                        value={newTransaction.transactionType}
                        onChange={e => {
                          onChange(e, newTransaction, setNewTransaction);
                        }}
                      >
                        <option value='' disabled>
                          Select type
                        </option>
                        <option value='income'>Income</option>
                        <option value='expense'>Expense</option>
                      </select>
                    </div>

                    <div className='form-group'>
                      <label htmlFor='ammount'>Ammount: </label>
                      $
                      <input
                        name='ammount'
                        type='number'
                        placeholder='Enter Ammount'
                        value={newTransaction.ammount}
                        onChange={e => {
                          onChange(e, newTransaction, setNewTransaction);
                        }}
                        min='0'
                        step='.01'
                      />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='description'>Description: </label>
                      <textarea
                        name='description'
                        type='text'
                        placeholder='Enter a Description'
                        value={newTransaction.description}
                        onChange={e => {
                          onChange(e, newTransaction, setNewTransaction);
                        }}
                      />
                    </div>

                    <input className='btn' type='submit' value='Save' />
                  </fieldset>
                </form>
              </Fragment>
            ) : (
              <Fragment />
            )}
            <BudgetTransactions budget_id={selectedBudget.budgetDetails._id} />
          </div>

          <div className='detail-group'>
            <p>
              <span className='detail-lable'>Log </span>
            </p>
            <BudgetLog budget_id={selectedBudget.budgetDetails._id} />
          </div>
        </Fragment>
      ) : (
        <p>select a budget to view it's details</p>
      )}
    </Fragment>
  );
};

BudgetDetails.propTypes = {
  budget: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    budget: state.budget
  };
};

export default connect(
  mapStateToProps,
  { addAccount, addTransaction }
)(BudgetDetails);
