import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compareValues } from '../../utils/compareValues';

const BudgetTransactions = props => {
  const { budget_id, budget } = props;

  //find the budget
  const bud = budget.budgets.find(budget => {
    return budget._id === budget_id;
  });
  return (
    <Fragment>
      {bud.transactions.length > 0 ? (
        bud.transactions
          .sort(compareValues('date', 'desc'))
          .map(transaction => {
            return (
              <div className='transaction' key={transaction._id}>
                <div className='transaction-heading'>
                  <h4>Transaction</h4>
                </div>
                <div className='transaction-details'>
                  <p>
                    <span className='transaction-lable'>Name: </span>
                    {transaction.name}
                  </p>

                  <p>
                    <span className='transaction-lable'>Type: </span>
                    {transaction.transactionType}
                  </p>

                  <p>
                    <span className='transaction-lable'>Date: </span>
                    {transaction.date}
                  </p>

                  <p>
                    <span className='transaction-lable'>Ammount: $</span>
                    {transaction.ammount}
                  </p>

                  <p>
                    <span className='transaction-lable'>Description: </span>
                    {transaction.description}
                  </p>
                </div>
              </div>
            );
          })
      ) : (
        <p>No Accounts Available</p>
      )}
    </Fragment>
  );
};

BudgetTransactions.propTypes = {
  budget_id: PropTypes.string.isRequired,
  budget: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    budget: state.budget
  };
};

export default connect(mapStateToProps)(BudgetTransactions);
