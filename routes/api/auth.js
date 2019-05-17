const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');

const config = require('config');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route  GET api/auth
// @desc   Test route
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST api/auth
// @desc   Authenticate User and get Token
// @access Public
router.post(
  '/',
  [
    check('email', 'Please Enter A Valid Email').isEmail(),
    check('password', 'Password Missing').exists()
  ],
  async (req, res) => {
    //validate Submitted Info
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const { email, password } = req.body;

      try {
        //check if User Already Registered
        let user = await User.findOne({ email });

        if (!user) {
          return res.status(400).json({
            errors: [
              {
                param: 'email',
                value: `${email}`,
                msg: 'Invalid Credentials'
              }
            ]
          });
        }

        //compare password
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return res.status(400).json({
            errors: [
              {
                param: 'password',
                value: `${password}`,
                msg: 'Invalid Credentials'
              }
            ]
          });
        }

        //return a JWT
        const payload = {
          user: {
            id: user.id
          }
        };
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 60000 },
          (err, token) => {
            if (err) {
              throw err;
            }
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('server error');
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }
);

module.exports = router;
