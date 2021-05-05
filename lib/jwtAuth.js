'use strict';

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // get JWT from request header
  const jwtToken = req.get('Authorization') || req.query.token || req.body.token;

  // check for token
  if (!jwtToken) {
    const error = new Error('No token provided.');
    error.status = 401;
    next(error);
    return;
  }

  // validate token
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      err.status = 401;
      next(err);
      return;
    }

    next();
    return;
  });
};
