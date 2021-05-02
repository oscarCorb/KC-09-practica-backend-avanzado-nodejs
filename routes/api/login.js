'use strict';

const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// GET login
module.exports = {
  login: async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user || !(await user.comparePasswords(password))) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      next(error);
      return;
    }

    jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, jwtToken) => {
        if (err) {
          next(err);
          return;
        }
        res.json({ token: jwtToken });
      }
    );
  },
};
