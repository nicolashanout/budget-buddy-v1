import {
  GET_BUDGETS,
  BUDGETS_ERROR,
  CLEAR_BUDGETS,
  CREATE_BUDGET,
  SELECT_BUDGET,
  DELETE_ACCOUNT,
  ADD_ACCOUNT,
  ADD_TRANSACTION
} from '../actions/types';

const initialState = {
  budgets: [],
  loading: true,
  error: {},
  selected: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BUDGETS:
      return {
        ...state,
        budgets: payload,
        loading: false
      };

    case SELECT_BUDGET:
      return {
        ...state,
        selected: payload
      };

    case CREATE_BUDGET:
      return {
        ...state,
        budgets: [...state.budgets, payload],
        loading: false
      };

    case BUDGETS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case CLEAR_BUDGETS:
      return {
        ...state,
        budgets: [],
        loading: true
      };

    case ADD_ACCOUNT:
      return {
        ...state,
        budgets: [
          ...state.budgets.map(budget => {
            if (payload.budget_id === budget._id) {
              budget.accounts.push(payload.newAccount);
              budget.log.push(payload.newLog);
              budget.balance = payload.newBalance;
            }
            return budget;
          })
        ]
      };

    case DELETE_ACCOUNT:
      return {
        ...state,
        budgets: [
          ...state.budgets.filter(budget => {
            return payload._id !== budget._id;
          }),
          payload
        ]
      };

    case ADD_TRANSACTION:
      return {
        ...state,
        budgets: [
          ...state.budgets.map(budget => {
            if (payload.budget_id === budget._id) {
              budget.transactions.push(payload.newTransaction);
              budget.accounts.forEach(account => {
                if (payload.account_id === account._id) {
                  account.balance = payload.account_balance;
                }
              });
              budget.log.push(payload.newLog);
              budget.balance = payload.budget_balance;
            }
            return budget;
          })
        ]
      };

    default:
      return state;
  }
}
