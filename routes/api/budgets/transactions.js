const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const auth = require('../../../middleware/auth');

const User = require('../../../models/User');
const Budget = require('../../../models/budget/Budget');
const Account = require('../../../models/budget/Account');
const Transaction = require('../../../models/budget/Transaction');

// @route  Post api/budgets/transactions/add
// @desc   add a transaction to a Budget
// @access Private
router.post(
  '/add',
  [
    auth,
    [
      check('budget_id', 'Invalid Request')
        .not()
        .isEmpty(),
      check('name', 'Invalid Request')
        .not()
        .isEmpty(),
      check('account_id', 'Invalid Request')
        .not()
        .isEmpty(),
      check('transaction_type', 'Transaction Must Have A type').matches(
        'income|expense'
      ),
      check('ammount', 'Invalid Ammount').isDecimal()
    ]
  ],
  async (req, res) => {
    try {
      const {
        budget_id,
        account_id,
        name,
        transaction_type,
        ammount,
        description
      } = req.body;

      //check for errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findById(req.user.id);

      //get budget
      const budget = await Budget.findById(budget_id);

      //update budget
      if (!budget.owner.equals(user.id)) {
        return res.status(400).json({
          errors: [
            {
              param: 'budget',
              value: `${req.body}`,
              msg: 'Invalid Request'
            }
          ]
        });
      }

      let account = budget.accounts.id(account_id);

      if (account) {
        const newTransaction = new Transaction({
          name,
          account: account.id,
          transactionType: transaction_type,
          ammount,
          description
        });
        budget.transactions.push(newTransaction);
        account.balance += newTransaction.ammount;
        budget.log.push(
          new String(
            `${Date(Date.now())}: added ${newTransaction.transactionType} (${
              newTransaction.name
            }) on account (${account.nickname}), with an amount off (${
              newTransaction.ammount
            }).
            Description: ${description}`
          )
        );
        budget.balance += newTransaction.ammount;

        await budget.save();

        return res.send({
          newTransaction,
          budget_id,
          account_id,
          budget_balance: budget.balance,
          account_balance: account.balance
        });
      }
      res.status(400).send('Bad Request');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
