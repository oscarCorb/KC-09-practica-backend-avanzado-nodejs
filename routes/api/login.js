'use strict';

const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// GET login
module.exports = {
  login: async (req, res, next) => {
    const { email, password } = req.body;

    // compare email and password against DB
    // if don't match: error
    const user = await User.findOne({ email: email });
    if (!user || !(await user.comparePasswords(password))) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      next(error);
      return;
    }

    // if match: generate token
    jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '20s' },
      (err, jwtToken) => {
        if (err) {
          next(err);
          return;
        }
        // return token to customer
        res.json({ token: jwtToken });
      }
    );
  },
};
