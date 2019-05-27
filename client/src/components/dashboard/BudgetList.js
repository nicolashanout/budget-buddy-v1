import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectActiveBudget } from '../../actions/budget';
import { compareValues } from '../../utils/compareValues';

const BudgetList = props => {
  const { budgets, selectActiveBudget } = props;

  const [active, setActive] = useState({
    id: null
  });

  const budgetClicked = (e, id) => {
    setActive({
      id
    });
    selectActiveBudget(id);
  };

  const budgetList = budgets.sort(compareValues('name')).map(bud => {
    return (
      <Fragment key={bud._id}>
        <div className='h-line' />
        <div
          className={'budget-item ' + (active.id === bud._id ? 'active' : '')}
          onClick={e => {
            budgetClicked(e, bud._id);
          }}
        >
          <h5 className='name'>{bud.name}</h5>
          <p
            className={
              'balance' +
              ' ' +
              (bud.balance < 0 ? 'negative-balance' : 'positive-balance')
            }
          >
            ${bud.balance}
          </p>
        </div>
      </Fragment>
    );
  });

  return <Fragment>{budgetList}</Fragment>;
};

BudgetList.propTypes = {
  budgets: PropTypes.array.isRequired,
  selectActiveBudget: PropTypes.func.isRequired
};

export default connect(
  null,
  { selectActiveBudget }
)(BudgetList);
