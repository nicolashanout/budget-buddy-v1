import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_BUDGETS,
  BUDGETS_ERROR,
  CREATE_BUDGET,
  SELECT_BUDGET,
  DELETE_ACCOUNT,
  ADD_ACCOUNT,
  ADD_TRANSACTION
} from './types';

//Get Users Budgets
export const getBudgets = () => async dispatch => {
  try {
    const res = await axios.get('/api/budgets/list');

    dispatch({
      type: GET_BUDGETS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BUDGETS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

export const createBudget = (
  formData,
  history,
  edit = false
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      '/api/budgets/add',
      JSON.stringify(formData),
      config
    );

    dispatch({
      type: CREATE_BUDGET,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Budget Updated' : 'Budget Created'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: BUDGETS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Select active budget
export const selectActiveBudget = id => async dispatch => {
  dispatch({
    type: SELECT_BUDGET,
    payload: id
  });
};

//Accounts

//add account to budget
export const addAccount = (budget_id, account) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      'api/budgets/accounts/add',
      JSON.stringify({
        budget_id,
        type: account.type,
        starting_Balance: account.balance,
        nick_name: account.nickname
      }),
      config
    );

    dispatch({
      type: ADD_ACCOUNT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BUDGETS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//delete account from budget
export const deleteAccount = (budget_id, account_id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      'api/budgets/accounts/delete',
      JSON.stringify({
        budget_id,
        account_id
      }),
      config
    );
    dispatch({
      type: DELETE_ACCOUNT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BUDGETS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//add account to budget
export const addTransaction = (budget_id, transaction) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    console.log('action: ' + budget_id + ' ' + transaction);
    const res = await axios.post(
      'api/budgets/transactions/add',
      JSON.stringify({
        budget_id,
        account_id: transaction.account,
        name: transaction.name,
        transaction_type: transaction.transactionType,
        ammount: transaction.ammount,
        description: transaction.description
      }),
      config
    );
    console.log(res);
    dispatch({
      type: ADD_TRANSACTION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BUDGETS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
