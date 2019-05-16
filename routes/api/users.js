const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');
const config = require('config');

// @route  POST api/users
// @desc   Register a new User
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please Enter A Valid Email').isEmail(),
    check(
      'password',
      'Please Enter A Password With Length Between 6 and 32'
    ).isLength({
      min: 6,
      max: 32
    })
  ],
  async (req, res) => {
    //validate Submitted Info
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const { name, email, password } = req.body;

      try {
        //check if User Already Registered
        let user = await User.findOne({ email });

        if (user) {
          return res.status(400).json({
            errors: [
              {
                param: 'email',
                value: `${email}`,
                msg: 'User already exists'
              }
            ]
          });
        }

        //get avatar
        const avatar = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });

        //create user
        user = new User({
          name,
          email,
          avatar,
          password
        });

        //hash password
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);

        //save User to db
        await user.save();

        //return a JWT
        const payload = {
          user: {
            id: user.id
          }
        };
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 600 },
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
