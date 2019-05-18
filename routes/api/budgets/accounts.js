const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const auth = require('../../../middleware/auth');

const User = require('../../../models/User');
const Budget = require('../../../models/budget/Budget');
const Account = require('../../../models/budget/Account');
const Transaction = require('../../../models/budget/Transaction');

// @route  Post api/budgets/accounts/add
// @desc   add an account to a Budget
// @access Private
router.post(
  '/add',
  [
    auth,
    [
      check('budget_id', 'Invalid Request')
        .not()
        .isEmpty(),
      check('nick_name', 'Account Must Have A Name')
        .not()
        .isEmpty(),
      check('type', 'Account Must Have A type')
        .not()
        .isEmpty(),
      check('starting_Balance', 'Invalid Starting Blance').isDecimal()
    ]
  ],
  async (req, res) => {
    try {
      const { budget_id, nick_name, type, starting_Balance } = req.body;

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
        console.log(budget.owner);
        console.log(user.id);
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

      budget.accounts.push(
        new Account({
          nickname: nick_name,
          type: type,
          balance: starting_Balance
        })
      );
      budget.log.push(
        new String(
          `${Date.now()}: Added account (${nick_name}), with a Starting Balance of (${starting_Balance}).`
        )
      );

      await budget.save();

      res.send('Account Added');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
