const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Budget = require('../../models/budget/Budget');

// @route  GET api/budgets/list
// @desc   Get User's Budgets
// @access Private
router.get('/list', auth, async (req, res) => {
  try {
    const { budgetIDs } = await User.findById(req.user.id).select('budgetIDs');
    const budgets = new Array();

    //needed for async await to work when pushin into budget, see link: https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
    await (async () => {
      await Promise.all(
        budgetIDs.map(async id => {
          budgets.push(await Budget.findById(id).select(['name', 'accounts']));
        })
      );
    })();

    res.json(budgets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route  Post api/budgets/add
// @desc   Creat A New Budget
// @access Private
router.post(
  '/add',
  [
    auth,
    [
      check('name', 'you must name your budget')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const { name } = req.body;

      //check for errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await User.findById(req.user.id);
      //create budget
      const newBudget = new Budget({
        owner: user.id,
        name
      });

      //save budget
      const budget = await newBudget.save();
      console.log(budget);

      //update user budgets
      user.budgetIDs.push(budget.id);
      await user.save();

      res.send('budget Added');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

// @route  Post api/budgets/edit
// @desc   Edit and Existing Budget
// @access Private
router.post(
  '/edit',
  [
    auth,
    [
      check('id', 'you must name your budget')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const { name } = req.body;

      //check for errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await User.findById(req.user.id);
      //create budget
      const newBudget = new Budget({
        owner: user.id,
        name
      });

      //save budget
      const budget = await newBudget.save();
      console.log(budget);

      //update user budgets
      user.budgetIDs.push(budget.id);
      await user.save();

      res.send('budget Added');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
